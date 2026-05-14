import type { StudioLocationId } from "@/lib/locations";

export type HomeAward = {
  title: string;
  year: string;
  note: string;
};

const SHARED_AWARDS: HomeAward[] = [
  {
    title: "India Design Awards",
    year: "2023",
    note:
      "Innovative Articulation of Aesthetics & Functionality for Luxury Residential Projects.",
  },
  {
    title: "Architecture & Interior Design Excellence",
    year: "2023",
    note:
      "Most Creative & Trusted Interior Design Firm of the Year (Telangana) · Residential Projects.",
  },
  {
    title: "Top 25 Trendsetter Interior Designers India",
    year: "2022",
    note:
      "Special category recognition at National Architecture & Interior Design Excellence Awards.",
  },
  {
    title: "Founder & CEO Recognition",
    year: "2023",
    note: "Awarded to Soubhagya Laxmi Nayak for leadership in luxury residential interiors.",
  },
] as const;

export function homeAwardsForCity(city: StudioLocationId): HomeAward[] {
  void city;
  return [...SHARED_AWARDS];
}
