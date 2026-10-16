"use client";

import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import type { StudioLocationId } from "@/lib/locations";
import { STUDIO_LOCATIONS } from "@/lib/locations";
import type { TestimonialItem } from "@/lib/reviews/types";
import { CustomerStoriesRail } from "@/components/CustomerStoriesRail";
import { Reveal } from "@/components/Reveal";

type Props = {
  city: StudioLocationId;
  stories: readonly TestimonialItem[];
};

export function CityProjectsIndexContent({ city, stories }: Props) {
  return (
    <div className={`pb-24 pt-32 ${PAGE_GUTTER_X}`}>
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-strong sm:text-xs">
            Stories · {STUDIO_LOCATIONS[city].label}
          </p>
          <h1
            id="stories"
            className="mt-3 scroll-mt-28 font-display text-4xl tracking-tight text-ink sm:text-5xl"
          >
            Customer stories
          </h1>
        </Reveal>

        <div className="mt-10">
          <CustomerStoriesRail stories={stories} />
        </div>
      </div>
    </div>
  );
}
