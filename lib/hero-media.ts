import { interiorImages } from "@/lib/interior-images";
import type { StudioLocationId } from "@/lib/locations";
import { torriTapovanCoverImage } from "@/lib/torri-tapovan-gallery";

/** One hero frame: full-bleed media + overlay copy (Asian Paints–style rotating headlines). */
export type HeroSlide =
  | {
      kind: "image";
      src: string;
      alt: string;
      eyebrow: string;
      /** When set, the eyebrow renders as a link (e.g. city contact). */
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

const LANDSCAPE_GARDEN =
  "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1920&q=80";
const LANDSCAPE_COURTYARD =
  "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1920&q=80";
const ARCHITECTURE_VILLA =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80";

/**
 * Auto-swiper frames: interiors, landscaping, and architecture designing.
 */
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
      src: interiorImages.hero,
      alt: `Living interior render — ${cityLabel}`,
      eyebrow: "Interiors",
      eyebrowHref: `/${cityId}/gallery`,
      headline: `Premium & luxury interiors in ${cityLabel}`,
      lead: "At Vivid In2erio, we design more than spaces — we curate refined lifestyles. Layered palettes, artisan joinery, and lighting signed off before site.",
      statBadge: "Living · kitchens · suites",
    },
    {
      kind: "image",
      src: torriTapovanCoverImage,
      alt: "Open-plan living and dining interior",
      eyebrow: "Interiors",
      eyebrowHref: `/${cityId}/gallery`,
      headline: "Rooms composed as one envelope",
      lead: "Living, dining, and kitchens coordinated in one palette—photoreal stills so every joinery line is agreed before procurement.",
      statBadge: "Full-home interiors",
    },
    {
      kind: "image",
      src: LANDSCAPE_GARDEN,
      alt: "Formal garden and landscaping",
      eyebrow: "Landscaping",
      headline: "Gardens that complete the architecture",
      lead: "Planting, paths, and outdoor rooms composed with the façade—so the approach, lawn, and threshold read as one designed landscape.",
      statBadge: "Gardens · courtyards",
    },
    {
      kind: "image",
      src: LANDSCAPE_COURTYARD,
      alt: "Courtyard and outdoor living landscape",
      eyebrow: "Landscaping",
      headline: "Outdoor living, planned with the house",
      lead: "Terraces, water, and shade studies locked with interior floor levels—so decks and gardens feel like rooms you step into.",
      statBadge: "Terraces · outdoor rooms",
    },
    {
      kind: "image",
      src: ARCHITECTURE_VILLA,
      alt: "Architectural villa façade",
      eyebrow: "Architecture designing",
      headline: "Form, sun, and structure first",
      lead: "Concept-led façades and spatial planning—shell, services, and massing documented so interiors lock to a single architectural roadmap.",
      statBadge: "Shell to styling",
    },
    {
      kind: "image",
      src: "/gallery/matthew-makeover/exterior-after-day.png",
      alt: "Completed villa architecture — daytime façade",
      eyebrow: "Architecture designing",
      eyebrowHref: `/${cityId}/projects/matthew-villa-makeover`,
      headline: "Façades you can walk up to",
      lead: "Massing, balcony lines, and entry composition executed on a live villa—architecture designed and delivered with the interior.",
      statBadge: "Built architecture",
    },
  ];

  const bhubaneswarFrames: HeroSlide[] = [
    {
      kind: "image",
      src: interiorImages.hero,
      alt: `Premium residence interior — ${cityLabel}`,
      eyebrow: "Interiors",
      eyebrowHref: `/${cityId}/gallery`,
      headline: `Premium & luxury interiors in ${cityLabel}`,
      lead: "From the Puri Bypass studio we shape homes for Odisha’s light, monsoon, and humidity—layered interiors, modular kitchens, and English-led documentation.",
      statBadge: "Living · kitchens · suites",
    },
    {
      kind: "image",
      src: torriTapovanCoverImage,
      alt: "Open-plan living and dining interior",
      eyebrow: "Interiors",
      eyebrowHref: `/${cityId}/gallery`,
      headline: "Rooms that breathe through the humid months",
      lead: "Cross-ventilation, ceiling rhythm, and finishes chosen for eastern light—living, dining, and kitchens composed as one envelope.",
      statBadge: "Full-home interiors",
    },
    {
      kind: "image",
      src: LANDSCAPE_GARDEN,
      alt: "Formal garden and landscaping",
      eyebrow: "Landscaping",
      headline: "Planting that holds through monsoon",
      lead: "Gardens, lawns, and approach sequences specified for Odisha rain and heat—outdoor rooms that stay composed year-round.",
      statBadge: "Gardens · courtyards",
    },
    {
      kind: "image",
      src: LANDSCAPE_COURTYARD,
      alt: "Courtyard and outdoor living landscape",
      eyebrow: "Landscaping",
      headline: "Courtyards and decks as living space",
      lead: "Shade, water, and landscape-facing decks planned with interior floor levels so outdoor rooms feel continuous with the house.",
      statBadge: "Terraces · outdoor rooms",
    },
    {
      kind: "image",
      src: ARCHITECTURE_VILLA,
      alt: "Architectural villa façade",
      eyebrow: "Architecture designing",
      headline: "Plans that respect structure, sun, and monsoon",
      lead: "Spatial clarity first—shell, services, and façade decisions documented together so interiors lock to one Bhubaneswar roadmap.",
      statBadge: "Shell to styling",
    },
    {
      kind: "image",
      src: "/gallery/matthew-makeover/exterior-after-day.png",
      alt: "Completed villa architecture — daytime façade",
      eyebrow: "Architecture designing",
      headline: "Elevations you can sign off before site",
      lead: "Massing, balcony lines, and entry composition drawn with the interior—so the built house matches the visual you approved.",
      statBadge: "Built architecture",
    },
  ];

  const imageFrames = cityId === "bhubaneswar" ? bhubaneswarFrames : hyderabadFrames;

  return [...slides, ...imageFrames];
}

/** Distinct image stills for the city hero panel (slow crossfade), from an existing slide list. */
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
