const P = "/gallery/portfolio";

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
    image: `${P}/living-room-tv-feature-wall.png`,
    alt: "Fluted wood TV feature wall",
  },
  {
    name: "Tinted glass",
    category: "Wardrobes",
    image: `${P}/bedroom-wardrobe-tinted-glass.png`,
    alt: "Tinted glass wardrobe doors",
  },
  {
    name: "Geometric wood",
    category: "Bedrooms",
    image: `${P}/master-bedroom-geometric-panel.png`,
    alt: "Geometric wood bedroom panel",
  },
  {
    name: "Layered lighting",
    category: "Ambience",
    image: `${P}/living-room-sectional-circular-art.png`,
    alt: "Layered living room lighting",
  },
] as const;
