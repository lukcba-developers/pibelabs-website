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
    // Dynamic import disabled - install web-vitals package to enable
    // import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    //   getCLS(onPerfEntry);
    //   getFID(onPerfEntry);
    //   getFCP(onPerfEntry);
    //   getLCP(onPerfEntry);
    //   getTTFB(onPerfEntry);
    // }).catch(() => {
    //   console.warn('web-vitals not installed');
    // });
    console.info('Web Vitals tracking is disabled. Install web-vitals package to enable.');
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

export default reportWebVitals;
