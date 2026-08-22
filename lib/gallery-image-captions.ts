/** Craft tags and captions keyed by portfolio filename fragments. */
const CAPTION_ENTRIES: ReadonlyArray<{ match: string; tags: string[]; caption: string }> = [
  {
    match: "modular-kitchen-wood-beige",
    tags: ["Walnut veneer", "Quartz top", "Under-cabinet LED"],
    caption: "Modular kitchen — wood canopy, integrated appliances, task lighting",
  },
  {
    match: "galley-kitchen-samsung-fridge",
    tags: ["Galley layout", "Soft-close", "Appliance tower"],
    caption: "Galley kitchen with tall storage and integrated refrigeration",
  },
  {
    match: "living-room-kitchenette",
    tags: ["Open plan", "Subway tile", "Integrated storage"],
    caption: "Open living with kitchenette joinery and layered ambient light",
  },
  {
    match: "modern-dining-room",
    tags: ["Forest green upholstery", "Oak table", "Statement pendant"],
    caption: "Dining room — sculptural pendant, green chairs, warm neutral palette",
  },
  {
    match: "living-room-sectional",
    tags: ["Botanical art", "Nested tables", "Cove lighting"],
    caption: "Living volume with circular wall art and nested bronze tables",
  },
  {
    match: "living-room-tv-feature",
    tags: ["Fluted panel", "Backlit TV wall", "Hidden LED"],
    caption: "Feature wall — timber panel, integrated AV, profile lighting",
  },
  {
    match: "living-room-red-bird",
    tags: ["Open plan", "Studio layout", "Accent art"],
    caption: "Compact living — open kitchen sightline and statement artwork",
  },
  {
    match: "master-bedroom-geometric",
    tags: ["Wood panel", "Cove LED", "Channel headboard"],
    caption: "Master suite — geometric feature wall and warm ambient cove",
  },
  {
    match: "bedroom-wardrobe-tinted",
    tags: ["Tinted glass", "Sliding wardrobe", "Integrated lighting"],
    caption: "Bedroom wardrobe — bronze glass doors and full-height storage",
  },
  {
    match: "bedroom-tan-headboard",
    tags: ["Pattern wallpaper", "Roman blinds", "Floating nightstand"],
    caption: "Guest bedroom — textured wallcovering and tailored wardrobe bank",
  },
];

export function galleryImageMeta(src: string): { tags: string[]; caption: string } | null {
  const lower = src.toLowerCase();
  for (const entry of CAPTION_ENTRIES) {
    if (lower.includes(entry.match)) {
      return { tags: [...entry.tags], caption: entry.caption };
    }
  }
  return null;
}
