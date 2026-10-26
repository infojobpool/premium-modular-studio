"use client";

import Link from "next/link";
import { CITY_PAGE_COPY } from "@/lib/city-page-copy";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { FOCUS_RING } from "@/lib/ui-classes";
import { FaqAccordion } from "./FaqAccordion";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

const PREVIEW_COUNT = 4;

export function HomeFaqStrip() {
  const { location } = useStudioLocation();
  const faqs = CITY_PAGE_COPY[location.id].faqs.slice(0, PREVIEW_COUNT);
  const venue = location.id === "hyderabad" ? "office" : "studio";

  return (
    <section
      className={`border-t border-ink/10 bg-canvas pt-12 pb-24 sm:pt-16 sm:pb-28 ${PAGE_GUTTER_X}`}
      aria-labelledby="home-faq-heading"
    >
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-strong">
              FAQ
            </p>
            <h2 id="home-faq-heading" className="mt-2 font-display text-2xl tracking-tight text-ink sm:text-3xl md:text-4xl">
              Before you visit
            </h2>
            <p className="mt-2 max-w-xl text-sm font-medium leading-relaxed text-ink/85 sm:text-base">
              Straight answers on coverage, timelines, and how we work — specific to this {venue}.
            </p>
          </div>
          <Link
            href={`/${location.id}/faq`}
            className={`text-xs font-bold uppercase tracking-[0.18em] text-ink underline-offset-4 hover:underline ${FOCUS_RING}`}
          >
            All questions →
          </Link>
        </Reveal>

        <FaqAccordion faqs={faqs} />
      </div>
    </section>
  );
}
