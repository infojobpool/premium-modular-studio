"use client";

import { motion } from "framer-motion";
import { STUDIO_TRUST_STATS } from "@/lib/studio-trust-stats";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { BrandTagline } from "./BrandTagline";
import { Reveal } from "./Reveal";

export function StudioTrustStrip() {
  return (
    <section
      className={`border-b border-ink/10 bg-canvas py-12 sm:py-16 ${PAGE_GUTTER_X}`}
      aria-label="Why clients trust Vivid In2erio"
    >
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal>
          <BrandTagline className="text-center" size="md" />
          <h2 className="mt-3 text-center font-body text-xl font-bold uppercase tracking-[0.06em] text-ink sm:text-2xl md:text-[1.65rem] md:tracking-[0.08em]">
            Professional home interior design company
          </h2>
        </Reveal>

        <ul className="mt-8 flex flex-wrap items-start justify-center gap-4 sm:mt-10 sm:gap-5 lg:gap-6">
          {STUDIO_TRUST_STATS.map((stat, i) => {
            const featured = Boolean(stat.featured);
            return (
              <motion.li
                key={`${stat.kicker}-${stat.label}`}
                className="[perspective:900px]"
                initial={{ opacity: 0, y: 16, rotateX: 28, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                whileHover={{ rotateY: 10, rotateX: -6, scale: 1.05, z: 12 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className={`relative flex h-[7rem] w-[7rem] flex-col items-center justify-center rounded-full px-3 text-center sm:h-[8.25rem] sm:w-[8.25rem] ${
                    featured
                      ? "border-[1.75px] border-accent bg-ink text-canvas shadow-[0_18px_36px_-16px_rgba(27,63,46,0.5),inset_0_1px_0_rgba(228,184,74,0.4)]"
                      : "border-[1.75px] border-accent bg-[linear-gradient(165deg,#f8f5f0_0%,#f0ece7_58%,#e8e2d8_100%)] text-ink shadow-[0_12px_28px_-18px_rgba(27,63,46,0.28),inset_0_1px_0_rgba(255,255,255,0.85)]"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-[6px] rounded-full sm:inset-[7px] ${
                      featured ? "border border-accent/40" : "border border-accent/45"
                    }`}
                  />
                  <p
                    className={`relative font-display text-[12px] font-semibold uppercase sm:text-[13px] ${
                      stat.kicker.length <= 3 ? "tracking-[0.08em]" : "tracking-[0.2em]"
                    } ${featured ? "text-accent-soft" : "text-accent-strong"}`}
                  >
                    {stat.kicker}
                  </p>
                  <span
                    aria-hidden
                    className={`relative mt-1.5 block h-px w-7 ${
                      featured ? "bg-accent" : "bg-accent"
                    }`}
                  />
                  <p
                    className={`relative mt-1.5 max-w-[6.75rem] font-display text-[1.15rem] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[1.28rem] ${
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
