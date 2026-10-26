import { interiorImages } from "@/lib/interior-images";
import type { StudioLocationId } from "@/lib/locations";

/** One hero frame: full-bleed media + overlay copy. */
export type HeroSlide =
  | {
      kind: "image";
      src: string;
      alt: string;
      eyebrow: string;
      eyebrowHref?: string;
      workHref?: string;
      headline: string;
      lead: string;
      statBadge?: string;
    }
  | {
      kind: "video";
      src: string;
      alt: string;
      poster?: string;
      eyebrow: string;
      eyebrowHref?: string;
      workHref?: string;
      headline: string;
      lead: string;
      statBadge?: string;
    };

/** Set `NEXT_PUBLIC_HERO_VIDEO_URL` to an MP4/WebM URL for a silent looping hero clip (first slide). */
export const HERO_VIDEO_URL =
  typeof process !== "undefined" ? process.env.NEXT_PUBLIC_HERO_VIDEO_URL?.trim() ?? "" : "";

const INTERIORS_HERO = "/gallery/portfolio/living-room-tv-feature-wall.png";
const LANDSCAPE_GARDEN = "/gallery/landscaping/garden-estate.jpg";
const ARCHITECTURE_VILLA = "/gallery/architecture/walkthrough-villa.jpg";

/** Three practice frames: interiors, landscaping, architecture designing. */
export function buildHeroSlides(
  cityLabel: string,
  cityId: StudioLocationId = "hyderabad",
): HeroSlide[] {
  const slides: HeroSlide[] = [];

  if (HERO_VIDEO_URL) {
    const isBhub = cityId === "bhubaneswar";
    slides.push({
      kind: "video",
      src: HERO_VIDEO_URL,
      poster: interiorImages.hero,
      alt: "Studio walkthrough — ambient film",
      eyebrow: `Premium interiors · ${cityLabel}`,
      headline: isBhub ? "Walk the Bhubaneswar studio and live sites" : "Walk the space before the walls speak",
      lead: isBhub
        ? "Silent loop of the Odisha studio and sites—pause on hover, then explore still frames for materials, joinery, and finish intent tuned to local climate."
        : "Silent loop of the office and live sites—pause on hover, then explore still frames for detail and finish.",
      statBadge: "Film · stills · sign-off",
    });
  }

  const hyderabadFrames: HeroSlide[] = [
    {
      kind: "image",
      src: INTERIORS_HERO,
      alt: `Living interior — ${cityLabel}`,
      eyebrow: "Interiors",
      eyebrowHref: `/${cityId}/gallery`,
      workHref: `/${cityId}/gallery`,
      headline: `Premium interiors\nin ${cityLabel}`,
      lead: "Living, kitchens, and suites composed as one envelope — palettes, joinery, and light signed off before site.",
      statBadge: "Full-home interiors",
    },
    {
      kind: "image",
      src: ARCHITECTURE_VILLA,
      alt: "Architectural villa façade",
      eyebrow: "Architecture",
      eyebrowHref: `/${cityId}/architecture`,
      workHref: `/${cityId}/architecture`,
      headline: "Architecture designed\nwith the interior",
      lead: "Form, sun, and structure first — façades and massing documented so interiors lock to a single roadmap.",
      statBadge: "Architecture designing",
    },
    {
      kind: "image",
      src: LANDSCAPE_GARDEN,
      alt: "Garden landscaping and outdoor rooms",
      eyebrow: "Landscaping",
      eyebrowHref: `/${cityId}/landscaping`,
      workHref: `/${cityId}/landscaping`,
      headline: "Landscapes that\ncomplete the house",
      lead: "Gardens, paths, and outdoor rooms planned with the façade — so the approach and threshold feel designed, not added later.",
      statBadge: "Gardens · courtyards",
    },
  ];

  const bhubaneswarFrames: HeroSlide[] = [
    {
      kind: "image",
      src: INTERIORS_HERO,
      alt: `Living interior — ${cityLabel}`,
      eyebrow: "Interiors",
      eyebrowHref: `/${cityId}/gallery`,
      workHref: `/${cityId}/gallery`,
      headline: `Premium interiors\nin ${cityLabel}`,
      lead: "Homes shaped for Odisha light, monsoon, and humidity — layered interiors and modular kitchens with English-led documentation.",
      statBadge: "Full-home interiors",
    },
    {
      kind: "image",
      src: ARCHITECTURE_VILLA,
      alt: "Architectural villa façade",
      eyebrow: "Architecture",
      eyebrowHref: `/${cityId}/architecture`,
      workHref: `/${cityId}/architecture`,
      headline: "Plans that respect\nsun and monsoon",
      lead: "Shell, services, and façade decisions documented together so interiors lock to one Bhubaneswar roadmap.",
      statBadge: "Architecture designing",
    },
    {
      kind: "image",
      src: LANDSCAPE_GARDEN,
      alt: "Garden landscaping and outdoor rooms",
      eyebrow: "Landscaping",
      eyebrowHref: `/${cityId}/landscaping`,
      workHref: `/${cityId}/landscaping`,
      headline: "Planting that holds\nthrough monsoon",
      lead: "Gardens, lawns, and courtyards specified for Odisha rain and heat — outdoor rooms that stay composed year-round.",
      statBadge: "Gardens · courtyards",
    },
  ];

  const imageFrames = cityId === "bhubaneswar" ? bhubaneswarFrames : hyderabadFrames;
  return [...slides, ...imageFrames];
}

/** Distinct image stills for ambient rotators, from an existing slide list. */
export function pickHeroAmbientFrames(slides: HeroSlide[]): readonly { src: string; alt: string }[] {
  const seen = new Set<string>();
  const out: { src: string; alt: string }[] = [];
  for (const slide of slides) {
    if (slide.kind !== "image") continue;
    if (seen.has(slide.src)) continue;
    seen.add(slide.src);
    out.push({ src: slide.src, alt: slide.alt });
    if (out.length >= 6) break;
  }
  return out;
}
