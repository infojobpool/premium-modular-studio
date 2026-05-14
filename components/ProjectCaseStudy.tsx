import Image from "next/image";
import Link from "next/link";
import type { ProjectPageDetail } from "@/lib/project-page-details";
import { CONTENT_MAX, interiorImages, PAGE_GUTTER_X } from "@/lib/interior-images";

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
  const stripIndices = (detail?.galleryStripIndices ?? [0, 1, 2, 3]).filter(
    (i) => i !== heroPoolIndex && interiorImages.gallery[i],
  );

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

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
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
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
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
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
            priority
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
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stripIndices.map((idx) => {
                const src = interiorImages.gallery[idx];
                if (!src) return null;
                return (
                  <li
                    key={`${idx}-${src}`}
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink/10 bg-panel/30"
                  >
                    <Image
                      src={src}
                      alt={`${project.name} — reference still ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
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
    </article>
  );
}
