import axios, { type AxiosInstance, type AxiosError } from "axios";
import { CONFIG } from "@/lib/constants/config";

/* ============================================
   API Client Configuration
   ============================================ */

export const apiClient: AxiosInstance = axios.create({
  baseURL: CONFIG.apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ============================================
   Request Interceptor
   ============================================ */

apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem("auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request timestamp
    if (config.headers) {
      config.headers["X-Request-Time"] = new Date().toISOString();
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/* ============================================
   Response Interceptor
   ============================================ */

apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (CONFIG.isDevelopment) {
      console.log("API Response:", {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
    }
    return response;
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.response) {
      const { status, data } = error.response;

      // Log errors
      console.error("API Error:", {
        url: error.config?.url,
        status,
        data,
      });

      // Handle specific status codes
      switch (status) {
        case 401:
          // Unauthorized - clear auth and redirect
          localStorage.removeItem("auth_token");
          window.location.href = "/login";
          break;
        case 403:
          console.error("Access forbidden");
          break;
        case 404:
          console.error("Resource not found");
          break;
        case 429:
          console.error("Rate limit exceeded");
          break;
        case 500:
        case 502:
        case 503:
          console.error("Server error - please try again later");
          break;
        default:
          console.error("An error occurred");
      }
    } else if (error.request) {
      // Request made but no response
      console.error("Network error - no response received");
    } else {
      // Request setup error
      console.error("Request error:", error.message);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
