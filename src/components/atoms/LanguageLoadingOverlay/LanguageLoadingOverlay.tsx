import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Globe } from "lucide-react";

/* ============================================
   Language Loading Overlay
   ============================================ */

export const LanguageLoadingOverlay = () => {
  const { i18n } = useTranslation();
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleLanguageChanged = () => {
      setIsChanging(true);
      // Keep overlay visible for smooth transition
      timeout = setTimeout(() => {
        setIsChanging(false);
      }, 180);
    };

    i18n.on("languageChanged", handleLanguageChanged);

    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
      clearTimeout(timeout);
    };
  }, [i18n]);

  return (
    <AnimatePresence>
      {isChanging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-dark-primary/20 backdrop-blur-sm"
          style={{ pointerEvents: isChanging ? "all" : "none" }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center gap-3 bg-dark-secondary/95 backdrop-blur-md px-6 py-4 rounded-xl border border-cyan-neon/20 shadow-2xl"
          >
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="text-cyan-neon"
            >
              <Globe
                size={24}
                className="drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]"
              />
            </motion.div>
            <div className="flex items-center gap-2">
              <span className="text-white font-rajdhani font-medium">
                Actualizando idioma
              </span>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut",
                    }}
                    className="w-1 h-1 rounded-full bg-cyan-neon shadow-[0_0_4px_rgba(6,182,212,0.6)]"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LanguageLoadingOverlay;
