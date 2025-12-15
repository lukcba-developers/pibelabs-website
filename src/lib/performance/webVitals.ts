import { performanceMonitor } from "./monitoring";

export interface WebVitalsMetric {
  name: "CLS" | "FID" | "LCP" | "FCP" | "TTFB" | "INP";
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  id: string;
  navigationType: string;
}

type ReportCallback = (metric: WebVitalsMetric) => void;

export function reportWebVitals(callback: ReportCallback) {
  if (typeof window === "undefined") return;

  // Initialize performance monitoring
  performanceMonitor.initialize((report) => {
    report.metrics.forEach((metric) => {
      if (["LCP", "FID", "CLS"].includes(metric.name)) {
        callback({
          name: metric.name as any,
          value: metric.value,
          rating: metric.rating,
          delta: metric.value,
          id: `${metric.name}-${metric.timestamp}`,
          navigationType: getNavigationType(),
        });
      }
    });
  });

  // Additional Web Vitals
  if ("PerformanceObserver" in window) {
    // First Contentful Paint (FCP)
    observePaint("first-contentful-paint", (value) => {
      callback({
        name: "FCP",
        value,
        rating: getRating(value, { good: 1800, poor: 3000 }),
        delta: value,
        id: `FCP-${Date.now()}`,
        navigationType: getNavigationType(),
      });
    });

    // Time to First Byte (TTFB)
    observeNavigation((timing) => {
      const ttfb = timing.responseStart - timing.requestStart;
      callback({
        name: "TTFB",
        value: ttfb,
        rating: getRating(ttfb, { good: 800, poor: 1800 }),
        delta: ttfb,
        id: `TTFB-${Date.now()}`,
        navigationType: getNavigationType(),
      });
    });
  }
}

function observePaint(name: string, callback: (value: number) => void) {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === name) {
          callback(entry.startTime);
          observer.disconnect();
        }
      }
    });
    observer.observe({ type: "paint", buffered: true });
  } catch (error) {
    console.warn(`Failed to observe ${name}:`, error);
  }
}

function observeNavigation(
  callback: (timing: PerformanceNavigationTiming) => void,
) {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        callback(entry as PerformanceNavigationTiming);
      }
    });
    observer.observe({ type: "navigation", buffered: true });
  } catch (error) {
    console.warn("Failed to observe navigation:", error);
  }
}

function getRating(
  value: number,
  thresholds: { good: number; poor: number },
): "good" | "needs-improvement" | "poor" {
  if (value <= thresholds.good) return "good";
  if (value <= thresholds.poor) return "needs-improvement";
  return "poor";
}

function getNavigationType(): string {
  if (typeof window === "undefined") return "unknown";

  const navEntry = performance.getEntriesByType(
    "navigation",
  )[0] as PerformanceNavigationTiming;
  return navEntry?.type || "unknown";
}

export function sendToAnalytics(metric: WebVitalsMetric) {
  // Send to Google Analytics
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", metric.name, {
      value: Math.round(
        metric.name === "CLS" ? metric.value * 1000 : metric.value,
      ),
      event_category: "Web Vitals",
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Send to custom analytics endpoint
  if (import.meta.env.VITE_ANALYTICS_ENDPOINT) {
    fetch(import.meta.env.VITE_ANALYTICS_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(metric),
      headers: { "Content-Type": "application/json" },
      keepalive: true,
    }).catch(console.error);
  }
}
