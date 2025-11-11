import { useState, useEffect, useCallback, useRef } from "react";
import {
  openWhatsApp,
  createGeneralContactMessage,
  createServiceInquiryMessage,
  createQuoteRequestMessage,
  createPortfolioInquiryMessage,
  createTeamInquiryMessage,
  createContactFormMessage,
  createBlogInquiryMessage,
  createTechInquiryMessage,
} from "@/lib/utils/whatsapp";

/* ============================================
   Custom Hooks Library
   ============================================ */

/**
 * useDebounce
 * Debounces a value by a specified delay
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * useLocalStorage
 * Persists state in localStorage with SSR safety
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // Get from local storage then parse stored json or return initialValue
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // Save state
        setStoredValue(valueToStore);

        // Save to local storage
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue],
  );

  // Remove from localStorage
  const removeValue = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

/**
 * useMediaQuery
 * Detects if media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);

    // Set initial value
    setMatches(media.matches);

    // Create listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener
    media.addEventListener("change", listener);

    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}

/**
 * useOnScreen
 * Detects if element is visible in viewport
 */
export function useOnScreen(
  ref: React.RefObject<HTMLElement>,
  rootMargin: string = "0px",
): boolean {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIntersecting(entry.isIntersecting);
        }
      },
      { rootMargin },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, rootMargin]);

  return isIntersecting;
}

/**
 * useClickOutside
 * Detects clicks outside of element
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  callback: () => void,
): React.RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [callback]);

  return ref;
}

/**
 * useKeyPress
 * Detects if specific key is pressed
 */
export function useKeyPress(targetKey: string): boolean {
  const [keyPressed, setKeyPressed] = useState<boolean>(false);

  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    };

    const upHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]);

  return keyPressed;
}

/**
 * useWindowSize
 * Returns current window dimensions
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

/**
 * useScrollPosition
 * Returns current scroll position (throttled for better performance)
 * @param throttleMs - Throttle delay in milliseconds (default: 100ms)
 */
export function useScrollPosition(throttleMs: number = 100) {
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollPosition({
            x: window.scrollX,
            y: window.scrollY,
          });
          ticking = false;
        });

        ticking = true;
      }
    };

    // Throttle scroll events
    let timeoutId: NodeJS.Timeout | null = null;
    const throttledScroll = () => {
      if (timeoutId === null) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, throttleMs);
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [throttleMs]);

  return scrollPosition;
}

/**
 * usePrevious
 * Returns previous value of state
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

/**
 * useToggle
 * Boolean state toggle hook
 */
export function useToggle(
  initialValue: boolean = false,
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  const setExplicit = useCallback((newValue: boolean) => {
    setValue(newValue);
  }, []);

  return [value, toggle, setExplicit];
}

/**
 * useAsync
 * Handles async operations with loading/error states
 */
export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true,
) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(() => {
    setStatus("loading");
    setValue(null);
    setError(null);

    return asyncFunction()
      .then((response: T) => {
        setValue(response);
        setStatus("success");
      })
      .catch((error: Error) => {
        setError(error);
        setStatus("error");
      });
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };
}

/**
 * useCopyToClipboard
 * Copies text to clipboard
 */
export function useCopyToClipboard(): [
  string | null,
  (text: string) => Promise<void>,
] {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
    } catch (error) {
      console.warn("Copy failed", error);
      setCopiedText(null);
    }
  };

  return [copiedText, copy];
}

/**
 * useInterval
 * Declarative interval hook
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}

/**
 * useTimeout
 * Declarative timeout hook
 */
export function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const id = setTimeout(() => savedCallback.current(), delay);

    return () => clearTimeout(id);
  }, [delay]);
}

/**
 * useThrottle
 * Throttles a value by a specified delay (limits update frequency)
 * @param value - Value to throttle
 * @param delay - Throttle delay in milliseconds (default: 200ms)
 */
export function useThrottle<T>(value: T, delay: number = 200): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef<number>(Date.now());

  useEffect(() => {
    const handler = setTimeout(
      () => {
        if (Date.now() - lastRan.current >= delay) {
          setThrottledValue(value);
          lastRan.current = Date.now();
        }
      },
      delay - (Date.now() - lastRan.current),
    );

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return throttledValue;
}

/**
 * useThrottledCallback
 * Returns a throttled version of a callback function
 * @param callback - Function to throttle
 * @param delay - Throttle delay in milliseconds (default: 200ms)
 */
export function useThrottledCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number = 200,
): T {
  const lastRan = useRef<number>(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout>();

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastRan.current >= delay) {
        callback(...args);
        lastRan.current = now;
      } else {
        // Schedule for later if not enough time has passed
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(
          () => {
            callback(...args);
            lastRan.current = Date.now();
          },
          delay - (now - lastRan.current),
        );
      }
    },
    [callback, delay],
  ) as T;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledCallback;
}

/**
 * useWhatsApp
 * Hook for WhatsApp integration with pre-configured messages
 */
export function useWhatsApp() {
  const sendMessage = useCallback((message: string) => {
    openWhatsApp(message);
  }, []);

  const sendGeneralContact = useCallback(() => {
    const message = createGeneralContactMessage();
    openWhatsApp(message);
  }, []);

  const sendServiceInquiry = useCallback((serviceName: string) => {
    const message = createServiceInquiryMessage(serviceName);
    openWhatsApp(message);
  }, []);

  const sendQuoteRequest = useCallback(
    (serviceName?: string, projectDetails?: string) => {
      const message = createQuoteRequestMessage(serviceName, projectDetails);
      openWhatsApp(message);
    },
    [],
  );

  const sendPortfolioInquiry = useCallback((projectName: string) => {
    const message = createPortfolioInquiryMessage(projectName);
    openWhatsApp(message);
  }, []);

  const sendTeamInquiry = useCallback((position?: string) => {
    const message = createTeamInquiryMessage(position);
    openWhatsApp(message);
  }, []);

  const sendContactFormMessage = useCallback(
    (formData: {
      name: string;
      email: string;
      service?: string;
      message: string;
    }) => {
      const message = createContactFormMessage(formData);
      openWhatsApp(message);
    },
    [],
  );

  const sendBlogInquiry = useCallback((blogTitle: string) => {
    const message = createBlogInquiryMessage(blogTitle);
    openWhatsApp(message);
  }, []);

  const sendTechInquiry = useCallback((technology: string) => {
    const message = createTechInquiryMessage(technology);
    openWhatsApp(message);
  }, []);

  return {
    sendMessage,
    sendGeneralContact,
    sendServiceInquiry,
    sendQuoteRequest,
    sendPortfolioInquiry,
    sendTeamInquiry,
    sendContactFormMessage,
    sendBlogInquiry,
    sendTechInquiry,
  };
}

/**
 * useReducedMotion
 * Detects if user prefers reduced motion for accessibility
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Create listener
    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Add listener
    mediaQuery.addEventListener("change", listener);

    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * useFocusTrap
 * Traps keyboard focus within a container element for accessibility
 * @param isActive - Whether the focus trap should be active
 */
export function useFocusTrap(
  isActive: boolean = true,
): React.RefObject<HTMLDivElement> {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;

    // Get all focusable elements
    const getFocusableElements = (): HTMLElement[] => {
      const focusableSelectors = [
        "a[href]",
        "button:not([disabled])",
        "textarea:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        '[tabindex]:not([tabindex="-1"])',
      ].join(", ");

      return Array.from(container.querySelectorAll(focusableSelectors));
    };

    // Focus first element when trap activates
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0 && focusableElements[0]) {
      focusableElements[0].focus();
    }

    // Handle tab key navigation
    const handleTabKey = (e: KeyboardEvent) => {
      const focusableElements = getFocusableElements();
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;

      // Shift + Tab
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      // Tab
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        handleTabKey(e);
      }
    };

    container.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive]);

  return containerRef;
}

/**
 * useRateLimit
 * Rate limiting hook to prevent spam/abuse
 * @param limit - Number of attempts allowed
 * @param windowMs - Time window in milliseconds
 */
export function useRateLimit(limit: number = 3, windowMs: number = 60000) {
  const [attempts, setAttempts] = useLocalStorage<number[]>(
    "rate_limit_attempts",
    [],
  );

  const checkRateLimit = useCallback((): {
    allowed: boolean;
    remaining: number;
    resetAt: Date;
  } => {
    const now = Date.now();
    const windowStart = now - windowMs;

    // Filter attempts within the time window
    const recentAttempts = attempts.filter(
      (timestamp) => timestamp > windowStart,
    );

    // Check if limit exceeded
    const allowed = recentAttempts.length < limit;
    const remaining = Math.max(0, limit - recentAttempts.length);

    // Calculate reset time (oldest attempt + window)
    const oldestAttempt = recentAttempts[0] || now;
    const resetAt = new Date(oldestAttempt + windowMs);

    return { allowed, remaining, resetAt };
  }, [attempts, limit, windowMs]);

  const recordAttempt = useCallback(() => {
    const now = Date.now();
    const windowStart = now - windowMs;

    // Keep only recent attempts + new one
    const recentAttempts = attempts.filter(
      (timestamp) => timestamp > windowStart,
    );
    setAttempts([...recentAttempts, now]);
  }, [attempts, setAttempts, windowMs]);

  const reset = useCallback(() => {
    setAttempts([]);
  }, [setAttempts]);

  return { checkRateLimit, recordAttempt, reset };
}

// Export useScrollDepth from separate file (Sprint 5)
export { useScrollDepth } from "./useScrollDepth";
