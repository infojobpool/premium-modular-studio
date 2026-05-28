"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { STUDIO_TRUST_STATS } from "@/lib/studio-trust-stats";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

export function StudioTrustStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-40px" });

  return (
    <section
      ref={sectionRef}
      className={`border-b border-ink/10 bg-ink py-8 sm:py-9 ${PAGE_GUTTER_X}`}
      aria-label="Why clients trust Vivid In2erio"
    >
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal>
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4">
            {STUDIO_TRUST_STATS.map((stat, i) => (
              <motion.li
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="text-center sm:text-left"
              >
                <p className="font-display text-3xl font-semibold tracking-tight text-accent sm:text-4xl">
                  {"staticValue" in stat ? (
                    stat.staticValue
                  ) : (
                    <CountUp target={stat.countTarget} start={inView} />
                  )}
                </p>
                <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-canvas/90">
                  {stat.label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-canvas/60">{stat.detail}</p>
              </motion.li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
