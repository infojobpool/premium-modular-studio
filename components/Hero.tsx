"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";
import { useHeroCarousel } from "@/hooks/use-hero-carousel";
import { buildHeroSlides } from "@/lib/hero-media";
import { PAGE_GUTTER_X } from "@/lib/interior-images";
import { HeroCarouselToolbar, HeroSlideStage } from "./HeroMedia";
import { useStudioLocation } from "./LocationProvider";

export function Hero() {
  const { location } = useStudioLocation();
  const slides = useMemo(
    () => buildHeroSlides(location.label, location.id),
    [location.label, location.id],
  );
  const { list, safeIndex, current, reduceMotion, setIndex, go, setPaused } =
    useHeroCarousel(slides);
  const venue = location.id === "hyderabad" ? "office" : "studio";

  return (
    <section
      className="relative isolate min-h-[100dvh] w-full overflow-hidden bg-black"
      aria-label="Studio practices"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
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
          className="pointer-events-none absolute inset-0 z-[4] bg-gradient-to-r from-black/65 via-black/25 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[4] bg-gradient-to-t from-black/55 via-transparent to-black/20"
          aria-hidden
        />
      </div>

      <div
        className={`relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[92rem] flex-col justify-center ${PAGE_GUTTER_X}`}
        style={{ paddingTop: "var(--site-header-offset)" }}
      >
        <div className="max-w-3xl pb-16 sm:pb-20">
          <AnimatePresence mode="wait">
            {current ? (
              <motion.div
                key={`${current.kind}-${safeIndex}-${current.headline}`}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/75">
                  {current.eyebrow}
                </p>
                <h1 className="font-body whitespace-pre-line text-[2.35rem] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.35rem]">
                  {current.headline}
                </h1>
                <Link
                  href={`/${location.id}/contact`}
                  className="mt-6 inline-flex items-center rounded-md bg-accent px-4 py-2.5 text-sm font-bold text-ink shadow-[0_12px_32px_-12px_rgba(217,162,41,0.85)] transition hover:bg-accent-soft sm:mt-7 sm:px-5 sm:text-base"
                >
                  Book a visit
                </Link>
                <p className="mt-3 text-[11px] font-medium text-white/70">
                  3D sign-off before site · {location.label} {venue}
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <HeroCarouselToolbar
        list={list}
        safeIndex={safeIndex}
        setIndex={setIndex}
        go={go}
        fullscreen
      />
    </section>
  );
}
