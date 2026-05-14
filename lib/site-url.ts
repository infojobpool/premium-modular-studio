/**
 * Canonical site origin for Open Graph, JSON-LD, and absolute URLs.
 * Set `NEXT_PUBLIC_SITE_URL` in production (for example `https://viviin2rio.com`).
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw && /^https?:\/\//i.test(raw)) {
    return raw.replace(/\/$/, "");
  }
  return "https://viviin2rio.com";
}
