import { useCallback } from "react";
import {
  deduplicateRequest,
  generateRequestKey,
  clearCachedRequest,
} from "./deduplication";

export function useDedupedRequest<T>(
  url: string,
  method = "GET",
  options?: { cacheTTL?: number; useCache?: boolean },
) {
  return useCallback(
    async (
      requestFn: () => Promise<T>,
      params?: Record<string, unknown>,
    ): Promise<T> => {
      const key = generateRequestKey(url, method, params);
      return deduplicateRequest(key, requestFn, options);
    },
    [url, method, options?.cacheTTL, options?.useCache],
  );
}

export function useDedupedMutation<T>(
  url: string,
  method = "POST",
  options?: { invalidateKeys?: string[]; cacheTTL?: number },
) {
  const mutate = useCallback(
    async (
      requestFn: () => Promise<T>,
      params?: Record<string, unknown>,
    ): Promise<T> => {
      const key = generateRequestKey(url, method, params);
      const result = await deduplicateRequest(key, requestFn, {
        cacheTTL: options?.cacheTTL,
        useCache: false,
      });

      if (options?.invalidateKeys) {
        options.invalidateKeys.forEach((key) => clearCachedRequest(key));
      }

      return result;
    },
    [url, method, options?.cacheTTL, options?.invalidateKeys],
  );

  const invalidate = useCallback(() => {
    const key = generateRequestKey(url, method);
    clearCachedRequest(key);
  }, [url, method]);

  return { mutate, invalidate };
}

export function useBatchDedupedRequest<T>(
  baseUrl: string,
  options?: { cacheTTL?: number; useCache?: boolean },
) {
  return useCallback(
    async (
      ids: (string | number)[],
      requestFn: (id: string | number) => Promise<T>,
    ): Promise<T[]> => {
      const promises = ids.map((id) => {
        const url = `${baseUrl}${id}`;
        const key = generateRequestKey(url, "GET");
        return deduplicateRequest(key, () => requestFn(id), options);
      });
      return Promise.all(promises);
    },
    [baseUrl, options?.cacheTTL, options?.useCache],
  );
}
