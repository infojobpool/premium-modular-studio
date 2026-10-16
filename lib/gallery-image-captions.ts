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
  {
    match: "matthew-makeover/exterior-night",
    tags: ["Façade lighting", "Exterior rework", "Night presentation"],
    caption: "Matthew residence — exterior makeover with layered architectural lighting",
  },
  {
    match: "matthew-makeover/kitchen-l-shape",
    tags: ["Powder-blue joinery", "Marble backsplash", "Integrated appliances"],
    caption: "Modular L-kitchen — powder-blue cabinets, marble splash, under-cabinet LED",
  },
  {
    match: "matthew-makeover/stairwell-spiral",
    tags: ["Globe pendants", "Glass railing", "Sculptural lighting"],
    caption: "Stairwell — cascading globe pendants and glass guard rework",
  },
  {
    match: "matthew-makeover/living-tv-feature",
    tags: ["Marble panel", "Wood slats", "Cove LED"],
    caption: "Living feature wall — marble TV panel with timber slats and cove lighting",
  },
  {
    match: "torri-tapovan-villa/living-dining-partition",
    tags: ["Living & dining", "Bar volume", "Timber partition"],
    caption: "Torri Tapovan Villa — open living, dining, and bar with arched partition",
  },
  {
    match: "torri-tapovan-villa/modular-kitchen",
    tags: ["U-kitchen", "Display cabinets", "Breakfast bar"],
    caption: "Modular U-kitchen — glass uppers, task LED, and breakfast bar",
  },
  {
    match: "torri-tapovan-villa/master-bedroom-glass",
    tags: ["Tinted glass", "Boiserie", "Cove lighting"],
    caption: "Master suite — glass wardrobes and scalloped headboard wall",
  },
  {
    match: "sheeba-villa-157/living-dining",
    tags: ["Living & dining", "Circular rug", "Layered lighting"],
    caption: "Sheeba Villa 157 — open living and dining with organic rug and cove lighting",
  },
  {
    match: "sheeba-villa-157/master-bedroom",
    tags: ["Marble panel", "Wood slats", "Cove LED"],
    caption: "Master suite — marble feature wall with integrated wardrobe bank",
  },
  {
    match: "sheeba-villa-157/study-workspace",
    tags: ["Home office", "Navy shelf", "Floating desk"],
    caption: "Study — floating desk with navy open shelving and integrated storage",
  },
  {
    match: "sheeba-villa-157/secondary-bedroom",
    tags: ["Guest suite", "Integrated wardrobe", "Window seat"],
    caption: "Guest bedroom — built-in wardrobe and window seat with layered textiles",
  },
  {
    match: "sheeba-villa-157/interior-17",
    tags: ["Marble TV wall", "Open shelving", "Fluted band"],
    caption: "Living feature wall — marble panels, recessed TV niche, and display shelving",
  },
  {
    match: "skypark/living-tv-feature",
    tags: ["TV wall", "Backlit timber", "Living"],
    caption: "Skypark living — timber TV wall with profile lighting",
  },
  {
    match: "skypark/kitchen-galley",
    tags: ["Galley kitchen", "Gloss shutters", "Task lighting"],
    caption: "Skypark kitchen — gloss galley with granite worktop",
  },
  {
    match: "skypark/bedroom",
    tags: ["Sliding wardrobe", "Suite", "Cove lighting"],
    caption: "Skypark bedroom — sliding wardrobe and layered lighting",
  },
  {
    match: "skypark/powder-room",
    tags: ["Powder room", "Stone ledge", "Pendant lighting"],
    caption: "Skypark powder room — stone basin ledge and sculptural pendants",
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
