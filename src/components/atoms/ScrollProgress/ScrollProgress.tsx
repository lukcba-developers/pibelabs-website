import { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

/* ============================================
   Scroll Progress Indicator
   Shows reading progress at the top of the page
   ============================================ */

interface ScrollProgressProps {
  color?: string;
  height?: number;
  showPercentage?: boolean;
}

const ScrollProgress = ({
  color = 'from-cyan-500 to-magenta-500',
  height = 3,
  showPercentage = false,
}: ScrollProgressProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Smooth spring animation for progress
  const scrollYProgress = useSpring(scrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scaleX = useTransform(scrollYProgress, [0, 100], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const totalScrollableDistance = documentHeight - windowHeight;
      const progress = (scrollTop / totalScrollableDistance) * 100;

      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] pointer-events-none"
        style={{ height: `${height}px` }}
      >
        <motion.div
          className={`h-full bg-gradient-to-r ${color} shadow-[0_0_10px_rgba(0,217,255,0.6)]`}
          style={{
            scaleX,
            transformOrigin: '0%',
          }}
        />
      </motion.div>

      {/* Optional Percentage Display */}
      {showPercentage && scrollProgress > 5 && (
        <motion.div
          className="fixed top-20 right-4 z-[100] px-3 py-1.5 rounded-full bg-dark-primary/80 backdrop-blur-sm border border-cyan-neon/30 pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <span className="text-cyan-neon font-rajdhani font-bold text-sm">
            {Math.round(scrollProgress)}%
          </span>
        </motion.div>
      )}
    </>
  );
};

export default ScrollProgress;
