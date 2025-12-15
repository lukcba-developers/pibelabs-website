/* ============================================
   API Types and Interfaces
   ============================================ */

export interface APIError {
  code: string;
  message: string;
  details?: Array<{
    field: string;
    message: string;
    code: string;
  }>;
}

export interface APIMeta {
  requestId: string;
  timestamp: string;
  page?: number;
  perPage?: number;
  total?: number;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: APIError;
  meta?: APIMeta;
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  meta: APIMeta & {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

export interface APIRequestConfig {
  retries?: number;
  timeout?: number;
  cache?: boolean;
  cacheTTL?: number;
}
