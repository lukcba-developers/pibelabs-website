import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocalStorage, useReducedMotion } from "@/hooks";
import { sendEvent } from "@/lib/analytics/googleAnalytics";

/* ============================================
   Cookie Consent Component (Atom) - Sprint 6
   GDPR/Legal Compliance Component
   ============================================ */

interface CookieConsentProps {
  /** Callback when user accepts cookies */
  onAccept?: () => void;
  /** Callback when user rejects cookies */
  onReject?: () => void;
  /** Custom message (optional) */
  message?: string;
  /** Position of the banner */
  position?: "bottom" | "top";
  /** Show customize button */
  showCustomize?: boolean;
}

export interface CookiePreferences {
  necessary: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

const CookieConsent = ({
  onAccept,
  onReject,
  message,
  position = "bottom",
  showCustomize = true,
}: CookieConsentProps) => {
  const { t } = useTranslation("cookies");
  const displayMessage = message || t("message");
  const [cookieConsent, setCookieConsent] = useLocalStorage<
    "accepted" | "rejected" | null
  >("pibelabs_cookie_consent", null);
  const [preferences, setPreferences] = useLocalStorage<CookiePreferences>(
    "pibelabs_cookie_preferences",
    defaultPreferences,
  );
  const [showBanner, setShowBanner] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Show banner if no consent decision has been made
    if (cookieConsent === null) {
      // Delay to avoid jarring experience on page load
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [cookieConsent]);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };

    setPreferences(allAccepted);
    setCookieConsent("accepted");
    setShowBanner(false);

    // Track consent
    sendEvent("cookie_consent", {
      action: "accept_all",
      analytics: true,
      marketing: true,
      functional: true,
    });

    if (onAccept) onAccept();
  };

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };

    setPreferences(onlyNecessary);
    setCookieConsent("rejected");
    setShowBanner(false);

    // Track rejection
    sendEvent("cookie_consent", {
      action: "reject_all",
      analytics: false,
      marketing: false,
      functional: false,
    });

    if (onReject) onReject();
  };

  const handleSavePreferences = () => {
    setCookieConsent("accepted");
    setShowBanner(false);
    setShowCustomizeModal(false);

    // Track custom preferences
    sendEvent("cookie_consent", {
      action: "customize",
      ...preferences,
    });

    if (onAccept) onAccept();
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "necessary") return; // Can't disable necessary cookies

    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const bannerVariants = {
    hidden: {
      y: position === "bottom" ? 100 : -100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
    exit: {
      y: position === "bottom" ? 100 : -100,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2,
      },
    },
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Consent Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            variants={prefersReducedMotion ? {} : bannerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed ${position === "bottom" ? "bottom-0" : "top-0"} left-0 right-0 z-[200]
                       bg-dark-primary/95 backdrop-blur-lg border-t-2 border-cyan-neon/30
                       shadow-2xl shadow-cyan-neon/20`}
          >
            <div className="container mx-auto px-4 py-6 max-w-7xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                {/* Message */}
                <div className="flex items-start gap-4 flex-1">
                  {/* Cookie Icon */}
                  <div className="flex-shrink-0">
                    <svg
                      className="w-8 h-8 text-cyan-neon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="font-rajdhani font-bold text-lg text-white mb-2">
                      {t("title")}
                    </h3>
                    <p className="font-poppins text-sm text-gray-300 leading-relaxed">
                      {displayMessage}
                    </p>
                    <a
                      href="/privacy-policy"
                      className="inline-block mt-2 text-cyan-neon text-sm font-poppins hover:underline"
                    >
                      {t("privacyLink")}
                    </a>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  {showCustomize && (
                    <motion.button
                      onClick={() => setShowCustomizeModal(true)}
                      className="px-6 py-3 rounded-lg border-2 border-gray-600 text-gray-300
                               font-rajdhani font-semibold text-sm hover:border-cyan-neon/50
                               hover:text-cyan-neon transition-all whitespace-nowrap"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                    >
                      {t("customize")}
                    </motion.button>
                  )}

                  <motion.button
                    onClick={handleRejectAll}
                    className="px-6 py-3 rounded-lg bg-gray-700 text-white font-rajdhani
                             font-semibold text-sm hover:bg-gray-600 transition-all whitespace-nowrap"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                  >
                    {t("reject")}
                  </motion.button>

                  <motion.button
                    onClick={handleAcceptAll}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-neon to-magenta-neon
                             text-white font-rajdhani font-semibold text-sm shadow-glow-cyan
                             hover:shadow-glow-magenta transition-all whitespace-nowrap"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  >
                    {t("acceptAll")}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Customize Modal */}
      <AnimatePresence>
        {showCustomizeModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCustomizeModal(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[250]"
            />

            {/* Modal */}
            <motion.div
              variants={prefersReducedMotion ? {} : modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[251] flex items-center justify-center p-4"
            >
              <div
                className="bg-dark-primary border-2 border-cyan-neon/30 rounded-2xl shadow-2xl
                            max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Header */}
                <div className="p-6 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="font-orbitron font-bold text-2xl text-white">
                      {t("modal.title")}
                    </h2>
                    <button
                      onClick={() => setShowCustomizeModal(false)}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="font-poppins text-sm text-gray-400 mt-2">
                    {t("modal.subtitle")}
                  </p>
                </div>

                {/* Cookie Categories */}
                <div className="p-6 space-y-6">
                  {/* Necessary Cookies */}
                  <CookieCategory
                    title={t("modal.categories.necessary.title")}
                    description={t("modal.categories.necessary.description")}
                    enabled={preferences.necessary}
                    disabled={true}
                    onChange={() => {}}
                  />

                  {/* Analytics Cookies */}
                  <CookieCategory
                    title={t("modal.categories.analytics.title")}
                    description={t("modal.categories.analytics.description")}
                    enabled={preferences.analytics}
                    onChange={() => togglePreference("analytics")}
                  />

                  {/* Marketing Cookies */}
                  <CookieCategory
                    title={t("modal.categories.marketing.title")}
                    description={t("modal.categories.marketing.description")}
                    enabled={preferences.marketing}
                    onChange={() => togglePreference("marketing")}
                  />

                  {/* Functional Cookies */}
                  <CookieCategory
                    title={t("modal.categories.functional.title")}
                    description={t("modal.categories.functional.description")}
                    enabled={preferences.functional}
                    onChange={() => togglePreference("functional")}
                  />
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-700 flex gap-3">
                  <button
                    onClick={() => setShowCustomizeModal(false)}
                    className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-600 text-gray-300
                             font-rajdhani font-semibold hover:border-cyan-neon/50 hover:text-cyan-neon
                             transition-all"
                  >
                    {t("modal.cancel")}
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-neon to-magenta-neon
                             text-white font-rajdhani font-semibold shadow-glow-cyan hover:shadow-glow-magenta
                             transition-all"
                  >
                    {t("modal.save")}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Cookie Category Component
interface CookieCategoryProps {
  title: string;
  description: string;
  enabled: boolean;
  disabled?: boolean;
  onChange: () => void;
}

const CookieCategory = ({
  title,
  description,
  enabled,
  disabled = false,
  onChange,
}: CookieCategoryProps) => {
  return (
    <div className="flex items-start justify-between gap-4 p-4 bg-dark-secondary rounded-lg">
      <div className="flex-1">
        <h3 className="font-rajdhani font-semibold text-white mb-1">{title}</h3>
        <p className="font-poppins text-sm text-gray-400">{description}</p>
      </div>

      {/* Toggle Switch */}
      <button
        onClick={onChange}
        disabled={disabled}
        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors
                   ${enabled ? "bg-cyan-neon" : "bg-gray-600"}
                   ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform
                     ${enabled ? "translate-x-7" : "translate-x-1"}`}
        />
      </button>
    </div>
  );
};

export default CookieConsent;
