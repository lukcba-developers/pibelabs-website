import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { STATS } from '@/lib/constants/config';
import type { Stat } from '@/types';

/* ============================================
   Stats Section Component (Organism)
   ============================================ */

// Animated Counter Component
const AnimatedCounter = ({ 
  value, 
  duration = 2 
}: { 
  value: number; 
  duration?: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString();
      }
    });

    return () => unsubscribe();
  }, [springValue]);

  return <span ref={ref}>0</span>;
};

// Stat Card Component
const StatCard = ({ stat, index }: { stat: Stat; index: number }) => {
  const isNumeric = typeof stat.value === 'number';

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
        {/* Background gradient on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-neon/5 to-magenta-neon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Icon */}
        {stat.icon && (
          <motion.div
            className="mb-4"
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-5xl">{stat.icon}</span>
          </motion.div>
        )}

        {/* Value */}
        <div className="relative mb-2">
          <h3 className="font-orbitron font-bold text-5xl md:text-6xl text-gray-dark group-hover:text-cyan-neon transition-colors">
            {stat.prefix}
            {isNumeric && stat.animateOnScroll ? (
              <AnimatedCounter value={stat.value as number} />
            ) : (
              stat.value
            )}
            {stat.suffix}
          </h3>
        </div>

        {/* Label */}
        <p className="relative font-rajdhani text-lg text-text-secondary group-hover:text-text-primary transition-colors">
          {stat.label}
        </p>

        {/* Decorative corner */}
        <motion.div
          className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-cyan-neon to-magenta-neon rounded-full blur-2xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  );
};

const StatsSection = () => {
  return (
    <section className="section bg-gradient-to-br from-light-secondary via-white to-light-secondary py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 217, 255, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 217, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
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
            Nuestro Impacto
          </motion.span>

          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-gray-dark mb-4">
            Resultados que <span className="text-magenta-neon">Hablan por Sí Solos</span>
          </h2>

          <p className="font-poppins text-lg text-text-secondary max-w-3xl mx-auto">
            Números que reflejan nuestro compromiso con la excelencia y la innovación tecnológica.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>

        {/* Bottom Text */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="font-poppins text-text-secondary">
            Cada número representa horas de dedicación, innovación y{' '}
            <span className="text-magenta-neon font-semibold">compromiso con nuestros clientes</span>.
          </p>
        </motion.div>
      </div>

      {/* Decorative Circles */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-cyan-neon rounded-full filter blur-[100px] opacity-10"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-64 h-64 bg-magenta-neon rounded-full filter blur-[100px] opacity-10"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.15, 0.1, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </section>
  );
};

export default StatsSection;
