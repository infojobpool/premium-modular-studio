import { interiorImages } from "@/lib/interior-images";
import type { StudioLocationId } from "@/lib/locations";

/** One hero frame: full-bleed media + overlay copy (Asian Paints–style rotating headlines). */
export type HeroSlide =
  | {
      kind: "image";
      src: string;
      alt: string;
      eyebrow: string;
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
      headline: string;
      lead: string;
      statBadge?: string;
    };

/** Set `NEXT_PUBLIC_HERO_VIDEO_URL` to an MP4/WebM URL for a silent looping hero clip (first slide). */
export const HERO_VIDEO_URL =
  typeof process !== "undefined" ? process.env.NEXT_PUBLIC_HERO_VIDEO_URL?.trim() ?? "" : "";

/**
 * Builds distinct interior frames from the Waytowebs media set, each with its own hero headline
 * so the carousel reads like a premium décor brand reel.
 */
export function buildHeroSlides(
  cityLabel: string,
  cityId: StudioLocationId = "hyderabad",
): HeroSlide[] {
  const g = interiorImages.gallery;
  const s = interiorImages.services;
  const slides: HeroSlide[] = [];

  if (HERO_VIDEO_URL) {
    slides.push({
      kind: "video",
      src: HERO_VIDEO_URL,
      poster: interiorImages.hero,
      alt: "Studio walkthrough — ambient film",
      eyebrow: `Premium interiors · ${cityLabel}`,
      headline: "Walk the space before the walls speak",
      lead: "Silent loop of the studio and live sites—pause on hover, then explore still frames for detail and finish.",
      statBadge: "Film · stills · sign-off",
    });
  }

  const frames: HeroSlide[] = [
    {
      kind: "image",
      src: interiorImages.hero,
      alt: `Villa living render — ${cityLabel}`,
      eyebrow: "Contact us",
      headline: `Premium & luxury interiors in ${cityLabel}`,
      lead: "At Vivid In2erio, we design more than spaces — we curate refined lifestyles. By blending timeless aesthetics, intelligent planning, and flawless execution, we deliver premium interiors and architectural solutions tailored for discerning homeowners and forward-thinking businesses.",
      statBadge: "Book your consultation",
    },
    {
      kind: "image",
      src: g[0]!,
      alt: "Open living and dining perspective",
      eyebrow: "Signature composition",
      headline: "Light, proportion, and quiet drama",
      lead: "Layered ceilings, circulation, and views—frozen in drawings before site mobilisation so surprises stay off your timeline.",
      statBadge: "Lakeshore & corridor projects",
    },
    {
      kind: "image",
      src: g[1]!,
      alt: "Interior perspective — warm materials",
      eyebrow: "Kitchens & living",
      headline: "Gather, cook, and reset in one breath",
      lead: "Modular cores, appliance integration, and resilient finishes tuned for heat, humidity, and everyday wear.",
      statBadge: "Modular + bespoke",
    },
    {
      kind: "image",
      src: g[2]!,
      alt: "Interior vignette — joinery detail",
      eyebrow: "Detail that survives Monday",
      headline: "Joinery mocked up before it hits your site",
      lead: "Shop drawings, samples, and lighting studies signed off in-studio—then executed to agreed tolerances on site.",
      statBadge: "Mock-ups · QC",
    },
    {
      kind: "image",
      src: s[0]!,
      alt: "Residential render — architectural volume",
      eyebrow: "Architecture & shell",
      headline: "Plans that respect structure and sun",
      lead: "Spatial clarity first—then interiors, services, and façade decisions lock into one accountable roadmap.",
      statBadge: "Shell to styling",
    },
    {
      kind: "image",
      src: s[1]!,
      alt: "Interior still — materials",
      eyebrow: "Materials library",
      headline: "Finishes you can touch before you commit",
      lead: "Stone, timber, metal, and textiles curated for your climate band—documented in schedules, not left to last-minute swaps.",
      statBadge: "Samples on site",
    },
    {
      kind: "image",
      src: s[2]!,
      alt: "Interior perspective — bedroom",
      eyebrow: "3D & approvals",
      headline: "Photoreal sign-off before procurement",
      lead: "Walkthroughs and stills that freeze decisions—so budgets, lead times, and trades stay aligned to what you approved.",
      statBadge: "Renders · revisions",
    },
  ];

  /** Bhubaneswar opens on a different still so the hero reel feels distinct when switching cities. */
  const orderedFrames =
    cityId === "bhubaneswar"
      ? [...frames.slice(3), ...frames.slice(0, 3)]
      : frames;

  return [...slides, ...orderedFrames];
}
