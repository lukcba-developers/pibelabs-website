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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.15,
          ease: "easeInOut",
        }}
        style={{ willChange: "opacity" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default LanguageTransition;
