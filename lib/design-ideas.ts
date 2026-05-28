import type { GalleryTypology } from "@/lib/gallery-typology";
import { vividGalleryCoverImageByProjectSlug, vividGalleryImagePool } from "@/lib/vivid-reference";

export type DesignIdeaRoom = {
  label: string;
  typology: GalleryTypology;
  image: string;
  alt: string;
};

/** Room-led inspiration cards — links to `/[city]/gallery?type=…`. */
export const DESIGN_IDEA_ROOMS: readonly DesignIdeaRoom[] = [
  {
    label: "Kitchen",
    typology: "kitchen",
    image: vividGalleryCoverImageByProjectSlug["delhi-kitchen-design"],
    alt: "Modular kitchen interior render",
  },
  {
    label: "Living & dining",
    typology: "villa",
    image: vividGalleryImagePool[1]!,
    alt: "Living and dining interior perspective",
  },
  {
    label: "Wardrobe & storage",
    typology: "apartment",
    image: vividGalleryImagePool[2]!,
    alt: "Wardrobe and storage interior",
  },
  {
    label: "Villa",
    typology: "villa",
    image: vividGalleryCoverImageByProjectSlug["sheeba-villa-157-indukuri"],
    alt: "Villa interior render",
  },
  {
    label: "Apartment",
    typology: "apartment",
    image: vividGalleryImagePool[4]!,
    alt: "Apartment interior perspective",
  },
  {
    label: "Full home",
    typology: "all",
    image: vividGalleryImagePool[0]!,
    alt: "Full home interior composition",
  },
] as const;

export function galleryHref(city: string, typology: GalleryTypology): string {
  if (typology === "all") return `/${city}/gallery#work`;
  return `/${city}/gallery?type=${typology}#work`;
}
