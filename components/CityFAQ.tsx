"use client";

import { CITY_PAGE_COPY } from "@/lib/city-page-copy";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { FaqAccordion } from "./FaqAccordion";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

export function CityFAQ() {
  const { location } = useStudioLocation();
  const faqs = CITY_PAGE_COPY[location.id].faqs;
  const venue = location.id === "hyderabad" ? "office" : "studio";

  return (
    <section id="faq" className={`scroll-mt-32 py-24 ${PAGE_GUTTER_X}`}>
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-strong">
            Frequently asked · {location.label}
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl">
            Before you visit
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/80">
            Straight answers on coverage, timelines, and how we work—specific to this {venue}.
          </p>
        </Reveal>

        <FaqAccordion faqs={faqs} />
      </div>
    </section>
  );
}
