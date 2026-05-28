"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { FOCUS_RING_DARK } from "@/lib/ui-classes";
import { vividCopy, vividTestimonials } from "@/lib/vivid-reference";
import { Reveal } from "./Reveal";

const AUTO_ADVANCE_MS = 5500;

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function Testimonials() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failedPhotos, setFailedPhotos] = useState<Record<number, boolean>>({});
  const total = vividTestimonials.length;
  const current = vividTestimonials[index]!;
  const showFallbackAvatar = failedPhotos[index];
  const initials = getInitials(current.name);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, total]);

  const slideTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section className={`border-y border-ink/8 bg-[#151d19] py-10 sm:py-12 ${PAGE_GUTTER_X}`}>
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-soft">
            Reviews & feedback
          </p>
          <h2 className="mt-4 font-display text-3xl text-canvas sm:text-4xl md:text-5xl">
            {vividCopy.testimonialsIntroTitle}
          </h2>
        </Reveal>

        <div
          className="relative mx-auto mt-8 max-w-4xl rounded-[1.9rem] border border-canvas/15 bg-gradient-to-br from-[#1d2a24] via-[#20322a] to-[#16231d] p-4 shadow-[0_28px_64px_-42px_rgba(0,0,0,0.78)] sm:mt-10 sm:p-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={index}
              initial={reduceMotion ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -24 }}
              transition={slideTransition}
              aria-live={reduceMotion ? "off" : "polite"}
              className="relative rounded-[1.4rem] border border-canvas/16 bg-canvas/96 p-6 shadow-[0_16px_34px_-26px_rgba(0,0,0,0.7)] sm:p-8"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                <div className="relative mx-auto h-20 w-20 shrink-0 overflow-hidden rounded-full border border-ink/10 bg-panel shadow-inner sm:mx-0 sm:h-24 sm:w-24">
                  {showFallbackAvatar ? (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#b89a6f] to-[#8a7050] font-semibold text-canvas">
                      {initials}
                    </div>
                  ) : (
                    <Image
                      src={current.photo}
                      alt={current.photoAlt}
                      fill
                      sizes="96px"
                      className="object-cover"
                      loading="eager"
                      onError={() => setFailedPhotos((prev) => ({ ...prev, [index]: true }))}
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1 text-center sm:text-left">
                  <span className="font-display text-5xl leading-none text-accent-strong/40 sm:text-6xl" aria-hidden>
                    “
                  </span>
                  <p className="-mt-2 font-display text-lg leading-snug text-ink sm:-mt-3 sm:text-xl">
                    {current.quote}
                  </p>
                  <footer className="mt-6 text-sm text-muted">
                    <cite className="not-italic font-semibold text-ink">{current.name}</cite>
                    <span className="mx-2 text-accent-strong">·</span>
                    <span>{current.role}</span>
                  </footer>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          <div
            className="mt-5 flex flex-wrap items-center justify-center gap-2"
            role="tablist"
            aria-label="Choose testimonial"
          >
            {vividTestimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show testimonial ${i + 1} of ${total}`}
                className={`h-2.5 rounded-full border border-transparent transition-all duration-300 ${FOCUS_RING_DARK} ${
                  i === index
                    ? "w-8 border-accent/60 bg-accent"
                    : "w-2.5 bg-canvas/30 hover:bg-canvas/45"
                }`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
