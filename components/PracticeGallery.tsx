"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import type { PracticePageCopy } from "@/lib/practice-galleries";
import { FOCUS_RING } from "@/lib/ui-classes";
import { ImageLightbox } from "./ImageLightbox";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

type Props = { page: PracticePageCopy };

const SHELL = `mx-auto w-full ${CONTENT_MAX}` as const;

export function PracticeGallery({ page }: Props) {
  const { location } = useStudioLocation();
  const allStills = useMemo(() => page.sections.flatMap((s) => s.stills), [page.sections]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const indexFor = (src: string) => allStills.findIndex((s) => s.src === src);

  return (
    <section className={`border-b border-ink/10 bg-canvas py-16 sm:py-20 ${PAGE_GUTTER_X}`}>
      <div className={SHELL}>
        <Reveal>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-strong">
            {page.eyebrow} · {location.label}
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">{page.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{page.lead}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.18em]">
            <Link href={`/${location.id}/gallery`} className={`text-ink underline-offset-4 hover:underline ${FOCUS_RING}`}>
              Interiors
            </Link>
            <span className="text-ink/25" aria-hidden>
              ·
            </span>
            <Link
              href={`/${location.id}/${page.sibling.hrefSuffix}`}
              className={`text-ink underline-offset-4 hover:underline ${FOCUS_RING}`}
            >
              {page.sibling.label}
            </Link>
          </div>
        </Reveal>

        {page.sections.map((section) => (
          <div key={section.id} id={section.id} className="mt-14 sm:mt-16">
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-strong">
                {section.eyebrow}
              </p>
              <h2 className="mt-2 font-display text-2xl tracking-tight text-ink sm:text-3xl">{section.title}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{section.lead}</p>
            </Reveal>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {section.stills.map((still, i) => (
                <li key={still.src} className={i === 0 ? "col-span-2 sm:col-span-2" : ""}>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(indexFor(still.src))}
                    className={`group relative block w-full overflow-hidden rounded-2xl border border-ink/10 bg-ink/5 text-left shadow-sm transition hover:border-accent/35 hover:shadow-md ${FOCUS_RING} ${
                      i === 0 ? "aspect-[16/10]" : "aspect-[4/3]"
                    }`}
                    aria-label={`Open ${still.caption}`}
                  >
                    <Image
                      src={still.src}
                      alt={still.alt}
                      fill
                      sizes={i === 0 ? "(max-width: 640px) 100vw, 66vw" : "(max-width: 640px) 50vw, 33vw"}
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      priority={i === 0}
                    />
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-canvas">
                      {still.caption}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <ImageLightbox
        images={allStills.map((s) => s.src)}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
        cinema
        altForIndex={(i) => allStills[i]?.alt ?? page.title}
        captionForIndex={(i) => allStills[i]?.caption}
      />
    </section>
  );
}
