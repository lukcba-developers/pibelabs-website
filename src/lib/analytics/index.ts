/**
 * Analytics Module - Barrel Export
 *
 * Exports all analytics functions from googleAnalytics.ts
 * and provides backward compatibility with legacy code
 */

// Export everything from googleAnalytics
export * from "./googleAnalytics";

// Re-export initGA as default for backward compatibility
import { initGA as initGoogleAnalytics, sendEvent } from "./googleAnalytics";

export const initGA = initGoogleAnalytics;
export const trackEvent = sendEvent;

// Legacy analytics object for backward compatibility
export const analytics = {
  clickCTA: (name: string) => sendEvent("click_cta", { label: name }),
  formSubmit: (name: string) => sendEvent("form_submit", { label: name }),
  newsletterSignup: () => sendEvent("newsletter_signup"),
  viewProject: (name: string) => sendEvent("view_project", { label: name }),
  clickSocial: (platform: string) =>
    sendEvent("click_social", { label: platform }),
};

export default analytics;
