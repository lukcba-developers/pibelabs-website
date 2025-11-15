/* ============================================
   i18n TypeScript Types
   ============================================ */

export interface TranslationResource {
  nav: {
    home: string;
    services: string;
    portfolio: string;
    about: string;
    blog: string;
    contact: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
    ctaSecondary: string;
  };
  company: {
    name: string;
    tagline: string;
    description: string;
  };
  stats: {
    projects: string;
    retention: string;
    mvp: string;
  };
  services: {
    title: string;
    subtitle: string;
    webDev: ServiceItem;
    ai: ServiceItem;
    uiux: ServiceItem;
    cloud: ServiceItem;
  };
  portfolio: {
    title: string;
    subtitle: string;
    viewProject: string;
    categories: {
      all: string;
      web: string;
      mobile: string;
      ai: string;
      design: string;
    };
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    values: {
      quality: ValueItem;
      agile: ValueItem;
      transparency: ValueItem;
    };
    team: {
      title: string;
      founders: string;
    };
  };
  blog: {
    title: string;
    subtitle: string;
    readMore: string;
    readTime: string;
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      message: string;
      service: string;
      servicePlaceholder: string;
      submit: string;
      submitting: string;
      success: string;
      error: string;
    };
    validation: {
      nameRequired: string;
      nameMin: string;
      emailRequired: string;
      emailInvalid: string;
      emailDisposable: string;
      messageRequired: string;
      messageMin: string;
      messageMax: string;
      serviceRequired: string;
    };
    info: {
      email: string;
      phone: string;
      location: string;
      whatsapp: string;
    };
  };
  footer: {
    tagline: string;
    rights: string;
    links: {
      services: string;
      portfolio: string;
      about: string;
      blog: string;
      contact: string;
    };
    social: string;
  };
  common: {
    learnMore: string;
    contactUs: string;
    loading: string;
    error: string;
    success: string;
  };
}

interface ServiceItem {
  title: string;
  description: string;
  features: string[];
}

interface ValueItem {
  title: string;
  description: string;
}

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
  | "validation"
  | "newsletter"
  | "faq"
  | "cookies";
