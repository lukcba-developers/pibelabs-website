import type { PortfolioProject } from "@/types";

/* ============================================
   Portfolio Adapter - External API to Domain Model
   ============================================ */

/**
 * External API structure for portfolio projects
 */
export interface ExternalPortfolioProject {
  project_id: string;
  project_name: string;
  project_description: string;
  main_image: string;
  image_gallery?: string[];
  category_name: string;
  tag_list: string[];
  project_url?: string;
  github_url?: string;
  is_featured: boolean;
  project_year: number;
  current_status: "live" | "in_development" | "completed" | "archived";
  feature_list?: string[];
  achievement_list?: string[];
  tech_stack?: {
    frontend_technologies?: string[];
    backend_technologies?: string[];
    database_systems?: string[];
    cloud_infrastructure?: string[];
    development_tools?: string[];
  };
}

/**
 * Adapter for portfolio projects
 */
export class PortfolioAdapter {
  /**
   * Convert external project to domain model
   */
  static toDomain(external: ExternalPortfolioProject): PortfolioProject {
    // Map external status to internal status
    const statusMap: Record<string, PortfolioProject["status"]> = {
      live: "production",
      in_development: "development",
      completed: "completed",
      archived: "completed",
    };

    return {
      id: external.project_id,
      title: external.project_name,
      description: external.project_description,
      image: external.main_image,
      gallery: external.image_gallery,
      category: external.category_name,
      tags: external.tag_list,
      link: external.project_url,
      github: external.github_url,
      featured: external.is_featured,
      year: external.project_year,
      status: statusMap[external.current_status] || "completed",
      features: external.feature_list,
      achievements: external.achievement_list,
      techStack: external.tech_stack
        ? {
            frontend: external.tech_stack.frontend_technologies,
            backend: external.tech_stack.backend_technologies,
            database: external.tech_stack.database_systems,
            infrastructure: external.tech_stack.cloud_infrastructure,
            tools: external.tech_stack.development_tools,
          }
        : undefined,
    };
  }

  /**
   * Convert domain model to external format
   */
  static toExternal(domain: PortfolioProject): ExternalPortfolioProject {
    // Map internal status to external status
    const statusMap: Record<
      string,
      ExternalPortfolioProject["current_status"]
    > = {
      production: "live",
      development: "in_development",
      completed: "completed",
    };

    return {
      project_id: domain.id,
      project_name: domain.title,
      project_description: domain.description,
      main_image: domain.image,
      image_gallery: domain.gallery,
      category_name: domain.category,
      tag_list: domain.tags,
      project_url: domain.link,
      github_url: domain.github,
      is_featured: domain.featured || false,
      project_year: domain.year,
      current_status: statusMap[domain.status || "completed"] || "completed",
      feature_list: domain.features,
      achievement_list: domain.achievements,
      tech_stack: domain.techStack
        ? {
            frontend_technologies: domain.techStack.frontend,
            backend_technologies: domain.techStack.backend,
            database_systems: domain.techStack.database,
            cloud_infrastructure: domain.techStack.infrastructure,
            development_tools: domain.techStack.tools,
          }
        : undefined,
    };
  }

  /**
   * Convert array of external projects to domain models
   */
  static toDomainList(
    external: ExternalPortfolioProject[],
  ): PortfolioProject[] {
    return external.map((project) => this.toDomain(project));
  }

  /**
   * Validate external data
   */
  static isValid(data: unknown): data is ExternalPortfolioProject {
    if (typeof data !== "object" || data === null) return false;

    const project = data as Record<string, unknown>;

    return (
      typeof project.project_id === "string" &&
      typeof project.project_name === "string" &&
      typeof project.project_description === "string" &&
      typeof project.main_image === "string" &&
      typeof project.project_year === "number"
    );
  }

  /**
   * Safely convert with validation
   */
  static safeToDomain(data: unknown): PortfolioProject | null {
    try {
      if (!this.isValid(data)) {
        console.error("Invalid portfolio project data:", data);
        return null;
      }
      return this.toDomain(data);
    } catch (error) {
      console.error("Error converting portfolio project:", error);
      return null;
    }
  }

  /**
   * Filter projects by category
   */
  static filterByCategory(
    projects: PortfolioProject[],
    category: string,
  ): PortfolioProject[] {
    if (category === "all") return projects;
    return projects.filter((p) => p.category === category);
  }

  /**
   * Get featured projects
   */
  static getFeatured(projects: PortfolioProject[]): PortfolioProject[] {
    return projects.filter((p) => p.featured === true);
  }

  /**
   * Sort projects by year (newest first)
   */
  static sortByYear(projects: PortfolioProject[]): PortfolioProject[] {
    return [...projects].sort((a, b) => b.year - a.year);
  }
}
