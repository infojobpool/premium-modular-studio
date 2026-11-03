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

        <ul className="mt-8 flex flex-wrap items-start justify-center gap-3 sm:mt-10 sm:gap-4 lg:gap-5">
          {STUDIO_TRUST_STATS.map((stat, i) => {
            const featured = Boolean(stat.featured);
            return (
              <motion.li
                key={`${stat.kicker}-${stat.label}`}
                className="[perspective:800px]"
                initial={{ opacity: 0, y: 16, rotateX: 28, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                whileHover={{ rotateY: 12, rotateX: -6, scale: 1.06, z: 12 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className={`flex h-[5.5rem] w-[5.5rem] flex-col items-center justify-center rounded-full px-2 text-center sm:h-[6.5rem] sm:w-[6.5rem] ${
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
