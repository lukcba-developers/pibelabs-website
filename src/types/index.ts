/* ============================================
   PIBELABS - TypeScript Type Definitions
   ============================================ */

// ============================================
// Service Types
// ============================================

export type ServiceType =
  | "web"
  | "ia"
  | "design"
  | "cloud"
  | "security"
  | "consulting";

export interface Service {
  id: ServiceType;
  title: string;
  description: string;
  icon: string;
  features: string[];
  color: "cyan" | "magenta";
}

// ============================================
// Contact Form Types
// ============================================

export interface ContactFormData {
  name: string;
  email: string;
  service: ServiceType;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
}

export interface ContactFormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
}

// ============================================
// API Types
// ============================================

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Array<{
      field: string;
      message: string;
      code: string;
    }>;
  };
  meta?: {
    requestId: string;
    timestamp: string;
  };
}

export interface ContactAPIResponse {
  id: string;
  status: "pending" | "contacted" | "qualified" | "converted" | "rejected";
  createdAt: string;
}

// ============================================
// Animation Types
// ============================================

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string | number[];
  repeat?: number;
  repeatType?: "loop" | "reverse" | "mirror";
}

export interface ScrollAnimationConfig extends AnimationConfig {
  triggerOnce?: boolean;
  threshold?: number;
  rootMargin?: string;
}

// ============================================
// Component Props Types
// ============================================

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
}

export interface InputProps extends BaseComponentProps {
  type?: "text" | "email" | "tel" | "number" | "password" | "textarea";
  name: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onFocus?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export interface CardProps extends BaseComponentProps {
  variant?: "default" | "glass" | "gradient";
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

// ============================================
// Stats Types
// ============================================

export interface Stat {
  id: string;
  value: string | number;
  label: string;
  description?: string;
  suffix?: string;
  prefix?: string;
  icon?: string;
  animateOnScroll?: boolean;
}

// ============================================
// Portfolio Types
// ============================================

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
  year: number;
  status?: "production" | "development" | "completed";
  features?: string[];
  achievements?: string[];
  techStack?: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    infrastructure?: string[];
    tools?: string[];
  };
}

export type PortfolioCategory = "all" | "web" | "ia" | "design" | "cloud";

// ============================================
// Blog Types
// ============================================

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  author: {
    name: string;
    avatar?: string;
    role?: string;
  };
  publishedAt: string;
  readTime: number;
  tags: string[];
  category: string;
  slug: string;
  featured?: boolean;
}

// ============================================
// Team Types
// ============================================

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  skills?: string[];
}

// ============================================
// Testimonial Types
// ============================================

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  company: string;
  image: string;
  linkedin: string;
  rating: number;
}

// ============================================
// Navigation Types
// ============================================

export interface NavLink {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}

// ============================================
// Store Types (Zustand)
// ============================================

export interface UIStore {
  isMobileMenuOpen: boolean;
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  toggleMobileMenu: () => void;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

export interface FormStore {
  formData: Partial<ContactFormData>;
  formState: ContactFormState;
  setFormData: (data: Partial<ContactFormData>) => void;
  setFormState: (state: Partial<ContactFormState>) => void;
  resetForm: () => void;
}

// ============================================
// Utility Types
// ============================================

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

// ============================================
// Event Handler Types
// ============================================

export type FormSubmitHandler = (
  event: React.FormEvent<HTMLFormElement>,
) => void | Promise<void>;

export type ClickHandler = (
  event: React.MouseEvent<HTMLElement>,
) => void | Promise<void>;

export type ChangeHandler = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => void;

// ============================================
// Validation Types
// ============================================

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export type ValidationRule = {
  type: "required" | "email" | "minLength" | "maxLength" | "pattern" | "custom";
  value?: string | number | RegExp;
  message: string;
  validator?: (value: string) => boolean;
};

// ============================================
// Web Vitals Types
// ============================================

export interface WebVitalsMetric {
  name: "FCP" | "LCP" | "FID" | "CLS" | "TTFB";
  value: number;
  id: string;
  rating: "good" | "needs-improvement" | "poor";
}
