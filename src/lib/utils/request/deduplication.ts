const pendingRequests = new Map<
  string,
  { promise: Promise<unknown>; timestamp: number }
>();
const requestCache = new Map<string, { data: unknown; timestamp: number }>();
const DEFAULT_CACHE_TTL = 5 * 60 * 1000;

export function generateRequestKey(
  url: string,
  method = "GET",
  params?: Record<string, unknown>,
): string {
  const paramsString = params ? JSON.stringify(params) : "";
  return `${method.toUpperCase()}:${url}:${paramsString}`;
}

export async function deduplicateRequest<T>(
  key: string,
  requestFn: () => Promise<T>,
  options: { cacheTTL?: number; useCache?: boolean } = {},
): Promise<T> {
  const { cacheTTL = DEFAULT_CACHE_TTL, useCache = false } = options;

  if (useCache) {
    const cached = requestCache.get(key);
    if (cached && Date.now() - cached.timestamp < cacheTTL) {
      return cached.data as T;
    }
  }

  const pending = pendingRequests.get(key);
  if (pending) {
    return pending.promise as Promise<T>;
  }

  const promise = requestFn()
    .then((data) => {
      if (useCache) {
        requestCache.set(key, { data, timestamp: Date.now() });
      }
      return data;
    })
    .finally(() => {
      pendingRequests.delete(key);
    });

  pendingRequests.set(key, { promise, timestamp: Date.now() });
  return promise;
}

export function clearPendingRequests(): void {
  pendingRequests.clear();
}

export function clearRequestCache(): void {
  requestCache.clear();
}

export function clearCachedRequest(key: string): void {
  requestCache.delete(key);
}

export function getPendingRequestsCount(): number {
  return pendingRequests.size;
}

export function getCacheSize(): number {
  return requestCache.size;
}

export function cleanupCache(maxAge = DEFAULT_CACHE_TTL): void {
  const now = Date.now();
  for (const [key, value] of requestCache.entries()) {
    if (now - value.timestamp > maxAge) {
      requestCache.delete(key);
    }
  }
}

export function createDedupedRequest<T>(
  url: string,
  method = "GET",
  options?: { cacheTTL?: number; useCache?: boolean },
) {
  return (requestFn: () => Promise<T>, params?: Record<string, unknown>) => {
    const key = generateRequestKey(url, method, params);
    return deduplicateRequest(key, requestFn, options);
  };
}
