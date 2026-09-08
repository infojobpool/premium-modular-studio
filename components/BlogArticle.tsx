"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost, BlogPostSection } from "@/lib/blog-posts";
import { BLOG_POSTS, blogPostHref } from "@/lib/blog-posts";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { FOCUS_RING } from "@/lib/ui-classes";
import { Reveal } from "./Reveal";

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function sectionHeadings(sections: readonly BlogPostSection[]): string[] {
  return sections.filter((s) => s.type === "heading").map((s) => s.text);
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function BlogSectionBlock({
  section,
  index,
  headingIndex,
}: {
  section: BlogPostSection;
  index: number;
  headingIndex: number;
}) {
  if (section.type === "heading") {
    const id = slugifyHeading(section.text);
    return (
      <h2
        id={id}
        className="scroll-mt-28 border-t border-ink/10 pt-10 font-display text-2xl tracking-tight text-ink first:border-t-0 first:pt-0 sm:text-3xl"
      >
        <span className="mr-3 text-sm font-bold tabular-nums text-accent-strong">
          {String(headingIndex + 1).padStart(2, "0")}
        </span>
        {section.text}
      </h2>
    );
  }

  if (section.type === "list") {
    return (
      <ul className="mt-5 space-y-3">
        {section.items.map((item) => (
          <li key={item} className="flex gap-3 text-base leading-relaxed text-muted">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-strong" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (section.type === "callout") {
    return (
      <aside className="relative mt-10 overflow-hidden rounded-3xl border border-ink/10 bg-ink px-6 py-8 text-canvas shadow-lg sm:px-10 sm:py-10">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/20 blur-2xl" aria-hidden />
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-soft">
          {section.eyebrow}
        </p>
        <p className="mt-3 font-display text-xl leading-snug sm:text-2xl">{section.title}</p>
        <p className="mt-4 text-sm leading-relaxed text-canvas/85 sm:text-base">{section.text}</p>
      </aside>
    );
  }

  if (section.type === "image") {
    return (
      <figure className="mt-10 overflow-hidden rounded-2xl border border-ink/10 bg-ink/5 shadow-sm">
        <div className="relative aspect-[16/10]">
          <Image
            src={section.src}
            alt={section.alt}
            fill
            sizes="(max-width: 768px) 100vw, 48rem"
            className="object-cover"
          />
        </div>
        {section.caption ? (
          <figcaption className="border-t border-ink/10 px-5 py-3 text-sm text-muted">
            {section.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <p key={index} className="mt-5 text-base leading-[1.75] text-muted sm:text-lg">
      {section.text}
    </p>
  );
}

type Props = {
  city: string;
  cityLabel: string;
  post: BlogPost;
};

export function BlogArticle({ city, cityLabel, post }: Props) {
  const headings = sectionHeadings(post.sections);
  let headingCounter = -1;

  return (
    <article
      className={`pb-24 pt-[max(7.75rem,env(safe-area-inset-top)+6.5rem)] sm:pt-[max(8.25rem,env(safe-area-inset-top)+6.75rem)] lg:pt-28 ${PAGE_GUTTER_X}`}
    >
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal>
          <Link
            href={`/${city}/blog`}
            className={`inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-accent-strong hover:text-accent ${FOCUS_RING}`}
          >
            <span aria-hidden>←</span>
            Back to blog
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-strong">
              {post.category ?? `${cityLabel} studio`} · {formatDate(post.publishedAt)}
            </p>
            {post.pdfPath ? (
              <span className="rounded-full border border-ink/15 bg-panel/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-ink/70">
                PDF edition
              </span>
            ) : null}
          </div>

          <h1 className="mt-5 max-w-4xl font-display text-4xl tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            {post.title}
          </h1>

          {post.subtitle ? (
            <p className="mt-4 max-w-3xl font-display text-xl leading-snug text-ink/75 sm:text-2xl">
              {post.subtitle}
            </p>
          ) : null}

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">{post.lead}</p>

          {post.keywords?.length ? (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Topics">
              {post.keywords.map((kw) => (
                <li
                  key={kw}
                  className="rounded-full border border-ink/12 bg-canvas px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/65"
                >
                  {kw}
                </li>
              ))}
            </ul>
          ) : null}

          {post.pdfPath ? (
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={post.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex rounded-full border border-ink/15 bg-canvas px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-ink transition hover:border-accent/45 hover:text-accent-strong ${FOCUS_RING}`}
              >
                View PDF →
              </a>
              <a
                href={post.pdfPath}
                download
                className={`inline-flex rounded-full bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-canvas transition hover:bg-accent-strong ${FOCUS_RING}`}
              >
                Download PDF
              </a>
            </div>
          ) : null}
        </Reveal>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-ink/10 bg-ink/5 shadow-md">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 86rem"
            className="object-cover"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
        </div>

        <div
          className={
            headings.length >= 3
              ? "mt-12 grid gap-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-14"
              : "mt-12"
          }
        >
          {headings.length >= 3 ? (
            <nav
              className="hidden lg:block lg:sticky lg:top-28 lg:self-start"
              aria-label="In this article"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-accent-strong">
                In this article
              </p>
              <ol className="mt-4 space-y-2 border-l border-ink/10 pl-4">
                {headings.map((heading, i) => (
                  <li key={heading}>
                    <a
                      href={`#${slugifyHeading(heading)}`}
                      className={`block text-sm leading-snug text-muted transition hover:text-accent-strong ${FOCUS_RING}`}
                    >
                      <span className="mr-2 tabular-nums text-accent-strong/80">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <div className="min-w-0 max-w-3xl lg:max-w-none">
            {post.sections.map((section, i) => {
              if (section.type === "heading") headingCounter += 1;
              return (
                <BlogSectionBlock
                  key={`${section.type}-${i}`}
                  section={section}
                  index={i}
                  headingIndex={section.type === "heading" ? headingCounter : headingCounter}
                />
              );
            })}
          </div>
        </div>

        {post.pdfPath ? (
          <div className="mt-16 overflow-hidden rounded-3xl border border-ink/10 bg-panel/30 shadow-sm">
            <div className="border-b border-ink/10 px-6 py-5 sm:px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-strong">
                Full article · PDF edition
              </p>
              <p className="mt-1 text-sm text-muted">
                Read or save the studio edition — formatted for print and sharing.
              </p>
            </div>
            <iframe
              title={`${post.title} — PDF`}
              src={post.pdfPath}
              className="h-[min(80vh,720px)] w-full bg-canvas"
            />
          </div>
        ) : null}

        <div className="mt-14 overflow-hidden rounded-3xl border border-ink/10 bg-gradient-to-br from-panel/60 to-canvas p-8 sm:p-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-accent-strong">
            Start your project
          </p>
          <p className="mt-3 font-display text-2xl text-ink sm:text-3xl">
            Ready to plan your structural home makeover?
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            For project inquiries and design consultations, reach out to our {cityLabel} team at{" "}
            <a href="mailto:info@vividin2erio.com" className="font-semibold text-ink hover:text-accent-strong">
              info@vividin2erio.com
            </a>{" "}
            or call{" "}
            <a href="tel:+919121821616" className="font-semibold text-ink hover:text-accent-strong">
              +91 91218 21616
            </a>
            . Book a studio visit and claim your free quotation.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/${city}/contact`}
              className={`inline-flex rounded-full bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-canvas transition hover:bg-accent-strong ${FOCUS_RING}`}
            >
              Book consultation
            </Link>
            <Link
              href={`/${city}/visit`}
              className={`inline-flex rounded-full border border-ink/15 bg-canvas px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-ink transition hover:border-accent/45 ${FOCUS_RING}`}
            >
              Visit studio
            </Link>
          </div>
        </div>

        <aside className="mt-16 border-t border-ink/10 pt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-strong">
            More from the blog
          </p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {BLOG_POSTS.filter((p) => p.slug !== post.slug)
              .slice(0, 2)
              .map((other) => (
                <li key={other.slug}>
                  <Link
                    href={blogPostHref(city, other.slug)}
                    className={`group block rounded-2xl border border-ink/10 bg-canvas p-5 transition hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-sm ${FOCUS_RING}`}
                  >
                    <h3 className="font-display text-lg text-ink group-hover:text-accent-strong">
                      {other.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{other.summary}</p>
                  </Link>
                </li>
              ))}
          </ul>
        </aside>
      </div>
    </article>
  );
}
