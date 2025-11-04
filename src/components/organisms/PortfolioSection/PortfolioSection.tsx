import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_PROJECTS } from '@/lib/constants/config';
import type { PortfolioProject, PortfolioCategory } from '@/types';
import LazyImage from '@/components/atoms/LazyImage';
import { useReducedMotion } from '@/hooks';
import PortfolioModal from '@/components/organisms/PortfolioModal/PortfolioModal';

/* ============================================
   Portfolio Section Component (Organism)
   ============================================ */

const CATEGORIES: { id: PortfolioCategory; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'web', label: 'Web' },
  { id: 'ia', label: 'IA' },
  { id: 'design', label: 'Diseño' },
  { id: 'cloud', label: 'Cloud' },
];

// Project Card
const ProjectCard = ({
  project,
  prefersReducedMotion,
  onClick
}: {
  project: PortfolioProject;
  prefersReducedMotion: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.div
      layout
      initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      {/* Image */}
      <motion.div
        className="relative h-64 overflow-hidden bg-gray-200"
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
        transition={{ duration: 0.4 }}
      >
        <LazyImage
          src={project.image}
          alt={project.title}
          className="w-full h-full"
        />

        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-neon/80 to-magenta-neon/80 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <motion.div
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-cyan-neon"
            whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.div>
          <div className="text-white font-rajdhani font-semibold text-lg">
            Ver Detalles
          </div>
        </motion.div>

        {/* Status Badge */}
        {project.status && (
          <div className={`absolute top-4 right-4 px-3 py-1 text-white text-xs font-rajdhani font-semibold rounded-full ${
            project.status === 'production' ? 'bg-green-500' :
            project.status === 'development' ? 'bg-yellow-500' :
            'bg-blue-500'
          }`}>
            {project.status === 'production' ? '✓ Producción' :
             project.status === 'development' ? '🔧 En Desarrollo' :
             'Completado'}
          </div>
        )}

        {/* Featured Badge */}
        {project.featured && !project.status && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-magenta-neon text-white text-xs font-rajdhani font-semibold rounded-full">
            Destacado
          </div>
        )}

        {/* Year Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-dark-primary/80 backdrop-blur-sm text-cyan-neon text-xs font-rajdhani font-semibold rounded-full">
          {project.year}
        </div>
      </motion.div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <span className="inline-block px-3 py-1 bg-cyan-neon/10 text-cyan-neon text-xs font-rajdhani font-semibold rounded-full mb-3">
          {project.category}
        </span>

        {/* Title */}
        <h3 className="font-orbitron font-bold text-xl text-gray-dark mb-2 group-hover:text-cyan-neon transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="font-poppins text-sm text-text-secondary mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-gray-100 text-text-tertiary text-xs font-poppins rounded"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 text-text-tertiary text-xs font-poppins rounded">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const filteredProjects = activeCategory === 'all'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(project => project.category === activeCategory);

  const handleProjectClick = (project: PortfolioProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section id="portfolio" className="section bg-light-secondary py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-cyan-neon/10 text-cyan-neon font-rajdhani font-semibold text-sm mb-4"
            initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Nuestro Trabajo
          </motion.span>

          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-gray-dark mb-4">
            Portfolio de <span className="text-cyan-neon">Proyectos</span>
          </h2>

          <p className="font-poppins text-lg text-text-secondary max-w-3xl mx-auto">
            Explora algunos de nuestros proyectos más destacados y descubre cómo
            transformamos ideas en soluciones digitales excepcionales.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
        >
          {CATEGORIES.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                px-6 py-3 rounded-xl font-rajdhani font-semibold transition-all
                ${activeCategory === category.id
                  ? 'bg-gradient-to-r from-cyan-neon to-magenta-neon text-white shadow-glow-cyan'
                  : 'bg-white text-gray-dark hover:bg-gray-100'
                }
              `}
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                prefersReducedMotion={prefersReducedMotion}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="font-poppins text-text-secondary">
              No hay proyectos en esta categoría.
            </p>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.4 }}
        >
          <p className="font-poppins text-text-secondary mb-6">
            ¿Te gustaría ser parte de nuestra próxima historia de éxito?
          </p>
          <motion.button
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-neon to-magenta-neon text-white font-rajdhani font-semibold text-lg hover:shadow-glow-cyan transition-all"
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
            }}
          >
            Iniciar Tu Proyecto
          </motion.button>
        </motion.div>
      </div>

      {/* Portfolio Modal */}
      <PortfolioModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default PortfolioSection;
