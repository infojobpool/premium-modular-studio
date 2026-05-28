"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { HeroSlide } from "@/lib/hero-media";

const AMBIENT_INTERVAL_MS = 8500;
const AMBIENT_FADE_MS = 1400;

export function HeroAmbientImageRotator({ frames }: { frames: readonly { src: string; alt: string }[] }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [frames]);

  useEffect(() => {
    if (reduceMotion || frames.length < 2) return;
    let id: ReturnType<typeof setInterval> | undefined;
    const tick = () => setActive((a) => (a + 1) % frames.length);
    const start = () => {
      if (id) clearInterval(id);
      id = setInterval(tick, AMBIENT_INTERVAL_MS);
    };
    const onVis = () => {
      if (document.hidden) {
        if (id) clearInterval(id);
        id = undefined;
      } else {
        start();
      }
    };
    start();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      if (id) clearInterval(id);
    };
  }, [reduceMotion, frames.length]);

  if (frames.length === 0) return null;

  const current = frames[Math.min(active, frames.length - 1)]!;

  if (frames.length === 1 || reduceMotion) {
    return (
      <div className="hero-slide-stage absolute inset-0 min-h-full min-w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- Hero fills stage; Next/Image + preflight breaks fill */}
        <img
          src={current.src}
          alt={current.alt}
          sizes="(max-width: 1024px) 100vw, 55vw"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 block size-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/18 via-transparent to-ink/5" />
      </div>
    );
  }

  return (
    <div className="hero-slide-stage absolute inset-0 min-h-full min-w-full overflow-hidden">
      {frames.map((frame, i) => (
        // eslint-disable-next-line @next/next/no-img-element -- Hero fills stage; Next/Image + preflight breaks fill
        <img
          key={frame.src}
          src={frame.src}
          alt={i === active ? frame.alt : ""}
          sizes="(max-width: 1024px) 100vw, 55vw"
          decoding="async"
          fetchPriority={i === 0 ? "high" : "low"}
          loading={i === 0 ? "eager" : "lazy"}
          aria-hidden={i !== active}
          className={`absolute inset-0 block size-full object-cover transition-[opacity] ease-in-out ${
            i === active ? "z-[2] opacity-100" : "z-[1] opacity-0"
          }`}
          style={{ transitionDuration: `${AMBIENT_FADE_MS}ms` }}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-ink/18 via-transparent to-ink/5" />
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {dir === "left" ? (
        <path d="M15 6l-6 6 6 6" />
      ) : (
        <path d="M9 6l6 6-6 6" />
      )}
    </svg>
  );
}

export function HeroSlideStage({
  current,
  safeIndex,
  reduceMotion,
  fullscreen,
}: {
  current: HeroSlide;
  safeIndex: number;
  reduceMotion: boolean | null;
  fullscreen: boolean;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${current.kind}-${safeIndex}-${current.src}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="hero-slide-stage absolute inset-0 min-h-full min-w-full overflow-hidden"
      >
        {current.kind === "video" ? (
          <video
            className="h-full min-h-full w-full min-w-full object-cover"
            src={current.src}
            poster={current.poster}
            muted
            loop
            playsInline
            autoPlay={!reduceMotion}
            aria-label={current.alt}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- Hero must bypass Next/Image+preflight `height:auto` so slides truly fill the viewport.
          <img
            src={current.src}
            alt={current.alt}
            sizes={fullscreen ? "100vw" : "(max-width: 1024px) 100vw, 55vw"}
            decoding="async"
            fetchPriority={safeIndex === 0 ? "high" : "low"}
            className="absolute inset-0 block size-full object-cover"
          />
        )}
        {!fullscreen ? (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/18 via-transparent to-ink/5" />
        ) : null}
      </motion.div>
    </AnimatePresence>
  );
}

/** Asian Paints–style: light pill, dark chevrons, pill + dot track. */
export function HeroCarouselToolbar({
  list,
  safeIndex,
  setIndex,
  go,
  fullscreen,
}: {
  list: HeroSlide[];
  safeIndex: number;
  setIndex: (n: number) => void;
  go: (dir: -1 | 1) => void;
  fullscreen: boolean;
}) {
  if (list.length < 2) return null;

  return (
    <div
      className={`pointer-events-auto absolute z-[25] flex px-4 ${
        fullscreen
          ? "inset-x-0 bottom-8 justify-center sm:bottom-10"
          : "bottom-5 left-3 justify-start sm:bottom-6 sm:left-4 lg:bottom-5 lg:left-5"
      }`}
    >
      <div className="flex items-center gap-1 rounded-full border border-black/8 bg-canvas/98 px-1.5 py-1.5 shadow-[0_10px_40px_-8px_rgba(0,0,0,0.35)] ring-1 ring-white/60 backdrop-blur-sm sm:gap-2 sm:px-2 sm:py-2">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => go(-1)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink transition hover:bg-ink/[0.06] active:scale-95"
        >
          <span className="sr-only">Previous</span>
          <Chevron dir="left" />
        </button>
        <div className="mx-1 flex items-center gap-1.5 px-1 sm:mx-2 sm:gap-2 sm:px-2">
          {list.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              aria-current={i === safeIndex}
              onClick={() => setIndex(i)}
              className={
                i === safeIndex
                  ? "h-[5px] w-8 rounded-full bg-ink transition-[width,background-color] duration-300 sm:w-10"
                  : "h-[5px] w-[5px] rounded-full bg-ink/25 transition hover:bg-ink/45"
              }
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => go(1)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink transition hover:bg-ink/[0.06] active:scale-95"
        >
          <span className="sr-only">Next</span>
          <Chevron dir="right" />
        </button>
      </div>
    </div>
  );
}
