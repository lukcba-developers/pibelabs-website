import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { NAV_LINKS, COMPANY_INFO } from "@/lib/constants/config";

/* ============================================
   Mobile Menu Component (Organism)
   ============================================ */

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const scrollToSection = (href: string) => {
    onClose();
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-gradient-to-br from-dark-secondary via-[#1a1f3a] to-dark-secondary border-l-2 border-cyan-neon shadow-[-20px_0_60px_rgba(0,217,255,0.3)] z-50 overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors p-2"
            >
              <X size={28} />
            </button>

            <div className="p-8">
              <div className="mb-12">
                <h2 className="text-3xl font-orbitron font-bold bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent mb-2">
                  {COMPANY_INFO.name}
                </h2>
                <p className="text-sm text-gray-400 font-rajdhani">
                  {COMPANY_INFO.tagline}
                </p>
              </div>

              <nav className="flex flex-col gap-2 mb-12">
                {NAV_LINKS.map((link, index) => (
                  <motion.button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-left text-xl font-rajdhani font-semibold text-white hover:text-cyan-neon transition-colors py-4 px-4 rounded-lg border-b border-gray-800 hover:border-cyan-neon"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              <button
                onClick={() => scrollToSection("#contact")}
                className="w-full px-8 py-5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-rajdhani font-bold text-xl rounded-xl shadow-[0_0_30px_rgba(0,217,255,0.6)] transition-all"
              >
                Comenzar Proyecto →
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
