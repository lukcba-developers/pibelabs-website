import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

const AnimatedCounter = ({
  end,
  start = 0,
  duration = 2000,
  suffix = "",
  prefix = "",
  className = "",
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(start);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      let startTime: number | null = null;

      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const currentCount = start + (end - start) * easeOut;

        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animateCount);
    }
  }, [isInView, hasAnimated, start, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {Math.floor(count)}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
