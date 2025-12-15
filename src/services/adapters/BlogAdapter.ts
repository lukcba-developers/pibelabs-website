import type { BlogPost } from "@/types";

/* ============================================
   Blog Adapter - External API to Domain Model
   ============================================ */

/**
 * External API structure (example from a CMS or third-party API)
 */
export interface ExternalBlogPost {
  post_id: string;
  post_title: string;
  post_content: string;
  post_excerpt: string;
  post_image: string;
  author_name: string;
  author_avatar?: string;
  author_role?: string;
  created_at: string;
  updated_at: string;
  read_time_minutes: number;
  tags: string[];
  category_name: string;
  slug: string;
  is_featured: boolean;
}

/**
 * Adapter to convert external API structure to internal domain model
 */
export class BlogAdapter {
  /**
   * Convert external blog post to domain model
   */
  static toDomain(external: ExternalBlogPost): BlogPost {
    return {
      id: external.post_id,
      title: external.post_title,
      content: external.post_content,
      excerpt: external.post_excerpt,
      image: external.post_image,
      author: {
        name: external.author_name,
        avatar: external.author_avatar,
        role: external.author_role,
      },
      publishedAt: external.created_at,
      readTime: external.read_time_minutes,
      tags: external.tags,
      category: external.category_name,
      slug: external.slug,
      featured: external.is_featured,
    };
  }

  /**
   * Convert domain model to external API structure
   */
  static toExternal(domain: BlogPost): ExternalBlogPost {
    return {
      post_id: domain.id,
      post_title: domain.title,
      post_content: domain.content || "",
      post_excerpt: domain.excerpt,
      post_image: domain.image,
      author_name: domain.author.name,
      author_avatar: domain.author.avatar,
      author_role: domain.author.role,
      created_at: domain.publishedAt,
      updated_at: domain.publishedAt, // Assuming same for simplicity
      read_time_minutes: domain.readTime,
      tags: domain.tags,
      category_name: domain.category,
      slug: domain.slug,
      is_featured: domain.featured || false,
    };
  }

  /**
   * Convert array of external posts to domain models
   */
  static toDomainList(external: ExternalBlogPost[]): BlogPost[] {
    return external.map((post) => this.toDomain(post));
  }

  /**
   * Convert array of domain posts to external models
   */
  static toExternalList(domain: BlogPost[]): ExternalBlogPost[] {
    return domain.map((post) => this.toExternal(post));
  }

  /**
   * Validate external data structure
   */
  static isValid(data: unknown): data is ExternalBlogPost {
    if (typeof data !== "object" || data === null) return false;

    const post = data as Record<string, unknown>;

    return (
      typeof post.post_id === "string" &&
      typeof post.post_title === "string" &&
      typeof post.post_content === "string" &&
      typeof post.author_name === "string" &&
      typeof post.created_at === "string" &&
      Array.isArray(post.tags)
    );
  }

  /**
   * Safely convert with validation
   */
  static safeToDomain(data: unknown): BlogPost | null {
    try {
      if (!this.isValid(data)) {
        console.error("Invalid blog post data:", data);
        return null;
      }
      return this.toDomain(data);
    } catch (error) {
      console.error("Error converting blog post:", error);
      return null;
    }
  }
}
