"use client";

import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import type { StudioLocationId } from "@/lib/locations";
import { STUDIO_LOCATIONS } from "@/lib/locations";
import type { TestimonialItem } from "@/lib/reviews/types";
import { CustomerCeoShowcase } from "@/components/CustomerCeoShowcase";
import { CustomerStoriesRail } from "@/components/CustomerStoriesRail";
import { Reveal } from "@/components/Reveal";

type Props = {
  city: StudioLocationId;
  stories: readonly TestimonialItem[];
};

export function CityProjectsIndexContent({ city, stories }: Props) {
  const venue = city === "hyderabad" ? "office" : "studio";

  return (
    <div
      className={`overflow-x-hidden pb-28 sm:pb-36 ${PAGE_GUTTER_X}`}
      style={{ paddingTop: "calc(var(--site-header-offset) + 1.5rem)" }}
    >
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-strong">
            Stories · {STUDIO_LOCATIONS[city].label}
          </p>
          <h1
            id="stories"
            className="mt-4 scroll-mt-28 font-display text-4xl tracking-tight text-ink sm:text-5xl md:text-6xl"
          >
            Customer stories
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
            Homes signed off in 3D, then built — told by clients of the {STUDIO_LOCATIONS[city].label}{" "}
            {venue}.
          </p>
        </Reveal>

        <div className="mt-12 sm:mt-14">
          <CustomerStoriesRail stories={stories} variant="page" />
        </div>

        <CustomerCeoShowcase />
      </div>
    </div>
  );
}
