/** Max video upload size for customer review clips. */
export const REVIEW_VIDEO_MAX_BYTES = 25 * 1024 * 1024;

/** Soft limit shown to clients — validated client-side when possible. */
export const REVIEW_VIDEO_MAX_SECONDS = 45;

export const REVIEW_VIDEO_ACCEPT = "video/mp4,video/webm,video/quicktime,.mov";

export const REVIEW_VIDEO_CONTENT_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
] as const;
