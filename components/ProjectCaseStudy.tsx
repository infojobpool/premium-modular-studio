"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { ProjectPageDetail } from "@/lib/project-page-details";
import { CONTENT_MAX, interiorImages, PAGE_GUTTER_X } from "@/lib/interior-images";
import { ImageLightbox } from "./ImageLightbox";

type Props = {
  city: string;
  cityLabel: string;
  project: {
    name: string;
    tag: string;
    alt: string;
    excerpt: string;
  };
  heroSrc: string;
  story: string[];
  /** When set, renders typology, scope, extra sections, and image strip. */
  detail?: ProjectPageDetail;
  heroPoolIndex: number;
};

export function ProjectCaseStudy({
  city,
  cityLabel,
  project,
  heroSrc,
  story,
  detail,
  heroPoolIndex,
}: Props) {
  const stripIndices = useMemo(
    () => (detail?.galleryStripIndices ?? [0, 1, 2, 3]).filter((i) => i !== heroPoolIndex && interiorImages.gallery[i]),
    [detail, heroPoolIndex],
  );

  const stripSrcs = useMemo(
    () => stripIndices.map((i) => interiorImages.gallery[i]!).filter(Boolean),
    [stripIndices],
  );

  const lightboxImages = useMemo(() => [heroSrc, ...stripSrcs], [heroSrc, stripSrcs]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <article className={`pb-24 pt-28 ${PAGE_GUTTER_X}`}>
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <nav className="text-sm text-muted">
          <Link href={`/${city}/projects`} className="hover:text-ink">
            Case studies
          </Link>
          <span className="mx-2 text-ink/25">/</span>
          <span className="text-ink">{project.name}</span>
        </nav>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-accent-strong">
          {project.tag} · {cityLabel}
        </p>

        {detail ? (
          <p className="mt-3 text-sm font-medium text-muted">{detail.typology}</p>
        ) : null}

        <h1 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl md:text-6xl">
          {project.name}
        </h1>

        {detail?.contextLine ? (
          <p className="mt-4 max-w-2xl text-base text-ink/80">{detail.contextLine}</p>
        ) : null}

        <p className="mt-6 max-w-2xl text-xl text-muted">{project.excerpt}</p>

        {detail?.lead ? (
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/90">{detail.lead}</p>
        ) : null}

        {detail?.facts?.length ? (
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {detail.facts.map((f) => (
              <li
                key={f.label}
                className="rounded-2xl border border-ink/10 bg-panel/40 px-5 py-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
                  {f.label}
                </p>
                <p className="mt-2 font-display text-xl text-ink">{f.value}</p>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="relative mt-12 aspect-[16/10] overflow-hidden rounded-[2rem] border border-ink/10 shadow-lg sm:aspect-[2/1]">
          <Image
            src={heroSrc}
            alt={project.alt}
            fill
            className="pointer-events-none object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
            priority
          />
          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            aria-label="Open hero image in viewer"
            aria-haspopup="dialog"
            className="absolute inset-0 cursor-[zoom-in] border-0 bg-transparent transition hover:bg-ink/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          />
        </div>

        {detail && detail.scope.length > 0 ? (
          <div className="mt-16">
            <h2 className="font-display text-2xl text-ink sm:text-3xl">Scope &amp; deliverables</h2>
            <ul className="mt-6 max-w-2xl list-disc space-y-3 pl-5 text-lg leading-relaxed text-muted">
              {detail.scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-14 max-w-2xl space-y-6 text-lg leading-relaxed text-muted">
          {story.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {stripIndices.length > 0 ? (
          <div className="mt-20">
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              {detail ? "On the boards" : "More from the portfolio"}
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted">
              {detail
                ? "Supporting stills from the same portfolio family—material rhythm, light, and joinery intent."
                : "Reference imagery from the studio’s Waytowebs-aligned media set."}
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-ink/45">
              Tap an image to enlarge · swipe or use arrows to browse
            </p>
            <ul className="mt-8 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stripIndices.map((poolIdx, stripPos) => {
                const src = interiorImages.gallery[poolIdx];
                if (!src) return null;
                const lightboxIdx = 1 + stripPos;
                return (
                  <li key={`${poolIdx}-${src}`}>
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(lightboxIdx)}
                      aria-label={`Open image ${lightboxIdx + 1} of ${lightboxImages.length} in viewer`}
                      aria-haspopup="dialog"
                      className="group relative block w-full cursor-[zoom-in] overflow-hidden rounded-2xl border border-ink/10 bg-panel/30 text-left transition hover:border-accent/35 hover:shadow-[0_20px_48px_-28px_rgba(27,63,46,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <span className="relative block aspect-[4/3] w-full">
                        <Image
                          src={src}
                          alt={`${project.name} — reference still ${poolIdx + 1}`}
                          fill
                          className="pointer-events-none object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {detail?.sections?.map((sec) => (
          <section key={sec.heading} className="mt-16 max-w-2xl">
            <h2 className="font-display text-2xl text-ink sm:text-3xl">{sec.heading}</h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
              {sec.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        <div className="mt-16 flex flex-wrap gap-4">
          <Link
            href={`/${city}/contact`}
            className="inline-flex rounded-full bg-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-canvas"
          >
            Discuss a similar scope
          </Link>
          <Link
            href={`/${city}/projects`}
            className="inline-flex rounded-full border border-ink/15 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink hover:border-accent/40"
          >
            All stories
          </Link>
        </div>
      </div>

      <ImageLightbox
        images={lightboxImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
        altForIndex={(i) => {
          if (i === 0) return project.alt;
          const poolIdx = stripIndices[i - 1];
          return `${project.name} — reference still ${poolIdx != null ? poolIdx + 1 : i + 1}`;
        }}
      />
    </article>
  );
}
