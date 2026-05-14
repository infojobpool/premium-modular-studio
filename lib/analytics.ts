export type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Lightweight tracking helper:
 * - pushes to GTM dataLayer when present
 * - also dispatches a CustomEvent for local debugging/instrumentation
 */
export function trackEvent(event: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;
  const eventPayload = { event, ...payload };
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(eventPayload);
  }
  window.dispatchEvent(new CustomEvent("vivid:track", { detail: eventPayload }));
}
