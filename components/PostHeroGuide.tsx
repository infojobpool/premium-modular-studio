"use client";

import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { CityProjectScopeStrip } from "./CityProjectScopeStrip";
import { StudioProcessRibbon } from "./StudioProcessRibbon";

/**
 * Single band below the hero: how the studio works + quick paths by project type.
 */
export function PostHeroGuide() {
  return (
    <section
      className={`border-b border-ink/15 bg-gradient-to-b from-panel/65 via-canvas to-panel/40 ${PAGE_GUTTER_X} py-8 sm:py-10`}
      aria-labelledby="post-hero-guide-heading"
    >
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <header className="mb-8 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent-strong">
            Your studio path
          </p>
          <h2
            id="post-hero-guide-heading"
            className="mt-2 font-display text-2xl tracking-tight text-ink sm:text-[1.85rem]"
          >
            From appointment to handover
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
            What stays consistent on every project — then pick what you&apos;re planning so we send you to
            the right page.
          </p>
        </header>

        <StudioProcessRibbon variant="plain" />

        <div
          className="my-8 h-px w-full bg-gradient-to-r from-transparent via-ink/18 to-transparent"
          aria-hidden
        />

        <CityProjectScopeStrip variant="plain" />
      </div>
    </section>
  );
}
