"use client";

import Link from "next/link";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { STUDIO_EMAIL_HREF, STUDIO_WHATSAPP_HREF } from "@/lib/locations";
import { trackEvent } from "@/lib/analytics";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

function IntentCardIcon({ index }: { index: number }) {
  if (index === 0) {
    // Studio visit
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-accent" fill="none" aria-hidden>
        <path
          d="M12 20s6-4.3 6-10a6 6 0 10-12 0c0 5.7 6 10 6 10z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.35" />
      </svg>
    );
  }
  if (index === 1) {
    // WhatsApp chat bubble
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-accent" fill="none" aria-hidden>
        <path
          d="M7 18l-2 2 .7-3A8 8 0 1112 20c-1.8 0-3.5-.6-5-2z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9 11.2c.8 1.5 2 2.6 3.8 3.4" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      </svg>
    );
  }
  // Process flow
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-accent" fill="none" aria-hidden>
      <path
        d="M4 7h6M14 7h6M4 17h6M14 17h6M10 7l4 10"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <circle cx="4" cy="7" r="1.4" fill="currentColor" />
      <circle cx="20" cy="7" r="1.4" fill="currentColor" />
      <circle cx="4" cy="17" r="1.4" fill="currentColor" />
      <circle cx="20" cy="17" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function IntentConversionBand() {
  const { location } = useStudioLocation();
  const whatsappHref = `${STUDIO_WHATSAPP_HREF}?text=${encodeURIComponent(
    `Hello — I'd like guidance on where to start (${location.label} studio).`,
  )}`;

  const cards: Array<{
    title: string;
    line: string;
    href: string;
    cta: string;
    event: string;
    external?: boolean;
  }> = [
    {
      title: "Book a studio visit",
      line: "Walk materials, mock-ups, and lighting studies in person.",
      href: `/${location.id}/visit`,
      cta: "Plan a visit",
      event: "intent_visit",
    },
    {
      title: "Chat on WhatsApp",
      line: "Share plans or photos and we’ll route you to the right lead.",
      href: whatsappHref,
      cta: "Open WhatsApp",
      external: true,
      event: "intent_whatsapp",
    },
    {
      title: "See how we work",
      line: "Milestones from brief to handoff—no surprises.",
      href: `/${location.id}/process`,
      cta: "Our process",
      event: "intent_process",
    },
  ];

  return (
    <section className={`border-t border-ink/10 bg-panel/55 py-10 sm:py-12 ${PAGE_GUTTER_X}`}>
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <div className="overflow-hidden rounded-[1.9rem] border border-ink/12 bg-canvas shadow-[0_28px_60px_-44px_rgba(22,34,28,0.45)]">
          <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
            <Reveal className="relative border-b border-canvas/15 bg-gradient-to-br from-[#173a2c] via-[#1b4a36] to-[#11261c] p-7 text-canvas sm:p-9 lg:border-b-0 lg:border-r lg:border-canvas/15 lg:p-10">
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/65 to-transparent"
                aria-hidden
              />
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-soft/90">Next step</p>
              <h2 className="mt-3 max-w-md font-display text-4xl tracking-tight text-canvas sm:text-5xl">
                Not sure where to start?
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-canvas/82 sm:text-lg">
                Pick the path that fits today. We will guide you from first conversation to a clear action plan.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-canvas/76">
                Prefer email?{" "}
                <a href={STUDIO_EMAIL_HREF} className="font-semibold text-canvas underline underline-offset-4">
                  Write the studio
                </a>{" "}
                or use{" "}
                <Link href={`/${location.id}/contact`} className="font-semibold text-canvas underline underline-offset-4">
                  the contact form
                </Link>
                .
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-canvas/25 bg-canvas/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-canvas/88">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                Response within one business day
              </div>
            </Reveal>

            <ul className="grid gap-3 p-4 sm:p-5">
              {cards.map((c, i) => (
                <li key={c.title}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    onClick={() => trackEvent(c.event, { city: location.id })}
                    className="group flex items-center gap-4 rounded-2xl border border-ink/12 bg-gradient-to-r from-[#f6f1df] to-[#f2ecda] px-4 py-4 shadow-[0_10px_24px_-20px_rgba(27,63,46,0.42)] transition-[transform,border-color,box-shadow] duration-400 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_20px_36px_-24px_rgba(27,63,46,0.45)] sm:px-5"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-canvas/70 text-accent">
                      <IntentCardIcon index={i} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-[1.45rem] leading-tight text-ink">{c.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted">{c.line}</span>
                    </span>

                    <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                      {c.cta} →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
