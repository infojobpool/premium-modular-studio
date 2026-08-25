import type { StudioLocationId } from "@/lib/locations";
import { vividGalleryImagePool } from "@/lib/vivid-reference";

const MATTHEW_MAKEOVER = "/gallery/matthew-makeover";

/** Real client exterior — daytime shell vs completed night-lit facade (Matthew villa). */
export const MATTHEW_EXTERIOR_BEFORE_AFTER = {
  beforeSrc: `${MATTHEW_MAKEOVER}/makeover-reference.png`,
  afterSrc: `${MATTHEW_MAKEOVER}/exterior-night-facade.png`,
  beforeLabel: "Before",
  afterLabel: "After",
  headline: "Matthew's villa — exterior makeover rework",
  caption:
    "Drag to compare the original facade with the completed transformation: architectural lighting, clean lines, and a presentation-worthy entry—then explore every room inside the case study.",
  caseStudyHref: "/hyderabad/projects/matthew-villa-makeover",
  caseStudyLabel: "View Matthew's full home makeover →",
} as const;

type Common = {
  beforeLabel: string;
  afterLabel: string;
  headline: string;
  caption: string;
  caseStudyHref?: string;
  caseStudyLabel?: string;
};

type PairConfig =
  | ({
      compositeSrc: string;
      beforeIdx?: never;
      afterIdx?: never;
      beforeSrc?: never;
      afterSrc?: never;
    } & Common)
  | ({
      compositeSrc?: undefined;
      beforeIdx: number;
      afterIdx: number;
      beforeSrc?: never;
      afterSrc?: never;
    } & Common)
  | ({
      compositeSrc?: undefined;
      beforeIdx?: never;
      afterIdx?: never;
      beforeSrc: string;
      afterSrc: string;
    } & Common);

const CITY_BEFORE_AFTER: Record<StudioLocationId, PairConfig> = {
  hyderabad: {
    beforeSrc: MATTHEW_EXTERIOR_BEFORE_AFTER.beforeSrc,
    afterSrc: MATTHEW_EXTERIOR_BEFORE_AFTER.afterSrc,
    beforeLabel: MATTHEW_EXTERIOR_BEFORE_AFTER.beforeLabel,
    afterLabel: MATTHEW_EXTERIOR_BEFORE_AFTER.afterLabel,
    headline: MATTHEW_EXTERIOR_BEFORE_AFTER.headline,
    caption: MATTHEW_EXTERIOR_BEFORE_AFTER.caption,
    caseStudyHref: MATTHEW_EXTERIOR_BEFORE_AFTER.caseStudyHref,
    caseStudyLabel: MATTHEW_EXTERIOR_BEFORE_AFTER.caseStudyLabel,
  },
  bhubaneswar: {
    beforeIdx: 4,
    afterIdx: 6,
    beforeLabel: "Spatial study",
    afterLabel: "Resolved render",
    headline: "From humid-site study to locked visualisation",
    caption:
      "Odisha projects start with overlays that respect monsoon light and service cores—then we freeze the render the family signs off before CNC, veneers, and stone move.",
  },
};

export type GalleryBeforeAfterProps =
  | ({
      compositeSrc: string;
      beforeLabel: string;
      afterLabel: string;
      headline: string;
      caption: string;
      caseStudyHref?: string;
      caseStudyLabel?: string;
    } & { beforeSrc?: undefined; afterSrc?: undefined })
  | ({
      beforeSrc: string;
      afterSrc: string;
      beforeLabel: string;
      afterLabel: string;
      headline: string;
      caption: string;
      caseStudyHref?: string;
      caseStudyLabel?: string;
    } & { compositeSrc?: undefined });

/** Flagship compare for the gallery page — indices tuned per studio city. */
export function getGalleryBeforeAfter(city: StudioLocationId): GalleryBeforeAfterProps {
  const p = CITY_BEFORE_AFTER[city];
  const shared = {
    beforeLabel: p.beforeLabel,
    afterLabel: p.afterLabel,
    headline: p.headline,
    caption: p.caption,
    caseStudyHref: p.caseStudyHref,
    caseStudyLabel: p.caseStudyLabel,
  };
  if ("compositeSrc" in p && p.compositeSrc) {
    return { ...shared, compositeSrc: p.compositeSrc };
  }
  if ("beforeSrc" in p && "afterSrc" in p && p.beforeSrc && p.afterSrc) {
    return {
      ...shared,
      beforeSrc: p.beforeSrc,
      afterSrc: p.afterSrc,
    };
  }
  if ("beforeIdx" in p && "afterIdx" in p) {
    const { beforeIdx, afterIdx } = p as { beforeIdx: number; afterIdx: number };
    return {
      ...shared,
      beforeSrc: vividGalleryImagePool[beforeIdx]!,
      afterSrc: vividGalleryImagePool[afterIdx]!,
    };
  }
  throw new Error(`gallery-before-after: invalid config for ${city}`);
}
