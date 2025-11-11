import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Linkedin, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS, CLIENT_LOGOS } from "@/lib/constants/config";
import LazyImage from "@/components/atoms/LazyImage";
import { useReducedMotion } from "@/hooks";

/* ============================================
   Unified Testimonials Section Component
   ============================================

   Props:
   - variant: 'carousel' | 'grid' | 'highlight'
   - showClientLogos: boolean (default: false)
   - showCTA: boolean (default: true)
   - bgStyle: 'dark' | 'light' (default: 'dark')
   ============================================ */

export interface TestimonialsSectionProps {
  variant?: "carousel" | "grid" | "highlight";
  showClientLogos?: boolean;
  showCTA?: boolean;
  bgStyle?: "dark" | "light";
  maxItems?: number;
}

const TestimonialsSection = ({
  variant = "grid",
  showClientLogos = false,
  showCTA = true,
  bgStyle = "dark",
  maxItems = 3,
}: TestimonialsSectionProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Limit testimonials based on maxItems
  const displayTestimonials = TESTIMONIALS.slice(0, maxItems);

  // Auto-play for carousel
  useEffect(() => {
    if (variant === "carousel") {
      const timer = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
      }, 6000);
      return () => clearInterval(timer);
    }
    return undefined;
  }, [variant, displayTestimonials.length]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return displayTestimonials.length - 1;
      if (next >= displayTestimonials.length) return 0;
      return next;
    });
  };

  // Animation variants for carousel
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  // Render based on variant
  const renderTestimonials = () => {
    switch (variant) {
      case "carousel":
        return (
          <div className="max-w-5xl mx-auto relative px-4">
            <div className="relative h-[400px] flex items-center">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute w-full"
                >
                  <div
                    className={`
                      ${
                        bgStyle === "dark"
                          ? "bg-gradient-to-br from-dark-secondary to-dark-primary border-cyan-neon/30"
                          : "bg-white border-gray-200"
                      }
                      border-2 rounded-2xl p-8 md:p-12 shadow-2xl
                    `}
                  >
                    <Quote className="text-cyan-neon mb-6" size={48} />

                    <p
                      className={`
                        text-xl md:text-2xl font-poppins leading-relaxed mb-8
                        ${bgStyle === "dark" ? "text-gray-200" : "text-gray-700"}
                      `}
                    >
                      "{displayTestimonials[currentIndex]?.text || ""}"
                    </p>

                    <div className="flex items-center gap-4">
                      <LazyImage
                        src={displayTestimonials[currentIndex]?.image || ""}
                        alt={
                          displayTestimonials[currentIndex]?.author || "Client"
                        }
                        className="w-16 h-16 rounded-full border-2 border-cyan-neon object-cover"
                      />
                      <div className="flex-1">
                        <h4
                          className={`
                            font-rajdhani font-bold text-lg
                            ${bgStyle === "dark" ? "text-white" : "text-gray-900"}
                          `}
                        >
                          {displayTestimonials[currentIndex]?.author || ""}
                        </h4>
                        <p className="text-cyan-neon font-poppins">
                          {displayTestimonials[currentIndex]?.role || ""}
                        </p>
                        <p
                          className={`text-sm ${
                            bgStyle === "dark"
                              ? "text-gray-400"
                              : "text-gray-600"
                          }`}
                        >
                          {displayTestimonials[currentIndex]?.company || ""}
                        </p>
                      </div>
                      {displayTestimonials[currentIndex]?.linkedin && (
                        <a
                          href={
                            displayTestimonials[currentIndex]?.linkedin || "#"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 transition-colors"
                          aria-label={`LinkedIn de ${displayTestimonials[currentIndex]?.author || "Client"}`}
                        >
                          <Linkedin size={24} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={() => paginate(-1)}
              className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-cyan-neon/20 hover:bg-cyan-neon/40 rounded-full flex items-center justify-center transition-all z-10"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="text-cyan-neon" size={24} />
            </button>

            <button
              onClick={() => paginate(1)}
              className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-cyan-neon/20 hover:bg-cyan-neon/40 rounded-full flex items-center justify-center transition-all z-10"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="text-cyan-neon" size={24} />
            </button>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {displayTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-cyan-neon w-8"
                      : "bg-cyan-neon/30 hover:bg-cyan-neon/50 w-3"
                  }`}
                  aria-label={`Ir al testimonio ${index + 1}`}
                />
              ))}
            </div>
          </div>
        );

      case "highlight":
        // Single highlighted testimonial
        return (
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
              className={`
                group relative border-2 rounded-2xl p-8 md:p-12 shadow-2xl
                ${
                  bgStyle === "dark"
                    ? "bg-gradient-to-br from-dark-secondary to-dark-primary border-cyan-neon/30 hover:border-cyan-neon/60 hover:shadow-glow-cyan"
                    : "bg-white border-gray-200 hover:border-cyan-neon/40"
                }
                transition-all duration-300
              `}
            >
              <Quote className="text-cyan-neon/40 mb-6" size={64} />

              <p
                className={`
                  text-2xl md:text-3xl font-poppins leading-relaxed mb-8 italic
                  ${bgStyle === "dark" ? "text-gray-100" : "text-gray-800"}
                `}
              >
                "{displayTestimonials[0]?.text || ""}"
              </p>

              <div className="flex items-center gap-4">
                <LazyImage
                  src={displayTestimonials[0]?.image || ""}
                  alt={displayTestimonials[0]?.author || "Client"}
                  className="w-20 h-20 rounded-full border-4 border-cyan-neon/50 object-cover"
                />
                <div className="flex-1">
                  <h4
                    className={`
                      font-orbitron font-bold text-2xl
                      ${bgStyle === "dark" ? "text-white" : "text-gray-900"}
                    `}
                  >
                    {displayTestimonials[0]?.author || ""}
                  </h4>
                  <p className="text-cyan-neon font-rajdhani text-lg font-semibold">
                    {displayTestimonials[0]?.role || ""}
                  </p>
                  <p
                    className={`${
                      bgStyle === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {displayTestimonials[0]?.company || ""}
                  </p>
                </div>
                {displayTestimonials[0]?.linkedin && (
                  <a
                    href={displayTestimonials[0]?.linkedin || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    aria-label={`LinkedIn de ${displayTestimonials[0]?.author || "Client"}`}
                  >
                    <Linkedin size={28} />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        );

      case "grid":
      default:
        // Grid layout (original SocialProof style)
        return (
          <div
            className={`grid md:grid-cols-2 lg:grid-cols-${Math.min(maxItems, 3)} gap-8`}
          >
            {displayTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 30 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: prefersReducedMotion ? 0 : index * 0.15,
                  duration: prefersReducedMotion ? 0 : 0.6,
                }}
                className={`
                  group relative border-2 rounded-xl p-8 transition-all duration-300
                  ${
                    bgStyle === "dark"
                      ? "bg-dark-primary border-gray-700 hover:border-cyan-neon hover:shadow-[0_0_30px_rgba(0,217,255,0.3)]"
                      : "bg-white border-gray-200 hover:border-cyan-neon/40 hover:shadow-xl"
                  }
                `}
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-cyan-neon/20 group-hover:text-cyan-neon/40 transition-colors">
                  <Quote size={40} />
                </div>

                {/* Stars Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote
                  className={`
                    font-poppins text-base leading-relaxed mb-6 relative z-10
                    ${bgStyle === "dark" ? "text-gray-200" : "text-gray-700"}
                  `}
                >
                  "{testimonial.text}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-700">
                  <LazyImage
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-14 h-14 rounded-full border-2 border-cyan-neon/50 object-cover"
                  />
                  <div className="flex-1">
                    <div
                      className={`
                        font-rajdhani font-bold text-lg
                        ${bgStyle === "dark" ? "text-white" : "text-gray-900"}
                      `}
                    >
                      {testimonial.author}
                    </div>
                    <div
                      className={`text-sm ${
                        bgStyle === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-cyan-neon font-semibold">
                      {testimonial.company}
                    </div>
                  </div>
                  {testimonial.linkedin && (
                    <a
                      href={testimonial.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      aria-label={`LinkedIn de ${testimonial.author}`}
                    >
                      <Linkedin size={24} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        );
    }
  };

  return (
    <section
      className={`py-20 ${
        bgStyle === "dark" ? "bg-dark-secondary" : "bg-gray-50"
      } overflow-hidden`}
    >
      <div className="container mx-auto px-4">
        {/* Client Logos (Optional) */}
        {showClientLogos && CLIENT_LOGOS && CLIENT_LOGOS.length > 0 && (
          <motion.div
            className="text-center mb-20"
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          >
            <h3 className="text-sm font-rajdhani text-gray-400 uppercase tracking-widest mb-10">
              Empresas que confían en nosotros
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {CLIENT_LOGOS.map((client, index) => (
                <motion.div
                  key={client.name}
                  className="flex items-center justify-center h-12"
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
                >
                  <LazyImage
                    src={client.logo}
                    alt={client.name}
                    className="h-10 w-auto opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={
            prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-magenta-neon/10 text-magenta-neon font-rajdhani font-semibold text-sm mb-4"
            initial={
              prefersReducedMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.8 }
            }
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
          >
            Nuestro Impacto
          </motion.span>

          <h2
            className={`
              text-4xl md:text-5xl font-orbitron font-bold mb-4
              ${bgStyle === "dark" ? "text-white" : "text-gray-900"}
            `}
          >
            Lo que dicen{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
              nuestros clientes
            </span>
          </h2>
          <p
            className={`
              font-poppins text-lg max-w-2xl mx-auto
              ${bgStyle === "dark" ? "text-gray-200" : "text-gray-600"}
            `}
          >
            Testimonios reales de empresas que confiaron en PibeLabs
          </p>
        </motion.div>

        {/* Testimonials */}
        {renderTestimonials()}

        {/* CTA (Optional) */}
        {showCTA && (
          <motion.div
            className="text-center mt-16"
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.5 }}
          >
            <p
              className={`
                font-poppins mb-6
                ${bgStyle === "dark" ? "text-gray-300" : "text-gray-700"}
              `}
            >
              ¿Quieres ser nuestro próximo caso de éxito?
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-400 hover:to-magenta-400 text-white font-rajdhani font-bold text-lg rounded-xl shadow-[0_0_30px_rgba(0,217,255,0.6)] hover:shadow-[0_0_50px_rgba(0,217,255,0.9)] transition-all duration-300"
            >
              Comencemos tu proyecto →
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
