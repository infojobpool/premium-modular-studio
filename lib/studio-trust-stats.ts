/** Home proof row — boutique facts, not factory volume. */
export type StudioTrustStat = {
  kicker: string;
  label: string;
  featured?: boolean;
};

export const STUDIO_TRUST_STATS: readonly StudioTrustStat[] = [
  { kicker: "Two", label: "Cities" },
  { kicker: "Three", label: "Practices" },
  { kicker: "3D", label: "Sign-off first", featured: true },
  { kicker: "Six", label: "Steps" },
  { kicker: "One", label: "Team" },
  { kicker: "Visit", label: "The studio" },
] as const;
