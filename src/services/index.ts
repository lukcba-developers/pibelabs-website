/* ============================================
   Services Barrel Export
   ============================================ */

// API Client
export { apiClient } from "./api/client";
export type * from "./api/types";

// Repositories
export {
  contactRepository,
  ContactRepository,
} from "./repositories/ContactRepository";
export { blogRepository, BlogRepository } from "./repositories/BlogRepository";
export {
  newsletterRepository,
  NewsletterRepository,
} from "./repositories/NewsletterRepository";
