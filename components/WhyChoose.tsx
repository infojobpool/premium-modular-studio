"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { vividCopy } from "@/lib/vivid-reference";
import { Reveal } from "./Reveal";

export function WhyChoose() {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const trustStats = [
    { target: 15, suffix: "+", label: "Years in interior design" },
    { target: 300, suffix: "+", label: "Satisfied clients" },
    { target: 850, suffix: "+", label: "Spaces delivered" },
    { target: 49, suffix: "/10", label: "Average client rating" },
  ] as const;

  return (
    <section
      ref={sectionRef}
      id="why-vivid"
      className={`relative overflow-hidden border-t border-ink/8 py-9 sm:py-11 ${PAGE_GUTTER_X}`}
    >
      <div
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-accent/12 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-ink/8 blur-[90px]"
        aria-hidden
      />

      <div className={`relative mx-auto ${CONTENT_MAX}`}>
        <Reveal className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Why us
            <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
            Premium studio
          </p>
          <h2 className="mt-3 font-display text-[2.4rem] tracking-tight text-ink sm:text-5xl md:text-[3.45rem]">
            {vividCopy.whyTitle}
          </h2>
          <p className="mt-3 text-xl leading-relaxed text-muted sm:text-[1.38rem]">{vividCopy.whySubtitle}</p>
          <p className="mt-3 max-w-2xl text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-ink/70 sm:text-sm">
            Trusted by homeowners & businesses for 15+ years
          </p>
        </Reveal>

        <ul className="mt-6 -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {trustStats.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-[220px] snap-start rounded-2xl border border-ink/12 bg-gradient-to-br from-canvas/88 via-canvas/75 to-panel/50 px-4 py-3 shadow-[0_14px_26px_-22px_rgba(27,63,46,0.35)] backdrop-blur-sm sm:min-w-0"
            >
              <p className="font-display text-3xl leading-none text-ink">
                <CountUp target={s.target} suffix={s.suffix} start={sectionInView} />
              </p>
              <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                {s.label}
              </p>
            </motion.li>
          ))}
        </ul>

        <div className="mt-2 h-px w-full bg-gradient-to-r from-transparent via-ink/12 to-transparent" aria-hidden />
      </div>
    </section>
  );
}

function CountUp({
  target,
  suffix,
  start,
}: {
  target: number;
  suffix: string;
  start: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    const durationMs = 1300;
    const startedAt = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);

  if (suffix === "/10") {
    return <>{(value / 10).toFixed(1)}/5</>;
  }
  return (
    <>
      {value}
      {suffix}
    </>
  );
}
