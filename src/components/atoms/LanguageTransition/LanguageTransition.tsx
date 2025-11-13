import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState, useEffect, ReactNode } from "react";

/* ============================================
   Language Transition Wrapper
   ============================================ */

interface LanguageTransitionProps {
  children: ReactNode;
}

export const LanguageTransition = ({ children }: LanguageTransitionProps) => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      if (lng !== currentLang) {
        setIsTransitioning(true);
        // Wait for fade out
        setTimeout(() => {
          setCurrentLang(lng);
          setIsTransitioning(false);
        }, 150);
      }
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n, currentLang]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentLang}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{
          duration: 0.2,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        style={{
          willChange: isTransitioning ? "opacity, transform" : "auto",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default LanguageTransition;
