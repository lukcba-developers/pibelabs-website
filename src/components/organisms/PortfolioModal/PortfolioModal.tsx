import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import type { PortfolioProject } from '@/types';

interface PortfolioModalProps {
  project: PortfolioProject | null;
  isOpen: boolean;
  onClose: () => void;
}

const PortfolioModal = ({ project, isOpen, onClose }: PortfolioModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-4 md:inset-16 bg-dark-secondary border-2 border-cyan-neon/30 rounded-2xl z-50 overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white z-10"
            >
              <X size={24} />
            </button>

            <div className="h-full overflow-y-auto p-8 md:p-12">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
              />

              <h2 className="text-3xl font-orbitron font-bold text-white mb-4">
                {project.title}
              </h2>
              <p className="text-cyan-neon font-rajdhani text-xl mb-6">
                {project.category}
              </p>
              <p className="text-gray-300 text-lg mb-8">
                {project.description}
              </p>

              <div className="mb-8">
                <h3 className="text-xl font-orbitron font-bold text-white mb-4">
                  Tecnologías
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-cyan-neon/20 border border-cyan-neon/40 rounded-lg text-cyan-bright font-rajdhani"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-rajdhani font-bold rounded-xl"
                  >
                    <ExternalLink size={20} />
                    Ver Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-8 py-4 bg-white/10 border-2 border-white/30 text-white font-rajdhani font-bold rounded-xl"
                  >
                    <Github size={20} />
                    Código
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PortfolioModal;
