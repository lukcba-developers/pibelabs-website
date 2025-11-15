import { useTranslation } from "react-i18next";

/* ============================================
   Type-Safe Translation Hook with Namespaces
   ============================================ */

// Available namespaces
export type Namespace =
  | "common"
  | "navigation"
  | "hero"
  | "company"
  | "stats"
  | "services"
  | "portfolio"
  | "about"
  | "blog"
  | "contact"
  | "footer"
  | "validation";

/**
 * Enhanced useTranslation hook with namespace support
 * @param ns - Namespace (defaults to 'common')
 */
export const useTypedTranslation = (ns: Namespace | Namespace[] = "common") => {
  const { t, i18n } = useTranslation(ns);

  return {
    t,
    i18n,
    currentLanguage: i18n.language,
    changeLanguage: (lang: string) => i18n.changeLanguage(lang),
  };
};

/**
 * Hook to get translations for a specific namespace
 * @param namespace - The namespace (e.g., 'navigation', 'hero', 'services')
 */
export const useNamespace = (namespace: Namespace) => {
  const { t } = useTranslation(namespace);
  return t;
};

/**
 * Legacy hook for backward compatibility
 * @deprecated Use useNamespace instead
 */
export const useTranslationSection = (section: string) => {
  const { t } = useTranslation(section as Namespace);
  return (key: string) => t(key);
};
