/** Self-hosted Skypark apartment renders under `public/gallery/skypark/`. */
export const SKYPARK_GALLERY = "/gallery/skypark" as const;

const G = SKYPARK_GALLERY;

export const skyparkCoverImage = `${G}/living-tv-feature.jpg`;

export const skyparkSegmentedGallery = [
  `${G}/living-tv-feature.jpg`,
  `${G}/living-sectional.jpg`,
  `${G}/living-dining.jpg`,
  `${G}/dining.jpg`,
  `${G}/living-red-art.jpg`,
  `${G}/living-kitchenette.jpg`,
  `${G}/kitchenette.jpg`,
  `${G}/kitchen-galley.jpg`,
  `${G}/kitchen-galley-corridor.jpg`,
  `${G}/kitchen-sink.jpg`,
  `${G}/powder-room.jpg`,
  `${G}/bedroom-sliding-wardrobe.jpg`,
  `${G}/bedroom-headboard.jpg`,
  `${G}/bedroom-wallpaper.jpg`,
  `${G}/bedroom-wallpaper-side.jpg`,
  `${G}/bedroom-wood-panel.jpg`,
] as const;
