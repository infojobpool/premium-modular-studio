"use client";

import Image from "next/image";
import { useCallback, useEffect, useId } from "react";

type Props = {
  images: readonly string[];
  altForIndex: (index: number) => string;
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export function ImageLightbox({ images, altForIndex, index, onClose, onIndexChange }: Props) {
  const titleId = useId();
  const open = index !== null;
  const count = images.length;

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

  if (!open || index === null || count === 0) return null;

  const src = images[index]!;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/80 backdrop-blur-[2px] transition-opacity"
        aria-label="Close gallery"
        onClick={onClose}
      />
      <div className="relative z-[1] flex w-full max-w-6xl flex-col items-stretch gap-3">
        <p id={titleId} className="sr-only">
          Image {index + 1} of {count}. Use arrow keys or buttons to navigate.
        </p>
        <div className="relative mx-auto aspect-[4/3] w-full max-h-[min(85dvh,920px)] min-h-[200px] overflow-hidden rounded-2xl border border-white/15 bg-ink/40 shadow-2xl ring-1 ring-white/10 sm:rounded-3xl">
          <Image
            src={src}
            alt={altForIndex(index)}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="inline-flex h-12 min-w-[48px] items-center justify-center rounded-full border border-white/25 bg-canvas/95 px-5 text-lg font-medium text-ink shadow-lg transition hover:border-accent/50 hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            ←
          </button>
          <span className="rounded-full border border-white/20 bg-canvas/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/80 tabular-nums">
            {index + 1} / {count}
          </span>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="inline-flex h-12 min-w-[48px] items-center justify-center rounded-full border border-white/25 bg-canvas/95 px-5 text-lg font-medium text-ink shadow-lg transition hover:border-accent/50 hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            →
          </button>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mx-auto text-xs font-semibold uppercase tracking-[0.22em] text-canvas/90 underline-offset-4 transition hover:text-canvas hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
}
