import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "@/hooks";

/* ============================================
   Hero Section Component (Organism) - UX/UI Optimized
   ============================================ */

const Hero = () => {
  const { t } = useTranslation(["hero", "stats"]);
  const prefersReducedMotion = useReducedMotion();

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  };

  const scrollToServices = () => {
    const element = document.querySelector("#services");
    if (element) {
      element.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27]"
    >
      {/* Simplified Background with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-magenta-900/20 via-transparent to-transparent"></div>

        {/* Subtle Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(/assets/images/pibelabs-pattern-background.svg)",
            backgroundSize: "600px 600px",
            backgroundRepeat: "repeat",
          }}
        />

        {/* Animated Gradient Orbs - More subtle */}
        <motion.div
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.15, 0.1],
                  x: [0, 50, 0],
                }
          }
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-magenta-500/10 rounded-full filter blur-3xl"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1.2, 1, 1.2],
                  opacity: [0.15, 0.1, 0.15],
                  x: [0, -50, 0],
                }
          }
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Minimal Floating Particles - Reduced from 20 to 8 */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
              style={{
                left: `${(i * 15) % 100}%`,
                top: `${(i * 20) % 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo/Icon - Transparent version with glow effect */}
          <motion.div
            className="inline-flex items-center justify-center mb-8 relative"
            initial={
              prefersReducedMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.8 }
            }
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          >
            {/* Glow effect background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 rounded-full blur-3xl"></div>

            <motion.img
              src="/assets/images/pibelabs-icon-transparent.svg"
              alt="PibeLabs"
              className="w-24 h-24 md:w-32 md:h-32 relative z-10"
              style={{
                filter: "drop-shadow(0 0 20px rgba(0, 217, 255, 0.4))",
              }}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      y: [0, -10, 0],
                    }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Main Title - Improved with better copy */}
          <motion.h1
            className="font-orbitron font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 leading-tight px-4"
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 30 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.8,
              delay: prefersReducedMotion ? 0 : 0.2,
            }}
          >
            <span className="inline-block bg-gradient-to-r from-cyan-400 via-cyan-300 to-magenta-400 bg-clip-text text-transparent drop-shadow-lg">
              {t("headline")}
            </span>
          </motion.h1>

          {/* Subtitle - Enhanced description */}
          <motion.p
            className="font-poppins text-lg md:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto mb-10 leading-relaxed px-4"
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 30 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.8,
              delay: prefersReducedMotion ? 0 : 0.4,
            }}
          >
            {t("subheadline")}
          </motion.p>

          {/* CTA Buttons - More prominent with better copy */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 30 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.8,
              delay: prefersReducedMotion ? 0 : 0.6,
            }}
          >
            {/* Primary CTA - Enhanced */}
            <motion.button
              onClick={scrollToContact}
              className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-rajdhani font-bold text-xl rounded-xl shadow-[0_0_30px_rgba(0,217,255,0.6)] hover:shadow-[0_0_50px_rgba(0,217,255,0.9)] transition-all duration-300 min-w-[280px]"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -3 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <span className="relative z-10">{t("cta")} →</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              onClick={scrollToServices}
              className="group px-10 py-5 bg-transparent border-2 border-cyan-400 hover:border-cyan-300 text-cyan-400 hover:text-cyan-300 font-rajdhani font-bold text-xl rounded-xl hover:bg-cyan-400/10 transition-all duration-300 min-w-[280px]"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -3 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              {t("ctaSecondary")}
            </motion.button>
          </motion.div>

          {/* Stats Counter - NEW */}
          <motion.div
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-8"
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.8,
              delay: prefersReducedMotion ? 0 : 0.8,
            }}
          >
            {[
              { value: "50+", label: t("stats:projects") },
              { value: "98%", label: t("stats:retention") },
              { value: "4sem", label: t("stats:mvp") },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={
                  prefersReducedMotion
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.9 + index * 0.1,
                }}
              >
                <div className="text-3xl md:text-4xl font-orbitron font-bold text-cyan-neon mb-2">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-300 font-rajdhani uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Indicators - Social Proof */}
          <motion.div
            className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-400 text-sm"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 1,
              delay: prefersReducedMotion ? 0 : 1.2,
            }}
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-cyan-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-medium">+150 Proyectos</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-cyan-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">100% Satisfacción</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-cyan-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <span className="font-medium">5 Años Experiencia</span>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: prefersReducedMotion ? 0 : 1.5 }}
          >
            <motion.div
              className="flex flex-col items-center gap-2 text-cyan-400 cursor-pointer"
              animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              onClick={scrollToServices}
            >
              <span className="text-sm font-rajdhani">Explora más</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
