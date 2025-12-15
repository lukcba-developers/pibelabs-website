import type { BlogPost, APIResponse } from "@/types";
import type { PaginatedResponse } from "../api/types";
import { apiClient } from "../api/client";

/* ============================================
   Blog Repository
   ============================================ */

interface GetBlogPostsParams {
  page?: number;
  perPage?: number;
  category?: string;
  tag?: string;
  featured?: boolean;
}

export class BlogRepository {
  private readonly endpoint = "/blog";

  /**
   * Get all blog posts with pagination and filters
   */
  async getAll(
    params?: GetBlogPostsParams,
  ): Promise<PaginatedResponse<BlogPost>> {
    try {
      const response = await apiClient.get<PaginatedResponse<BlogPost>>(
        this.endpoint,
        { params },
      );

      if (!response.data.success) {
        throw new Error(
          response.data.error?.message || "Failed to fetch blog posts",
        );
      }

      return response.data;
    } catch (error) {
      console.error("BlogRepository.getAll error:", error);
      throw error;
    }
  }

  /**
   * Get single blog post by slug
   */
  async getBySlug(slug: string): Promise<BlogPost> {
    try {
      const response = await apiClient.get<APIResponse<BlogPost>>(
        `${this.endpoint}/${slug}`,
      );

      if (!response.data.success || !response.data.data) {
        throw new Error(
          response.data.error?.message || "Failed to fetch blog post",
        );
      }

      return response.data.data;
    } catch (error) {
      console.error("BlogRepository.getBySlug error:", error);
      throw error;
    }
  }

  /**
   * Get featured blog posts
   */
  async getFeatured(limit: number = 3): Promise<BlogPost[]> {
    try {
      const response = await apiClient.get<APIResponse<BlogPost[]>>(
        `${this.endpoint}/featured`,
        { params: { limit } },
      );

      if (!response.data.success || !response.data.data) {
        throw new Error(
          response.data.error?.message || "Failed to fetch featured posts",
        );
      }

      return response.data.data;
    } catch (error) {
      console.error("BlogRepository.getFeatured error:", error);
      throw error;
    }
  }

  /**
   * Search blog posts
   */
  async search(query: string): Promise<BlogPost[]> {
    try {
      const response = await apiClient.get<APIResponse<BlogPost[]>>(
        `${this.endpoint}/search`,
        { params: { q: query } },
      );

      if (!response.data.success || !response.data.data) {
        throw new Error(
          response.data.error?.message || "Failed to search blog posts",
        );
      }

      return response.data.data;
    } catch (error) {
      console.error("BlogRepository.search error:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const blogRepository = new BlogRepository();
