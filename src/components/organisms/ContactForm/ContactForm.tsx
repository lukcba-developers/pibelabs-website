import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { contactFormSchema, suggestEmailDomain } from '@/lib/validation/schemas';
import { SERVICES } from '@/lib/constants/config';
import type { ContactFormData, ContactFormState } from '@/types';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

/* ============================================
   Contact Form Component (Organism)
   ============================================ */

const ContactForm = () => {
  const [formState, setFormState] = useState<ContactFormState>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
  });

  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
  });

  // Watch email field for suggestions
  const emailValue = watch('email');

  // Check for email typos
  const checkEmailTypo = (email: string) => {
    if (email && email.includes('@')) {
      const suggestion = suggestEmailDomain(email);
      setEmailSuggestion(suggestion);
    } else {
      setEmailSuggestion(null);
    }
  };

  // Handle form submission
  const onSubmit = async (data: ContactFormData) => {
    setFormState({ isSubmitting: true, isSuccess: false, isError: false });
    setEmailSuggestion(null);

    try {
      // Simulate API call (replace with actual API endpoint)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful response
      console.log('Form submitted:', data);

      setFormState({
        isSubmitting: false,
        isSuccess: true,
        isError: false,
      });

      // Reset form after success
      reset();

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setFormState({
          isSubmitting: false,
          isSuccess: false,
          isError: false,
        });
      }, 5000);
    } catch (error) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: 'Hubo un error al enviar el mensaje. Por favor intenta nuevamente.',
      });
    }
  };

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
            Contacto
          </motion.span>

          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-4">
            ¿Listo para <span className="text-magenta-neon">Innovar</span>?
          </h2>

          <p className="font-poppins text-lg text-gray-300 max-w-2xl mx-auto">
            Cuéntanos sobre tu proyecto y descubre cómo podemos ayudarte a alcanzar tus objetivos.
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
                        ¡Mensaje Enviado!
                      </h3>
                      <p className="font-poppins text-gray-300">
                        Gracias por contactarnos. Nuestro equipo revisará tu mensaje y te responderá en menos de 24 horas.
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
                        Error al Enviar
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
                  {...register('name')}
                  type="text"
                  name="name"
                  label="Nombre Completo"
                  placeholder="Juan Pérez"
                  required
                  error={errors.name?.message}
                  className="bg-dark-primary text-white"
                />
              </motion.div>

              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Input
                  {...register('email')}
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="juan@empresa.com"
                  required
                  error={errors.email?.message}
                  className="bg-dark-primary text-white"
                  onBlur={(e) => checkEmailTypo(e.target.value)}
                />

                {/* Email Suggestion */}
                <AnimatePresence>
                  {emailSuggestion && !errors.email && (
                    <motion.div
                      className="mt-2 p-3 bg-cyan-neon/10 border border-cyan-neon/30 rounded-lg"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <p className="font-poppins text-sm text-cyan-neon">
                        ¿Quisiste decir{' '}
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
                <label className="block mb-2 font-rajdhani font-medium text-white">
                  Servicio de Interés
                  <span className="text-magenta-neon ml-1">*</span>
                </label>
                <select
                  {...register('service')}
                  className="w-full px-4 py-3 bg-dark-primary text-white border-2 border-gray-600 rounded-lg font-poppins focus:outline-none focus:border-cyan-neon focus:ring-2 focus:ring-cyan-neon transition-all"
                  required
                >
                  <option value="">Selecciona un servicio</option>
                  {SERVICES.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.icon} {service.title}
                    </option>
                  ))}
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
                  {...register('message')}
                  type="textarea"
                  name="message"
                  label="Mensaje"
                  placeholder="Cuéntanos sobre tu proyecto..."
                  required
                  error={errors.message?.message}
                  className="bg-dark-primary text-white"
                />
                <p className="mt-2 text-xs text-gray-400 font-poppins">
                  Mínimo 10 caracteres, máximo 500 caracteres
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
                  ariaLabel="Enviar formulario de contacto"
                >
                  {formState.isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
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
                Al enviar este formulario, aceptas nuestra política de privacidad.
                Nunca compartiremos tu información con terceros.
              </motion.p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
