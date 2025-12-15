import type { ContactFormData, ContactAPIResponse, APIResponse } from "@/types";
import { apiClient } from "../api/client";

/* ============================================
   Contact Repository
   ============================================ */

export class ContactRepository {
  private readonly endpoint = "/contact";

  /**
   * Submit contact form
   */
  async submit(data: ContactFormData): Promise<ContactAPIResponse> {
    try {
      const response = await apiClient.post<APIResponse<ContactAPIResponse>>(
        this.endpoint,
        data,
      );

      if (!response.data.success || !response.data.data) {
        throw new Error(
          response.data.error?.message || "Failed to submit contact form",
        );
      }

      return response.data.data;
    } catch (error) {
      console.error("ContactRepository.submit error:", error);
      throw error;
    }
  }

  /**
   * Get submission status by ID
   */
  async getStatus(id: string): Promise<ContactAPIResponse> {
    try {
      const response = await apiClient.get<APIResponse<ContactAPIResponse>>(
        `${this.endpoint}/${id}`,
      );

      if (!response.data.success || !response.data.data) {
        throw new Error(
          response.data.error?.message || "Failed to get submission status",
        );
      }

      return response.data.data;
    } catch (error) {
      console.error("ContactRepository.getStatus error:", error);
      throw error;
    }
  }

  /**
   * Update submission status
   */
  async updateStatus(
    id: string,
    status: ContactAPIResponse["status"],
  ): Promise<ContactAPIResponse> {
    try {
      const response = await apiClient.patch<APIResponse<ContactAPIResponse>>(
        `${this.endpoint}/${id}`,
        { status },
      );

      if (!response.data.success || !response.data.data) {
        throw new Error(
          response.data.error?.message || "Failed to update status",
        );
      }

      return response.data.data;
    } catch (error) {
      console.error("ContactRepository.updateStatus error:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const contactRepository = new ContactRepository();
