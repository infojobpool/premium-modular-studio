"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";
import { useHeroCarousel } from "@/hooks/use-hero-carousel";
import { buildHeroSlides } from "@/lib/hero-media";
import { PAGE_GUTTER_X } from "@/lib/interior-images";
import { HeroCarouselToolbar, HeroSlideStage } from "./HeroMedia";
import { withBrandHighlight } from "./BrandInline";
import { useStudioLocation } from "./LocationProvider";

export function Hero() {
  const { location } = useStudioLocation();
  const slides = useMemo(
    () => buildHeroSlides(location.label, location.id),
    [location.label, location.id],
  );
  const { list, safeIndex, current, reduceMotion, setIndex, go, setPaused } =
    useHeroCarousel(slides);

  return (
    <section
      className="relative isolate min-h-[100dvh] w-full overflow-hidden bg-ink"
      aria-label="Studio practices"
    >
      <div className="absolute inset-0">
        {list.length > 0 ? (
          <HeroSlideStage
            list={list}
            safeIndex={safeIndex}
            reduceMotion={reduceMotion}
            fullscreen
          />
        ) : null}
        <div
          className="pointer-events-none absolute inset-0 z-[4] bg-gradient-to-r from-ink/88 via-ink/45 to-ink/20"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[4] bg-gradient-to-t from-ink/80 via-ink/15 to-ink/40"
          aria-hidden
        />
      </div>

      <div
        className={`relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[92rem] flex-col justify-end pb-10 sm:pb-12 lg:pb-14 ${PAGE_GUTTER_X}`}
        style={{ paddingTop: "var(--site-header-offset)" }}
      >
        <div className="max-w-3xl pb-4 sm:pb-6">
          {list.length > 1 ? (
            <div
              className="mb-6 flex flex-wrap gap-2"
              role="tablist"
              aria-label="Practice"
            >
              {list.map((slide, i) => {
                const active = i === safeIndex;
                return (
                  <button
                    key={`${slide.eyebrow}-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setIndex(i)}
                    className={`rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] transition sm:text-[11px] ${
                      active
                        ? "bg-accent text-ink shadow-[0_10px_30px_-12px_rgba(217,162,41,0.7)]"
                        : "border border-canvas/25 bg-ink/25 text-canvas/85 backdrop-blur-sm hover:border-canvas/50 hover:bg-ink/40"
                    }`}
                  >
                    {slide.eyebrow}
                  </button>
                );
              })}
            </div>
          ) : null}

          <AnimatePresence mode="wait">
            {current ? (
              <motion.div
                key={`${current.kind}-${safeIndex}-${current.headline}`}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {current.statBadge ? (
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-accent-soft">
                    {current.statBadge}
                  </p>
                ) : null}
                <h1 className="font-display text-balance text-4xl leading-[1.05] tracking-tight text-canvas sm:text-5xl md:text-6xl lg:text-7xl">
                  {current.headline}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-canvas/80 sm:mt-6 sm:text-lg">
                  {withBrandHighlight(current.lead)}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
                  <Link
                    href={`/${location.id}/contact`}
                    className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-ink shadow-[0_20px_60px_-20px_rgba(217,162,41,0.65)] transition hover:shadow-[0_24px_70px_-18px_rgba(217,162,41,0.75)] sm:px-8 sm:text-sm sm:tracking-[0.18em]"
                  >
                    Book free consultation
                  </Link>
                  <Link
                    href={`/${location.id}/gallery`}
                    className="inline-flex items-center gap-2 rounded-full border border-canvas/35 bg-ink/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-canvas backdrop-blur-sm transition hover:border-canvas/60 sm:text-sm"
                  >
                    View work
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <HeroCarouselToolbar
            list={list}
            safeIndex={safeIndex}
            setIndex={setIndex}
            go={go}
            fullscreen
          />
        </div>
      </div>
    </section>
  );
}
