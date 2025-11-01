import { motion } from 'framer-motion';
import { COMPANY_INFO, NAV_LINKS } from '@/lib/constants/config';
import Newsletter from '@/components/molecules/Newsletter';

/* ============================================
   Footer Component (Organism)
   ============================================ */

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-dark-primary border-t border-cyan-neon/20">
      <div className="container mx-auto px-4">
        {/* Newsletter Section - NEW */}
        <div className="py-12 border-b border-gray-800">
          <Newsletter />
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <motion.div
            className="col-span-1 md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <img
                  src="/assets/images/pibelabs-icon-only.svg"
                  alt="PibeLabs Logo"
                  className="w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-xl text-white">
                  {COMPANY_INFO.name}
                </h3>
                <p className="font-rajdhani text-xs text-cyan-neon">
                  {COMPANY_INFO.tagline}
                </p>
              </div>
            </div>
            <p className="font-poppins text-sm text-gray-400 max-w-md mb-4">
              {COMPANY_INFO.description}
            </p>
            <div className="flex gap-4">
              {/* Social Links */}
              {Object.entries(COMPANY_INFO.social).map(([platform, url]) => (
                <motion.a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-dark-secondary rounded-lg flex items-center justify-center text-cyan-neon hover:bg-cyan-neon hover:text-dark-primary transition-all"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Visit our ${platform}`}
                >
                  {platform === 'linkedin' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  )}
                  {platform === 'github' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )}
                  {platform === 'twitter' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                    </svg>
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-rajdhani font-bold text-white text-lg mb-4">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="font-poppins text-sm text-gray-400 hover:text-cyan-neon transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-rajdhani font-bold text-white text-lg mb-4">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-cyan-neon text-lg">📧</span>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="font-poppins text-sm text-gray-400 hover:text-cyan-neon transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-neon text-lg">📍</span>
                <span className="font-poppins text-sm text-gray-400">
                  {COMPANY_INFO.location}
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-cyan-neon/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="font-poppins text-sm text-gray-400 text-center md:text-left">
              © {currentYear} {COMPANY_INFO.name}. Todos los derechos reservados.
            </p>
            <p className="font-poppins text-xs text-gray-500 text-center md:text-left">
              Fundado por{' '}
              <a 
                href={COMPANY_INFO.founders?.[0]?.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-neon hover:text-cyan-bright transition-colors"
              >
                {COMPANY_INFO.founders?.[0]?.name}
              </a>
              {' y '}
              <a 
                href={COMPANY_INFO.founders?.[1]?.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-neon hover:text-cyan-bright transition-colors"
              >
                {COMPANY_INFO.founders?.[1]?.name}
              </a>
            </p>
          </div>
          <p className="font-poppins text-xs text-gray-500 text-center md:text-right">
            Diseñado y desarrollado con <span className="text-magenta-neon">❤️</span> y tecnología de vanguardia
          </p>
        </motion.div>

        {/* Scroll to Top Button */}
        <motion.button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-cyan-neon to-magenta-neon rounded-full flex items-center justify-center text-white shadow-glow-cyan hover:shadow-glow-magenta transition-all z-50"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: '100px' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Volver arriba"
        >
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
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
