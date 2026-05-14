import type { StudioLocationId } from "@/lib/locations";
import { vividGalleryImagePool } from "@/lib/vivid-reference";

type Common = {
  beforeLabel: string;
  afterLabel: string;
  headline: string;
  caption: string;
};

type PairConfig =
  | ({
      compositeSrc: string;
      beforeIdx?: never;
      afterIdx?: never;
    } & Common)
  | ({
      compositeSrc?: undefined;
      beforeIdx: number;
      afterIdx: number;
    } & Common);

const CITY_BEFORE_AFTER: Record<StudioLocationId, PairConfig> = {
  hyderabad: {
    /** One wide still: left = shell / before, right = furnished / after (same room, same view). */
    compositeSrc: "/gallery/villa-bedroom-before-after.png",
    beforeLabel: "Before",
    afterLabel: "After",
    headline: "Same space — from shell to sanctuary",
    caption:
      "Drag the slider to compare the raw site with the signed-off bedroom scheme: one camera angle, one transformation.",
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
    } & { beforeSrc?: undefined; afterSrc?: undefined })
  | ({
      beforeSrc: string;
      afterSrc: string;
      beforeLabel: string;
      afterLabel: string;
      headline: string;
      caption: string;
    } & { compositeSrc?: undefined });

/** Flagship compare for the gallery page — indices tuned per studio city. */
export function getGalleryBeforeAfter(city: StudioLocationId): GalleryBeforeAfterProps {
  const p = CITY_BEFORE_AFTER[city];
  const shared = {
    beforeLabel: p.beforeLabel,
    afterLabel: p.afterLabel,
    headline: p.headline,
    caption: p.caption,
  };
  if ("compositeSrc" in p && p.compositeSrc) {
    return { ...shared, compositeSrc: p.compositeSrc };
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
