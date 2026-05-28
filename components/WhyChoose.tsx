"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { vividCopy } from "@/lib/vivid-reference";
import { withBrandHighlight } from "./BrandInline";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

const trustStats = [
  { target: 15, suffix: "+", label: "Years in interior design", detail: "Luxury residential practice" },
  { target: 300, suffix: "+", label: "Satisfied clients", detail: "Homes & workplaces" },
  { target: 850, suffix: "+", label: "Spaces delivered", detail: "Design to handover" },
  { target: 49, suffix: "/10", label: "Average client rating", detail: "Post-project feedback" },
] as const;

export function WhyChoose() {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="why-vivid"
      className={`relative overflow-hidden py-10 sm:py-14 ${PAGE_GUTTER_X}`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent"
        aria-hidden
      />

      <div className={`relative mx-auto ${CONTENT_MAX}`}>
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.65rem] border border-ink/12 bg-gradient-to-br from-canvas/98 via-canvas/92 to-panel/45 p-5 shadow-[0_28px_72px_-36px_rgba(27,63,46,0.38)] ring-1 ring-white/70 sm:rounded-[1.85rem] sm:p-7 lg:p-9">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/14 blur-[80px]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-ink/8 blur-[90px]"
              aria-hidden
            />

            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-10">
              <div className="min-w-0">
                <p className="inline-flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.32em] text-accent-strong">
                  <span className="h-px w-8 bg-gradient-to-r from-accent/70 to-transparent" aria-hidden />
                  Why us
                  <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
                  Premium studio
                </p>
                <h2 className="mt-4 font-display text-[2.15rem] leading-[1.06] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
                  {withBrandHighlight(vividCopy.whyTitle)}
                </h2>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                  {vividCopy.whySubtitle}
                </p>
              </div>

              <div className="hidden lg:block lg:border-l lg:border-ink/10 lg:pl-8">
                <p className="font-display text-2xl leading-snug text-ink/88">
                  One accountable team from first sketch to final handover.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Trusted by homeowners and businesses across Hyderabad and Bhubaneswar for over fifteen years.
                </p>
              </div>
            </div>

            <div className="relative mt-7 overflow-hidden rounded-[1.25rem] border border-canvas/12 bg-gradient-to-br from-ink via-[#152921] to-[#0f2119] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_44px_-24px_rgba(0,0,0,0.55)] sm:mt-8 sm:rounded-[1.35rem] sm:p-6 lg:p-7">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent"
                aria-hidden
              />

              <ul className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-4 sm:gap-y-0">
                {trustStats.map((s, i) => (
                  <motion.li
                    key={s.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative min-w-0 ${
                      i % 2 === 1 ? "border-l border-canvas/10 pl-4" : ""
                    } ${i >= 2 ? "border-t border-canvas/10 pt-7" : ""} ${
                      i > 0 ? "sm:border-l sm:border-canvas/12 sm:pl-5 sm:pt-0" : "sm:pt-0"
                    } ${i >= 2 ? "sm:border-t-0" : ""}`}
                  >
                    <p className="font-display text-[2.35rem] leading-none tracking-tight text-accent sm:text-[2.65rem] lg:text-[2.85rem]">
                      <CountUp target={s.target} suffix={s.suffix} start={sectionInView} />
                    </p>
                    <p className="mt-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-canvas/92 sm:text-[11px]">
                      {s.label}
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-canvas/55">{s.detail}</p>
                  </motion.li>
                ))}
              </ul>
            </div>

            <p className="relative mt-5 text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-ink/55 lg:hidden">
              Trusted for 15+ years · Hyderabad & Bhubaneswar
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
