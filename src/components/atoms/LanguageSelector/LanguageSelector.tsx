import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import type { SupportedLanguage } from "@/lib/i18n";

/* ============================================
   Language Selector Component
   ============================================ */

const languages: { code: SupportedLanguage; label: string; flag: string }[] = [
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "en", label: "English", flag: "🇺🇸" },
];

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex items-center gap-2">
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`
            px-3 py-1.5 rounded-lg text-sm font-medium transition-all
            ${
              i18n.language === lang.code
                ? "bg-cyan-neon/20 text-cyan-neon border border-cyan-neon/30"
                : "bg-dark-secondary/50 text-white/60 border border-white/10 hover:text-white hover:border-white/20"
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="mr-1.5">{lang.flag}</span>
          {lang.label}
        </motion.button>
      ))}
    </div>
  );
};
