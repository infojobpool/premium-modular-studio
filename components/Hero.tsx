"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";
import { useHeroCarousel } from "@/hooks/use-hero-carousel";
import { buildHeroSlides } from "@/lib/hero-media";
import { HeroCarouselToolbar, HeroSlideStage } from "./HeroMedia";
import { HeroQuickLinksCard } from "./HeroQuickLinksCard";
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
    <section className="relative isolate min-h-[82dvh] w-full overflow-x-clip bg-transparent sm:min-h-[85dvh] lg:min-h-[88dvh]">
      <div className="relative z-10 mx-auto grid min-h-[82dvh] w-full max-w-none grid-cols-1 items-end gap-8 px-0 pb-8 pt-[max(8rem,env(safe-area-inset-top)+5.5rem)] sm:min-h-[85dvh] sm:pb-10 sm:pt-[max(8.75rem,env(safe-area-inset-top)+5.75rem)] md:grid-cols-2 md:items-center md:gap-6 md:pb-10 md:pt-[max(9.25rem,env(safe-area-inset-top)+5.75rem)] lg:min-h-[88dvh] lg:gap-10 lg:pb-12 lg:pt-[max(9.5rem,env(safe-area-inset-top)+5.75rem)]">
        <div className="min-w-0 px-6 sm:px-10 md:pl-16 md:pr-10 xl:pl-24 2xl:pl-32 2xl:pr-14">
          <div className="max-w-xl">
            <AnimatePresence mode="wait">
              {current ? (
                <motion.div
                  key={`${current.kind}-${safeIndex}-${current.headline}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mb-6 space-y-3">
                    {current.eyebrowHref ? (
                      <Link
                        href={current.eyebrowHref}
                        className="inline-flex max-w-full flex-wrap rounded-lg border border-ink/14 bg-accent/[0.14] px-3 py-1.5 text-xs font-bold uppercase leading-snug tracking-[0.28em] text-ink shadow-sm break-words transition hover:border-ink/25 hover:bg-accent/[0.22]"
                      >
                        {current.eyebrow}
                      </Link>
                    ) : (
                      <p className="inline-flex max-w-full flex-wrap rounded-lg border border-ink/14 bg-accent/[0.14] px-3 py-1.5 text-xs font-bold uppercase leading-snug tracking-[0.28em] text-ink shadow-sm break-words">
                        {current.eyebrow}
                      </p>
                    )}
                    {current.statBadge ? (
                      <p className="inline-flex max-w-full flex-wrap rounded-full border border-ink/20 bg-canvas/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/90 shadow-sm break-words">
                        {current.statBadge}
                      </p>
                    ) : null}
                  </div>
                  <h1 className="font-display text-balance text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
                    {current.headline}
                  </h1>
                  <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                    {withBrandHighlight(current.lead)}
                  </p>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-10 flex flex-wrap items-center gap-4"
                  >
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="max-w-full min-w-0">
                      <Link
                        href={`/${location.id}/contact`}
                        className="inline-flex w-full max-w-xl min-w-0 items-center justify-center rounded-full bg-accent px-5 py-4 text-center text-sm font-semibold uppercase leading-snug tracking-[0.14em] text-ink text-balance shadow-[0_20px_60px_-20px_rgba(217,162,41,0.55)] transition-shadow hover:shadow-[0_24px_70px_-18px_rgba(217,162,41,0.65)] sm:px-8 sm:tracking-[0.18em]"
                      >
                        <span className="sm:hidden">Book design consultation · {location.label}</span>
                        <span className="hidden sm:inline">
                          Schedule a private design consultation · {location.label}
                        </span>
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ x: 4 }}>
                      <Link
                        href={`/${location.id}/gallery`}
                        className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-canvas/70 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink transition hover:border-ink/40"
                      >
                        <span className="sm:hidden">View work</span>
                        <span className="hidden sm:inline">View signature work</span>
                        <span aria-hidden className="inline-block transition-transform">
                          →
                        </span>
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        <div className="min-w-0 px-6 sm:px-10 md:pl-0 md:pr-4 lg:pr-6 xl:pr-8">
          <div
            className="relative min-h-[320px] overflow-visible rounded-[2rem] border border-ink/10 bg-ink shadow-[0_30px_80px_-40px_rgba(0,0,0,0.45)] sm:min-h-[380px] md:min-h-[460px] md:rounded-none md:rounded-l-[2.4rem] lg:min-h-[500px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] md:rounded-none md:rounded-l-[2.4rem]">
              {current ? (
                <HeroSlideStage
                  current={current}
                  safeIndex={safeIndex}
                  reduceMotion={reduceMotion}
                  fullscreen={false}
                />
              ) : null}
              <div
                className={`pointer-events-none absolute inset-0 z-[5] hero-media-scrim--${location.id}`}
                aria-hidden
              />
              <HeroCarouselToolbar
                list={list}
                safeIndex={safeIndex}
                setIndex={setIndex}
                go={go}
                fullscreen={false}
              />
            </div>
            <div className="pointer-events-none absolute inset-x-3 bottom-4 z-20 hidden lg:flex lg:justify-end sm:inset-x-4 sm:bottom-5">
              <HeroQuickLinksCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
