import type { CityGalleryProject } from "./city-page-copy";
import { vividGalleryImagePool, vividImages } from "./vivid-reference";

/** Remote imagery from the live Vivid In2wrio reference build (Waytowebs). */
export const interiorImages = {
  hero: vividImages.hero,
  /** Full pool for gallery grids and case-study heroes (see `vividGalleryImagePool`). */
  gallery: [...vividGalleryImagePool],
  services: [...vividImages.services],
} as const;

/** Horizontal padding from viewport — use on sections + header for alignment */
export const PAGE_GUTTER_X =
  "px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12" as const;

export const CONTENT_MAX = "max-w-[86rem]" as const;

/** Gallery tiles and list cards: prefer `coverImage` when set (reference-site heroes). */
export function resolveGalleryTileSrc(project: CityGalleryProject, listIndex: number): string {
  if (project.coverImage) return project.coverImage;
  return interiorImages.gallery[project.imageIndex ?? listIndex] ?? interiorImages.gallery[0]!;
}
