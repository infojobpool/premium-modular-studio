"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CITY_PAGE_COPY } from "@/lib/city-page-copy";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { useStudioLocation } from "./LocationProvider";

function StudioHighlightIcon({ idx }: { idx: number }) {
  if (idx === 0) {
    // Delivery scale
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-accent-strong" fill="none" aria-hidden>
        <path
          d="M12 20s6-4.3 6-10a6 6 0 10-12 0c0 5.7 6 10 6 10z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="2.1" stroke="currentColor" strokeWidth="1.35" />
      </svg>
    );
  }
  if (idx === 1) {
    // Joinery + lighting
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-accent-strong" fill="none" aria-hidden>
        <path
          d="M12 3.5l3.8 4.4H8.2L12 3.5zM9.5 11.5h5M8 15h8M6.5 18.5h11"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  // Accountability / single team
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 text-accent-strong" fill="none" aria-hidden>
      <path
        d="M12 3l7 3v5c0 4.8-3.1 8-7 10-3.9-2-7-5.2-7-10V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.3 11.6l2 2 3.5-3.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

export function PressStrip() {
  const { location } = useStudioLocation();
  const items = CITY_PAGE_COPY[location.id].trustHighlights;

  return (
    <section
      aria-label="Studio highlights"
      className={`border-y border-ink/8 bg-panel/25 py-8 sm:py-9 ${PAGE_GUTTER_X}`}
    >
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-accent-strong">
          Studio standards · {location.label}
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {items.map((item, i) => (
            <motion.article
              key={`${item.title}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group relative flex gap-4 overflow-hidden rounded-[1.35rem] border border-ink/14 bg-gradient-to-br from-[#f0e7cd]/95 via-[#ece2c7]/88 to-[#e2d7b8]/82 p-5 shadow-[0_12px_30px_-20px_rgba(27,63,46,0.42)] transition-[border-color,box-shadow,transform] duration-500 hover:border-accent/45 hover:shadow-[0_30px_56px_-24px_rgba(27,63,46,0.45)] sm:flex-col sm:p-6"
            >
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent opacity-80"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 transition-all duration-700 group-hover:left-[115%] group-hover:opacity-80"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute -right-2 -top-3 font-display text-5xl text-accent-strong/[0.22] transition-colors duration-500 group-hover:text-accent-strong/[0.34]"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="shrink-0">
                {item.logoUrl ? (
                  <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-ink/12 bg-panel shadow-[0_1px_0_rgba(255,255,255,0.65)_inset,0_10px_20px_-14px_rgba(0,0,0,0.6)]">
                    <Image
                      src={item.logoUrl}
                      alt={item.logoAlt ?? item.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                ) : (
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl border border-accent-strong/45 bg-gradient-to-br from-accent/28 to-accent/10 text-accent-strong shadow-[0_8px_20px_-14px_rgba(92,69,16,0.35)]"
                    aria-hidden
                  >
                    <StudioHighlightIcon idx={i} />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent-strong">
                  Signature standard
                </p>
                <h3 className="mt-2 font-display text-[1.35rem] leading-snug text-ink">{item.title}</h3>
                {item.subtitle ? (
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{item.subtitle}</p>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
