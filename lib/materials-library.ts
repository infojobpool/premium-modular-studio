const P = "/gallery/portfolio";
const SHEEBA = "/gallery/sheeba-villa-157";

export type MaterialSample = {
  name: string;
  category: string;
  image: string;
  alt: string;
};

/** Curated finishes shown on the home page — pairs with in-studio sample library. */
export const MATERIALS_LIBRARY: readonly MaterialSample[] = [
  {
    name: "Walnut veneer",
    category: "Joinery",
    image: `${P}/modular-kitchen-wood-beige.png`,
    alt: "Walnut veneer kitchen joinery",
  },
  {
    name: "Quartz composite",
    category: "Surfaces",
    image: `${P}/galley-kitchen-samsung-fridge.png`,
    alt: "Quartz kitchen countertop",
  },
  {
    name: "Fluted panel",
    category: "Feature walls",
    image: `${SHEEBA}/interior-17-20250505-065527.png`,
    alt: "Marble TV feature wall — Sheeba Villa 157",
  },
  {
    name: "Tinted glass",
    category: "Wardrobes",
    image: `${SHEEBA}/master-bedroom-2-20250505-072915.png`,
    alt: "Walk-in wardrobe and vanity — Sheeba Villa 157",
  },
  {
    name: "Geometric wood",
    category: "Bedrooms",
    image: `${SHEEBA}/master-bedroom.png`,
    alt: "Master suite marble and wood panel — Sheeba Villa 157",
  },
  {
    name: "Layered lighting",
    category: "Ambience",
    image: `${SHEEBA}/living-dining.png`,
    alt: "Layered living and dining lighting — Sheeba Villa 157",
  },
] as const;
