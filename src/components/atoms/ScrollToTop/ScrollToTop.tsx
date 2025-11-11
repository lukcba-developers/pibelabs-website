import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / height) * 100;

      setScrollProgress(progress);
      setIsVisible(scrolled > 300);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 rounded-full shadow-[0_0_30px_rgba(0,217,255,0.6)] hover:shadow-[0_0_50px_rgba(0,217,255,0.9)] transition-all flex items-center justify-center group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="26"
              fill="none"
              stroke="rgba(0, 217, 255, 0.2)"
              strokeWidth="2"
            />
            <circle
              cx="28"
              cy="28"
              r="26"
              fill="none"
              stroke="#00d9ff"
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 26}`}
              strokeDashoffset={`${2 * Math.PI * 26 * (1 - scrollProgress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          <ArrowUp
            className="text-white z-10 group-hover:animate-bounce"
            size={24}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
