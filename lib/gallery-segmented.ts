import { CITY_PAGE_COPY } from "@/lib/city-page-copy";
import { interiorImages, resolveGalleryTileSrc } from "@/lib/interior-images";
import type { StudioLocationId } from "@/lib/locations";
import {
  delhiKitchenSegmentedGallery,
  josephKitchenSegmentedGallery,
  sheebaVilla157SegmentedGallery,
  villa173WestSegmentedGallery,
  villa193EastSegmentedGallery,
} from "@/lib/vivid-gallery-segmented";

const HYDERABAD_SEGMENTED_BY_SLUG: Record<string, readonly string[]> = {
  "delhi-kitchen-design": delhiKitchenSegmentedGallery,
  /** Same WP set as Delhi column kitchen stills, reversed so the two kitchen tabs differ slightly in order. */
  "joseph-kitchen-design": [...josephKitchenSegmentedGallery].reverse(),
  "sheeba-villa-157-indukuri": sheebaVilla157SegmentedGallery,
  "villa-173-west-indukuri-lakeshore": villa173WestSegmentedGallery,
  "villa-193-east-indukuri-lakeshore": villa193EastSegmentedGallery,
};

/** Stills for the segmented gallery grid on `/[city]/gallery`. */
export function getGalleryImagesForProject(city: StudioLocationId, slug: string): string[] {
  if (city === "hyderabad") {
    const row = HYDERABAD_SEGMENTED_BY_SLUG[slug];
    if (row) return [...row];
  }
  const projects = CITY_PAGE_COPY[city].galleryProjects;
  const idx = projects.findIndex((p) => p.slug === slug);
  const pool = interiorImages.gallery as readonly string[];
  if (idx < 0) return [];
  const start = (idx * 3 + (slug.length % 4)) % pool.length;
  const hero = resolveGalleryTileSrc(projects[idx]!, idx);
  const out: string[] = [hero];
  for (let k = 1; k < 9; k += 1) {
    out.push(pool[(start + k) % pool.length]!);
  }
  return [...new Set(out)];
}
