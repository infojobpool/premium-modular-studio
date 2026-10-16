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
  title: "Floor plans and walkthroughs",
  lead:
    "Plans first — then façades and spatial walkthroughs — so the house, services, and interiors lock to one roadmap before site.",
  sibling: { hrefSuffix: "landscaping", label: "Landscaping" },
  sections: [
    {
      id: "floor-plans",
      eyebrow: "Drawings",
      title: "Architects’ floor plans",
      lead: "Ground, first floor, and site — rooms, stairs, and outdoor rooms drawn as one set.",
      stills: [
        {
          src: `${ARCH}/floor-plan-ground.jpg`,
          alt: "Ground-floor villa plan — living, kitchen, courtyard",
          caption: "Ground floor · living, kitchen, courtyard",
        },
        {
          src: `${ARCH}/floor-plan-first.jpg`,
          alt: "First-floor villa plan — suites, study, lounge",
          caption: "First floor · suites and study",
        },
        {
          src: `${ARCH}/floor-plan-site.jpg`,
          alt: "Site plan — built form, drive, lawn, and pool court",
          caption: "Site plan · approach and outdoor rooms",
        },
        {
          src: `${ARCH}/floor-plan-blueprint.jpg`,
          alt: "Architect marking a floor plan on the drawing table",
          caption: "Plan review on the board",
        },
      ],
    },
    {
      id: "walkthroughs",
      eyebrow: "Volume",
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
  title: "Gardens, courts, and planting",
  lead:
    "Lawns, paths, and outdoor rooms planned with the façade — so the approach and threshold feel designed, not added later.",
  sibling: { hrefSuffix: "architecture", label: "Architecture" },
  sections: [
    {
      id: "gardens",
      eyebrow: "Outdoors",
      title: "Landscaping",
      lead: "Estate lawns, formal walks, tropical planting, and water courts.",
      stills: [
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
        {
          src: `${LAND}/estate-lawn.jpg`,
          alt: "Residence with curved drive, lawn, and foundation planting",
          caption: "Drive, lawn, and planting",
        },
        {
          src: `${LAND}/tulip-garden.jpg`,
          alt: "Garden pond with trees and layered planting",
          caption: "Pond and layered beds",
        },
        {
          src: `${LAND}/tropical-planting.jpg`,
          alt: "Tropical planting understorey — palms and broadleaf",
          caption: "Tropical understorey",
        },
        {
          src: `${LAND}/garden-path.jpg`,
          alt: "Moss garden path with specimen planting",
          caption: "Moss court and specimens",
        },
        {
          src: `${LAND}/park-path.jpg`,
          alt: "Tree-lined garden path with lawn and seating",
          caption: "Tree walk and lawn",
        },
        {
          src: `${LAND}/courtyard-pool.jpg`,
          alt: "Pool court with deck and planting edge",
          caption: "Pool court",
        },
      ],
    },
  ],
};
