import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState, useEffect, ReactNode } from "react";

/* ============================================
   Language Transition Wrapper
   ============================================ */

interface LanguageTransitionProps {
  children: ReactNode;
}

export const LanguageTransition = ({
  children,
}: LanguageTransitionProps) => {
  const { i18n } = useTranslation();
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const handleLanguageChange = () => {
      setIsChanging(true);

      // Reset after animation completes
      setTimeout(() => {
        setIsChanging(false);
      }, 300);
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  return (
    <motion.div
      animate={{
        opacity: isChanging ? 0.7 : 1,
        scale: isChanging ? 0.98 : 1,
      }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default LanguageTransition;
