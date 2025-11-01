/* ============================================
   Web Vitals Performance Monitoring
   ============================================ */

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

export const reportWebVitals = (onPerfEntry?: (metric: WebVitalsMetric) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    }).catch(() => {
      console.warn('web-vitals not installed');
    });
  }
};

export const logWebVitals = (metric: WebVitalsMetric) => {
  console.log(`[Web Vitals] ${metric.name}:`, {
    value: metric.value,
    rating: metric.rating,
    id: metric.id,
  });

  // Send to analytics if available
  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_rating: metric.rating,
    });
  }
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default reportWebVitals;
