"use client";

import { STUDIO_TRUST_STATS } from "@/lib/studio-trust-stats";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { Reveal } from "./Reveal";

export function StudioTrustStrip() {
  return (
    <section className={`border-b border-ink/10 bg-ink py-8 sm:py-9 ${PAGE_GUTTER_X}`} aria-label="Why clients trust Vivid In2erio">
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal>
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4">
            {STUDIO_TRUST_STATS.map((stat) => (
              <li key={stat.label} className="text-center sm:text-left">
                <p className="font-display text-3xl font-semibold tracking-tight text-accent sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-canvas/90">
                  {stat.label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-canvas/60">{stat.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
