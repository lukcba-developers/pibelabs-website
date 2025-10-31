import { z } from 'zod';
import { FORM_CONFIG } from '@/lib/constants/config';

/* ============================================
   PIBELABS - Zod Validation Schemas
   ============================================ */

// ============================================
// Helper Functions
// ============================================

/**
 * Check if email domain is disposable/temporary
 */
const isDisposableEmail = (email: string): boolean => {
  const domain = email.split('@')[1]?.toLowerCase();
  return domain ? FORM_CONFIG.disposableEmailDomains.includes(domain) : false;
};

/**
 * Check for spam keywords in message
 */
const containsSpamKeywords = (message: string): boolean => {
  const spamKeywords = [
    'viagra', 'cialis', 'casino', 'lottery', 'bitcoin',
    'cryptocurrency', 'forex', 'investment opportunity',
  ];
  
  const lowerMessage = message.toLowerCase();
  return spamKeywords.some(keyword => lowerMessage.includes(keyword));
};

// ============================================
// Contact Form Schema
// ============================================

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(
      FORM_CONFIG.minNameLength,
      `El nombre debe tener al menos ${FORM_CONFIG.minNameLength} caracteres`
    )
    .max(
      FORM_CONFIG.maxNameLength,
      `El nombre no puede exceder ${FORM_CONFIG.maxNameLength} caracteres`
    )
    .regex(
      /^[A-Za-zÀ-ÿ\s]+$/,
      'El nombre solo puede contener letras y espacios'
    )
    .transform(val => val.trim()),

  email: z
    .string()
    .email('Por favor ingresa un email válido')
    .toLowerCase()
    .refine(
      email => !isDisposableEmail(email),
      'No se permiten emails temporales o desechables'
    )
    .transform(val => val.trim()),

  service: z.enum(
    ['web', 'ia', 'design', 'cloud', 'security', 'consulting'],
    {
      errorMap: () => ({ message: 'Por favor selecciona un servicio válido' }),
    }
  ),

  message: z
    .string()
    .min(
      FORM_CONFIG.minMessageLength,
      `El mensaje debe tener al menos ${FORM_CONFIG.minMessageLength} caracteres`
    )
    .max(
      FORM_CONFIG.maxMessageLength,
      `El mensaje no puede exceder ${FORM_CONFIG.maxMessageLength} caracteres`
    )
    .refine(
      message => !containsSpamKeywords(message),
      'El mensaje contiene contenido no permitido'
    )
    .transform(val => val.trim()),
});

// ============================================
// Type inference from schema
// ============================================

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormOutput = z.output<typeof contactFormSchema>;

// ============================================
// Individual Field Validators
// ============================================

/**
 * Validate name field only
 */
export const validateName = (name: string) => {
  try {
    contactFormSchema.shape.name.parse(name);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message || 'Error de validación' };
    }
    return { isValid: false, error: 'Error desconocido' };
  }
};

/**
 * Validate email field only
 */
export const validateEmail = (email: string) => {
  try {
    contactFormSchema.shape.email.parse(email);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message || 'Error de validación' };
    }
    return { isValid: false, error: 'Error desconocido' };
  }
};

/**
 * Validate message field only
 */
export const validateMessage = (message: string) => {
  try {
    contactFormSchema.shape.message.parse(message);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message || 'Error de validación' };
    }
    return { isValid: false, error: 'Error desconocido' };
  }
};

// ============================================
// Email Suggestions (typo correction)
// ============================================

const commonDomains = [
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'yahoo.com',
  'icloud.com',
  'live.com',
  'msn.com',
];

/**
 * Suggest correct email domain if user made a typo
 */
export const suggestEmailDomain = (email: string): string | null => {
  const [localPart, domain] = email.split('@');
  
  if (!domain || !localPart) return null;
  
  // Calculate Levenshtein distance
  const levenshtein = (a: string, b: string): number => {
    const matrix: number[][] = [];
    
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= a.length; j++) {
      matrix[0]![j] = j;
    }
    
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i]![j] = matrix[i - 1]![j - 1]!;
        } else {
          matrix[i]![j] = Math.min(
            matrix[i - 1]![j - 1]! + 1, // substitution
            matrix[i]![j - 1]! + 1, // insertion
            matrix[i - 1]![j]! + 1 // deletion
          );
        }
      }
    }
    
    return matrix[b.length]![a.length]!;
  };
  
  // Find closest domain
  let closestDomain: string | null = null;
  let minDistance = Infinity;
  
  for (const commonDomain of commonDomains) {
    const distance = levenshtein(domain.toLowerCase(), commonDomain);
    
    // Only suggest if distance is 1-2 (likely typo)
    if (distance > 0 && distance <= 2 && distance < minDistance) {
      minDistance = distance;
      closestDomain = commonDomain;
    }
  }
  
  return closestDomain ? `${localPart}@${closestDomain}` : null;
};
