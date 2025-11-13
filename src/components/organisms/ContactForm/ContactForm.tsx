import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  contactFormSchema,
  suggestEmailDomain,
} from "@/lib/validation/schemas";
import { SERVICES } from "@/lib/constants/config";
import type { ContactFormData, ContactFormState } from "@/types";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { useRateLimit } from "@/hooks";
import {
  trackFormStart,
  trackFormFieldComplete,
  trackFormError,
  trackFormSubmit,
  trackFormSuccess,
  trackFormFailure,
} from "@/lib/analytics/googleAnalytics";

/* ============================================
   Contact Form Component (Organism)
   ============================================ */

const ContactForm = () => {
  const { t } = useTranslation(["contact", "services"]);
  const [formState, setFormState] = useState<ContactFormState>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
  });

  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);
  const [formStarted, setFormStarted] = useState(false);

  // Rate limiting: 3 submissions per minute
  const { checkRateLimit, recordAttempt } = useRateLimit(3, 60000);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
  });

  // Watch email field for suggestions
  const emailValue = watch("email");

  // Check for email typos
  const checkEmailTypo = (email: string) => {
    if (email && email.includes("@")) {
      const suggestion = suggestEmailDomain(email);
      setEmailSuggestion(suggestion);
    } else {
      setEmailSuggestion(null);
    }
  };

  // Use emailValue to check for typos
  useEffect(() => {
    if (emailValue) {
      checkEmailTypo(emailValue);
    }
  }, [emailValue]);

  // Track form start on first interaction
  const handleFormStart = () => {
    if (!formStarted) {
      trackFormStart();
      setFormStarted(true);
    }
  };

  // Track field completion
  const handleFieldBlur = (fieldName: string) => {
    trackFormFieldComplete(fieldName);
  };

  // Handle form submission
  const onSubmit = async (data: ContactFormData) => {
    // Track form submit attempt
    trackFormSubmit(data as unknown as Record<string, unknown>);

    // Check rate limit before submitting
    const { allowed, remaining, resetAt } = checkRateLimit();

    if (!allowed) {
      const minutesUntilReset = Math.ceil(
        (resetAt.getTime() - Date.now()) / 60000,
      );
      const errorMsg = `Has alcanzado el límite de envíos. Intenta nuevamente en ${minutesUntilReset} minuto(s).`;
      setRateLimitError(errorMsg);
      trackFormFailure(errorMsg);
      return;
    }

    setFormState({ isSubmitting: true, isSuccess: false, isError: false });
    setEmailSuggestion(null);
    setRateLimitError(null);

    try {
      // Record this attempt
      recordAttempt();

      // Simulate API call (replace with actual API endpoint)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful response
      if (process.env.NODE_ENV === "development") {
        console.log("Form submitted:", data);
        console.log(`Rate limit remaining: ${remaining - 1}`);
      }

      // Track successful conversion 🎯
      trackFormSuccess(data as unknown as Record<string, unknown>);

      setFormState({
        isSubmitting: false,
        isSuccess: true,
        isError: false,
      });

      // Reset form after success
      reset();
      setFormStarted(false);

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setFormState({
          isSubmitting: false,
          isSuccess: false,
          isError: false,
        });
      }, 5000);
    } catch (error) {
      const errorMsg =
        "Hubo un error al enviar el mensaje. Por favor intenta nuevamente.";

      // Track form failure
      trackFormFailure(errorMsg);

      setFormState({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: errorMsg,
      });
    }
  };

  // Track validation errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([fieldName, error]) => {
        if (error?.message) {
          trackFormError(fieldName, error.message);
        }
      });
    }
  }, [errors]);

  return (
    <section id="contact" className="section bg-dark-primary py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-magenta-neon/10 text-magenta-neon font-rajdhani font-semibold text-sm mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {t("title")}
          </motion.span>

          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-4">
            {t("subtitle")}
          </h2>

          <p className="font-poppins text-lg text-gray-300 max-w-2xl mx-auto">
            {t("form.description")}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-dark-secondary rounded-2xl p-8 md:p-12 shadow-2xl border border-cyan-neon/20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Success Message */}
            <AnimatePresence>
              {formState.isSuccess && (
                <motion.div
                  className="mb-8 p-6 bg-green-500/10 border-2 border-green-500 rounded-xl"
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">✅</span>
                    <div>
                      <h3 className="font-rajdhani font-bold text-xl text-green-400 mb-2">
                        {t("form.success")}
                      </h3>
                      <p className="font-poppins text-gray-300">
                        {t("form.successMessage")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Rate Limit Error Message */}
            <AnimatePresence>
              {rateLimitError && (
                <motion.div
                  className="mb-8 p-6 bg-yellow-500/10 border-2 border-yellow-500 rounded-xl"
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">⏱️</span>
                    <div>
                      <h3 className="font-rajdhani font-bold text-xl text-yellow-400 mb-2">
                        Límite de Envíos Alcanzado
                      </h3>
                      <p className="font-poppins text-gray-300">
                        {rateLimitError}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
              {formState.isError && (
                <motion.div
                  className="mb-8 p-6 bg-red-500/10 border-2 border-red-500 rounded-xl"
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">❌</span>
                    <div>
                      <h3 className="font-rajdhani font-bold text-xl text-red-400 mb-2">
                        {t("form.errorTitle")}
                      </h3>
                      <p className="font-poppins text-gray-300">
                        {formState.errorMessage}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Input
                  {...register("name")}
                  type="text"
                  name="name"
                  label={t("form.name")}
                  placeholder={t("form.namePlaceholder")}
                  required
                  error={errors.name?.message}
                  onFocus={handleFormStart}
                  onBlur={() => handleFieldBlur("name")}
                  className={`bg-dark-primary text-white border-2 transition-all duration-300 ${
                    errors.name
                      ? "border-red-500 animate-shake"
                      : "border-gray-600 focus:border-cyan-neon focus:ring-4 focus:ring-cyan-neon/30 focus:shadow-[0_0_20px_rgba(0,217,255,0.4)]"
                  }`}
                />
              </motion.div>

              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <label
                  htmlFor="email"
                  className="block mb-2 font-rajdhani font-medium text-white"
                >
                  {t("form.email")}
                  <span className="text-cyan-neon ml-1">*</span>
                  <span className="text-xs text-gray-400 font-normal ml-2">
                    {t("form.emailNote")}
                  </span>
                </label>
                <Input
                  {...register("email")}
                  type="email"
                  name="email"
                  placeholder={t("form.emailPlaceholder")}
                  required
                  error={errors.email?.message}
                  onFocus={handleFormStart}
                  onBlur={(e) => {
                    checkEmailTypo(e.target.value);
                    handleFieldBlur("email");
                  }}
                  className={`bg-dark-primary text-white border-2 transition-all duration-300 ${
                    errors.email
                      ? "border-red-500 animate-shake"
                      : "border-gray-600 focus:border-cyan-neon focus:ring-4 focus:ring-cyan-neon/30 focus:shadow-[0_0_20px_rgba(0,217,255,0.4)]"
                  }`}
                />

                {/* Email Suggestion */}
                <AnimatePresence>
                  {emailSuggestion && !errors.email && (
                    <motion.div
                      className="mt-2 p-3 bg-cyan-neon/10 border border-cyan-neon/30 rounded-lg"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <p className="font-poppins text-sm text-cyan-neon">
                        ¿Quisiste decir{" "}
                        <button
                          type="button"
                          className="underline font-semibold hover:text-cyan-bright"
                          onClick={() => {
                            // This would require react-hook-form's setValue
                            // setValue('email', emailSuggestion);
                            setEmailSuggestion(null);
                          }}
                        >
                          {emailSuggestion}
                        </button>
                        ?
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Service Select */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <label
                  htmlFor="service-select"
                  className="block mb-2 font-rajdhani font-medium text-white"
                >
                  {t("form.service")}
                  <span className="text-magenta-neon ml-1">*</span>
                  <span className="text-xs text-gray-400 font-normal ml-2">
                    {t("form.serviceNote")}
                  </span>
                </label>
                <select
                  id="service-select"
                  {...register("service")}
                  className="w-full px-4 py-3 bg-dark-primary text-white border-2 border-gray-600 rounded-lg font-poppins focus:outline-none focus:border-cyan-neon focus:ring-2 focus:ring-cyan-neon transition-all"
                  required
                  onFocus={handleFormStart}
                  onBlur={() => handleFieldBlur("service")}
                >
                  <option value="">{t("form.servicePlaceholder")}</option>
                  {SERVICES.map((service) => {
                    const serviceKey = service.id;
                    const translationKey = `services.${serviceKey}.title`;
                    return (
                      <option key={service.id} value={service.id}>
                        {t(translationKey)}
                      </option>
                    );
                  })}
                </select>
                {errors.service && (
                  <p className="mt-2 text-sm text-red-500 font-poppins">
                    {errors.service.message}
                  </p>
                )}
              </motion.div>

              {/* Message Textarea */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Input
                  {...register("message")}
                  type="textarea"
                  name="message"
                  label={t("form.message")}
                  placeholder={t("form.messagePlaceholder")}
                  required
                  error={errors.message?.message}
                  onFocus={handleFormStart}
                  onBlur={() => handleFieldBlur("message")}
                  className="bg-dark-primary text-white"
                />
                <p className="mt-2 text-xs text-gray-400 font-poppins">
                  {t("form.messageHint")}
                </p>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                className="pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={formState.isSubmitting}
                  disabled={formState.isSubmitting}
                  className="w-full"
                  ariaLabel={t("form.submit")}
                >
                  {formState.isSubmitting
                    ? t("form.submitting")
                    : t("form.submit")}
                </Button>
              </motion.div>

              {/* Privacy Notice */}
              <motion.p
                className="text-xs text-gray-400 text-center font-poppins"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                {t("form.privacyNote")}
              </motion.p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
