import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import all namespaces
import esCommon from "./locales/es/common.json";
import esNavigation from "./locales/es/navigation.json";
import esHero from "./locales/es/hero.json";
import esCompany from "./locales/es/company.json";
import esStats from "./locales/es/stats.json";
import esServices from "./locales/es/services.json";
import esPortfolio from "./locales/es/portfolio.json";
import esAbout from "./locales/es/about.json";
import esBlog from "./locales/es/blog.json";
import esContact from "./locales/es/contact.json";
import esFooter from "./locales/es/footer.json";
import esValidation from "./locales/es/validation.json";

import enCommon from "./locales/en/common.json";
import enNavigation from "./locales/en/navigation.json";
import enHero from "./locales/en/hero.json";
import enCompany from "./locales/en/company.json";
import enStats from "./locales/en/stats.json";
import enServices from "./locales/en/services.json";
import enPortfolio from "./locales/en/portfolio.json";
import enAbout from "./locales/en/about.json";
import enBlog from "./locales/en/blog.json";
import enContact from "./locales/en/contact.json";
import enFooter from "./locales/en/footer.json";
import enValidation from "./locales/en/validation.json";

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
  es: {
    common: esCommon,
    navigation: esNavigation,
    hero: esHero,
    company: esCompany,
    stats: esStats,
    services: esServices,
    portfolio: esPortfolio,
    about: esAbout,
    blog: esBlog,
    contact: esContact,
    footer: esFooter,
    validation: esValidation,
  },
  en: {
    common: enCommon,
    navigation: enNavigation,
    hero: enHero,
    company: enCompany,
    stats: enStats,
    services: enServices,
    portfolio: enPortfolio,
    about: enAbout,
    blog: enBlog,
    contact: enContact,
    footer: enFooter,
    validation: enValidation,
  },
};

// Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS: "common",
    ns: [
      "common",
      "navigation",
      "hero",
      "company",
      "stats",
      "services",
      "portfolio",
      "about",
      "blog",
      "contact",
      "footer",
      "validation",
    ],
    fallbackNS: "common",
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
      order: ["querystring", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupQuerystring: "lang",
      lookupLocalStorage: "pibelabs-language",
      lookupFromPathIndex: 0,
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
