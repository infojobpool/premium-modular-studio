"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  images: readonly string[];
  altForIndex: (index: number) => string;
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export function ImageLightbox({ images, altForIndex, index, onClose, onIndexChange }: Props) {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const open = index !== null;
  const count = images.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  const goPrev = useCallback(() => {
    if (index === null || count === 0) return;
    onIndexChange((index + count - 1) % count);
  }, [index, count, onIndexChange]);

  const goNext = useCallback(() => {
    if (index === null || count === 0) return;
    onIndexChange((index + 1) % count);
  }, [index, count, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, goPrev, goNext]);

  if (!mounted || !open || index === null || count === 0) return null;

  const src = images[index]!;

  const panel = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/85 backdrop-blur-sm transition-opacity"
        aria-label="Close gallery"
        onClick={onClose}
      />
      <div
        className="relative z-[1] flex w-full max-w-6xl flex-col items-stretch gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <p id={titleId} className="sr-only">
          Image {index + 1} of {count}. Swipe or use arrow keys or side buttons to navigate.
        </p>

        <div className="relative mx-auto w-full">
          <div
            className="relative mx-auto aspect-[4/3] w-full max-h-[min(85dvh,920px)] min-h-[200px] overflow-hidden rounded-2xl border border-white/20 bg-ink/50 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.75)] ring-1 ring-white/10 sm:rounded-3xl"
            onTouchStart={(e) => {
              touchStartX.current = e.changedTouches[0]?.clientX ?? null;
            }}
            onTouchEnd={(e) => {
              const start = touchStartX.current;
              touchStartX.current = null;
              if (start === null || count < 2) return;
              const end = e.changedTouches[0]?.clientX ?? start;
              const dx = end - start;
              if (dx > 56) goPrev();
              else if (dx < -56) goNext();
            }}
          >
            <Image
              src={src}
              alt={altForIndex(index)}
              fill
              sizes="100vw"
              className="object-contain"
              priority
              draggable={false}
            />

            {count > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-canvas/95 text-lg font-medium text-ink shadow-lg transition hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:left-4 sm:h-14 sm:w-14"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-canvas/95 text-lg font-medium text-ink shadow-lg transition hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:right-4 sm:h-14 sm:w-14"
                >
                  →
                </button>
              </>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={goPrev}
              disabled={count < 2}
              aria-label="Previous image"
              className="inline-flex h-12 min-w-[48px] items-center justify-center rounded-full border border-white/25 bg-canvas/95 px-5 text-lg font-medium text-ink shadow-lg transition hover:border-accent/50 hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-35"
            >
              ←
            </button>
            <span className="rounded-full border border-white/25 bg-canvas/95 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/85 tabular-nums shadow-inner">
              {index + 1} / {count}
            </span>
            <button
              type="button"
              onClick={goNext}
              disabled={count < 2}
              aria-label="Next image"
              className="inline-flex h-12 min-w-[48px] items-center justify-center rounded-full border border-white/25 bg-canvas/95 px-5 text-lg font-medium text-ink shadow-lg transition hover:border-accent/50 hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-35"
            >
              →
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-canvas/90 underline-offset-4 transition hover:text-canvas hover:underline sm:ml-2"
          >
            Close
          </button>
        </div>
        {count > 1 ? (
          <p className="text-center text-[11px] text-canvas/55">
            Swipe on the image or use arrow keys
          </p>
        ) : null}
      </div>
    </div>
  );

  return createPortal(panel, document.body);
}
