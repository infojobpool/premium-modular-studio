export type PracticeStill = {
  src: string;
  alt: string;
  caption: string;
};

export type PracticeSection = {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  stills: readonly PracticeStill[];
};

export type PracticePageCopy = {
  slug: "architecture" | "landscaping";
  eyebrow: string;
  title: string;
  lead: string;
  sibling: { hrefSuffix: "architecture" | "landscaping"; label: string };
  sections: readonly PracticeSection[];
};

const ARCH = "/gallery/architecture";
const LAND = "/gallery/landscaping";
const MATTHEW = "/gallery/matthew-makeover";

export const ARCHITECTURE_PAGE: PracticePageCopy = {
  slug: "architecture",
  eyebrow: "Architecture",
  title: "Façades and walkthroughs",
  lead:
    "Villa and apartment massing, entries, and interior volumes — how the house feels when you walk it.",
  sibling: { hrefSuffix: "landscaping", label: "Landscaping" },
  sections: [
    {
      id: "walkthroughs",
      eyebrow: "Façade",
      title: "Walkthroughs",
      lead: "Façades, entries, and interior volumes — how the plan feels when you walk it.",
      stills: [
        {
          src: `${ARCH}/walkthrough-villa.jpg`,
          alt: "Villa façade and pool court walkthrough",
          caption: "Villa massing · pool court",
        },
        {
          src: `${ARCH}/walkthrough-entry.jpg`,
          alt: "Night entry walkthrough — timber and metal façade",
          caption: "Threshold at dusk",
        },
        {
          src: `${ARCH}/walkthrough-luxury-villa.jpg`,
          alt: "Double-height villa walkthrough opening to the pool",
          caption: "Indoor–outdoor volume",
        },
        {
          src: `${ARCH}/walkthrough-living.jpg`,
          alt: "Open living walkthrough to kitchen and terrace",
          caption: "Living through to kitchen",
        },
        {
          src: `${ARCH}/walkthrough-volume.jpg`,
          alt: "Single-storey pavilion walkthrough beside the pool",
          caption: "Pavilion beside water",
        },
        {
          src: `${ARCH}/walkthrough-white-house.jpg`,
          alt: "Timber and glass house walkthrough from the drive",
          caption: "Approach and cladding",
        },
        {
          src: `${ARCH}/walkthrough-corridor.jpg`,
          alt: "Interior walkthrough — stair, living, and dining as one volume",
          caption: "Stair and living volume",
        },
        {
          src: `${ARCH}/plan-3d-house.jpg`,
          alt: "Contemporary villa massing with terraces and planting",
          caption: "Villa massing · terraces",
        },
        {
          src: `${MATTHEW}/exterior-after-day.png`,
          alt: "Matthew villa façade after makeover — day",
          caption: "Studio project · façade by day",
        },
        {
          src: `${MATTHEW}/exterior-night-facade.png`,
          alt: "Matthew villa façade after makeover — night",
          caption: "Studio project · façade by night",
        },
      ],
    },
  ],
};

export const LANDSCAPING_PAGE: PracticePageCopy = {
  slug: "landscaping",
  eyebrow: "Landscaping",
  title: "Villa gardens and apartment landscapes",
  lead:
    "Private lawns and pool courts for houses — terraces, balconies, and podium planting for apartments — planned with the façade.",
  sibling: { hrefSuffix: "architecture", label: "Architecture" },
  sections: [
    {
      id: "villa",
      eyebrow: "House",
      title: "Villa landscaping",
      lead: "Lawns, drives, pool courts, and tropical planting for independent houses.",
      stills: [
        {
          src: `${LAND}/villa-pool-lawn.jpg`,
          alt: "Villa lawn, stepping stones, and pool court",
          caption: "Villa lawn and pool",
        },
        {
          src: `${LAND}/villa-pool-patio.jpg`,
          alt: "Villa pool deck, pergola, and lawn",
          caption: "Pool deck and pergola",
        },
        {
          src: `${LAND}/villa-tropical-pool.jpg`,
          alt: "Tropical villa pool court with dense planting",
          caption: "Tropical pool court",
        },
        {
          src: `${LAND}/villa-garden-pool.jpg`,
          alt: "Villa garden with pool and olive planting",
          caption: "Garden and pool",
        },
        {
          src: `${LAND}/villa-modern-yard.jpg`,
          alt: "House lawn, terrace, and foundation planting",
          caption: "Lawn and terrace",
        },
        {
          src: `${LAND}/villa-front-lawn.jpg`,
          alt: "Villa front lawn, drive, and entry planting",
          caption: "Front lawn and drive",
        },
        {
          src: `${LAND}/estate-lawn.jpg`,
          alt: "Residence with curved drive, lawn, and foundation planting",
          caption: "Drive, lawn, and planting",
        },
        {
          src: `${LAND}/courtyard-pool.jpg`,
          alt: "Pool court with deck and planting edge",
          caption: "Pool court",
        },
        {
          src: `${LAND}/garden-estate.jpg`,
          alt: "Estate garden path with flowering beds and lawn",
          caption: "Estate walk and lawn",
        },
        {
          src: `${LAND}/garden-formal.jpg`,
          alt: "Formal garden path between flowering hedges",
          caption: "Formal hedge walk",
        },
      ],
    },
    {
      id: "apartment",
      eyebrow: "High-rise",
      title: "Apartment landscaping",
      lead: "Balcony gardens, planted terraces, rooftop courts, and vertical greenery at the building.",
      stills: [
        {
          src: `${LAND}/apartment-green-balconies.jpg`,
          alt: "Apartment balconies planted as a vertical garden",
          caption: "Vertical balcony gardens",
        },
        {
          src: `${LAND}/apartment-terrace-plants.jpg`,
          alt: "Apartment corridor balcony with potted planting",
          caption: "Balcony planting",
        },
        {
          src: `${LAND}/apartment-terrace-nyc.jpg`,
          alt: "Apartment terrace garden above the city",
          caption: "High terrace garden",
        },
        {
          src: `${LAND}/apartment-sky-garden.jpg`,
          alt: "Apartment podium sky garden with planters and lawn",
          caption: "Podium sky garden",
        },
        {
          src: `${LAND}/apartment-roof-pots.jpg`,
          alt: "Rooftop terrace with potted trees and seating",
          caption: "Roof terrace pots",
        },
        {
          src: `${LAND}/tropical-planting.jpg`,
          alt: "Tropical planting understorey — palms and broadleaf",
          caption: "Tropical understorey",
        },
        {
          src: `${LAND}/park-path.jpg`,
          alt: "Tree-lined garden path with lawn and seating",
          caption: "Community walk and lawn",
        },
        {
          src: `${LAND}/tulip-garden.jpg`,
          alt: "Garden pond with trees and layered planting",
          caption: "Pond and layered beds",
        },
      ],
    },
  ],
};
