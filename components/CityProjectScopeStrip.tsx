"use client";

import Link from "next/link";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { useStudioLocation } from "./LocationProvider";

/** Short entry paths for clients who land with a project type in mind. */
const SCOPES = [
  {
    label: "New apartment",
    hint: "Shell onward",
    href: (city: string) => `/${city}/contact`,
  },
  {
    label: "Renovation",
    hint: "Live-in upgrades",
    href: (city: string) => `/${city}/process`,
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

export function CityProjectScopeStrip() {
  const { location } = useStudioLocation();
  const c = location.id;

  return (
    <section
      className={`border-b border-ink/10 bg-gradient-to-r from-panel/25 via-canvas to-panel/20 ${PAGE_GUTTER_X} py-5 sm:py-6`}
      aria-label="Start your project"
    >
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-muted sm:text-[11px]">
          I&apos;m planning
        </p>
        <ul className="mt-3 flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
          {SCOPES.map((item) => (
            <li key={item.label} className="snap-start">
              <Link
                href={item.href(c)}
                className="flex min-h-[44px] min-w-[min(100%,11.5rem)] max-w-[14rem] flex-col justify-center rounded-2xl border border-ink/12 bg-canvas/70 px-4 py-2.5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] transition hover:border-accent/40 hover:bg-accent/[0.08] sm:min-w-0 sm:max-w-none sm:inline-flex sm:min-h-0 sm:flex-row sm:items-baseline sm:gap-2 sm:rounded-full sm:px-5 sm:py-2.5"
              >
                <span className="text-[13px] font-semibold leading-tight text-ink sm:text-sm">{item.label}</span>
                <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-ink/45 sm:mt-0 sm:text-[10px]">
                  {item.hint}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
