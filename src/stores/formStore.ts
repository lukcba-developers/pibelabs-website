import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ContactFormData, ContactFormState } from "@/types";

/* ============================================
   Form Store - Form State Management
   ============================================ */

interface FormState {
  // Contact Form
  contactFormData: Partial<ContactFormData>;
  contactFormState: ContactFormState;
  setContactFormData: (data: Partial<ContactFormData>) => void;
  setContactFormState: (state: Partial<ContactFormState>) => void;
  resetContactForm: () => void;

  // Newsletter Form
  newsletterEmail: string;
  newsletterState: {
    isSubmitting: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage?: string;
  };
  setNewsletterEmail: (email: string) => void;
  setNewsletterState: (state: Partial<FormState["newsletterState"]>) => void;
  resetNewsletter: () => void;

  // Form Draft Auto-save
  saveFormDraft: (formName: string, data: unknown) => void;
  getFormDraft: (formName: string) => unknown;
  clearFormDraft: (formName: string) => void;
}

const initialContactFormState: ContactFormState = {
  isSubmitting: false,
  isSuccess: false,
  isError: false,
};

const initialNewsletterState = {
  isSubmitting: false,
  isSuccess: false,
  isError: false,
};

export const useFormStore = create<FormState>()(
  devtools(
    (set) => ({
      // Contact Form
      contactFormData: {},
      contactFormState: initialContactFormState,

      setContactFormData: (data) =>
        set((state) => ({
          contactFormData: { ...state.contactFormData, ...data },
        })),

      setContactFormState: (state) =>
        set((prev) => ({
          contactFormState: { ...prev.contactFormState, ...state },
        })),

      resetContactForm: () =>
        set({
          contactFormData: {},
          contactFormState: initialContactFormState,
        }),

      // Newsletter Form
      newsletterEmail: "",
      newsletterState: initialNewsletterState,

      setNewsletterEmail: (email) => set({ newsletterEmail: email }),

      setNewsletterState: (state) =>
        set((prev) => ({
          newsletterState: { ...prev.newsletterState, ...state },
        })),

      resetNewsletter: () =>
        set({
          newsletterEmail: "",
          newsletterState: initialNewsletterState,
        }),

      // Form Drafts (localStorage-based)
      saveFormDraft: (formName, data) => {
        try {
          localStorage.setItem(`form_draft_${formName}`, JSON.stringify(data));
        } catch (error) {
          console.error("Failed to save form draft:", error);
        }
      },

      getFormDraft: (formName) => {
        try {
          const draft = localStorage.getItem(`form_draft_${formName}`);
          return draft ? JSON.parse(draft) : null;
        } catch (error) {
          console.error("Failed to get form draft:", error);
          return null;
        }
      },

      clearFormDraft: (formName) => {
        try {
          localStorage.removeItem(`form_draft_${formName}`);
        } catch (error) {
          console.error("Failed to clear form draft:", error);
        }
      },
    }),
    { name: "FormStore" },
  ),
);
