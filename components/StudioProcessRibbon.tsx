"use client";

import Link from "next/link";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { useStudioLocation } from "./LocationProvider";

function RibbonIcon({ kind }: { kind: "calendar" | "drawing" | "handover" }) {
  const cls = "h-5 w-5 text-ink sm:h-5 sm:w-5";
  if (kind === "calendar") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
        <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3.5 9.5h17M8 3v3M16 3v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path
          d="M8.2 14.2h2.2M13.6 14.2h2.2M8.2 17.4h7.6"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (kind === "drawing") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
        <path
          d="M4 19.5L14.5 9l3 3L8 20H4v-3.5z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <path d="M13 10l2-6 6 2-2 6" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
      <path
        d="M4 10.5c0-1.9 1.6-3.5 3.5-3.5H9l2-2h2l2 2h1.5c1.9 0 3.5 1.6 3.5 3.5V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-7.5z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path d="M9 14.5l2 2 4-4" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

export function StudioProcessRibbon({ variant = "section" }: { variant?: "section" | "plain" }) {
  const { location } = useStudioLocation();

  const items = [
    {
      kicker: "Appointments",
      icon: "calendar" as const,
      body: location.hoursSummary,
      href: `/${location.id}/visit` as const,
      cta: "Studio & map",
    },
    {
      kicker: "After your site visit",
      icon: "drawing" as const,
      body:
        "Measured drawings and scope clarity before production starts — so approvals stay confident.",
    },
    {
      kicker: "Install & handover",
      icon: "handover" as const,
      body:
        "Factory-built modular with on-site supervision through snag checks and final walkthrough.",
    },
  ] as const;

  const list = (
    <ul className="grid gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6">
      {items.map((item) => (
        <li
          key={item.kicker}
          className="relative overflow-hidden rounded-2xl border border-ink/20 bg-canvas/95 p-4 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_8px_24px_-16px_rgba(27,63,46,0.2)] sm:p-5"
        >
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent/80 via-accent-soft/90 to-accent/70"
            aria-hidden
          />
          <div className="flex items-start gap-3">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-ink/12 bg-accent/15 text-ink shadow-sm"
              aria-hidden
            >
              <RibbonIcon kind={item.icon} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink sm:text-xs">
                {item.kicker}
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-ink sm:text-[0.95rem]">{item.body}</p>
              {"href" in item ? (
                <p className="mt-3">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-ink/18 bg-panel/80 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-ink shadow-sm transition hover:border-accent/55 hover:bg-accent/20 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                  >
                    {item.cta}
                    <span aria-hidden className="text-accent-strong">
                      →
                    </span>
                  </Link>
                </p>
              ) : null}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );

  if (variant === "plain") {
    return list;
  }

  return (
    <section
      className={`border-b border-ink/10 bg-gradient-to-b from-panel/40 via-canvas/92 to-canvas ${PAGE_GUTTER_X} py-6 sm:py-7`}
      aria-label="How we work with you"
    >
      <div className={`relative mx-auto ${CONTENT_MAX}`}>{list}</div>
    </section>
  );
}
