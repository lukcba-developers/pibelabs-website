import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

/* ============================================
   Language Head - SEO Meta Tags for i18n
   ============================================ */

interface LanguageHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

export const LanguageHead = ({
  title,
  description,
  keywords,
  image = "/og-image.jpg",
}: LanguageHeadProps = {}) => {
  const { i18n } = useTranslation();
  const currentUrl =
    typeof window !== "undefined" ? window.location.href : "";
  const baseUrl =
    typeof window !== "undefined" ? window.location.origin : "";

  // Get language-specific content
  const locale = i18n.language === "es" ? "es_ES" : "en_US";
  const alternateLocale = i18n.language === "es" ? "en_US" : "es_ES";

  // Default titles and descriptions by language
  const defaultTitle =
    i18n.language === "es"
      ? "PibeLabs - Innovación Digital & Desarrollo Web"
      : "PibeLabs - Digital Innovation & Web Development";

  const defaultDescription =
    i18n.language === "es"
      ? "Desarrollamos soluciones digitales innovadoras con IA, Cloud y diseño UX/UI de vanguardia. Tu socio tecnológico para transformar ideas en productos excepcionales."
      : "We develop innovative digital solutions with AI, Cloud and cutting-edge UX/UI design. Your technology partner to transform ideas into exceptional products.";

  const defaultKeywords =
    i18n.language === "es"
      ? "desarrollo web, inteligencia artificial, diseño UX/UI, cloud computing, ciberseguridad, consultoría tecnológica"
      : "web development, artificial intelligence, UX/UI design, cloud computing, cybersecurity, technology consulting";

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={i18n.language} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />

      {/* Alternate Language URLs */}
      <link rel="alternate" hrefLang="es" href={`${baseUrl}/es/`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/en/`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/`} />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={`${baseUrl}${image}`} />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={alternateLocale} />
      <meta property="og:site_name" content="PibeLabs" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={`${baseUrl}${image}`} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content={i18n.language.toUpperCase()} />
      <meta httpEquiv="content-language" content={i18n.language} />
    </Helmet>
  );
};

export default LanguageHead;
