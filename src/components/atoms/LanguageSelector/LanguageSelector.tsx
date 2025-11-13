import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import type { SupportedLanguage } from "@/lib/i18n";

/* ============================================
   Language Selector Component - Enhanced
   ============================================ */

const languages: {
  code: SupportedLanguage;
  label: string;
  flag: string;
  nativeName: string;
}[] = [
  { code: "es", label: "Español", flag: "🇪🇸", nativeName: "Español" },
  { code: "en", label: "English", flag: "🇺🇸", nativeName: "English" },
];

interface LanguageSelectorProps {
  variant?: "default" | "compact";
}

export const LanguageSelector = ({
  variant = "default",
}: LanguageSelectorProps) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0]!;

  const handleLanguageChange = async (lang: SupportedLanguage) => {
    setIsLoading(true);

    // Change language
    await i18n.changeLanguage(lang);
    document.documentElement.lang = lang;

    // Micro-delay for visual feedback
    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(false);
    }, 200);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            disabled={isLoading}
            className={`
              relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all
              ${
                i18n.language === lang.code
                  ? "bg-cyan-neon/20 text-cyan-neon border border-cyan-neon/30"
                  : "bg-dark-secondary/50 text-white/60 border border-white/10 hover:text-white hover:border-white/20"
              }
              ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
            `}
            whileHover={!isLoading ? { scale: 1.05 } : {}}
            whileTap={!isLoading ? { scale: 0.95 } : {}}
            aria-label={`Change language to ${lang.label}`}
          >
            <motion.span
              className="mr-1.5 inline-block"
              animate={{
                scale: i18n.language === lang.code ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
            >
              {lang.flag}
            </motion.span>
            {lang.label}
            {isLoading && i18n.language !== lang.code && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-dark-secondary/80 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-4 h-4 border-2 border-cyan-neon border-t-transparent rounded-full animate-spin" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    );
  }

  return (
    <Tooltip.Provider delayDuration={300}>
      <div className="relative" ref={dropdownRef}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-secondary/50 border border-white/10 hover:border-cyan-neon/30 transition-all text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Select language"
              aria-expanded={isOpen}
            >
              <Globe className="w-4 h-4 text-cyan-neon" />
              <motion.span
                className="text-sm font-medium inline-block"
                key={currentLanguage.code}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.3 }}
              >
                {currentLanguage.flag}
              </motion.span>
              <span className="text-sm font-medium hidden sm:inline">
                {currentLanguage.nativeName}
              </span>
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </motion.button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className="px-3 py-2 bg-dark-secondary/95 text-white text-sm rounded-lg shadow-xl border border-cyan-neon/20 backdrop-blur-sm z-50"
              sideOffset={5}
            >
              {t("common.changeLanguage")}
              <Tooltip.Arrow className="fill-dark-secondary" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute right-0 mt-2 w-48 bg-dark-secondary border border-cyan-neon/20 rounded-lg shadow-lg shadow-cyan-neon/10 overflow-hidden z-50"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  disabled={isLoading}
                  className={`
                  relative w-full flex items-center gap-3 px-4 py-3 text-left transition-colors
                  ${
                    i18n.language === lang.code
                      ? "bg-cyan-neon/10 text-cyan-neon"
                      : "text-white hover:bg-white/5"
                  }
                  ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                `}
                  whileHover={!isLoading ? { x: 4 } : {}}
                  aria-label={`Change language to ${lang.label}`}
                >
                  <motion.span
                    className="text-xl inline-block"
                    animate={{
                      scale: i18n.language === lang.code ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    {lang.flag}
                  </motion.span>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">
                      {lang.nativeName}
                    </span>
                    <span className="text-xs text-gray-400">{lang.label}</span>
                  </div>
                  {isLoading && i18n.language !== lang.code ? (
                    <div className="w-4 h-4 ml-auto border-2 border-cyan-neon border-t-transparent rounded-full animate-spin" />
                  ) : (
                    i18n.language === lang.code && (
                      <motion.svg
                        className="w-4 h-4 ml-auto text-cyan-neon"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </motion.svg>
                    )
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Tooltip.Provider>
  );
};
