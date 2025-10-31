import { motion } from 'framer-motion';
import { SERVICES } from '@/lib/constants/config';
import type { Service } from '@/types';

/* ============================================
   Services Grid Component (Organism)
   ============================================ */

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
    >
      {/* Animated gradient background */}
      <motion.div
        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
          isEven 
            ? 'bg-gradient-to-br from-cyan-neon to-cyan-bright'
            : 'bg-gradient-to-br from-magenta-neon to-magenta-bright'
        }`}
      />

      {/* Icon */}
      <div className="relative mb-6">
        <motion.div
          className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${
            isEven
              ? 'bg-cyan-neon/10'
              : 'bg-magenta-neon/10'
          }`}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src={service.icon} 
            alt={`${service.title} icon`}
            className="w-10 h-10"
          />
        </motion.div>

        {/* Corner decoration */}
        <motion.div
          className={`absolute -top-2 -right-2 w-12 h-12 rounded-full blur-xl ${
            isEven ? 'bg-cyan-neon' : 'bg-magenta-neon'
          } opacity-20`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Title */}
      <h3 className="relative font-orbitron font-bold text-2xl text-gray-dark mb-4 group-hover:text-cyan-neon transition-colors">
        {service.title}
      </h3>

      {/* Description */}
      <p className="relative font-poppins text-text-secondary mb-6 leading-relaxed">
        {service.description}
      </p>

      {/* Features */}
      <ul className="relative space-y-2 mb-6">
        {service.features.map((feature, i) => (
          <motion.li
            key={i}
            className="flex items-center gap-2 font-poppins text-sm text-text-tertiary"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <span className={isEven ? 'text-cyan-neon' : 'text-magenta-neon'}>✓</span>
            <span>{feature}</span>
          </motion.li>
        ))}
      </ul>

      {/* Learn More Link */}
      <motion.div
        className="relative inline-flex items-center gap-2 font-rajdhani font-semibold text-cyan-neon cursor-pointer group/link"
        whileHover={{ x: 5 }}
      >
        <span>Más información</span>
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          →
        </motion.span>
      </motion.div>

      {/* Border glow on hover */}
      <motion.div
        className={`absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          isEven ? 'border-cyan-neon' : 'border-magenta-neon'
        }`}
        style={{ pointerEvents: 'none' }}
      />
    </motion.div>
  );
};

const ServicesGrid = () => {
  return (
    <section id="services" className="section bg-light-secondary py-20">
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
            className="inline-block px-4 py-2 rounded-full bg-cyan-neon/10 text-cyan-neon font-rajdhani font-semibold text-sm mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Nuestros Servicios
          </motion.span>

          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-gray-dark mb-4">
            Soluciones <span className="text-cyan-neon">Tecnológicas</span> Integrales
          </h2>

          <p className="font-poppins text-lg text-text-secondary max-w-3xl mx-auto">
            Transformamos tus ideas en productos digitales excepcionales con tecnología de vanguardia
            y un enfoque centrado en resultados.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <p className="font-poppins text-text-secondary mb-6">
            ¿No encuentras lo que necesitas? Trabajamos con soluciones personalizadas.
          </p>
          <motion.button
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-neon to-magenta-neon text-white font-rajdhani font-semibold text-lg hover:shadow-glow-cyan transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Consultar por Proyecto Custom
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
