"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useId, useState } from "react";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import type { GalleryBeforeAfterProps } from "@/lib/gallery-before-after";
import { FOCUS_RING } from "@/lib/ui-classes";
import { Reveal } from "./Reveal";

type Props = GalleryBeforeAfterProps & { className?: string };

function compositeLayerStyle(src: string, side: "before" | "after"): CSSProperties {
  return {
    backgroundImage: `url(${src})`,
    backgroundSize: "200% 100%",
    backgroundPosition: side === "before" ? "0% center" : "100% center",
    backgroundRepeat: "no-repeat",
  };
}

export function BeforeAfterCompare(props: Props) {
  const { headline, caption, beforeLabel, afterLabel, caseStudyHref, caseStudyLabel, className } = props;
  const compositeSrc = "compositeSrc" in props ? props.compositeSrc : undefined;
  const beforeSrc = "beforeSrc" in props ? props.beforeSrc : undefined;
  const afterSrc = "afterSrc" in props ? props.afterSrc : undefined;

  const [pos, setPos] = useState(50);
  const labelId = useId();

  return (
    <section className={`py-16 ${PAGE_GUTTER_X}${className ? ` ${className}` : ""}`} aria-labelledby={labelId}>
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-strong">Proof of craft</p>
          <h2 id={labelId} className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">
            {headline}
          </h2>
          <p className="mt-3 max-w-2xl text-muted">{caption}</p>
          {caseStudyHref ? (
            <Link
              href={caseStudyHref}
              className={`mt-5 inline-flex text-sm font-semibold uppercase tracking-[0.18em] text-accent-strong underline-offset-4 hover:underline ${FOCUS_RING}`}
            >
              {caseStudyLabel ?? "View case study →"}
            </Link>
          ) : null}
        </Reveal>

        <div className="relative mt-10 overflow-hidden rounded-3xl border border-ink/10 bg-ink/5 shadow-sm">
          <div className="relative aspect-[16/10] w-full max-w-full touch-none select-none">
            {compositeSrc ? (
              <>
                <div className="absolute inset-0" style={compositeLayerStyle(compositeSrc, "after")} aria-hidden />
                <div
                  className="absolute inset-0 overflow-hidden will-change-[clip-path]"
                  style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
                  aria-hidden
                >
                  <div className="h-full w-full" style={compositeLayerStyle(compositeSrc, "before")} />
                </div>
              </>
            ) : (
              <>
                <Image
                  src={afterSrc!}
                  alt=""
                  fill
                  sizes="(max-width: 1280px) 100vw, min(1280px, 100vw)"
                  className="object-cover"
                  priority
                />
                <div
                  className="absolute inset-0 overflow-hidden will-change-[clip-path]"
                  style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
                  aria-hidden
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={beforeSrc!}
                      alt=""
                      fill
                      sizes="(max-width: 1280px) 100vw, min(1280px, 100vw)"
                      className="object-cover"
                    />
                  </div>
                </div>
              </>
            )}

            <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-canvas">
              {beforeLabel}
            </span>
            <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-canvas">
              {afterLabel}
            </span>

            <div
              className="pointer-events-none absolute top-0 bottom-0 w-px bg-canvas/95 shadow-[0_0_12px_rgba(0,0,0,0.45)]"
              style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-canvas bg-ink/75 shadow-lg"
              style={{ left: `${pos}%` }}
              aria-hidden
            />

            <label className="sr-only" htmlFor={`${labelId}-range`}>
              Compare two views. Drag horizontally: {pos}% from the left shows {beforeLabel}; the rest shows{" "}
              {afterLabel}.
            </label>
            <input
              id={`${labelId}-range`}
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.currentTarget.value))}
              className="absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pos}
              aria-valuetext={`${pos} percent`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
