"use client";

import { motion } from "framer-motion";
import { STUDIO_TRUST_STATS } from "@/lib/studio-trust-stats";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { Reveal } from "./Reveal";

export function StudioTrustStrip() {
  return (
    <section
      className={`border-b border-ink/10 bg-canvas py-12 sm:py-16 ${PAGE_GUTTER_X}`}
      aria-label="Why clients trust Vivid In2erio"
    >
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal>
          <h2 className="text-center font-body text-xl font-bold uppercase tracking-[0.06em] text-ink sm:text-2xl md:text-[1.65rem] md:tracking-[0.08em]">
            Professional home interior design company
          </h2>
        </Reveal>

        <ul className="mt-10 flex flex-wrap items-start justify-center gap-4 sm:mt-12 sm:gap-5 lg:gap-7">
          {STUDIO_TRUST_STATS.map((stat, i) => {
            const featured = Boolean(stat.featured);
            return (
              <motion.li
                key={`${stat.kicker}-${stat.label}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className={`flex h-[7.75rem] w-[7.75rem] flex-col items-center justify-center rounded-full px-3 text-center sm:h-[8.75rem] sm:w-[8.75rem] ${
                    featured
                      ? "bg-ink text-canvas shadow-[0_16px_36px_-16px_rgba(27,63,46,0.7)]"
                      : "border border-ink/22 bg-canvas text-ink"
                  }`}
                >
                  <p
                    className={`font-body text-[10px] font-bold uppercase tracking-[0.14em] sm:text-[11px] ${
                      featured ? "text-accent-soft" : "text-ink"
                    }`}
                  >
                    {stat.kicker}
                  </p>
                  <p
                    className={`mt-1 max-w-[6.75rem] font-body text-xs font-medium leading-snug sm:text-sm ${
                      featured ? "text-canvas" : "text-ink"
                    }`}
                  >
                    {stat.label}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
