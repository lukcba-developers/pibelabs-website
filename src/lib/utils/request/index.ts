export {
  deduplicateRequest,
  generateRequestKey,
  clearPendingRequests,
  clearRequestCache,
  clearCachedRequest,
  getPendingRequestsCount,
  getCacheSize,
  cleanupCache,
  createDedupedRequest,
} from "./deduplication";

export {
  useDedupedRequest,
  useDedupedMutation,
  useBatchDedupedRequest,
} from "./hooks";
