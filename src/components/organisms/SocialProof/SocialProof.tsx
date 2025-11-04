import { motion } from 'framer-motion';
import { Quote, Linkedin } from 'lucide-react';
import { TESTIMONIALS, CLIENT_LOGOS } from '@/lib/constants/config';
import LazyImage from '@/components/atoms/LazyImage';
import { useReducedMotion } from '@/hooks';

/* ============================================
   Social Proof Section Component (Organism)
   ============================================ */

const SocialProof = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section-padding bg-dark-secondary">
      <div className="container mx-auto px-4">
        {/* Clients Logos */}
        <motion.div
          className="text-center mb-20"
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
                initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
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

        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
            Lo que dicen{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
              nuestros clientes
            </span>
          </h2>
          <p className="text-gray-200 font-poppins text-lg max-w-2xl mx-auto">
            Testimonios reales de empresas que confiaron en PibeLabs
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.15, duration: prefersReducedMotion ? 0 : 0.6 }}
              className="group relative bg-dark-primary border-2 border-gray-700 rounded-xl p-8 hover:border-cyan-neon transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,217,255,0.3)]"
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
              <blockquote className="text-gray-200 font-poppins text-base leading-relaxed mb-6 relative z-10">
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
                  <div className="font-rajdhani font-bold text-white text-lg">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-400">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-cyan-neon font-semibold">
                    {testimonial.company}
                  </div>
                </div>
                <a
                  href={testimonial.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  aria-label={`LinkedIn de ${testimonial.author}`}
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.5 }}
        >
          <p className="text-gray-300 font-poppins mb-6">
            ¿Quieres ser nuestro próximo caso de éxito?
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-rajdhani font-bold text-lg rounded-xl shadow-[0_0_30px_rgba(0,217,255,0.6)] hover:shadow-[0_0_50px_rgba(0,217,255,0.9)] transition-all duration-300"
          >
            Comencemos tu proyecto →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
