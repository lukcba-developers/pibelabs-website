import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

/* ============================================
   UI Store - Global UI State Management
   ============================================ */

interface UIState {
  // Mobile Menu
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  openMobileMenu: () => void;

  // Modal
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;

  // Theme
  theme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;

  // Loading states
  isGlobalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;

  // Scroll
  showScrollToTop: boolean;
  setShowScrollToTop: (show: boolean) => void;

  // Language
  currentLanguage: "es" | "en";
  setLanguage: (lang: "es" | "en") => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        // Mobile Menu
        isMobileMenuOpen: false,
        toggleMobileMenu: () =>
          set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
        closeMobileMenu: () => set({ isMobileMenuOpen: false }),
        openMobileMenu: () => set({ isMobileMenuOpen: true }),

        // Modal
        isModalOpen: false,
        modalContent: null,
        openModal: (content) =>
          set({ isModalOpen: true, modalContent: content }),
        closeModal: () => set({ isModalOpen: false, modalContent: null }),

        // Theme
        theme: "dark",
        toggleTheme: () =>
          set((state) => ({
            theme: state.theme === "dark" ? "light" : "dark",
          })),
        setTheme: (theme) => set({ theme }),

        // Loading
        isGlobalLoading: false,
        setGlobalLoading: (loading) => set({ isGlobalLoading: loading }),

        // Scroll
        showScrollToTop: false,
        setShowScrollToTop: (show) => set({ showScrollToTop: show }),

        // Language
        currentLanguage: "es",
        setLanguage: (lang) => set({ currentLanguage: lang }),
      }),
      {
        name: "pibelabs-ui-store",
        // Only persist theme and language
        partialize: (state) => ({
          theme: state.theme,
          currentLanguage: state.currentLanguage,
        }),
      },
    ),
    { name: "UIStore" },
  ),
);
