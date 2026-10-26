import type { GalleryTypology } from "@/lib/gallery-typology";
import { SHEEBA_VILLA_157_GALLERY } from "@/lib/sheeba-villa-157-gallery";
import { PORTFOLIO_GALLERY } from "@/lib/vivid-reference";

export type DesignIdeaRoom = {
  label: string;
  typology: GalleryTypology;
  image: string;
  alt: string;
};

/** Four-room mosaic on city home — kitchen, bedroom, living, dining. */
export const DESIGN_IDEA_ROOMS: readonly DesignIdeaRoom[] = [
  {
    label: "Kitchen",
    typology: "kitchen",
    image: `${PORTFOLIO_GALLERY}/modular-kitchen-wood-beige.png`,
    alt: "Wood and beige modular kitchen",
  },
  {
    label: "Dining",
    typology: "apartment",
    image: `${PORTFOLIO_GALLERY}/modern-dining-room-green-chairs.png`,
    alt: "Dining room with green chairs",
  },
  {
    label: "Bedroom",
    typology: "villa",
    image: `${SHEEBA_VILLA_157_GALLERY}/master-bedroom.png`,
    alt: "Master bedroom interior",
  },
  {
    label: "Living",
    typology: "villa",
    image: `${SHEEBA_VILLA_157_GALLERY}/living-room.png`,
    alt: "Living room with seating and feature wall",
  },
] as const;

export function galleryHref(city: string, typology: GalleryTypology): string {
  if (typology === "all") return `/${city}/gallery#work`;
  return `/${city}/gallery?type=${typology}#work`;
}
