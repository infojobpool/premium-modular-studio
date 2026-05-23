"use client";

import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { CityProjectScopeStrip } from "./CityProjectScopeStrip";

/** Quick paths by project type — shown below the hero. */
export function PostHeroGuide() {
  return (
    <section
      className={`border-b border-ink/15 bg-gradient-to-b from-panel/65 via-canvas to-panel/40 ${PAGE_GUTTER_X} py-8 sm:py-10`}
      aria-labelledby="post-hero-guide-heading"
    >
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <header className="mb-8 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent-strong">
            Start here
          </p>
          <h2
            id="post-hero-guide-heading"
            className="mt-2 font-display text-2xl tracking-tight text-ink sm:text-[1.85rem]"
          >
            What are you planning?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
            Pick a path and we&apos;ll take you to the right page for your project.
          </p>
        </header>

        <CityProjectScopeStrip variant="plain" />
      </div>
    </section>
  );
}
