declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

export const initGA = () => {
  if (!GA_MEASUREMENT_ID) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function() { window.dataLayer?.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);
};

export const trackEvent = (action: string, params?: Record<string, unknown>) => {
  if (!window.gtag) return;
  window.gtag('event', action, params);
};

export const analytics = {
  clickCTA: (name: string) => trackEvent('click_cta', { label: name }),
  formSubmit: (name: string) => trackEvent('form_submit', { label: name }),
  newsletterSignup: () => trackEvent('newsletter_signup'),
  viewProject: (name: string) => trackEvent('view_project', { label: name }),
  clickSocial: (platform: string) => trackEvent('click_social', { label: platform }),
};

export default analytics;
