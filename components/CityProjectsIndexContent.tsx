"use client";

import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import type { StudioLocationId } from "@/lib/locations";
import { STUDIO_LOCATIONS } from "@/lib/locations";
import type { TestimonialItem } from "@/lib/reviews/types";
import { youtubeThumbnailUrl } from "@/lib/reviews/youtube";
import { CustomerCeoShowcase } from "@/components/CustomerCeoShowcase";
import { CustomerStoriesRail } from "@/components/CustomerStoriesRail";
import { Reveal } from "@/components/Reveal";

type Props = {
  city: StudioLocationId;
  stories: readonly TestimonialItem[];
};

export function CityProjectsIndexContent({ city, stories }: Props) {
  const venue = city === "hyderabad" ? "office" : "studio";
  const cover =
    stories.map((s) => youtubeThumbnailUrl(s.videoUrl ?? "") ?? s.photo).find(Boolean) ?? null;

  return (
    <div
      className="overflow-x-hidden pb-28 sm:pb-36"
      style={{ paddingTop: "calc(var(--site-header-offset) + 1.5rem)" }}
    >
      <div className={PAGE_GUTTER_X}>
        <div className={`mx-auto ${CONTENT_MAX}`}>
          <div className="grid overflow-hidden rounded-[1.75rem] bg-[color-mix(in_oklab,var(--color-panel)_55%,white)] sm:rounded-[2rem] lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 lg:py-14">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-strong">
                Stories · {STUDIO_LOCATIONS[city].label}
              </p>
              <h1
                id="stories"
                className="mt-3 scroll-mt-28 font-display text-4xl tracking-tight text-ink sm:text-5xl md:text-6xl"
              >
                Customer stories
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/80 sm:text-base">
                Homes signed off in 3D, then built — told by clients of the {STUDIO_LOCATIONS[city].label}{" "}
                {venue}.
              </p>
              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-accent-strong">
                {stories.length} {stories.length === 1 ? "film" : "films"}
              </p>
            </Reveal>
            {cover ? (
              <div className="relative min-h-[12rem] sm:min-h-[16rem] lg:min-h-full">
                {/* eslint-disable-next-line @next/next/no-img-element -- YouTube still */}
                <img
                  src={cover}
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className={`mx-auto mt-8 sm:mt-10 ${CONTENT_MAX} ${PAGE_GUTTER_X}`}>
        <CustomerStoriesRail stories={stories} variant="page" />
      </div>

      <CustomerCeoShowcase />
    </div>
  );
}
