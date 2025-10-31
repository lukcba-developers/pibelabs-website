/* ============================================
   Analytics Utilities
   ============================================ */

import { CONFIG } from '@/lib/constants/config';

/**
 * Track page view
 */
export const trackPageView = (path: string) => {
  if (typeof window === 'undefined' || !CONFIG.analyticsId) return;
  
  // Google Analytics
  if (window.gtag) {
    window.gtag('config', CONFIG.analyticsId, {
      page_path: path,
    });
  }
};

/**
 * Track custom event
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window === 'undefined' || !CONFIG.analyticsId) return;
  
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

/**
 * Track form submission
 */
export const trackFormSubmit = (formName: string, success: boolean) => {
  trackEvent(
    success ? 'form_submit_success' : 'form_submit_error',
    'forms',
    formName
  );
};

/**
 * Track button click
 */
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('button_click', 'engagement', `${location}:${buttonName}`);
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', 'engagement', `${depth}%`, depth);
};

/**
 * Initialize analytics
 */
export const initAnalytics = () => {
  if (typeof window === 'undefined' || !CONFIG.analyticsId) return;
  
  // Load Google Analytics script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.analyticsId}`;
  script.async = true;
  document.head.appendChild(script);
  
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', CONFIG.analyticsId);
};

// Type augmentation for window object
declare global {
  interface Window {
    dataLayer: unknown[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void;
  }
}
