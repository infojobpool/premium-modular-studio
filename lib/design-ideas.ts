import type { GalleryTypology } from "@/lib/gallery-typology";
import { torriTapovanCoverImage, TORRI_TAPOVAN_GALLERY } from "@/lib/torri-tapovan-gallery";
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
    image: torriTapovanCoverImage,
    alt: "Torri Tapovan Villa living and dining render",
  },
  {
    label: "Wardrobe & storage",
    typology: "apartment",
    image: `${PORTFOLIO_GALLERY}/bedroom-wardrobe-tinted-glass.png`,
    alt: "Wardrobe and storage interior",
  },
  {
    label: "Villa",
    typology: "villa",
    image: `${TORRI_TAPOVAN_GALLERY}/living-dining-hero.png`,
    alt: "Torri Tapovan Villa interior render",
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
    image: `${PORTFOLIO_GALLERY}/living-room-tv-feature-wall.png`,
    alt: "Full home interior composition",
  },
] as const;

export function galleryHref(city: string, typology: GalleryTypology): string {
  if (typology === "all") return `/${city}/gallery#work`;
  return `/${city}/gallery?type=${typology}#work`;
}
