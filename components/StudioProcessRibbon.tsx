"use client";

import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";

function RibbonIcon({ kind }: { kind: "drawing" | "handover" }) {
  const cls = "h-5 w-5 text-ink sm:h-5 sm:w-5";
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
  const items = [
    {
      kicker: "After your site visit",
      icon: "drawing" as const,
      featured: true,
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
    <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
      {items.map((item) => {
        const featured = "featured" in item && item.featured;
        return (
          <li
            key={item.kicker}
            className={
              featured
                ? "relative overflow-hidden rounded-[1.35rem] border border-accent/50 bg-gradient-to-br from-accent/[0.16] via-canvas/98 to-panel/75 p-5 shadow-[0_1px_0_rgba(255,255,255,0.92)_inset,0_24px_56px_-22px_rgba(217,162,41,0.38),0_14px_36px_-18px_rgba(27,63,46,0.22)] ring-1 ring-accent/30 sm:p-6"
                : "relative overflow-hidden rounded-2xl border border-ink/20 bg-canvas/95 p-4 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_8px_24px_-16px_rgba(27,63,46,0.2)] sm:p-5"
            }
          >
            <span
              className={
                featured
                  ? "pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-accent-soft to-accent"
                  : "pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent/80 via-accent-soft/90 to-accent/70"
              }
              aria-hidden
            />
            {featured ? (
              <span className="mb-3 inline-flex rounded-full border border-accent/45 bg-accent/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-accent-strong shadow-sm">
                Core studio step
              </span>
            ) : null}
            <div className="flex items-start gap-3">
              <span
                className={
                  featured
                    ? "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/40 bg-accent/25 text-ink shadow-[0_8px_20px_-12px_rgba(217,162,41,0.45)]"
                    : "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-ink/12 bg-accent/15 text-ink shadow-sm"
                }
                aria-hidden
              >
                <RibbonIcon kind={item.icon} />
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className={
                    featured
                      ? "font-display text-lg font-semibold tracking-tight text-ink sm:text-xl"
                      : "text-[11px] font-bold uppercase tracking-[0.2em] text-ink sm:text-xs"
                  }
                >
                  {item.kicker}
                </p>
                <p
                  className={
                    featured
                      ? "mt-2.5 text-sm font-medium leading-relaxed text-ink/90 sm:text-base"
                      : "mt-2 text-sm font-medium leading-relaxed text-ink sm:text-[0.95rem]"
                  }
                >
                  {item.body}
                </p>
              </div>
            </div>
          </li>
        );
      })}
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
