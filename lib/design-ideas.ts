import type { GalleryTypology } from "@/lib/gallery-typology";
import {
  sheebaVilla157CoverImage,
  SHEEBA_VILLA_157_GALLERY,
} from "@/lib/sheeba-villa-157-gallery";
import { vividGalleryCoverImageByProjectSlug, PORTFOLIO_GALLERY } from "@/lib/vivid-reference";

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
    image: sheebaVilla157CoverImage,
    alt: "Sheeba Villa 157 — living and dining render",
  },
  {
    label: "Wardrobe & storage",
    typology: "apartment",
    image: `${SHEEBA_VILLA_157_GALLERY}/master-bedroom-2-20250505-072915.png`,
    alt: "Sheeba Villa 157 — integrated wardrobe and vanity",
  },
  {
    label: "Villa",
    typology: "villa",
    image: `${SHEEBA_VILLA_157_GALLERY}/living-room-2-20250525-231150.png`,
    alt: "Sheeba Villa 157 — open-plan living lounge",
  },
  {
    label: "Apartment",
    typology: "apartment",
    image: `${PORTFOLIO_GALLERY}/living-room-red-bird-art.png`,
    alt: "Apartment interior perspective",
  },
  {
    label: "Full home",
    typology: "all",
    image: `${SHEEBA_VILLA_157_GALLERY}/study-workspace.png`,
    alt: "Sheeba Villa 157 — study and full-home coordination",
  },
] as const;

export function galleryHref(city: string, typology: GalleryTypology): string {
  if (typology === "all") return `/${city}/gallery#work`;
  return `/${city}/gallery?type=${typology}#work`;
}
