"use client";

import Link from "next/link";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { useStudioLocation } from "./LocationProvider";

/**
 * Compact reassurance after the hero: how appointments and delivery work.
 * Keeps claims practical (no invented warranty terms).
 */
export function StudioProcessRibbon() {
  const { location } = useStudioLocation();

  const items = [
    {
      kicker: "Appointments",
      body: location.hoursSummary,
      href: `/${location.id}/visit` as const,
      cta: "Studio & map",
    },
    {
      kicker: "After your site visit",
      body:
        "Measured drawings and scope clarity before production starts — so approvals stay confident.",
    },
    {
      kicker: "Install & handover",
      body:
        "Factory-built modular with on-site supervision through snag checks and final walkthrough.",
    },
  ] as const;

  return (
    <section
      className={`border-b border-ink/10 bg-gradient-to-b from-panel/40 via-canvas/92 to-canvas ${PAGE_GUTTER_X} py-6 sm:py-7`}
      aria-label="How we work with you"
    >
      <div className={`relative mx-auto ${CONTENT_MAX}`}>
        <ul className="grid gap-5 sm:grid-cols-3 sm:gap-6 lg:gap-8">
          {items.map((item) => (
            <li
              key={item.kicker}
              className="rounded-2xl border border-ink/10 bg-canvas/55 px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-sm sm:px-5 sm:py-4"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-accent-strong sm:text-[11px]">
                {item.kicker}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/90 sm:text-[0.95rem]">{item.body}</p>
              {"href" in item ? (
                <p className="mt-2.5">
                  <Link
                    href={item.href}
                    className="inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-ink underline-offset-4 transition hover:text-accent-strong hover:underline"
                  >
                    {item.cta}
                    <span aria-hidden className="ml-1">
                      →
                    </span>
                  </Link>
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
