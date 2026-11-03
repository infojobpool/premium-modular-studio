import type { GalleryTypology } from "@/lib/gallery-typology";
import { SHEEBA_VILLA_157_GALLERY } from "@/lib/sheeba-villa-157-gallery";

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
    image: `${SHEEBA_VILLA_157_GALLERY}/kitchen-l-grey-2.jpg`,
    alt: "Grey L-shaped modular kitchen with tall storage and window worktop",
  },
  {
    label: "Dining",
    typology: "apartment",
    image: `${SHEEBA_VILLA_157_GALLERY}/dining-from-kitchen.jpg`,
    alt: "Dining table and marble island opening to the kitchen",
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
    image: `${SHEEBA_VILLA_157_GALLERY}/living-curved-sofa-partition.jpg`,
    alt: "Living room with curved sofa and glass partition",
  },
] as const;

export function galleryHref(city: string, typology: GalleryTypology): string {
  if (typology === "all") return `/${city}/gallery#work`;
  return `/${city}/gallery?type=${typology}#work`;
}
