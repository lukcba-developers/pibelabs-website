import { useEffect, useState } from "react";
import { performanceMonitor } from "@/lib/performance";
import type { WebVitalsMetric } from "@/lib/performance";

export function usePerformance(onMetric?: (metric: WebVitalsMetric) => void) {
  const [metrics, setMetrics] = useState<WebVitalsMetric[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const { reportWebVitals } = require("@/lib/performance");

    reportWebVitals((metric: WebVitalsMetric) => {
      setMetrics((prev) => [...prev, metric]);
      onMetric?.(metric);
    });

    return () => {
      performanceMonitor.disconnect();
    };
  }, [onMetric]);

  return { metrics };
}

export function usePageLoadTime() {
  const [loadTime, setLoadTime] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const measureLoadTime = () => {
      const perfData = performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      setLoadTime(pageLoadTime);
    };

    if (document.readyState === "complete") {
      measureLoadTime();
    } else {
      window.addEventListener("load", measureLoadTime);
      return () => window.removeEventListener("load", measureLoadTime);
    }
  }, []);

  return loadTime;
}
