/* ============================================
   SEO Configuration
   ============================================ */

export const SEO_CONFIG = {
  title: 'PibeLabs - Innovación Tecnológica',
  titleTemplate: '%s | PibeLabs',
  description: 'Estudio de innovación tecnológica especializado en desarrollo web, mobile y soluciones cloud. Transformamos ideas en productos digitales exitosos.',
  keywords: [
    'desarrollo web',
    'desarrollo mobile',
    'cloud computing',
    'transformación digital',
    'innovación tecnológica',
    'software a medida',
    'consultoria tecnológica',
    'argentina',
  ],
  author: 'PibeLabs',
  siteUrl: 'https://pibelabs.com',
  image: '/og-image.jpg',
  twitterHandle: '@pibelabs',
  
  // Open Graph
  ogType: 'website',
  ogLocale: 'es_AR',
  
  // JSON-LD Schema
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PibeLabs',
    url: 'https://pibelabs.com',
    logo: 'https://pibelabs.com/logo.png',
    description: 'Estudio de innovación tecnológica',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AR',
    },
    sameAs: [
      'https://twitter.com/pibelabs',
      'https://linkedin.com/company/pibelabs',
      'https://github.com/pibelabs',
    ],
  },
} as const;

/**
 * Generate page-specific SEO metadata
 */
export const generateSEO = (page?: {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string[];
}) => ({
  title: page?.title 
    ? `${page.title} | PibeLabs` 
    : SEO_CONFIG.title,
  description: page?.description || SEO_CONFIG.description,
  image: page?.image || SEO_CONFIG.image,
  keywords: page?.keywords 
    ? [...SEO_CONFIG.keywords, ...page.keywords].join(', ')
    : SEO_CONFIG.keywords.join(', '),
});
