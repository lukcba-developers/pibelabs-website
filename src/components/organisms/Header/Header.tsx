import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants/config";

/* ============================================
   Header Component (Organism)
   ============================================ */

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      className={`
        fixed top-0 left-0 right-0 z-[100]
        transition-all duration-300
        ${
          isScrolled
            ? "bg-dark-primary/95 backdrop-blur-lg shadow-lg border-b border-cyan-neon/20"
            : "bg-transparent"
        }
      `}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="flex items-center gap-3 group"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#hero");
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="/assets/images/pibelabs-logo-futurista.svg"
              alt="PibeLabs Logo"
              className={`
                h-10 md:h-12 w-auto transition-all duration-300
                group-hover:scale-105
                ${
                  isScrolled
                    ? "drop-shadow-[0_0_8px_rgba(0,217,255,0.4)]"
                    : "drop-shadow-[0_0_12px_rgba(0,217,255,0.6)]"
                }
                group-hover:drop-shadow-[0_0_15px_rgba(0,217,255,0.8)]
              `}
            />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, index) => (
              <motion.a
                key={link.id}
                href={link.href}
                className="
                  relative font-rajdhani font-medium text-white
                  hover:text-cyan-neon transition-colors
                  after:absolute after:bottom-0 after:left-0 after:right-0
                  after:h-0.5 after:bg-cyan-neon after:scale-x-0
                  after:transition-transform after:duration-300
                  hover:after:scale-x-100
                "
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {link.label}
              </motion.a>
            ))}

            {/* CTA Button */}
            <motion.a
              href="#contact"
              className="
                px-6 py-2 rounded-lg
                bg-gradient-to-r from-cyan-neon to-magenta-neon
                font-rajdhani font-semibold text-white
                hover:shadow-glow-cyan
                transition-all duration-300
              "
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contact");
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Iniciar Proyecto
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 w-6"
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                x: "-50%",
                y: isMobileMenuOpen ? "-50%" : "calc(-50% - 6px)",
              }}
            >
              <div className="h-0.5 bg-white"></div>
            </motion.div>
            <motion.div
              className="absolute top-1/2 left-1/2 w-6"
              animate={{
                opacity: isMobileMenuOpen ? 0 : 1,
                x: "-50%",
                y: "-50%",
              }}
            >
              <div className="h-0.5 bg-white"></div>
            </motion.div>
            <motion.div
              className="absolute top-1/2 left-1/2 w-6"
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                x: "-50%",
                y: isMobileMenuOpen ? "-50%" : "calc(-50% + 6px)",
              }}
            >
              <div className="h-0.5 bg-white"></div>
            </motion.div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 py-4 bg-dark-secondary/95 backdrop-blur-lg rounded-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-4 px-4">
                {NAV_LINKS.map((link) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    className="font-rajdhani font-medium text-white hover:text-cyan-neon transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    whileHover={{ x: 10 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  className="
                    px-6 py-2 rounded-lg text-center
                    bg-gradient-to-r from-cyan-neon to-magenta-neon
                    font-rajdhani font-semibold text-white
                  "
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("#contact");
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Iniciar Proyecto
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
