import { useEffect, useRef } from 'react';
import { trackScrollDepth } from '@/lib/analytics/googleAnalytics';

/**
 * useScrollDepth Hook - Sprint 5
 *
 * Tracks user scroll depth and sends analytics events at specific thresholds
 * Helps understand user engagement and content consumption
 *
 * @param thresholds - Array of percentage thresholds to track (default: [25, 50, 75, 100])
 * @param enabled - Whether to enable scroll tracking (default: true)
 *
 * @example
 * ```tsx
 * // In App.tsx or any page component
 * useScrollDepth([25, 50, 75, 100]);
 * ```
 */
export const useScrollDepth = (
  thresholds: number[] = [25, 50, 75, 100],
  enabled: boolean = true
): void => {
  const trackedThresholds = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      // Calculate scroll percentage
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = Math.round(
        ((scrollTop + windowHeight) / documentHeight) * 100
      );

      // Check each threshold
      thresholds.forEach(threshold => {
        if (
          scrollPercentage >= threshold &&
          !trackedThresholds.current.has(threshold)
        ) {
          // Mark as tracked
          trackedThresholds.current.add(threshold);

          // Send analytics event
          trackScrollDepth(threshold);

          if (import.meta.env.DEV) {
            console.log(`📊 Scroll Depth: ${threshold}% reached`);
          }
        }
      });
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add event listener
    window.addEventListener('scroll', throttledScroll, { passive: true });

    // Check initial scroll position
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [thresholds, enabled]);
};

export default useScrollDepth;
