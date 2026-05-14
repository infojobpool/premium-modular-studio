/** Optional public booking URL (set `NEXT_PUBLIC_CALENDLY_URL` in env). */
export function getCalendlyUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim();
  if (raw && /^https:\/\//i.test(raw)) return raw;
  return null;
}
