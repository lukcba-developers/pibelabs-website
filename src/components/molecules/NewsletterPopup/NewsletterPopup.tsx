import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { useLocalStorage, useReducedMotion } from "@/hooks";
import { sendEvent } from "@/lib/analytics/googleAnalytics";

/* ============================================
   Newsletter Popup Component (Molecule) - Sprint 6
   Exit-Intent Newsletter Subscription Modal
   ============================================ */

type NewsletterFormData = {
  email: string;
  name?: string;
};

interface NewsletterPopupProps {
  /** Enable exit-intent trigger */
  exitIntent?: boolean;
  /** Delay before showing (milliseconds) */
  delay?: number;
  /** Show after scroll percentage (0-100) */
  scrollPercentage?: number;
  /** Days before showing again after dismissal */
  dismissDays?: number;
}

const NewsletterPopup = ({
  exitIntent = true,
  delay = 10000, // 10 seconds
  scrollPercentage = 50,
  dismissDays = 7,
}: NewsletterPopupProps) => {
  const { t } = useTranslation("newsletter");
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastDismissed, setLastDismissed] = useLocalStorage<number | null>(
    "newsletter_popup_dismissed",
    null,
  );
  const [hasSubscribed, setHasSubscribed] = useLocalStorage<boolean>(
    "newsletter_subscribed",
    false,
  );
  const prefersReducedMotion = useReducedMotion();

  const newsletterSchema = z.object({
    email: z.string().email(t("validation.invalidEmail")),
    name: z
      .string()
      .min(2, t("validation.nameMinLength", { count: 2 }))
      .optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  // Check if popup should be shown
  const shouldShowPopup = useCallback(() => {
    // Don't show if already subscribed
    if (hasSubscribed) return false;

    // Don't show if dismissed recently
    if (lastDismissed) {
      const daysSinceDismissed =
        (Date.now() - lastDismissed) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < dismissDays) return false;
    }

    return true;
  }, [hasSubscribed, lastDismissed, dismissDays]);

  // Exit-intent detection
  useEffect(() => {
    if (!exitIntent || !shouldShowPopup()) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger only when mouse leaves from top
      if (e.clientY <= 0) {
        setShowPopup(true);
        sendEvent("newsletter_popup_shown", { trigger: "exit_intent" });
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [exitIntent, shouldShowPopup]);

  // Time delay trigger
  useEffect(() => {
    if (!delay || !shouldShowPopup() || showPopup) return;

    const timer = setTimeout(() => {
      setShowPopup(true);
      sendEvent("newsletter_popup_shown", { trigger: "time_delay" });
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, shouldShowPopup, showPopup]);

  // Scroll percentage trigger
  useEffect(() => {
    if (!scrollPercentage || !shouldShowPopup() || showPopup) return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrolled = ((scrollTop + windowHeight) / documentHeight) * 100;

      if (scrolled >= scrollPercentage) {
        setShowPopup(true);
        sendEvent("newsletter_popup_shown", { trigger: "scroll_percentage" });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPercentage, shouldShowPopup, showPopup]);

  const handleClose = () => {
    setShowPopup(false);
    setLastDismissed(Date.now());
    sendEvent("newsletter_popup_dismissed", {});
  };

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);

    try {
      // TODO: Replace with actual newsletter API endpoint
      // Example: await fetch('/api/newsletter/subscribe', { method: 'POST', body: JSON.stringify(data) });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSuccess(true);
      setHasSubscribed(true);

      // Track conversion
      sendEvent("newsletter_signup", {
        source: "popup",
        email: data.email,
      });

      // Close after showing success
      setTimeout(() => {
        setShowPopup(false);
        reset();
      }, 2000);
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      // Handle error (show error message)
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  if (!shouldShowPopup()) return null;

  return (
    <AnimatePresence>
      {showPopup && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[300]"
          />

          {/* Modal */}
          <motion.div
            variants={prefersReducedMotion ? {} : modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[301] flex items-center justify-center p-4"
          >
            <div
              className="bg-gradient-to-br from-dark-primary to-dark-secondary border-2
                          border-cyan-neon/30 rounded-2xl shadow-2xl shadow-cyan-neon/20
                          max-w-md w-full overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-700/50 rounded-lg
                         transition-colors z-10"
                aria-label={t("closeButton")}
              >
                <svg
                  className="w-6 h-6 text-gray-400 hover:text-white"
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

              {/* Content */}
              <div className="p-8 pt-12">
                {!isSuccess ? (
                  <>
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <motion.div
                        animate={
                          prefersReducedMotion
                            ? {}
                            : {
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1],
                              }
                        }
                        transition={{
                          duration: 0.6,
                          ease: "easeInOut",
                        }}
                        className="w-16 h-16 bg-gradient-to-br from-cyan-neon to-magenta-neon
                                 rounded-full flex items-center justify-center"
                      >
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Title */}
                    <h2 className="font-orbitron font-bold text-2xl text-white text-center mb-3">
                      {t("title")}
                    </h2>

                    {/* Subtitle */}
                    <p className="font-poppins text-gray-300 text-center mb-6">
                      {t("description")}
                    </p>

                    {/* Benefits */}
                    <div className="space-y-2 mb-6">
                      {[
                        t("benefits.articles"),
                        t("benefits.offers"),
                        t("benefits.resources"),
                      ].map((benefit, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <svg
                            className="w-5 h-5 text-cyan-neon flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="font-poppins text-sm text-gray-300">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Form */}
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      {/* Name Input (Optional) */}
                      <div>
                        <input
                          {...register("name")}
                          type="text"
                          placeholder={t("form.namePlaceholder")}
                          className="w-full px-4 py-3 rounded-lg bg-dark-secondary border-2 border-gray-600
                                   text-white font-poppins placeholder-gray-500
                                   focus:border-cyan-neon focus:outline-none transition-colors"
                        />
                        {errors.name && (
                          <p className="text-red-400 text-sm mt-1 font-poppins">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* Email Input */}
                      <div>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder={t("form.emailPlaceholder")}
                          className="w-full px-4 py-3 rounded-lg bg-dark-secondary border-2 border-gray-600
                                   text-white font-poppins placeholder-gray-500
                                   focus:border-cyan-neon focus:outline-none transition-colors"
                        />
                        {errors.email && (
                          <p className="text-red-400 text-sm mt-1 font-poppins">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-cyan-neon to-magenta-neon
                                 text-white font-rajdhani font-bold text-lg shadow-glow-cyan
                                 hover:shadow-glow-magenta transition-all disabled:opacity-50
                                 disabled:cursor-not-allowed"
                        whileHover={
                          prefersReducedMotion || isSubmitting
                            ? {}
                            : { scale: 1.02 }
                        }
                        whileTap={
                          prefersReducedMotion || isSubmitting
                            ? {}
                            : { scale: 0.98 }
                        }
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg
                              className="animate-spin h-5 w-5"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            {t("form.submitting")}
                          </span>
                        ) : (
                          t("form.submit")
                        )}
                      </motion.button>
                    </form>

                    {/* Privacy Note */}
                    <p className="text-xs text-gray-500 text-center mt-4 font-poppins">
                      {t("privacy")}
                    </p>
                  </>
                ) : (
                  /* Success State */
                  <div className="text-center py-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center
                               mx-auto mb-6"
                    >
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>

                    <h3 className="font-orbitron font-bold text-2xl text-white mb-3">
                      {t("form.success")}
                    </h3>
                    <p className="font-poppins text-gray-300">
                      {t("form.successMessage")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;
