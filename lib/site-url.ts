/**
 * Canonical site origin for Open Graph, JSON-LD, and absolute URLs.
 *
 * **Link previews:** `og:image` uses this origin. If it does not match the URL you share
 * (e.g. you share `*.vercel.app` but this defaults to another domain), thumbnails will break.
 *
 * Priority:
 * 1. `NEXT_PUBLIC_SITE_URL` — set in Vercel to your public site (e.g. `https://yoursite.com`).
 * 2. `VERCEL_URL` — set automatically on Vercel (`https://<deployment>.vercel.app`).
 * 3. Fallback marketing domain (override via env in production).
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit && /^https?:\/\//i.test(explicit)) {
    return explicit.replace(/\/$/, "");
  }
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//i, "").replace(/\/$/, "");
    return `https://${host}`;
  }
  return "https://vividin2erio.com";
}
