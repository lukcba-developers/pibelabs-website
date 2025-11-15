import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import type { PortfolioProject } from "@/types";
import { useFocusTrap, useReducedMotion } from "@/hooks";
import LazyImage from "@/components/atoms/LazyImage";

interface PortfolioModalProps {
  project: PortfolioProject | null;
  isOpen: boolean;
  onClose: () => void;
}

const PortfolioModal = ({ project, isOpen, onClose }: PortfolioModalProps) => {
  const { t } = useTranslation("common");
  const modalRef = useFocusTrap(isOpen);
  const prefersReducedMotion = useReducedMotion();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Prepare image gallery (use gallery if available, otherwise use single image)
  const images = project?.gallery || (project?.image ? [project.image] : []);
  const hasMultipleImages = images.length > 1;

  // Reset carousel when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project?.id]);

  // Carousel navigation functions
  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const goToImage = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  // Handle keyboard navigation (Escape, Arrow Left, Arrow Right)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (hasMultipleImages && e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevious();
      } else if (hasMultipleImages && e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, hasMultipleImages, goToPrevious, goToNext]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={
              prefersReducedMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.9 }
            }
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            className="fixed inset-4 md:inset-16 bg-dark-secondary border-2 border-cyan-neon/30 rounded-2xl z-50 overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white z-10 transition-colors"
              aria-label="Cerrar modal"
            >
              <X size={24} />
            </button>

            <div className="h-full overflow-y-auto p-8 md:p-12">
              {/* Image Carousel - Sprint 6 Enhancement */}
              <div className="relative mb-8 group">
                {/* Carousel Container */}
                <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={currentImageIndex}
                      initial={
                        prefersReducedMotion ? {} : { opacity: 0, x: 100 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      exit={prefersReducedMotion ? {} : { opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      drag={hasMultipleImages ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(_, info) => {
                        if (hasMultipleImages) {
                          const swipeThreshold = 50;
                          if (info.offset.x > swipeThreshold) {
                            goToPrevious();
                          } else if (info.offset.x < -swipeThreshold) {
                            goToNext();
                          }
                        }
                      }}
                      className="absolute inset-0"
                    >
                      <LazyImage
                        src={images[currentImageIndex] ?? project.image}
                        alt={`${project.title} - Imagen ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows - Only show if multiple images */}
                  {hasMultipleImages && (
                    <>
                      {/* Previous Button */}
                      <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black/80
                                 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all
                                 hover:scale-110 focus:opacity-100"
                        aria-label="Imagen anterior"
                      >
                        <ChevronLeft size={24} />
                      </button>

                      {/* Next Button */}
                      <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black/80
                                 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all
                                 hover:scale-110 focus:opacity-100"
                        aria-label="Siguiente imagen"
                      >
                        <ChevronRight size={24} />
                      </button>

                      {/* Image Counter */}
                      <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 rounded-full text-white text-sm font-rajdhani">
                        {currentImageIndex + 1} / {images.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Dot Indicators - Only show if multiple images */}
                {hasMultipleImages && (
                  <div className="flex justify-center gap-2 mt-4">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex
                            ? "bg-cyan-neon w-8"
                            : "bg-gray-500 hover:bg-gray-400"
                        }`}
                        aria-label={`Ir a imagen ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <h2
                    id="modal-title"
                    className="text-3xl md:text-4xl font-orbitron font-bold text-white"
                  >
                    {project.title}
                  </h2>
                  {project.status && (
                    <span
                      className={`px-3 py-1 text-white text-sm font-rajdhani font-semibold rounded-full ${
                        project.status === "production"
                          ? "bg-green-500"
                          : project.status === "development"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                      }`}
                    >
                      {project.status === "production"
                        ? "✓ En Producción"
                        : project.status === "development"
                          ? "🔧 En Desarrollo"
                          : "Completado"}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="px-4 py-2 bg-cyan-neon/20 border border-cyan-neon/40 rounded-lg text-cyan-bright font-rajdhani text-lg">
                    {project.category}
                  </span>
                  <span className="text-gray-400 font-rajdhani text-lg">
                    {project.year}
                  </span>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-orbitron font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-cyan-neon">→</span>
                    Características Principales
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
                      >
                        <Check className="w-5 h-5 text-cyan-neon flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 font-poppins">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              {project.techStack && (
                <div className="mb-8">
                  <h3 className="text-2xl font-orbitron font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-magenta-neon">→</span>
                    Stack Tecnológico
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.techStack.frontend &&
                      project.techStack.frontend.length > 0 && (
                        <div>
                          <h4 className="text-cyan-bright font-rajdhani font-semibold mb-2">
                            Frontend
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.frontend.map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-cyan-neon/10 border border-cyan-neon/30 rounded text-cyan-bright font-poppins text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    {project.techStack.backend &&
                      project.techStack.backend.length > 0 && (
                        <div>
                          <h4 className="text-magenta-bright font-rajdhani font-semibold mb-2">
                            Backend
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.backend.map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-magenta-neon/10 border border-magenta-neon/30 rounded text-magenta-bright font-poppins text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    {project.techStack.database &&
                      project.techStack.database.length > 0 && (
                        <div>
                          <h4 className="text-cyan-bright font-rajdhani font-semibold mb-2">
                            Base de Datos
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.database.map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-cyan-neon/10 border border-cyan-neon/30 rounded text-cyan-bright font-poppins text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    {project.techStack.infrastructure &&
                      project.techStack.infrastructure.length > 0 && (
                        <div>
                          <h4 className="text-magenta-bright font-rajdhani font-semibold mb-2">
                            Infraestructura
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.infrastructure.map(
                              (tech, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-magenta-neon/10 border border-magenta-neon/30 rounded text-magenta-bright font-poppins text-sm"
                                >
                                  {tech}
                                </span>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                    {project.techStack.tools &&
                      project.techStack.tools.length > 0 && (
                        <div className="md:col-span-2">
                          <h4 className="text-cyan-bright font-rajdhani font-semibold mb-2">
                            Herramientas & DevOps
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.tools.map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-white/5 border border-white/20 rounded text-gray-300 font-poppins text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {project.achievements && project.achievements.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-orbitron font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-cyan-neon">→</span>
                    Logros & Métricas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-gradient-to-r from-cyan-neon/10 to-magenta-neon/10 rounded-lg border border-cyan-neon/20"
                      >
                        <span className="text-cyan-neon text-2xl">•</span>
                        <span className="text-gray-300 font-poppins">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="mb-8">
                <h3 className="text-xl font-orbitron font-bold text-white mb-4">
                  Tecnologías Utilizadas
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

              {/* CTA Button */}
              {project.link && (
                <div className="flex gap-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-rajdhani font-bold rounded-xl transition-all"
                  >
                    <ExternalLink size={20} />
                    {t("portfolio.viewProjectLive")}
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PortfolioModal;
