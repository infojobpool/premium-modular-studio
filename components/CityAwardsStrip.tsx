"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { homeAwardsForCity } from "@/lib/home-awards";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { useStudioLocation } from "./LocationProvider";

export function CityAwardsStrip() {
  const { location } = useStudioLocation();
  const awards = homeAwardsForCity(location.id);
  const marqueeAwards = [...awards, ...awards];
  const controls = useAnimationControls();
  const [paused, setPaused] = useState(false);
  const shiftPx = awards.length * 296;

  useEffect(() => {
    if (paused) {
      controls.stop();
      return;
    }
    controls.start({
      x: [0, -shiftPx],
      transition: { duration: 26, ease: "linear", repeat: Infinity },
    });
  }, [controls, paused, shiftPx]);

  return (
    <section
      className={`relative overflow-hidden border-y border-ink/10 bg-gradient-to-b from-panel/45 via-canvas to-panel/70 py-9 text-ink sm:py-11 ${PAGE_GUTTER_X}`}
      aria-label="Awards and recognitions"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_55%_at_50%_-8%,color-mix(in_oklab,var(--color-accent)_10%,transparent),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(color-mix(in_oklab,var(--color-ink)_12%,transparent)_1px,transparent_1px)] [background-size:14px_14px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/12 to-transparent"
        aria-hidden
      />

      <div className={`relative mx-auto ${CONTENT_MAX}`}>
        <p className="text-center font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          50+ awards for innovative design
        </p>
        <p className="mt-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Recognised across premium interior categories
        </p>

        <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-ink/12 bg-gradient-to-b from-ink/[0.06] via-panel/30 to-panel/50 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-12px_32px_-8px_rgba(27,63,46,0.08)] sm:p-5">
          <motion.ul
            className="flex w-max gap-4 pr-4"
            animate={controls}
            onHoverStart={() => setPaused(true)}
            onHoverEnd={() => setPaused(false)}
            drag="x"
            dragElastic={0.04}
            dragConstraints={{ left: -shiftPx, right: 0 }}
            onDragStart={() => setPaused(true)}
            onDragEnd={() => setPaused(false)}
          >
            {marqueeAwards.map((award, i) => (
              <li
                key={`${award.title}-${award.year}-${i}`}
                className="group relative w-[280px] overflow-hidden rounded-2xl border border-[#9f7721]/45 bg-gradient-to-br from-[#f8e39a] via-[#ddb657] to-[#b9862b] px-4 py-5 text-center text-ink shadow-[0_16px_0_-6px_rgba(120,84,22,0.35),0_26px_56px_-20px_rgba(81,53,14,0.45)] ring-1 ring-[#fff2c7]/60 transition-[transform,box-shadow,border-color] duration-500 before:pointer-events-none before:absolute before:left-0 before:top-4 before:z-10 before:h-[calc(100%-2rem)] before:w-[3px] before:rounded-full before:bg-gradient-to-b before:from-[#fff3bf] before:via-[#ffe18a] before:to-[#d39e38] before:content-[''] hover:-translate-y-1 hover:border-[#fff0ba]/55 hover:shadow-[0_18px_0_-6px_rgba(143,102,28,0.34),0_30px_62px_-18px_rgba(77,49,12,0.55)]"
              >
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#fff0bf] to-transparent"
                  aria-hidden
                />
                <div className="flex items-center justify-center gap-2.5 text-[#6f4b14]" aria-hidden>
                  <span className="text-2xl leading-none drop-shadow-[0_1px_1px_rgba(27,63,46,0.12)]">❦</span>
                  <span className="h-px w-10 bg-gradient-to-r from-[#8d611b]/30 via-[#8d611b] to-[#8d611b]/30" />
                  <span className="text-2xl leading-none drop-shadow-[0_1px_1px_rgba(27,63,46,0.12)]">❦</span>
                </div>
                <p className="mt-3 font-display text-[1.65rem] leading-tight text-ink">{award.title}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6f4b14]">{award.year}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink/80">{award.note}</p>
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="mt-7 flex items-center justify-center gap-2" aria-hidden>
          <span className="h-1.5 w-1.5 rounded-full bg-ink/18" />
          <span className="h-1.5 w-1.5 rounded-full bg-ink/18" />
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-ink)_12%,transparent)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-ink/18" />
          <span className="h-1.5 w-1.5 rounded-full bg-ink/18" />
        </div>
      </div>
    </section>
  );
}
