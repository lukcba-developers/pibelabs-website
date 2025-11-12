import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import es from "./locales/es.json";
import en from "./locales/en.json";

/* ============================================
   i18n Configuration - Enhanced
   ============================================ */

export const defaultLanguage = "es";
export const supportedLanguages = ["es", "en"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export const languageNames: Record<SupportedLanguage, string> = {
  es: "Español",
  en: "English",
};

export const languageFlags: Record<SupportedLanguage, string> = {
  es: "🇪🇸",
  en: "🇺🇸",
};

// Intelligent browser language detection with fallback mapping
const detectBrowserLanguage = (): SupportedLanguage => {
  if (typeof navigator === "undefined") return defaultLanguage;

  const browserLang = navigator.language.split("-")[0].toLowerCase();

  // Map related languages to supported ones
  const languageMap: Record<string, SupportedLanguage> = {
    es: "es",
    en: "en",
    pt: "es", // Portuguese → Spanish (closer culturally)
    fr: "en", // French → English
    de: "en", // German → English
    it: "es", // Italian → Spanish (closer culturally)
    ca: "es", // Catalan → Spanish
    gl: "es", // Galician → Spanish
    eu: "es", // Basque → Spanish
  };

  return languageMap[browserLang] || defaultLanguage;
};

const resources = {
  es: { translation: es },
  en: { translation: en },
};

// Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS: "translation",
    fallbackLng: defaultLanguage,
    supportedLngs: supportedLanguages,

    // Improve loading
    load: "languageOnly", // Only load 'es' instead of 'es-ES'

    // Interpolation options
    interpolation: {
      escapeValue: false, // React already escapes
      formatSeparator: ",",
    },

    // Detection options with intelligent fallback
    detection: {
      order: ["localStorage", "navigator", "htmlTag", "path", "subdomain"],
      caches: ["localStorage"],
      lookupLocalStorage: "pibelabs-language",
      lookupFromPathIndex: 0,
      checkWhitelist: true,
      // Custom converter for intelligent language detection
      convertDetectedLanguage: (lng: string) => {
        const detected = lng.split("-")[0].toLowerCase();
        const languageMap: Record<string, SupportedLanguage> = {
          es: "es",
          en: "en",
          pt: "es",
          fr: "en",
          de: "en",
          it: "es",
          ca: "es",
          gl: "es",
          eu: "es",
        };
        return languageMap[detected] || defaultLanguage;
      },
    },

    // React options
    react: {
      useSuspense: false,
      bindI18n: "languageChanged loaded",
      bindI18nStore: "added removed",
      transEmptyNodeValue: "",
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
    },

    // Performance
    saveMissing: import.meta.env.DEV,
    missingKeyHandler: (lng, ns, key) => {
      if (import.meta.env.DEV) {
        console.warn(`Missing translation key: ${key} for language: ${lng}`);
      }
    },
  });

// Update HTML lang attribute on language change
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;
