import { useEffect, useRef, useState } from "react";

/**
 * useInView Hook
 * Detects when an element enters the viewport using Intersection Observer
 *
 * @param options - IntersectionObserver options
 * @returns [ref, isInView] - Ref to attach to element and boolean indicating if in view
 *
 * @example
 * ```tsx
 * const [ref, isInView] = useInView({ threshold: 0.5 });
 *
 * return (
 *   <motion.div
 *     ref={ref}
 *     animate={isInView ? { opacity: 1 } : { opacity: 0 }}
 *   >
 *     Content
 *   </motion.div>
 * );
 * ```
 */
export const useInView = (options?: IntersectionObserverInit) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry) {
        setIsInView(entry.isIntersecting);
      }
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return [ref, isInView] as const;
};
