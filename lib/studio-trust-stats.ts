/** Home proof row — warranty and service, not factory volume. */
export type StudioTrustStat = {
  kicker: string;
  label: string;
  featured?: boolean;
};

export const STUDIO_TRUST_STATS: readonly StudioTrustStat[] = [
  { kicker: "Since", label: "2010" },
  { kicker: "Premium", label: "Materials" },
  { kicker: "10 Years", label: "Warranty", featured: true },
  { kicker: "3D", label: "Sign-off first" },
  { kicker: "Two", label: "Cities" },
  { kicker: "Lifelong", label: "Service Support" },
] as const;
