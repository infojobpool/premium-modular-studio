/** Browse filters for `/[city]/gallery` project tabs. */
export type GalleryTypology = "all" | "kitchen" | "villa" | "apartment";

export const GALLERY_TYPOLOGY_FILTERS: readonly { id: GalleryTypology; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "kitchen", label: "Kitchens" },
  { id: "villa", label: "Villas" },
  { id: "apartment", label: "Apartments" },
] as const;

export function typologyForProjectSlug(slug: string): Exclude<GalleryTypology, "all"> {
  if (slug.includes("kitchen")) return "kitchen";
  if (slug.includes("villa") || slug.includes("sheeba")) return "villa";
  return "apartment";
}

export function projectMatchesTypology(slug: string, filter: GalleryTypology): boolean {
  if (filter === "all") return true;
  return typologyForProjectSlug(slug) === filter;
}
