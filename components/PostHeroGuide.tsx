"use client";

import Link from "next/link";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { FOCUS_RING } from "@/lib/ui-classes";
import { ServiceEntryStrip } from "./ServiceEntryStrip";
import { useStudioLocation } from "./LocationProvider";

/** Quick paths by project type — shown below the hero. */
export function PostHeroGuide() {
  const { location } = useStudioLocation();

  return (
    <section
      className={`relative z-10 -mt-14 border-b border-ink/12 bg-gradient-to-b from-panel/50 via-canvas to-canvas sm:-mt-16 md:-mt-20 lg:-mt-24 ${PAGE_GUTTER_X} pb-5 pt-0 sm:pb-6`}
      aria-labelledby="post-hero-guide-heading"
    >
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <div className="overflow-hidden rounded-[1.25rem] border border-ink/12 bg-gradient-to-br from-canvas/95 via-canvas/90 to-panel/35 p-4 shadow-[0_20px_50px_-20px_rgba(27,63,46,0.18),inset_0_1px_0_rgba(255,255,255,0.75)] sm:rounded-[1.35rem] sm:p-5 md:p-6">
          <div className="grid items-center gap-4 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-6 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[minmax(0,19rem)_minmax(0,1fr)]">
            <header className="min-w-0 md:pr-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-accent-strong">
                Start here
              </p>
              <h2
                id="post-hero-guide-heading"
                className="mt-1.5 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl"
              >
                What are you planning?
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-[0.8125rem] sm:leading-[1.55]">
                Pick a path — we&apos;ll route you to the right studio page.
              </p>
              <Link
                href={`/${location.id}/contact`}
                className={`mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-ink/70 transition hover:text-accent-strong ${FOCUS_RING}`}
              >
                Not sure yet? Talk to us
                <span aria-hidden>→</span>
              </Link>
            </header>

            <div className="min-w-0 md:border-l md:border-ink/10 md:pl-6 lg:pl-8">
              <ServiceEntryStrip />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
