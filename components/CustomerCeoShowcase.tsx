"use client";

import Image from "next/image";
import { useState } from "react";
import { CEO_SHOWCASE_PORTRAITS } from "@/lib/reviews/ceo-showcase";
import { FOCUS_RING } from "@/lib/ui-classes";
import { ImageLightbox } from "./ImageLightbox";
import { Reveal } from "./Reveal";

const LIGHTBOX_IMAGES = CEO_SHOWCASE_PORTRAITS.map((p) => p.image);

export function CustomerCeoShowcase() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section className="mt-20 border-t border-ink/10 pt-16 sm:mt-28 sm:pt-20" aria-labelledby="ceo-showcase-heading">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-strong">Handover</p>
        <h2
          id="ceo-showcase-heading"
          className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl"
        >
          Photos
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink/75">With the CEO</p>
      </Reveal>

      <ul className="mt-8 grid max-w-[58rem] grid-cols-2 gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-3">
        {CEO_SHOWCASE_PORTRAITS.map((portrait, i) => (
          <li key={portrait.image}>
            <button
              type="button"
              onClick={() => setLightboxIndex(i)}
              aria-haspopup="dialog"
              aria-label={`Open photo of ${portrait.name}`}
              className={`${FOCUS_RING} group w-full overflow-hidden rounded-2xl bg-panel/40 text-left shadow-[0_14px_32px_-24px_rgba(27,63,46,0.45)]`}
            >
              <span className="relative block aspect-[4/3] overflow-hidden bg-ink/5">
                <Image
                  src={portrait.image}
                  alt={portrait.alt}
                  fill
                  sizes="(max-width: 1024px) 45vw, 300px"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  style={portrait.objectPosition ? { objectPosition: portrait.objectPosition } : undefined}
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 px-3 py-2.5 sm:px-4 sm:py-3">
                  <span className="block font-display text-sm tracking-tight text-canvas sm:text-base">
                    {portrait.name}
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-canvas/80 sm:text-xs">
                    {portrait.detail}
                  </span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <ImageLightbox
        images={LIGHTBOX_IMAGES}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
        cinema
        altForIndex={(i) => CEO_SHOWCASE_PORTRAITS[i]?.alt ?? "Client photo with the CEO"}
        captionForIndex={(i) => {
          const p = CEO_SHOWCASE_PORTRAITS[i];
          return p ? `${p.name} · ${p.detail}` : undefined;
        }}
      />
    </section>
  );
}
