/**
 * Google Analytics 4 (GA4) Integration
 *
 * Este archivo proporciona funciones para enviar eventos a Google Analytics 4
 * y trackear conversiones del formulario de contacto
 *
 * @author PibeLabs
 * @version 1.0.0
 */

// ============================================
// TIPOS
// ============================================

export interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

export interface GAPageView {
  page_title: string;
  page_location: string;
  page_path: string;
}

export interface GAConversion {
  transaction_id?: string;
  value?: number;
  currency?: string;
  [key: string]: unknown;
}

// ============================================
// VERIFICAR SI GA ESTÁ DISPONIBLE
// ============================================

/**
 * Verifica si Google Analytics está cargado y disponible
 */
export const isGAAvailable = (): boolean => {
  return typeof window !== "undefined" && typeof window.gtag === "function";
};

/**
 * Obtiene el Measurement ID desde las variables de entorno
 */
export const getGAMeasurementId = (): string | null => {
  return import.meta.env.VITE_GA_MEASUREMENT_ID || null;
};

// ============================================
// INICIALIZACIÓN
// ============================================

/**
 * Inicializa Google Analytics 4
 * Llamar una sola vez al cargar la aplicación
 */
export const initGA = (measurementId?: string): void => {
  const id = measurementId || getGAMeasurementId();

  if (!id) {
    console.warn("Google Analytics Measurement ID not configured");
    return;
  }

  if (typeof window === "undefined") {
    return; // No ejecutar en SSR
  }

  // Crear script tag para GA4
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  script.async = true;
  document.head.appendChild(script);

  // Inicializar gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", id, {
    send_page_view: true,
    cookie_flags: "SameSite=None;Secure", // Para cumplir con GDPR
  });

  console.log("Google Analytics initialized:", id);
};

// ============================================
// PAGE VIEWS
// ============================================

/**
 * Envía un pageview a Google Analytics
 */
export const sendPageView = (data: Partial<GAPageView> = {}): void => {
  if (!isGAAvailable()) {
    console.warn("Google Analytics not available");
    return;
  }

  const pageData: GAPageView = {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname,
    ...data,
  };

  window.gtag("event", "page_view", pageData);

  if (import.meta.env.DEV) {
    console.log("GA Page View:", pageData);
  }
};

// ============================================
// EVENTOS GENERALES
// ============================================

/**
 * Envía un evento personalizado a Google Analytics
 */
export const sendEvent = (
  eventName: string,
  eventParams: Record<string, unknown> = {},
): void => {
  if (!isGAAvailable()) {
    console.warn("Google Analytics not available");
    return;
  }

  window.gtag("event", eventName, eventParams);

  if (import.meta.env.DEV) {
    console.log("GA Event:", eventName, eventParams);
  }
};

/**
 * Envía un evento con estructura clásica (category, action, label)
 */
export const sendGAEvent = ({
  action,
  category,
  label,
  value,
  ...rest
}: GAEvent): void => {
  const eventParams = {
    event_category: category,
    event_label: label,
    value: value,
    ...rest,
  };

  sendEvent(action, eventParams);
};

// ============================================
// EVENTOS DE FORMULARIO DE CONTACTO
// ============================================

/**
 * Trackea cuando un usuario empieza a llenar el formulario
 */
export const trackFormStart = (formName: string = "contact_form"): void => {
  sendEvent("form_start", {
    form_name: formName,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Trackea cuando un usuario completa un campo del formulario
 */
export const trackFormFieldComplete = (
  fieldName: string,
  formName: string = "contact_form",
): void => {
  sendEvent("form_field_complete", {
    form_name: formName,
    field_name: fieldName,
  });
};

/**
 * Trackea errores de validación en el formulario
 */
export const trackFormError = (
  fieldName: string,
  errorMessage: string,
  formName: string = "contact_form",
): void => {
  sendEvent("form_error", {
    form_name: formName,
    field_name: fieldName,
    error_message: errorMessage,
  });
};

/**
 * Trackea el envío del formulario (intento)
 */
export const trackFormSubmit = (
  formData: Record<string, unknown>,
  formName: string = "contact_form",
): void => {
  sendEvent("form_submit", {
    form_name: formName,
    service: formData.service || "unknown",
    timestamp: new Date().toISOString(),
  });
};

/**
 * Trackea el éxito del envío del formulario (CONVERSIÓN)
 */
export const trackFormSuccess = (
  formData: Record<string, unknown>,
  formName: string = "contact_form",
): void => {
  // Evento de conversión principal
  sendEvent("generate_lead", {
    currency: "USD",
    value: 100, // Valor estimado del lead (ajustar según tu negocio)
    form_name: formName,
    service: formData.service || "unknown",
    lead_source: "website",
  });

  // Evento personalizado adicional
  sendEvent("form_submission_success", {
    form_name: formName,
    service: formData.service,
    timestamp: new Date().toISOString(),
  });

  if (import.meta.env.DEV) {
    console.log("✅ Lead conversion tracked:", formData);
  }
};

/**
 * Trackea el fallo del envío del formulario
 */
export const trackFormFailure = (
  errorMessage: string,
  formName: string = "contact_form",
): void => {
  sendEvent("form_submission_failure", {
    form_name: formName,
    error_message: errorMessage,
    timestamp: new Date().toISOString(),
  });
};

// ============================================
// EVENTOS DE INTERACCIÓN
// ============================================

/**
 * Trackea clics en botones o enlaces importantes
 */
export const trackButtonClick = (
  buttonName: string,
  buttonLocation: string,
): void => {
  sendEvent("button_click", {
    button_name: buttonName,
    button_location: buttonLocation,
  });
};

/**
 * Trackea clics en enlaces externos
 */
export const trackExternalLink = (url: string, linkText: string): void => {
  sendEvent("click", {
    event_category: "outbound",
    event_label: linkText,
    link_url: url,
  });
};

/**
 * Trackea clics en CTAs (Call to Action)
 */
export const trackCTAClick = (ctaName: string, ctaLocation: string): void => {
  sendEvent("cta_click", {
    cta_name: ctaName,
    cta_location: ctaLocation,
  });
};

/**
 * Trackea scroll depth (qué tan abajo llega el usuario)
 */
export const trackScrollDepth = (percentage: number): void => {
  sendEvent("scroll", {
    event_category: "engagement",
    event_label: `${percentage}%`,
    value: percentage,
  });
};

// ============================================
// EVENTOS DE NAVEGACIÓN
// ============================================

/**
 * Trackea navegación entre secciones (para SPAs)
 */
export const trackSectionView = (sectionName: string): void => {
  sendEvent("section_view", {
    section_name: sectionName,
  });
};

/**
 * Trackea tiempo en la página
 */
export const trackTimeOnPage = (seconds: number, pageName: string): void => {
  sendEvent("time_on_page", {
    event_category: "engagement",
    event_label: pageName,
    value: seconds,
  });
};

// ============================================
// EVENTOS DE PORTAFOLIO/BLOG
// ============================================

/**
 * Trackea visualización de un proyecto del portafolio
 */
export const trackPortfolioView = (
  projectId: string,
  projectName: string,
): void => {
  sendEvent("view_item", {
    item_id: projectId,
    item_name: projectName,
    item_category: "portfolio",
  });
};

/**
 * Trackea lectura de un post del blog
 */
export const trackBlogPostView = (postId: string, postTitle: string): void => {
  sendEvent("view_item", {
    item_id: postId,
    item_name: postTitle,
    item_category: "blog",
  });
};

// ============================================
// EVENTOS DE WHATSAPP/EMAIL
// ============================================

/**
 * Trackea clic en botón de WhatsApp
 */
export const trackWhatsAppClick = (location: string = "unknown"): void => {
  sendEvent("contact_whatsapp", {
    contact_method: "whatsapp",
    location: location,
  });
};

/**
 * Trackea clic en email
 */
export const trackEmailClick = (location: string = "unknown"): void => {
  sendEvent("contact_email", {
    contact_method: "email",
    location: location,
  });
};

// ============================================
// USER PROPERTIES
// ============================================

/**
 * Establece propiedades del usuario
 */
export const setUserProperties = (
  properties: Record<string, unknown>,
): void => {
  if (!isGAAvailable()) {
    return;
  }

  window.gtag("set", "user_properties", properties);
};

/**
 * Establece el ID del usuario
 */
export const setUserId = (userId: string): void => {
  if (!isGAAvailable()) {
    return;
  }

  window.gtag("config", getGAMeasurementId() || "", {
    user_id: userId,
  });
};

// ============================================
// TYPESCRIPT DEFINITIONS
// ============================================

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default {
  initGA,
  isGAAvailable,
  sendPageView,
  sendEvent,
  sendGAEvent,
  trackFormStart,
  trackFormFieldComplete,
  trackFormError,
  trackFormSubmit,
  trackFormSuccess,
  trackFormFailure,
  trackButtonClick,
  trackExternalLink,
  trackCTAClick,
  trackScrollDepth,
  trackSectionView,
  trackTimeOnPage,
  trackPortfolioView,
  trackBlogPostView,
  trackWhatsAppClick,
  trackEmailClick,
  setUserProperties,
  setUserId,
};
