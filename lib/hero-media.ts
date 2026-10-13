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
      headline: string;
      lead: string;
      statBadge?: string;
    };

/** Set `NEXT_PUBLIC_HERO_VIDEO_URL` to an MP4/WebM URL for a silent looping hero clip (first slide). */
export const HERO_VIDEO_URL =
  typeof process !== "undefined" ? process.env.NEXT_PUBLIC_HERO_VIDEO_URL?.trim() ?? "" : "";

const INTERIORS_HERO = "/gallery/portfolio/living-room-tv-feature-wall.png";
const LANDSCAPE_GARDEN =
  "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1920&q=80";
const ARCHITECTURE_VILLA =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80";

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
        : "Silent loop of the studio and live sites—pause on hover, then explore still frames for detail and finish.",
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
      headline: `Premium interiors in ${cityLabel}`,
      lead: "Living, kitchens, and suites composed as one envelope — palettes, joinery, and light signed off before site.",
      statBadge: "Full-home interiors",
    },
    {
      kind: "image",
      src: LANDSCAPE_GARDEN,
      alt: "Garden landscaping and outdoor rooms",
      eyebrow: "Landscaping",
      headline: "Landscapes that complete the house",
      lead: "Gardens, paths, and outdoor rooms planned with the façade — so the approach and threshold feel designed, not added later.",
      statBadge: "Gardens · courtyards",
    },
    {
      kind: "image",
      src: ARCHITECTURE_VILLA,
      alt: "Architectural villa façade",
      eyebrow: "Architecture",
      headline: "Architecture designed with the interior",
      lead: "Form, sun, and structure first — façades and massing documented so interiors lock to a single roadmap.",
      statBadge: "Architecture designing",
    },
  ];

  const bhubaneswarFrames: HeroSlide[] = [
    {
      kind: "image",
      src: INTERIORS_HERO,
      alt: `Living interior — ${cityLabel}`,
      eyebrow: "Interiors",
      eyebrowHref: `/${cityId}/gallery`,
      headline: `Premium interiors in ${cityLabel}`,
      lead: "Homes shaped for Odisha light, monsoon, and humidity — layered interiors and modular kitchens with English-led documentation.",
      statBadge: "Full-home interiors",
    },
    {
      kind: "image",
      src: LANDSCAPE_GARDEN,
      alt: "Garden landscaping and outdoor rooms",
      eyebrow: "Landscaping",
      headline: "Planting that holds through monsoon",
      lead: "Gardens, lawns, and courtyards specified for Odisha rain and heat — outdoor rooms that stay composed year-round.",
      statBadge: "Gardens · courtyards",
    },
    {
      kind: "image",
      src: ARCHITECTURE_VILLA,
      alt: "Architectural villa façade",
      eyebrow: "Architecture",
      headline: "Plans that respect sun and monsoon",
      lead: "Shell, services, and façade decisions documented together so interiors lock to one Bhubaneswar roadmap.",
      statBadge: "Architecture designing",
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
