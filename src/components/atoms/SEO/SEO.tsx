import { useEffect } from 'react';
import { SEO_CONFIG } from '@/lib/constants/seo';

/* ============================================
   SEO Component (Atom)
   ============================================ */

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({
  title,
  description = SEO_CONFIG.description,
  keywords,
  image = SEO_CONFIG.image,
  url = SEO_CONFIG.siteUrl,
  type = SEO_CONFIG.ogType,
}: SEOProps) => {
  const pageTitle = title ? `${title} | PibeLabs` : SEO_CONFIG.title;
  const metaKeywords = keywords 
    ? [...SEO_CONFIG.keywords, ...keywords].join(', ')
    : SEO_CONFIG.keywords.join(', ');

  useEffect(() => {
    // Update document title
    document.title = pageTitle;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', metaKeywords);
    updateMetaTag('author', SEO_CONFIG.author);

    // Open Graph
    updateMetaTag('og:title', pageTitle, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', image, 'property');
    updateMetaTag('og:url', url, 'property');
    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:locale', SEO_CONFIG.ogLocale, 'property');

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', SEO_CONFIG.twitterHandle);
    updateMetaTag('twitter:title', pageTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // JSON-LD
    let jsonLd = document.querySelector('#json-ld');
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.setAttribute('type', 'application/ld+json');
      jsonLd.setAttribute('id', 'json-ld');
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify(SEO_CONFIG.organization);
  }, [pageTitle, description, metaKeywords, image, url, type]);

  return null;
};

export default SEO;
