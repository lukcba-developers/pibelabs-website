import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { SupportedLanguage } from "@/lib/i18n";

/* ============================================
   useSystemLanguage Hook
   Detects system language changes
   ============================================ */

interface UseSystemLanguageOptions {
  enabled?: boolean;
  showPrompt?: boolean;
}

export const useSystemLanguage = (options: UseSystemLanguageOptions = {}) => {
  const { enabled = true, showPrompt = true } = options;
  const { i18n, t } = useTranslation();

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const handleLanguageChange = () => {
      // Get new system language
      const systemLang = navigator.language.split("-")[0] as SupportedLanguage;

      // Check if it's different from current
      if (
        systemLang !== i18n.language &&
        (systemLang === "es" || systemLang === "en")
      ) {
        if (showPrompt) {
          // Show a native prompt
          const languageNames = {
            es: "español",
            en: "English",
          };

          const message =
            i18n.language === "es"
              ? `Detectamos que cambiaste el idioma del sistema a ${languageNames[systemLang]}. ¿Quieres cambiar el idioma de la página?`
              : `We detected you changed your system language to ${languageNames[systemLang]}. Would you like to change the page language?`;

          if (window.confirm(message)) {
            i18n.changeLanguage(systemLang);
          }
        } else {
          // Auto-change without prompt
          i18n.changeLanguage(systemLang);
        }
      }
    };

    // Listen to languagechange event (experimental)
    window.addEventListener("languagechange", handleLanguageChange);

    return () => {
      window.removeEventListener("languagechange", handleLanguageChange);
    };
  }, [enabled, showPrompt, i18n, t]);
};

export default useSystemLanguage;
