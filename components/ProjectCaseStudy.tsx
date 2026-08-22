"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { ProjectPageDetail } from "@/lib/project-page-details";
import { CONTENT_MAX, interiorImages, PAGE_GUTTER_X } from "@/lib/interior-images";
import { galleryImageMeta } from "@/lib/gallery-image-captions";
import { ImageLightbox } from "./ImageLightbox";

function dedupeUrls(urls: readonly string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const u of urls) {
    if (seen.has(u)) continue;
    seen.add(u);
    out.push(u);
  }
  return out;
}

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
  /**
   * Project-specific stills (same set as `/[city]/gallery` for this slug).
   * When provided, replaces the generic `interiorImages.gallery` index strip.
   */
  storyGallerySrcs?: readonly string[];
  /** 1-based case study index for editorial labelling */
  projectNumber?: number;
};

export function ProjectCaseStudy({
  city,
  cityLabel,
  project,
  heroSrc,
  story,
  detail,
  heroPoolIndex,
  storyGallerySrcs,
  projectNumber,
}: Props) {
  const legacyStripIndices = useMemo(() => {
    const raw = detail?.galleryStripIndices ?? [0, 1, 2, 3];
    return raw.filter((i) => i !== heroPoolIndex && interiorImages.gallery[i] != null);
  }, [detail, heroPoolIndex]);

  const legacyStripSrcs = useMemo(
    () => legacyStripIndices.map((i) => interiorImages.gallery[i]!).filter(Boolean),
    [legacyStripIndices],
  );

  const stripSrcs = useMemo(() => {
    if (storyGallerySrcs && storyGallerySrcs.length > 0) {
      return dedupeUrls(storyGallerySrcs);
    }
    return dedupeUrls(legacyStripSrcs);
  }, [storyGallerySrcs, legacyStripSrcs]);

  const lightboxImages = useMemo(() => dedupeUrls([heroSrc, ...stripSrcs]), [heroSrc, stripSrcs]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const stripGridClass =
    stripSrcs.length > 9
      ? "mt-8 grid list-none gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
      : "mt-8 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3";

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

        {projectNumber != null ? (
          <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.32em] text-accent-strong">
            Project {String(projectNumber).padStart(2, "0")} · {project.tag} · {cityLabel}
          </p>
        ) : (
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-accent-strong">
            {project.tag} · {cityLabel}
          </p>
        )}

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
          <blockquote className="editorial-pull-quote mt-10 max-w-2xl">{detail.lead}</blockquote>
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

        {stripSrcs.length > 0 ? (
          <div className="mt-20">
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              {detail ? "On the boards" : "More from the portfolio"}
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted">
              {storyGallerySrcs && storyGallerySrcs.length > 0
                ? "The same project stills as in the studio gallery—tap to enlarge, swipe or use arrows to browse."
                : detail
                  ? "Supporting stills from the same portfolio family—material rhythm, light, and joinery intent."
                  : "Reference imagery from the studio’s Waytowebs-aligned media set."}
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-ink/45">
              Tap an image to enlarge · swipe or use arrows to browse
            </p>
            <ul className={stripGridClass}>
              {stripSrcs.map((src, stripPos) => {
                const lightboxIdx = 1 + stripPos;
                return (
                  <li key={`${stripPos}-${src}`}>
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
                          alt={`${project.name} — portfolio still ${stripPos + 1}`}
                          fill
                          className="pointer-events-none object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                        {galleryImageMeta(src)?.tags[0] ? (
                          <span className="pointer-events-none absolute bottom-2 left-2 rounded-full border border-white/20 bg-ink/55 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-canvas/95 opacity-0 transition group-hover:opacity-100">
                            {galleryImageMeta(src)!.tags[0]}
                          </span>
                        ) : null}
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
          {storyGallerySrcs && storyGallerySrcs.length > 0 ? (
            <Link
              href={`/${city}/gallery`}
              className="inline-flex rounded-full border border-ink/15 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink hover:border-accent/40"
            >
              Full gallery
            </Link>
          ) : null}
        </div>
      </div>

      <ImageLightbox
        images={lightboxImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
        cinema
        altForIndex={(i) => {
          if (i === 0) return project.alt;
          return `${project.name} — portfolio still ${i}`;
        }}
        captionForIndex={(i) => {
          const src = lightboxImages[i];
          return src ? galleryImageMeta(src)?.caption : undefined;
        }}
      />
    </article>
  );
}
