/* ============================================
   Performance Utilities
   ============================================ */

/**
 * Report Web Vitals (optional - requires web-vitals package)
 */
export const reportWebVitals = (onPerfEntry?: (metric: unknown) => void) => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    // Optional: Install web-vitals package for detailed metrics
    // npm install web-vitals
    console.log(
      "Web Vitals tracking available - install web-vitals package for full support",
    );
  }
};

/**
 * Prefetch resource
 */
export const prefetchResource = (
  url: string,
  as: "script" | "style" | "image" | "font",
) => {
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.as = as;
  link.href = url;
  document.head.appendChild(link);
};

/**
 * Preload resource
 */
export const preloadResource = (
  url: string,
  as: "script" | "style" | "image" | "font",
) => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = as;
  link.href = url;
  document.head.appendChild(link);
};

/**
 * Lazy load image
 */
export const lazyLoadImage = (imgElement: HTMLImageElement) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        if (src) {
          img.src = src;
          img.removeAttribute("data-src");
        }
        observer.unobserve(img);
      }
    });
  });

  observer.observe(imgElement);
};

/**
 * Get performance metrics
 */
export const getPerformanceMetrics = () => {
  if (typeof window === "undefined" || !window.performance) return null;

  const navigation = performance.getEntriesByType(
    "navigation",
  )[0] as PerformanceNavigationTiming;

  if (!navigation) return null;

  return {
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcp: navigation.connectEnd - navigation.connectStart,
    ttfb: navigation.responseStart - navigation.requestStart,
    download: navigation.responseEnd - navigation.responseStart,
    domParsing: navigation.domInteractive - navigation.responseEnd,
    domContentLoaded:
      navigation.domContentLoadedEventEnd -
      navigation.domContentLoadedEventStart,
    pageLoad: navigation.loadEventEnd - navigation.loadEventStart,
    totalTime: navigation.loadEventEnd - navigation.fetchStart,
  };
};

/**
 * Log performance metrics to console (dev only)
 */
export const logPerformanceMetrics = () => {
  if (import.meta.env.DEV) {
    const metrics = getPerformanceMetrics();
    if (metrics) {
      console.table(metrics);
    }
  }
};
