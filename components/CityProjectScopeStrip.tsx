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

export function CityProjectScopeStrip({ variant = "section" }: { variant?: "section" | "plain" }) {
  const { location } = useStudioLocation();
  const c = location.id;

  const body = (
    <>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-ink sm:tracking-[0.26em]">
            I&apos;m planning
          </p>
          <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted sm:text-sm">
            Tap a path — you can change direction anytime; the same studio team guides enquiries.
          </p>
        </div>
      </div>
      <ul className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-5 sm:flex-wrap sm:gap-3 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
        {SCOPES.map((item) => {
          const featured = "featured" in item && item.featured;
          return (
          <li key={item.label} className="snap-start">
            <Link
              href={item.href(c)}
              className={
                featured
                  ? "group flex min-h-[58px] w-[min(100%,17rem)] max-w-[18rem] flex-row items-center justify-between gap-3 rounded-[1.25rem] border border-accent/50 bg-gradient-to-br from-accent/[0.18] via-canvas/98 to-panel/70 px-5 py-4 text-left shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_20px_48px_-18px_rgba(217,162,41,0.4),0_10px_28px_-14px_rgba(27,63,46,0.22)] ring-1 ring-accent/30 transition-[border-color,box-shadow,transform] duration-200 hover:border-accent/65 hover:shadow-[0_24px_56px_-16px_rgba(217,162,41,0.45)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:w-auto sm:min-w-[14rem] sm:max-w-none"
                  : "group flex min-h-[52px] w-[min(100%,15rem)] max-w-[16rem] flex-row items-center justify-between gap-3 rounded-2xl border border-ink/22 bg-canvas/95 px-4 py-3 text-left shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_6px_20px_-12px_rgba(27,63,46,0.22)] transition-[border-color,box-shadow,transform,background-color] duration-200 hover:border-accent/45 hover:bg-accent/[0.12] hover:shadow-[0_10px_28px_-14px_rgba(27,63,46,0.28)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:w-auto sm:min-w-[12.5rem] sm:max-w-none"
              }
            >
              <span className="min-w-0">
                {featured ? (
                  <span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.2em] text-accent-strong">
                    Popular path
                  </span>
                ) : null}
                <span
                  className={
                    featured
                      ? "block font-display text-lg font-semibold leading-tight text-ink"
                      : "block text-[0.9375rem] font-semibold leading-tight text-ink sm:text-sm"
                  }
                >
                  {item.label}
                </span>
                <span
                  className={
                    featured
                      ? "mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/65"
                      : "mt-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted"
                  }
                >
                  {item.hint}
                </span>
              </span>
              <span
                className={
                  featured
                    ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/45 bg-accent/25 text-ink shadow-sm transition group-hover:border-accent/60 group-hover:bg-accent/35"
                    : "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/12 bg-canvas/90 text-ink/70 transition group-hover:border-accent/40 group-hover:bg-accent/15 group-hover:text-ink"
                }
                aria-hidden
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </li>
          );
        })}
      </ul>
    </>
  );

  if (variant === "plain") {
    return body;
  }

  return (
    <section
      className={`border-b border-ink/10 bg-gradient-to-r from-panel/25 via-canvas to-panel/20 ${PAGE_GUTTER_X} py-5 sm:py-6`}
      aria-label="Start your project"
    >
      <div className={`mx-auto ${CONTENT_MAX}`}>{body}</div>
    </section>
  );
}
