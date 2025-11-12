import { useTranslation } from "react-i18next";
import type { TranslationResource } from "./types";

/* ============================================
   Type-Safe Translation Hook
   ============================================ */

type TranslationKey = keyof TranslationResource;
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TranslationPath = NestedKeyOf<TranslationResource>;

/**
 * Enhanced useTranslation hook with TypeScript support
 * Provides type-safe translation keys
 */
export const useTypedTranslation = () => {
  const { t, i18n } = useTranslation();

  return {
    t: t as (key: TranslationPath, options?: object) => string,
    i18n,
    currentLanguage: i18n.language,
    changeLanguage: (lang: string) => i18n.changeLanguage(lang),
  };
};

/**
 * Hook to get translations for a specific section
 * @param section - The section key (e.g., 'nav', 'hero', 'services')
 */
export const useTranslationSection = <K extends TranslationKey>(section: K) => {
  const { t } = useTranslation();

  return (key: string) => t(`${section}.${key}`);
};
