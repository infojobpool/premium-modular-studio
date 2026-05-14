"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { CityGalleryProject } from "@/lib/city-page-copy";
import { resolveGalleryTileSrc } from "@/lib/interior-images";
import type { StudioLocationId } from "@/lib/locations";
import { ImageLightbox } from "./ImageLightbox";

type Props = {
  city: StudioLocationId;
  projects: readonly CityGalleryProject[];
};

export function CityProjectsGrid({ city, projects }: Props) {
  const resolved = useMemo(
    () => projects.map((p, i) => ({ ...p, src: resolveGalleryTileSrc(p, i) })),
    [projects],
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const srcs = useMemo(() => resolved.map((r) => r.src), [resolved]);

  return (
    <>
      <ul className="mt-16 grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 xl:grid-cols-5">
        {resolved.map((p, i) => (
          <li key={p.slug}>
            <div className="group overflow-hidden rounded-3xl border border-ink/10 bg-panel/40 shadow-sm transition hover:border-accent/35 hover:shadow-[0_24px_60px_-32px_rgba(27,63,46,0.18)]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="pointer-events-none object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <button
                  type="button"
                  className="absolute left-0 right-0 top-0 z-20 h-[58%] cursor-[zoom-in] border-0 bg-transparent p-0"
                  aria-label={`Open large preview: ${p.name}`}
                  onClick={() => setLightboxIndex(i)}
                />
                <p className="pointer-events-none absolute bottom-4 left-4 z-10 text-xs font-semibold uppercase tracking-[0.25em] text-canvas/90">
                  {p.tag}
                </p>
              </div>
              <Link
                href={`/${city}/projects/${p.slug}`}
                className="block min-w-0 p-6 text-left no-underline sm:p-7"
              >
                <h2 className="text-balance break-words font-display text-2xl text-ink group-hover:text-accent-strong">
                  {p.name}
                </h2>
                <p className="mt-3 text-pretty break-words text-sm leading-relaxed text-muted">{p.excerpt}</p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
                  Read story →
                </p>
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <ImageLightbox
        images={srcs}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
        altForIndex={(idx) => resolved[idx]?.alt ?? `Project ${idx + 1}`}
      />
    </>
  );
}
