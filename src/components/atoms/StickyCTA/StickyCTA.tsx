import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

/* ============================================
   Sticky CTA Component
   Mobile-first floating CTA for conversion optimization
   ============================================ */

interface StickyCTAProps {
  text?: string;
  ctaText?: string;
  onAction?: () => void;
  scrollThreshold?: number;
  showOnMobileOnly?: boolean;
}

const StickyCTA = ({
  text,
  ctaText,
  onAction,
  scrollThreshold = 300,
  showOnMobileOnly = true,
}: StickyCTAProps) => {
  const { t } = useTranslation("common");

  const displayText = text || t("readyToStart");
  const displayCtaText = ctaText || t("scheduleConsultation");
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > scrollThreshold;
      setIsVisible(scrolled && !isDismissed);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold, isDismissed]);

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else {
      // Default action: scroll to contact
      const element = document.querySelector("#contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`
            fixed bottom-0 left-0 right-0 z-[90]
            ${showOnMobileOnly ? "md:hidden" : ""}
          `}
        >
          {/* Main CTA Bar */}
          <div className="relative bg-gradient-to-r from-dark-primary via-dark-secondary to-dark-primary border-t-2 border-cyan-neon/30 backdrop-blur-xl shadow-[0_-4px_30px_rgba(0,0,0,0.5)]">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-rajdhani font-semibold text-sm truncate">
                    {displayText}
                  </p>
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={handleAction}
                  className="
                    flex-shrink-0 px-5 py-2.5
                    bg-gradient-to-r from-cyan-500 to-magenta-500
                    hover:from-cyan-400 hover:to-magenta-400
                    text-white font-rajdhani font-bold text-sm
                    rounded-lg
                    shadow-[0_0_20px_rgba(0,217,255,0.6)]
                    transition-all duration-300
                  "
                  whileTap={{ scale: 0.95 }}
                >
                  {displayCtaText} →
                </motion.button>

                {/* Dismiss Button */}
                <motion.button
                  onClick={handleDismiss}
                  className="
                    flex-shrink-0 w-8 h-8
                    flex items-center justify-center
                    text-gray-400 hover:text-white
                    transition-colors
                  "
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={t("close")}
                >
                  <X size={18} />
                </motion.button>
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none" />
          </div>

          {/* Bottom safe area for iOS */}
          <div className="h-safe-area-inset-bottom bg-dark-primary" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
