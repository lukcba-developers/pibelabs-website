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

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      if (lng !== currentLang) {
        setCurrentLang(lng);
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
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{
          duration: 0.2,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{ willChange: "opacity, transform" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default LanguageTransition;
