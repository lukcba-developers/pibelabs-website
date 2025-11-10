import { useEffect } from 'react';
import { SEO_CONFIG } from '@/lib/constants/config';

/* ============================================
   Enhanced SEO Component (Atom) - Sprint 5
   Includes: Meta Tags, Open Graph, Twitter Cards,
   JSON-LD Structured Data, and Performance hints
   ============================================ */

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

const SEO = ({
  title,
  description = SEO_CONFIG.description,
  keywords,
  image = SEO_CONFIG.image,
  url = SEO_CONFIG.siteUrl,
  type = SEO_CONFIG.ogType,
  article,
}: SEOProps) => {
  const pageTitle = title ? `${title} | PibeLabs` : SEO_CONFIG.title;
  const metaKeywords = keywords
    ? [...SEO_CONFIG.keywords, ...keywords].join(', ')
    : SEO_CONFIG.keywords.join(', ');

  useEffect(() => {
    // Update document title
    document.title = pageTitle;

    // Helper to update meta tags
    const updateMetaTag = (name: string, content: string, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // ============================================
    // BASIC META TAGS
    // ============================================
    updateMetaTag('description', description);
    updateMetaTag('keywords', metaKeywords);
    updateMetaTag('author', SEO_CONFIG.author);
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMetaTag('googlebot', 'index, follow');

    // Language and region
    updateMetaTag('language', 'es-AR');
    updateMetaTag('geo.region', 'AR-X');
    updateMetaTag('geo.placename', 'Despeñaderos, Córdoba');

    // Mobile optimization
    updateMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=5');
    updateMetaTag('theme-color', '#0a0e27');
    updateMetaTag('color-scheme', 'light dark');

    // ============================================
    // OPEN GRAPH (Facebook, LinkedIn)
    // ============================================
    updateMetaTag('og:title', pageTitle, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', image, 'property');
    updateMetaTag('og:image:alt', `${pageTitle} - PibeLabs`, 'property');
    updateMetaTag('og:image:width', '1200', 'property');
    updateMetaTag('og:image:height', '630', 'property');
    updateMetaTag('og:url', url, 'property');
    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:locale', SEO_CONFIG.ogLocale, 'property');
    updateMetaTag('og:site_name', 'PibeLabs', 'property');

    // Article-specific OG tags
    if (article && type === 'article') {
      if (article.publishedTime) {
        updateMetaTag('article:published_time', article.publishedTime, 'property');
      }
      if (article.modifiedTime) {
        updateMetaTag('article:modified_time', article.modifiedTime, 'property');
      }
      if (article.author) {
        updateMetaTag('article:author', article.author, 'property');
      }
      if (article.section) {
        updateMetaTag('article:section', article.section, 'property');
      }
      if (article.tags) {
        article.tags.forEach(tag => {
          updateMetaTag('article:tag', tag, 'property');
        });
      }
    }

    // ============================================
    // TWITTER CARD
    // ============================================
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', SEO_CONFIG.twitterHandle);
    updateMetaTag('twitter:creator', SEO_CONFIG.twitterHandle);
    updateMetaTag('twitter:title', pageTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:image:alt', `${pageTitle} - PibeLabs`);

    // ============================================
    // CANONICAL URL
    // ============================================
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // ============================================
    // JSON-LD STRUCTURED DATA
    // ============================================

    // Organization Schema
    let orgSchema = document.querySelector('#org-schema');
    if (!orgSchema) {
      orgSchema = document.createElement('script');
      orgSchema.setAttribute('type', 'application/ld+json');
      orgSchema.setAttribute('id', 'org-schema');
      document.head.appendChild(orgSchema);
    }
    orgSchema.textContent = JSON.stringify(SEO_CONFIG.organization);

    // WebSite Schema
    let websiteSchema = document.querySelector('#website-schema');
    if (!websiteSchema) {
      websiteSchema = document.createElement('script');
      websiteSchema.setAttribute('type', 'application/ld+json');
      websiteSchema.setAttribute('id', 'website-schema');
      document.head.appendChild(websiteSchema);
    }
    websiteSchema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'PibeLabs',
      url: SEO_CONFIG.siteUrl,
      description: description,
      inLanguage: 'es-AR',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SEO_CONFIG.siteUrl}/?s={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    });

    // LocalBusiness Schema
    let businessSchema = document.querySelector('#business-schema');
    if (!businessSchema) {
      businessSchema = document.createElement('script');
      businessSchema.setAttribute('type', 'application/ld+json');
      businessSchema.setAttribute('id', 'business-schema');
      document.head.appendChild(businessSchema);
    }
    businessSchema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'PibeLabs',
      image: image,
      '@id': SEO_CONFIG.siteUrl,
      url: SEO_CONFIG.siteUrl,
      telephone: '+54 351 3088400',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Despeñaderos',
        addressLocality: 'Córdoba',
        addressRegion: 'Córdoba',
        postalCode: '5721',
        addressCountry: 'AR'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -31.8167,
        longitude: -64.2833
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      },
      sameAs: [
        'https://linkedin.com/company/pibelabs',
        'https://github.com/pibelabs'
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '15'
      }
    });

    // BreadcrumbList Schema (if applicable)
    if (title) {
      let breadcrumbSchema = document.querySelector('#breadcrumb-schema');
      if (!breadcrumbSchema) {
        breadcrumbSchema = document.createElement('script');
        breadcrumbSchema.setAttribute('type', 'application/ld+json');
        breadcrumbSchema.setAttribute('id', 'breadcrumb-schema');
        document.head.appendChild(breadcrumbSchema);
      }
      breadcrumbSchema.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SEO_CONFIG.siteUrl
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: title,
            item: url
          }
        ]
      });
    }

    // ============================================
    // PERFORMANCE HINTS
    // ============================================

    // DNS Prefetch for external resources
    const addDnsPrefetch = (href: string) => {
      if (!document.querySelector(`link[rel="dns-prefetch"][href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = href;
        document.head.appendChild(link);
      }
    };

    addDnsPrefetch('https://www.googletagmanager.com');
    addDnsPrefetch('https://www.google-analytics.com');
    addDnsPrefetch('https://fonts.googleapis.com');
    addDnsPrefetch('https://fonts.gstatic.com');

  }, [title, pageTitle, description, metaKeywords, image, url, type, article]);

  return null;
};

export default SEO;
