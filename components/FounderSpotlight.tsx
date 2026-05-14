"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CITY_PAGE_COPY } from "@/lib/city-page-copy";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { withBrandHighlight } from "./BrandInline";
import { useStudioLocation } from "./LocationProvider";

type FounderSpotlightProps = {
  variant?: "full" | "compact";
};

export function FounderSpotlight({ variant = "full" }: FounderSpotlightProps) {
  const { location } = useStudioLocation();
  const isCompact = variant === "compact";
  const s = CITY_PAGE_COPY[location.id].leadershipSpotlight;

  return (
    <section
      className={`border-t border-ink/10 bg-panel/35 ${isCompact ? "py-12 sm:py-14" : "py-16 sm:py-20"} ${PAGE_GUTTER_X}`}
      aria-label={s.sectionAriaLabel}
    >
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className={`relative overflow-hidden rounded-[1.6rem] border border-ink/12 bg-gradient-to-br from-canvas/95 via-canvas/88 to-panel/50 shadow-[0_24px_56px_-34px_rgba(27,63,46,0.45)] ${
            isCompact ? "grid gap-6 p-5 sm:p-7 lg:grid-cols-[210px_1fr]" : "grid gap-8 p-6 sm:p-8 lg:grid-cols-[260px_1fr]"
          }`}
        >
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/10 blur-[75px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-ink/10 blur-[80px]"
            aria-hidden
          />

          <div className="flex items-center justify-center lg:items-start lg:justify-start">
            <div
              className={`relative overflow-hidden rounded-[1.25rem] border border-ink/12 bg-canvas shadow-[0_18px_34px_-24px_rgba(0,0,0,0.45)] ${
                isCompact ? "h-[250px] w-[200px]" : "h-[280px] w-[220px]"
              }`}
            >
              <Image
                src={s.imageSrc}
                alt={s.imageAlt}
                fill
                sizes={isCompact ? "200px" : "220px"}
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-strong">
              {s.eyebrow} · {location.label}
            </p>
            <h2 className={`mt-3 font-display tracking-tight text-ink ${isCompact ? "text-4xl sm:text-[2.7rem]" : "text-4xl sm:text-5xl"}`}>
              {s.name}
            </h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-ink/75">
              {withBrandHighlight(s.roleLine)}
            </p>
            <p className={`${isCompact ? "mt-4 text-base" : "mt-5 text-lg"} max-w-3xl leading-relaxed text-muted`}>
              {withBrandHighlight(s.bio)}
            </p>

            <ul className={`grid gap-3 ${isCompact ? "mt-5 md:grid-cols-3" : "mt-6 sm:grid-cols-2"}`}>
              {s.highlights.map((h, i) => (
                <li
                  key={`${s.name}-${h.title}`}
                  className={`rounded-xl border border-ink/10 bg-canvas/75 px-4 py-3 text-sm text-ink/85 ${
                    !isCompact && i === s.highlights.length - 1 ? "sm:col-span-2" : ""
                  }`}
                >
                  <span className="font-semibold text-ink">{h.title}</span> {h.body}
                </li>
              ))}
            </ul>

            {isCompact ? (
              <Link
                href={`/${location.id}/about`}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink/18 bg-canvas/60 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition hover:border-accent/45 hover:text-accent-strong"
              >
                {s.compactCtaLabel}
                <span aria-hidden>→</span>
              </Link>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
