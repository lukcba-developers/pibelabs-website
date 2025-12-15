import type { ContactFormData, ContactAPIResponse } from "@/types";

/* ============================================
   Contact Adapter - External API to Domain Model
   ============================================ */

/**
 * External API structure for contact submissions
 */
export interface ExternalContactSubmission {
  submission_id: string;
  contact_name: string;
  contact_email: string;
  service_type: string;
  message_content: string;
  status_code: "new" | "in_progress" | "contacted" | "closed";
  created_timestamp: string;
  updated_timestamp?: string;
  priority?: "low" | "medium" | "high";
  assigned_to?: string;
}

/**
 * Adapter for contact form data
 */
export class ContactAdapter {
  /**
   * Convert domain model to external API format
   */
  static toExternal(
    domain: ContactFormData,
  ): Partial<ExternalContactSubmission> {
    return {
      contact_name: domain.name,
      contact_email: domain.email,
      service_type: domain.service,
      message_content: domain.message,
    };
  }

  /**
   * Convert external API response to domain model
   */
  static toDomain(external: ExternalContactSubmission): ContactAPIResponse {
    // Map external status codes to internal status
    const statusMap: Record<string, ContactAPIResponse["status"]> = {
      new: "pending",
      in_progress: "contacted",
      contacted: "qualified",
      closed: "converted",
    };

    return {
      id: external.submission_id,
      status: statusMap[external.status_code] || "pending",
      createdAt: external.created_timestamp,
    };
  }

  /**
   * Validate external data
   */
  static isValid(data: unknown): data is ExternalContactSubmission {
    if (typeof data !== "object" || data === null) return false;

    const submission = data as Record<string, unknown>;

    return (
      typeof submission.submission_id === "string" &&
      typeof submission.contact_name === "string" &&
      typeof submission.contact_email === "string" &&
      typeof submission.created_timestamp === "string"
    );
  }

  /**
   * Safely convert with validation
   */
  static safeToDomain(data: unknown): ContactAPIResponse | null {
    try {
      if (!this.isValid(data)) {
        console.error("Invalid contact submission data:", data);
        return null;
      }
      return this.toDomain(data);
    } catch (error) {
      console.error("Error converting contact submission:", error);
      return null;
    }
  }
}
