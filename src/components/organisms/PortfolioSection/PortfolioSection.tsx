import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_PROJECTS } from '@/lib/constants/config';
import type { PortfolioProject, PortfolioCategory } from '@/types';

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
const ProjectCard = ({ project }: { project: PortfolioProject }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-neon/80 to-magenta-neon/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {project.link && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-cyan-neon hover:bg-cyan-neon hover:text-white transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Ver proyecto ${project.title}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </motion.a>
          )}
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-cyan-neon hover:bg-cyan-neon hover:text-white transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Ver código de ${project.title}`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </motion.a>
          )}
        </motion.div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-magenta-neon text-white text-xs font-rajdhani font-semibold rounded-full">
            Destacado
          </div>
        )}

        {/* Year Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-dark-primary/80 backdrop-blur-sm text-cyan-neon text-xs font-rajdhani font-semibold rounded-full">
          {project.year}
        </div>
      </div>

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
        <p className="font-poppins text-sm text-text-secondary mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-gray-100 text-text-tertiary text-xs font-poppins rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('all');

  const filteredProjects = activeCategory === 'all'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" className="section bg-light-secondary py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="font-poppins text-text-secondary mb-6">
            ¿Te gustaría ser parte de nuestra próxima historia de éxito?
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
            Iniciar Tu Proyecto
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
