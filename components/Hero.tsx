"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";
import { buildHeroSlides } from "@/lib/hero-media";
import { HeroSlideStage } from "./HeroMedia";
import { HeroQuickLinksCard } from "./HeroQuickLinksCard";
import { useStudioLocation } from "./LocationProvider";

export function Hero() {
  const { location } = useStudioLocation();
  const slides = useMemo(
    () => buildHeroSlides(location.label, location.id),
    [location.label, location.id],
  );
  const slide = slides[0];

  return (
    <section className="relative isolate min-h-[100dvh] w-full overflow-x-clip bg-transparent">
      <div className="relative z-10 mx-auto grid min-h-[100dvh] w-full max-w-none grid-cols-1 items-center gap-8 px-0 pb-24 pt-[max(7rem,env(safe-area-inset-top)+5rem)] sm:pb-28 sm:pt-[max(8rem,env(safe-area-inset-top)+5.5rem)] md:grid-cols-2 md:gap-0 md:pb-20 md:pt-[max(6rem,env(safe-area-inset-top)+4.5rem)]">
        <div className="px-6 sm:px-10 md:pl-16 md:pr-10 xl:pl-24 2xl:pl-32 2xl:pr-14">
          <div className="max-w-xl">
            <AnimatePresence mode="wait">
              {slide ? (
                <motion.div
                  key={slide.src}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mb-6 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
                      {slide.eyebrow}
                    </p>
                    {slide.statBadge ? (
                      <p className="inline-flex rounded-full border border-ink/20 bg-canvas/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/90 shadow-sm">
                        {slide.statBadge}
                      </p>
                    ) : null}
                  </div>
                  <h1 className="font-display text-balance text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
                    {slide.headline}
                  </h1>
                  <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                    {slide.lead}
                  </p>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-10 flex flex-wrap items-center gap-4"
                  >
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        href={`/${location.id}/contact`}
                        className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-ink shadow-[0_20px_60px_-20px_rgba(217,162,41,0.55)] transition-shadow hover:shadow-[0_24px_70px_-18px_rgba(217,162,41,0.65)]"
                      >
                        Schedule a private design consultation · {location.label}
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ x: 4 }}>
                      <Link
                        href={`/${location.id}/gallery`}
                        className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-canvas/70 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink transition hover:border-ink/40"
                      >
                        View signature work
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

        <div className="px-6 sm:px-10 md:pl-0 md:pr-4 lg:pr-6 xl:pr-8">
          {/*
            Outer shell stays overflow-visible so the quick-links card is never clipped.
            Only the media + scrim live inside an overflow-hidden layer with matching radii.
          */}
          <div className="relative min-h-[360px] overflow-visible rounded-[2rem] border border-ink/10 bg-ink shadow-[0_30px_80px_-40px_rgba(0,0,0,0.45)] sm:min-h-[430px] md:min-h-[520px] md:rounded-none md:rounded-l-[2.4rem]">
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] md:rounded-none md:rounded-l-[2.4rem]">
              {slide ? (
                <HeroSlideStage
                  current={slide}
                  safeIndex={0}
                  reduceMotion={null}
                  fullscreen={false}
                />
              ) : null}
              <div
                className={`pointer-events-none absolute inset-0 z-[5] hero-media-scrim--${location.id}`}
                aria-hidden
              />
            </div>
            <div className="pointer-events-none absolute inset-x-3 bottom-4 z-20 hidden xl:flex xl:justify-end sm:inset-x-4 sm:bottom-5">
              <HeroQuickLinksCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
