/* ============================================
   API Retry Utility with Exponential Backoff
   ============================================ */

export interface RetryOptions {
  /** Maximum number of retry attempts (default: 3) */
  maxRetries?: number;
  /** Initial delay in milliseconds (default: 1000ms) */
  initialDelay?: number;
  /** Maximum delay in milliseconds (default: 10000ms) */
  maxDelay?: number;
  /** Exponential backoff factor (default: 2) */
  backoffFactor?: number;
  /** HTTP status codes that should trigger retry (default: [408, 429, 500, 502, 503, 504]) */
  retryableStatusCodes?: number[];
  /** Whether to add jitter to delays (default: true) */
  useJitter?: boolean;
  /** Custom function to determine if error should be retried */
  shouldRetry?: (error: unknown, attempt: number) => boolean;
  /** Callback when retry occurs */
  onRetry?: (error: unknown, attempt: number, delay: number) => void;
}

const DEFAULT_RETRYABLE_STATUS_CODES = [
  408, // Request Timeout
  429, // Too Many Requests
  500, // Internal Server Error
  502, // Bad Gateway
  503, // Service Unavailable
  504, // Gateway Timeout
];

/**
 * Calculates delay for next retry attempt using exponential backoff
 */
function calculateDelay(
  attempt: number,
  options: Required<
    Pick<
      RetryOptions,
      "initialDelay" | "maxDelay" | "backoffFactor" | "useJitter"
    >
  >,
): number {
  const { initialDelay, maxDelay, backoffFactor, useJitter } = options;

  // Exponential backoff: delay = initialDelay * (backoffFactor ^ attempt)
  let delay = Math.min(
    initialDelay * Math.pow(backoffFactor, attempt),
    maxDelay,
  );

  // Add jitter to prevent thundering herd problem
  if (useJitter) {
    // Random jitter between 0% and 25% of the delay
    const jitter = delay * 0.25 * Math.random();
    delay = delay + jitter;
  }

  return Math.floor(delay);
}

/**
 * Determines if error is retryable based on status code
 */
function isRetryableError(
  error: unknown,
  retryableStatusCodes: number[],
): boolean {
  // Network errors (no response)
  if (error instanceof TypeError && error.message.includes("fetch")) {
    return true;
  }

  // HTTP errors with retryable status codes
  if (error && typeof error === "object" && "status" in error) {
    const status = (error as { status: number }).status;
    return retryableStatusCodes.includes(status);
  }

  // Timeout errors
  if (error instanceof Error && error.name === "AbortError") {
    return true;
  }

  return false;
}

/**
 * Delays execution for specified milliseconds
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Wraps a promise-returning function with retry logic
 *
 * @example
 * const fetchWithRetry = retryFetch(
 *   () => fetch('/api/data'),
 *   { maxRetries: 3, initialDelay: 1000 }
 * );
 *
 * const response = await fetchWithRetry();
 */
export async function retryFetch<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    backoffFactor = 2,
    retryableStatusCodes = DEFAULT_RETRYABLE_STATUS_CODES,
    useJitter = true,
    shouldRetry,
    onRetry,
  } = options;

  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Attempt the operation
      return await fn();
    } catch (error) {
      lastError = error;

      // Check if we should retry
      const isLastAttempt = attempt === maxRetries;
      const shouldRetryError = shouldRetry
        ? shouldRetry(error, attempt)
        : isRetryableError(error, retryableStatusCodes);

      if (isLastAttempt || !shouldRetryError) {
        throw error;
      }

      // Calculate delay for next attempt
      const delayMs = calculateDelay(attempt, {
        initialDelay,
        maxDelay,
        backoffFactor,
        useJitter,
      });

      // Log retry attempt in development
      if (import.meta.env.DEV) {
        console.warn(
          `[Retry] Attempt ${attempt + 1}/${maxRetries} failed, retrying in ${delayMs}ms...`,
          error,
        );
      }

      // Call onRetry callback if provided
      onRetry?.(error, attempt + 1, delayMs);

      // Wait before next attempt
      await delay(delayMs);
    }
  }

  // This should never be reached, but TypeScript needs it
  throw lastError;
}

/**
 * Creates a retryable version of fetch with default options
 *
 * @example
 * const api = createRetryableFetch({ maxRetries: 5 });
 * const response = await api('/api/endpoint', { method: 'POST' });
 */
export function createRetryableFetch(options: RetryOptions = {}) {
  return async (input: RequestInfo | URL, init?: RequestInit) => {
    return retryFetch(() => fetch(input, init), options);
  };
}

/**
 * Creates a retryable operation wrapper
 */
export function createRetryableOperation<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {},
): () => Promise<T> {
  return () => retryFetch(fn, options);
}
