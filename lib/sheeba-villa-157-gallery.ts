/** Self-hosted Sheeba Villa 157 Indukuri renders under `public/gallery/sheeba-villa-157/`. */
export const SHEEBA_VILLA_157_GALLERY = "/gallery/sheeba-villa-157" as const;

const G = SHEEBA_VILLA_157_GALLERY;

export const sheebaVilla157CoverImage = `${G}/living-dining.png`;

export const sheebaVilla157SegmentedGallery = [
  `${G}/living-dining.png`,
  `${G}/living-dining-2-20250319-223146.png`,
  `${G}/living-dining-3-20250319-231819.png`,
  `${G}/living-dining-4-20250319-231827.png`,
  `${G}/living-dining-5-20250320-012005.png`,
  `${G}/living-dining-6-20250320-012009.png`,
  `${G}/living-dining-7-20250320-012012.png`,
  `${G}/living-dining-8-20250505-084034.png`,
  `${G}/living-room.png`,
  `${G}/living-room-2-20250525-231150.png`,
  `${G}/living-room-3-20250525-231632.png`,
  `${G}/master-bedroom.png`,
  `${G}/master-bedroom-2-20250505-072915.png`,
  `${G}/secondary-bedroom.png`,
  `${G}/secondary-bedroom-2.png`,
  `${G}/secondary-bedroom-3.png`,
  `${G}/secondary-bedroom-4.png`,
  `${G}/secondary-bedroom-5.png`,
  `${G}/study-workspace.png`,
  `${G}/study-workspace-2-20250331-011415.png`,
  `${G}/study-workspace-3-20250331-011417.png`,
  `${G}/ground-floor-entry.png`,
  `${G}/ground-floor-secondary-bedroom.png`,
  `${G}/ground-floor-secondary-bedroom-2.png`,
  `${G}/ground-floor-secondary-bedroom-3.png`,
  `${G}/ground-floor-secondary-bedroom-4.png`,
  `${G}/second-floor-2.png`,
  `${G}/second-floor-3.png`,
  `${G}/second-floor-4.png`,
  `${G}/interior.png`,
  `${G}/interior-2-20250318-091635.png`,
  `${G}/interior-3-20250318-091637.png`,
  `${G}/interior-4-20250318-091640.png`,
  `${G}/interior-5-20250318-091642.png`,
  `${G}/interior-6-20250330-214011.png`,
  `${G}/interior-7-20250330-214014.png`,
  `${G}/interior-8-20250330-214017.png`,
  `${G}/interior-9-20250330-215032.png`,
  `${G}/interior-10-20250330-215035.png`,
  `${G}/interior-11-20250330-215048.png`,
  `${G}/interior-12-20250330-215050.png`,
  `${G}/interior-13-20250330-215058.png`,
  `${G}/interior-14-20250330-215105.png`,
  `${G}/interior-15-20250330-215110.png`,
  `${G}/interior-16-20250330-215116.png`,
  `${G}/interior-17-20250505-065527.png`,
  `${G}/interior-18-20250505-065530.png`,
] as const;

export type SheebaHomeRoom = {
  label: string;
  image: string;
  alt: string;
};

/** Curated room mosaic for the Hyderabad home page. */
export const sheebaVilla157HomeShowcase: readonly SheebaHomeRoom[] = [
  {
    label: "Living & dining",
    image: sheebaVilla157CoverImage,
    alt: "Sheeba Villa 157 — open living and dining with layered lighting",
  },
  {
    label: "Living lounge",
    image: `${G}/living-room-2-20250525-231150.png`,
    alt: "Sheeba Villa 157 — living lounge with art gallery and recreation zone",
  },
  {
    label: "Master suite",
    image: `${G}/master-bedroom.png`,
    alt: "Sheeba Villa 157 — master bedroom with marble feature wall",
  },
  {
    label: "Study & workspace",
    image: `${G}/study-workspace.png`,
    alt: "Sheeba Villa 157 — home office with navy open shelving",
  },
  {
    label: "Guest bedroom",
    image: `${G}/secondary-bedroom.png`,
    alt: "Sheeba Villa 157 — secondary bedroom with integrated wardrobe",
  },
  {
    label: "Dining vignette",
    image: `${G}/living-dining-8-20250505-084034.png`,
    alt: "Sheeba Villa 157 — dining area with marble table and amber chairs",
  },
  {
    label: "TV feature wall",
    image: `${G}/interior-17-20250505-065527.png`,
    alt: "Sheeba Villa 157 — marble TV feature wall with integrated shelving",
  },
  {
    label: "Second floor",
    image: `${G}/second-floor-2.png`,
    alt: "Sheeba Villa 157 — second-floor corridor and vanity",
  },
] as const;
