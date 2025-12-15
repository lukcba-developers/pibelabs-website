import type { APIResponse } from "@/types";
import { apiClient } from "../api/client";

/* ============================================
   Newsletter Repository
   ============================================ */

interface NewsletterSubscription {
  email: string;
  name?: string;
  source?: string;
}

interface NewsletterResponse {
  id: string;
  email: string;
  subscribedAt: string;
  status: "active" | "pending" | "unsubscribed";
}

export class NewsletterRepository {
  private readonly endpoint = "/newsletter";

  /**
   * Subscribe to newsletter
   */
  async subscribe(data: NewsletterSubscription): Promise<NewsletterResponse> {
    try {
      const response = await apiClient.post<APIResponse<NewsletterResponse>>(
        `${this.endpoint}/subscribe`,
        data,
      );

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error?.message || "Failed to subscribe");
      }

      return response.data.data;
    } catch (error) {
      console.error("NewsletterRepository.subscribe error:", error);
      throw error;
    }
  }

  /**
   * Unsubscribe from newsletter
   */
  async unsubscribe(email: string, token?: string): Promise<void> {
    try {
      const response = await apiClient.post<APIResponse<void>>(
        `${this.endpoint}/unsubscribe`,
        { email, token },
      );

      if (!response.data.success) {
        throw new Error(
          response.data.error?.message || "Failed to unsubscribe",
        );
      }
    } catch (error) {
      console.error("NewsletterRepository.unsubscribe error:", error);
      throw error;
    }
  }

  /**
   * Check subscription status
   */
  async checkStatus(email: string): Promise<NewsletterResponse> {
    try {
      const response = await apiClient.get<APIResponse<NewsletterResponse>>(
        `${this.endpoint}/status`,
        { params: { email } },
      );

      if (!response.data.success || !response.data.data) {
        throw new Error(
          response.data.error?.message || "Failed to check status",
        );
      }

      return response.data.data;
    } catch (error) {
      console.error("NewsletterRepository.checkStatus error:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const newsletterRepository = new NewsletterRepository();
