interface PerformanceMetric {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  timestamp: number;
}

interface PerformanceReport {
  metrics: PerformanceMetric[];
  deviceInfo: {
    userAgent: string;
    screen: string;
    connection?: string;
  };
  pageInfo: {
    url: string;
    referrer: string;
    loadTime: number;
  };
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observers: PerformanceObserver[] = [];
  private reportCallback?: (report: PerformanceReport) => void;

  initialize(callback?: (report: PerformanceReport) => void) {
    if (typeof window === "undefined") return;

    this.reportCallback = callback;
    this.observeWebVitals();
    this.observeResources();
    this.observeLongTasks();
    this.observeLayoutShifts();
  }

  private observeWebVitals() {
    // Largest Contentful Paint (LCP)
    this.createObserver("largest-contentful-paint", (entries) => {
      const lastEntry = entries[entries.length - 1] as any;
      this.recordMetric("LCP", lastEntry.renderTime || lastEntry.loadTime, {
        good: 2500,
        poor: 4000,
      });
    });

    // First Input Delay (FID)
    this.createObserver("first-input", (entries) => {
      const firstInput = entries[0] as any;
      this.recordMetric(
        "FID",
        firstInput.processingStart - firstInput.startTime,
        {
          good: 100,
          poor: 300,
        },
      );
    });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    this.createObserver("layout-shift", (entries) => {
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      this.recordMetric("CLS", clsValue, {
        good: 0.1,
        poor: 0.25,
      });
    });
  }

  private observeResources() {
    if (!("PerformanceObserver" in window)) return;

    this.createObserver("resource", (entries) => {
      entries.forEach((entry: any) => {
        if (entry.initiatorType === "img") {
          this.recordMetric(
            `Image Load: ${entry.name.split("/").pop()}`,
            entry.duration,
            { good: 500, poor: 1500 },
          );
        }
      });
    });
  }

  private observeLongTasks() {
    this.createObserver("longtask", (entries) => {
      entries.forEach((entry: any) => {
        this.recordMetric("Long Task", entry.duration, {
          good: 50,
          poor: 100,
        });
      });
    });
  }

  private observeLayoutShifts() {
    this.createObserver("layout-shift", (entries) => {
      entries.forEach((entry: any) => {
        if (entry.hadRecentInput) return;
        this.recordMetric("Layout Shift", entry.value, {
          good: 0.1,
          poor: 0.25,
        });
      });
    });
  }

  private createObserver(
    type: string,
    callback: (entries: PerformanceEntry[]) => void,
  ) {
    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries());
      });
      observer.observe({ type, buffered: true } as any);
      this.observers.push(observer);
    } catch (error) {
      console.warn(`Failed to observe ${type}:`, error);
    }
  }

  private recordMetric(
    name: string,
    value: number,
    thresholds: { good: number; poor: number },
  ) {
    const rating =
      value <= thresholds.good
        ? "good"
        : value <= thresholds.poor
          ? "needs-improvement"
          : "poor";

    const metric: PerformanceMetric = {
      name,
      value: Math.round(value),
      rating,
      timestamp: Date.now(),
    };

    this.metrics.push(metric);

    // Report immediately for important metrics
    if (["LCP", "FID", "CLS"].includes(name)) {
      this.reportMetric(metric);
    }
  }

  private reportMetric(metric: PerformanceMetric) {
    if (!this.reportCallback) return;

    const report: PerformanceReport = {
      metrics: [metric],
      deviceInfo: this.getDeviceInfo(),
      pageInfo: this.getPageInfo(),
    };

    this.reportCallback(report);
  }

  private getDeviceInfo() {
    return {
      userAgent: navigator.userAgent,
      screen: `${window.screen.width}x${window.screen.height}`,
      connection: (navigator as any).connection?.effectiveType,
    };
  }

  private getPageInfo() {
    return {
      url: window.location.href,
      referrer: document.referrer,
      loadTime: performance.now(),
    };
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  getReport(): PerformanceReport {
    return {
      metrics: this.getMetrics(),
      deviceInfo: this.getDeviceInfo(),
      pageInfo: this.getPageInfo(),
    };
  }

  clearMetrics() {
    this.metrics = [];
  }

  disconnect() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
  }
}

export const performanceMonitor = new PerformanceMonitor();

export function measureFunction<T>(name: string, fn: () => T): T {
  const start = performance.now();
  const result = fn();
  const duration = performance.now() - start;

  console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
  return result;
}

export async function measureAsync<T>(
  name: string,
  fn: () => Promise<T>,
): Promise<T> {
  const start = performance.now();
  const result = await fn();
  const duration = performance.now() - start;

  console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
  return result;
}
