import { motion } from 'framer-motion';
import { COMPANY_INFO } from '@/lib/constants/config';
import Button from '@/components/atoms/Button';

/* ============================================
   Hero Section Component (Organism)
   ============================================ */

const Hero = () => {
  // Scroll to contact section
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hero Banner Background - Responsive */}
      <div className="absolute inset-0 z-0">
        {/* Desktop */}
        <div className="hidden lg:block absolute inset-0">
          <img 
            src="/assets/images/pibelabs-hero-banner (1).svg" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        {/* Tablet */}
        <div className="hidden md:block lg:hidden absolute inset-0">
          <img 
            src="/assets/images/pibelabs-hero-tablet-1024x600.svg" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        {/* Mobile */}
        <div className="block md:hidden absolute inset-0">
          <img 
            src="/assets/images/pibelabs-hero-mobile-768x600.svg" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        {/* Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(/assets/images/pibelabs-pattern-background.svg)',
            backgroundSize: '400px 400px',
            backgroundRepeat: 'repeat',
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-neon rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Glowing Circles */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-neon rounded-full filter blur-[120px] opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magenta-neon rounded-full filter blur-[120px] opacity-20"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo Icon Isotipo */}
        <motion.div
          className="inline-flex items-center justify-center mb-8"
          variants={itemVariants}
        >
          <motion.img
            src="/assets/images/pibelabs-icon-only.svg"
            alt="PibeLabs Icon"
            className="w-20 h-20 md:w-24 md:h-24"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-orbitron font-black text-5xl md:text-7xl lg:text-8xl text-white mb-6"
          variants={itemVariants}
        >
          <span className="inline-block bg-gradient-to-r from-cyan-neon to-magenta-neon bg-clip-text text-transparent">
            {COMPANY_INFO.name}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-rajdhani text-xl md:text-3xl text-cyan-neon font-medium mb-4"
          variants={itemVariants}
        >
          {COMPANY_INFO.tagline}
        </motion.p>

        {/* Description */}
        <motion.p
          className="font-poppins text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-12"
          variants={itemVariants}
        >
          {COMPANY_INFO.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={scrollToContact}
            ariaLabel="Iniciar proyecto ahora"
          >
            <span className="flex items-center gap-2">
              <span>Iniciar Proyecto</span>
              <span>→</span>
            </span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              const element = document.querySelector('#services');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            ariaLabel="Ver nuestros servicios"
          >
            Ver Servicios
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-cyan-neon cursor-pointer"
            onClick={() => {
              const element = document.querySelector('#services');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className="font-rajdhani text-sm">Descubre más</span>
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
      </motion.div>
    </section>
  );
};

export default Hero;
