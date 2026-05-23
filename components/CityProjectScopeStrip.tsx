"use client";

import Link from "next/link";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { useStudioLocation } from "./LocationProvider";

/** Short entry paths for clients who land with a project type in mind. */
const SCOPES = [
  {
    label: "Renovation",
    hint: "Live-in upgrades",
    href: (city: string) => `/${city}/process`,
    featured: true,
  },
  {
    label: "Kitchens & wardrobes",
    hint: "See work",
    href: (city: string) => `/${city}/gallery`,
  },
  {
    label: "Villa / full home",
    hint: "Case studies",
    href: (city: string) => `/${city}/projects`,
  },
] as const;

type Props = {
  variant?: "section" | "plain" | "embedded";
};

export function CityProjectScopeStrip({ variant = "section" }: Props) {
  const { location } = useStudioLocation();
  const c = location.id;

  const cards = (
    <ul
      className={
        variant === "embedded"
          ? "grid gap-2.5 sm:grid-cols-3 sm:gap-3"
          : "mt-3 flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-0.5 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-4 sm:flex-wrap sm:gap-3 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden"
      }
    >
      {SCOPES.map((item) => {
        const featured = "featured" in item && item.featured;
        return (
          <li key={item.label} className={variant === "embedded" ? "min-w-0" : "snap-start"}>
            <Link
              href={item.href(c)}
              className={
                featured
                  ? "group flex h-full min-h-[4.5rem] flex-row items-center justify-between gap-2.5 rounded-xl border border-accent/40 bg-gradient-to-br from-accent/[0.14] via-canvas/98 to-panel/60 px-3.5 py-3 text-left shadow-[0_1px_0_rgba(255,255,255,0.88)_inset,0_12px_32px_-16px_rgba(217,162,41,0.28)] ring-1 ring-accent/20 transition hover:border-accent/55 hover:shadow-[0_16px_40px_-14px_rgba(217,162,41,0.35)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:min-h-[4.75rem] sm:px-4 sm:py-3.5"
                  : "group flex h-full min-h-[4.5rem] flex-row items-center justify-between gap-2.5 rounded-xl border border-ink/16 bg-canvas/90 px-3.5 py-3 text-left shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_4px_16px_-10px_rgba(27,63,46,0.16)] transition hover:border-accent/35 hover:bg-accent/[0.08] hover:shadow-[0_8px_24px_-12px_rgba(27,63,46,0.2)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:min-h-[4.75rem] sm:px-4 sm:py-3.5"
              }
            >
              <span className="min-w-0">
                {featured ? (
                  <span className="mb-1 block text-[8px] font-bold uppercase tracking-[0.18em] text-accent-strong sm:text-[9px]">
                    Popular
                  </span>
                ) : null}
                <span
                  className={
                    featured
                      ? "block font-display text-base font-semibold leading-tight text-ink sm:text-[1.05rem]"
                      : "block text-sm font-semibold leading-tight text-ink"
                  }
                >
                  {item.label}
                </span>
                <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.14em] text-muted sm:text-[10px]">
                  {item.hint}
                </span>
              </span>
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/12 bg-canvas/90 text-ink/70 transition group-hover:border-accent/40 group-hover:bg-accent/15 group-hover:text-ink"
                aria-hidden
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );

  if (variant === "embedded") {
    return cards;
  }

  const body = (
    <>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink/80 sm:tracking-[0.24em]">
          I&apos;m planning
        </p>
        <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted">
          Tap a path — the same studio team guides every enquiry.
        </p>
      </div>
      {cards}
    </>
  );

  if (variant === "plain") {
    return body;
  }

  return (
    <section
      className={`border-b border-ink/10 bg-gradient-to-r from-panel/25 via-canvas to-panel/20 ${PAGE_GUTTER_X} py-4 sm:py-5`}
      aria-label="Start your project"
    >
      <div className={`mx-auto ${CONTENT_MAX}`}>{body}</div>
    </section>
  );
}
