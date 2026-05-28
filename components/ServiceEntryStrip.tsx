"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SERVICE_ENTRIES } from "@/lib/service-entries";
import { FOCUS_RING } from "@/lib/ui-classes";
import { useStudioLocation } from "./LocationProvider";

/** Four Livspace-style service entry tiles (embedded in PostHeroGuide). */
export function ServiceEntryStrip() {
  const { location } = useStudioLocation();

  return (
    <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
      {SERVICE_ENTRIES.map((item, i) => {
        const featured = "featured" in item && item.featured;
        return (
          <motion.li
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0"
          >
            <Link
              href={item.href(location.id)}
              className={
                featured
                  ? `group flex h-full min-h-[5.5rem] flex-col justify-between rounded-xl border border-accent/40 bg-gradient-to-br from-accent/[0.14] via-canvas/98 to-panel/60 p-4 shadow-[0_12px_32px_-16px_rgba(217,162,41,0.28)] ring-1 ring-accent/20 transition hover:-translate-y-0.5 hover:border-accent/55 hover:shadow-[0_16px_40px_-14px_rgba(217,162,41,0.32)] sm:min-h-[6rem] ${FOCUS_RING}`
                  : `group flex h-full min-h-[5.5rem] flex-col justify-between rounded-xl border border-ink/14 bg-canvas/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-accent/35 hover:bg-accent/[0.06] hover:shadow-md sm:min-h-[6rem] ${FOCUS_RING}`
              }
            >
              <div>
                {featured ? (
                  <span className="mb-1.5 block text-[8px] font-bold uppercase tracking-[0.18em] text-accent-strong">
                    Popular
                  </span>
                ) : null}
                <span className="block font-display text-base font-semibold leading-snug text-ink sm:text-[1.05rem]">
                  {item.label}
                </span>
                <span className="mt-1 block text-[10px] leading-relaxed text-muted">{item.hint}</span>
              </div>
              <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] text-accent-strong">
                Explore
                <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );
}
