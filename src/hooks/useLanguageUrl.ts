import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { SupportedLanguage } from "@/lib/i18n";

/* ============================================
   useLanguageUrl Hook
   Syncs language with URL query params
   ============================================ */

export const useLanguageUrl = () => {
  const { i18n } = useTranslation();

  // Sync language changes to URL
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", lng);

      // Update URL without page reload
      window.history.replaceState({}, "", url.toString());
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  // Helper to change language and update URL
  const changeLanguage = async (lang: SupportedLanguage) => {
    await i18n.changeLanguage(lang);
  };

  // Helper to get shareable URL for a language
  const getLanguageUrl = (lang: SupportedLanguage): string => {
    const url = new URL(window.location.origin);
    url.searchParams.set("lang", lang);
    return url.toString();
  };

  return {
    changeLanguage,
    getLanguageUrl,
    currentLanguage: i18n.language as SupportedLanguage,
  };
};

export default useLanguageUrl;
