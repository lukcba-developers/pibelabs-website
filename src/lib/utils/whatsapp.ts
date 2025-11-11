import { COMPANY_INFO } from "@/lib/constants/config";

/* ============================================
   WhatsApp Utilities
   ============================================
   Funciones para crear enlaces y mensajes de WhatsApp
   basadas en diferentes contextos de negocio.
   ============================================ */

/**
 * Crea un enlace de WhatsApp con mensaje pre-rellenado
 * @param message - Mensaje a enviar
 * @param phoneNumber - Número de teléfono (opcional, usa el de COMPANY_INFO por defecto)
 * @returns URL de WhatsApp formateada
 */
export const createWhatsAppLink = (
  message: string,
  phoneNumber: string = COMPANY_INFO.whatsapp,
): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

/**
 * Abre WhatsApp en una nueva ventana con un mensaje pre-rellenado
 * @param message - Mensaje a enviar
 * @param phoneNumber - Número de teléfono (opcional)
 */
export const openWhatsApp = (message: string, phoneNumber?: string): void => {
  const link = createWhatsAppLink(message, phoneNumber);
  window.open(link, "_blank", "noopener,noreferrer");
};

/**
 * Crea un mensaje de contacto general
 * @returns Mensaje formateado
 */
export const createGeneralContactMessage = (): string => {
  return `¡Hola! Me gustaría ponerme en contacto con ${COMPANY_INFO.name} para conocer más sobre sus servicios.`;
};

/**
 * Crea un mensaje para consulta sobre un servicio específico
 * @param serviceName - Nombre del servicio
 * @returns Mensaje formateado
 */
export const createServiceInquiryMessage = (serviceName: string): string => {
  return `¡Hola! Me interesa conocer más sobre el servicio de *${serviceName}* que ofrece ${COMPANY_INFO.name}. ¿Podrían darme más información?`;
};

/**
 * Crea un mensaje para solicitar una cotización
 * @param serviceName - Nombre del servicio (opcional)
 * @param projectDetails - Detalles del proyecto (opcional)
 * @returns Mensaje formateado
 */
export const createQuoteRequestMessage = (
  serviceName?: string,
  projectDetails?: string,
): string => {
  let message = `¡Hola! Me gustaría solicitar una cotización${serviceName ? ` para el servicio de *${serviceName}*` : ""}.`;

  if (projectDetails) {
    message += `\n\n*Detalles del proyecto:*\n${projectDetails}`;
  }

  return message;
};

/**
 * Crea un mensaje para consulta sobre portfolio/proyecto
 * @param projectName - Nombre del proyecto
 * @returns Mensaje formateado
 */
export const createPortfolioInquiryMessage = (projectName: string): string => {
  return `¡Hola! Vi el proyecto *${projectName}* en su portfolio y me gustaría saber más detalles al respecto.`;
};

/**
 * Crea un mensaje para consulta sobre el equipo/hiring
 * @param position - Posición de interés (opcional)
 * @returns Mensaje formateado
 */
export const createTeamInquiryMessage = (position?: string): string => {
  if (position) {
    return `¡Hola! Estoy interesado/a en unirme al equipo de ${COMPANY_INFO.name} como *${position}*. ¿Podrían darme más información?`;
  }
  return `¡Hola! Me gustaría conocer más sobre oportunidades para unirme al equipo de ${COMPANY_INFO.name}.`;
};

/**
 * Crea un mensaje personalizado desde el formulario de contacto
 * @param formData - Datos del formulario
 * @returns Mensaje formateado
 */
export const createContactFormMessage = (formData: {
  name: string;
  email: string;
  service?: string;
  message: string;
}): string => {
  let whatsappMessage = `*Nuevo contacto desde la web*\n\n`;
  whatsappMessage += `*Nombre:* ${formData.name}\n`;
  whatsappMessage += `*Email:* ${formData.email}\n`;

  if (formData.service) {
    whatsappMessage += `*Servicio de interés:* ${formData.service}\n`;
  }

  whatsappMessage += `\n*Mensaje:*\n${formData.message}`;

  return whatsappMessage;
};

/**
 * Crea un mensaje para seguimiento de blog post
 * @param blogTitle - Título del post
 * @returns Mensaje formateado
 */
export const createBlogInquiryMessage = (blogTitle: string): string => {
  return `¡Hola! Leí el artículo *"${blogTitle}"* en su blog y me gustaría conversar más sobre el tema.`;
};

/**
 * Crea un mensaje para consulta sobre tecnologías/stack
 * @param technology - Tecnología de interés
 * @returns Mensaje formateado
 */
export const createTechInquiryMessage = (technology: string): string => {
  return `¡Hola! Me interesa saber más sobre su experiencia con *${technology}* y cómo podrían ayudarme con mi proyecto.`;
};

/**
 * Valida un número de WhatsApp
 * @param phoneNumber - Número a validar
 * @returns true si el número es válido
 */
export const isValidWhatsAppNumber = (phoneNumber: string): boolean => {
  // Remover todos los caracteres no numéricos
  const cleanNumber = phoneNumber.replace(/\D/g, "");
  // Un número válido debe tener entre 10 y 15 dígitos
  return cleanNumber.length >= 10 && cleanNumber.length <= 15;
};

/**
 * Formatea un número de teléfono para WhatsApp (remueve símbolos)
 * @param phoneNumber - Número a formatear
 * @returns Número formateado
 */
export const formatWhatsAppNumber = (phoneNumber: string): string => {
  return phoneNumber.replace(/\D/g, "");
};
