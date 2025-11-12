import { z } from "zod";
import i18n from "@/lib/i18n";
import { FORM_CONFIG } from "@/lib/constants/config";

/* ============================================
   PIBELABS - Zod Validation Schemas with i18n
   ============================================ */

// ============================================
// Custom Error Map with i18n
// ============================================

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  const t = (key: string, options?: object) => i18n.t(key, { ns: "validation", ...options });

  switch (issue.code) {
    case z.ZodIssueCode.too_small:
      if (issue.type === "string") {
        if (issue.minimum === 1) {
          return { message: t("required") };
        }
        return {
          message: t("too_small", {
            count: Number(issue.minimum),
          }),
        };
      }
      break;

    case z.ZodIssueCode.too_big:
      if (issue.type === "string") {
        return {
          message: t("too_big", {
            count: Number(issue.maximum),
          }),
        };
      }
      break;

    case z.ZodIssueCode.invalid_string:
      if (issue.validation === "email") {
        return { message: t("invalid_email") };
      }
      if (issue.validation === "regex") {
        return { message: t("custom") };
      }
      break;

    case z.ZodIssueCode.invalid_enum_value:
      return { message: t("invalid_enum_value") };

    default:
      break;
  }

  return { message: ctx.defaultError };
};

// Set custom error map globally
z.setErrorMap(customErrorMap);

// ============================================
// Helper Functions
// ============================================

/**
 * Check if email domain is disposable/temporary
 */
const isDisposableEmail = (email: string): boolean => {
  const domain = email.split("@")[1]?.toLowerCase();
  return domain
    ? (FORM_CONFIG.disposableEmailDomains as readonly string[]).includes(domain)
    : false;
};

/**
 * Check for spam keywords in message
 */
const containsSpamKeywords = (message: string): boolean => {
  const spamKeywords = [
    "viagra",
    "cialis",
    "casino",
    "lottery",
    "bitcoin",
    "cryptocurrency",
    "forex",
    "investment opportunity",
  ];

  const lowerMessage = message.toLowerCase();
  return spamKeywords.some((keyword) => lowerMessage.includes(keyword));
};

// ============================================
// Contact Form Schema
// ============================================

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(FORM_CONFIG.minNameLength)
    .max(FORM_CONFIG.maxNameLength)
    .regex(/^[A-Za-zÀ-ÿ\s]+$/)
    .transform((val) => val.trim()),

  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(
      (email) => !isDisposableEmail(email),
      () => ({ message: i18n.t("contact.validation.disposableEmail") }),
    )
    .transform((val) => val.trim()),

  service: z.enum(["web", "ia", "design", "cloud", "security", "consulting"]),

  message: z
    .string()
    .min(FORM_CONFIG.minMessageLength)
    .max(FORM_CONFIG.maxMessageLength)
    .refine(
      (message) => !containsSpamKeywords(message),
      () => ({ message: i18n.t("contact.validation.spamDetected") }),
    )
    .transform((val) => val.trim()),
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
      return {
        isValid: false,
        error: error.errors[0]?.message || "Error de validación",
      };
    }
    return { isValid: false, error: "Error desconocido" };
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
      return {
        isValid: false,
        error: error.errors[0]?.message || "Error de validación",
      };
    }
    return { isValid: false, error: "Error desconocido" };
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
      return {
        isValid: false,
        error: error.errors[0]?.message || "Error de validación",
      };
    }
    return { isValid: false, error: "Error desconocido" };
  }
};

// ============================================
// Email Suggestions (typo correction)
// ============================================

const commonDomains = [
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "yahoo.com",
  "icloud.com",
  "live.com",
  "msn.com",
];

/**
 * Suggest correct email domain if user made a typo
 */
export const suggestEmailDomain = (email: string): string | null => {
  const [localPart, domain] = email.split("@");

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
            matrix[i - 1]![j]! + 1, // deletion
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
