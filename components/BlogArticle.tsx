"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog-posts";
import { BLOG_POSTS, blogPostHref } from "@/lib/blog-posts";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { Reveal } from "./Reveal";

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type Props = {
  city: string;
  cityLabel: string;
  post: BlogPost;
};

export function BlogArticle({ city, cityLabel, post }: Props) {
  return (
    <article className={`pb-24 pt-8 ${PAGE_GUTTER_X}`}>
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal>
          <Link
            href={`/${city}/blog`}
            className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-accent-strong hover:text-accent"
          >
            <span aria-hidden>←</span>
            Back to blog
          </Link>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.35em] text-accent-strong">
            {cityLabel} studio · {formatDate(post.publishedAt)}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl tracking-tight text-ink sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">{post.lead}</p>
          {post.pdfPath ? (
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={post.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full border border-ink/15 bg-canvas px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-ink transition hover:border-accent/45 hover:text-accent-strong"
              >
                View PDF →
              </a>
              <a
                href={post.pdfPath}
                download
                className="inline-flex rounded-full bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-canvas transition hover:bg-accent-strong"
              >
                Download PDF
              </a>
            </div>
          ) : null}
        </Reveal>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-ink/10 bg-ink/5 shadow-sm">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 86rem"
            className="object-cover"
            priority
          />
        </div>

        {post.pdfPath ? (
          <div className="mt-14 overflow-hidden rounded-2xl border border-ink/10 bg-panel/30">
            <div className="border-b border-ink/10 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-strong">
                Full article · PDF
              </p>
              <p className="mt-1 text-sm text-muted">
                Read or save the studio edition of this article.
              </p>
            </div>
            <iframe
              title={`${post.title} — PDF`}
              src={post.pdfPath}
              className="h-[min(80vh,720px)] w-full bg-canvas"
            />
          </div>
        ) : null}

        <div className="prose prose-neutral mt-12 max-w-3xl">
          {post.sections.map((section, i) => {
            if (section.type === "heading") {
              return (
                <h2 key={i} className="font-display text-2xl text-ink">
                  {section.text}
                </h2>
              );
            }
            if (section.type === "list") {
              return (
                <ul key={i} className="mt-4 list-disc space-y-2 pl-5 text-muted">
                  {section.items.map((item) => (
                    <li key={item} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="mt-6 text-base leading-relaxed text-muted">
                {section.text}
              </p>
            );
          })}
        </div>

        <div className="mt-14 rounded-2xl border border-ink/10 bg-panel/40 p-8">
          <p className="font-display text-xl text-ink">Ready to plan your space?</p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            Book a consultation at our {cityLabel} studio — we will walk layouts, materials, and
            timelines with you in person.
          </p>
          <Link
            href={`/${city}/contact`}
            className="mt-5 inline-flex rounded-full bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-canvas transition hover:bg-accent-strong"
          >
            Book consultation
          </Link>
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
                    className="group block rounded-xl border border-ink/10 bg-canvas p-5 transition hover:border-accent/35"
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
