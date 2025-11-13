import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PORTFOLIO_PROJECTS } from "@/lib/constants/config";
import type { PortfolioProject, PortfolioCategory } from "@/types";
import LazyImage from "@/components/atoms/LazyImage";
import { useReducedMotion } from "@/hooks";
import PortfolioModal from "@/components/organisms/PortfolioModal/PortfolioModal";
import { sendEvent, trackPortfolioView } from "@/lib/analytics/googleAnalytics";

/* ============================================
   Portfolio Section Component (Organism)
   ============================================ */

// Project Card
const ProjectCard = ({
  project,
  prefersReducedMotion,
  onClick,
  viewDetailsText,
  statusTexts,
}: {
  project: PortfolioProject;
  prefersReducedMotion: boolean;
  onClick: () => void;
  viewDetailsText: string;
  statusTexts: {
    production: string;
    development: string;
    completed: string;
  };
}) => {
  return (
    <motion.div
      layout
      initial={
        prefersReducedMotion
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.9 }
      }
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
        <motion.div className="absolute inset-0 bg-gradient-to-br from-cyan-neon/80 to-magenta-neon/80 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-cyan-neon"
            whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </motion.div>
          <div className="text-white font-rajdhani font-semibold text-lg">
            {viewDetailsText}
          </div>
        </motion.div>

        {/* Status Badge */}
        {project.status && (
          <div
            className={`absolute top-4 right-4 px-3 py-1 text-white text-xs font-rajdhani font-semibold rounded-full ${
              project.status === "production"
                ? "bg-green-500"
                : project.status === "development"
                  ? "bg-yellow-500"
                  : "bg-blue-500"
            }`}
          >
            {project.status === "production"
              ? statusTexts.production
              : project.status === "development"
                ? statusTexts.development
                : statusTexts.completed}
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
  const { t } = useTranslation(["portfolio", "projects"]);
  const [activeCategory, setActiveCategory] =
    useState<PortfolioCategory>("all");
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Dynamic categories with translations
  const CATEGORIES: { id: PortfolioCategory; label: string }[] = [
    { id: "all", label: t("categories.all") },
    { id: "web", label: t("categories.web") },
    { id: "ia", label: t("categories.ai") },
    { id: "design", label: t("categories.design") },
    { id: "cloud", label: t("categories.cloud") },
  ];

  // Deep linking: Read category from URL hash on mount
  useEffect(() => {
    const params = new URLSearchParams(
      window.location.hash.split("?")[1] || "",
    );
    const category = params.get("category") as PortfolioCategory;

    if (category && CATEGORIES.find((c) => c.id === category)) {
      setActiveCategory(category);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update URL when category changes (deep linking)
  useEffect(() => {
    const baseHash = "#portfolio";
    const newHash =
      activeCategory === "all"
        ? baseHash
        : `${baseHash}?category=${activeCategory}`;

    if (window.location.hash !== newHash) {
      window.history.replaceState(null, "", newHash);
    }
  }, [activeCategory]);

  // Translate projects
  const translatedProjects = PORTFOLIO_PROJECTS.map((project) => {
    // Get translated features
    let features: string[] = project.features || [];
    try {
      const featuresTranslation = t(`projects:${project.id}.features`, {
        returnObjects: true,
        defaultValue: project.features,
      });

      // Handle both array and object formats
      if (featuresTranslation) {
        if (Array.isArray(featuresTranslation)) {
          const validFeatures = featuresTranslation.filter(
            (item): item is string => typeof item === "string",
          );
          if (validFeatures.length > 0) {
            features = validFeatures;
          }
        } else if (typeof featuresTranslation === "object") {
          // Convert object with numeric keys to array
          const featuresArray = Object.values(featuresTranslation);
          const validFeatures = featuresArray.filter(
            (item): item is string => typeof item === "string",
          );
          if (validFeatures.length > 0) {
            features = validFeatures;
          }
        }
      }
    } catch (error) {
      // Use default features
    }

    // Get translated achievements
    let achievements: string[] = project.achievements || [];
    try {
      const achievementsTranslation = t(`projects:${project.id}.achievements`, {
        returnObjects: true,
        defaultValue: project.achievements,
      });

      // Handle both array and object formats
      if (achievementsTranslation) {
        if (Array.isArray(achievementsTranslation)) {
          const validAchievements = achievementsTranslation.filter(
            (item): item is string => typeof item === "string",
          );
          if (validAchievements.length > 0) {
            achievements = validAchievements;
          }
        } else if (typeof achievementsTranslation === "object") {
          // Convert object with numeric keys to array
          const achievementsArray = Object.values(achievementsTranslation);
          const validAchievements = achievementsArray.filter(
            (item): item is string => typeof item === "string",
          );
          if (validAchievements.length > 0) {
            achievements = validAchievements;
          }
        }
      }
    } catch (error) {
      // Use default achievements
    }

    const translated = {
      ...project,
      title: t(`projects:${project.id}.title`, { defaultValue: project.title }),
      description: t(`projects:${project.id}.description`, {
        defaultValue: project.description,
      }),
      features,
      achievements,
    };
    return translated;
  });

  const filteredProjects =
    activeCategory === "all"
      ? translatedProjects
      : translatedProjects.filter(
          (project) => project.category === activeCategory,
        );

  // Count projects by category
  const getCategoryCount = (categoryId: PortfolioCategory): number => {
    if (categoryId === "all") return PORTFOLIO_PROJECTS.length;
    return PORTFOLIO_PROJECTS.filter((p) => p.category === categoryId).length;
  };

  const handleProjectClick = (project: PortfolioProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);

    // Track portfolio project view
    trackPortfolioView(project.id, project.title);
  };

  const handleCategoryChange = (categoryId: PortfolioCategory) => {
    setActiveCategory(categoryId);

    // Track filter change
    sendEvent("portfolio_filter_change", {
      category: categoryId,
      projects_count: getCategoryCount(categoryId),
    });
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
          initial={
            prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-cyan-neon/10 text-cyan-neon font-rajdhani font-semibold text-sm mb-4"
            initial={
              prefersReducedMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.8 }
            }
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {t("badge")}
          </motion.span>

          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-gray-dark mb-4">
            {t("title")} <span className="text-cyan-neon">{t("subtitle")}</span>
          </h2>

          <p className="font-poppins text-lg text-text-secondary max-w-3xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* Category Filter - Enhanced Tabs with Counter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={
            prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
        >
          {CATEGORIES.map((category) => {
            const count = getCategoryCount(category.id);
            const isActive = activeCategory === category.id;

            return (
              <motion.button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`
                  relative px-6 py-3 rounded-xl font-rajdhani font-semibold transition-all
                  ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-neon to-magenta-neon text-white shadow-glow-cyan"
                      : "bg-white text-gray-dark hover:bg-gray-100 border-2 border-transparent hover:border-cyan-neon/20"
                  }
                `}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                layout
              >
                <span className="flex items-center gap-2">
                  {category.label}
                  <span
                    className={`
                    text-xs px-2 py-0.5 rounded-full font-bold
                    ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-cyan-neon/10 text-cyan-neon"
                    }
                  `}
                  >
                    {count}
                  </span>
                </span>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-white/50 rounded-full"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                prefersReducedMotion={prefersReducedMotion}
                onClick={() => handleProjectClick(project)}
                viewDetailsText={t("viewDetails")}
                statusTexts={{
                  production: t("status.production"),
                  development: t("status.development"),
                  completed: t("status.completed"),
                }}
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
              {t("emptyState")}
            </p>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={
            prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.4 }}
        >
          <p className="font-poppins text-text-secondary mb-6">{t("cta")}</p>
          <motion.button
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-neon to-magenta-neon text-white font-rajdhani font-semibold text-lg hover:shadow-glow-cyan transition-all"
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            onClick={() => {
              const element = document.querySelector("#contact");
              if (element)
                element.scrollIntoView({
                  behavior: prefersReducedMotion ? "auto" : "smooth",
                });
            }}
          >
            {t("ctaButton")}
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
