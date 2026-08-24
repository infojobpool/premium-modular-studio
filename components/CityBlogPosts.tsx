"use client";

import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS, blogPostHref } from "@/lib/blog-posts";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { withBrandHighlight } from "./BrandInline";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function CityBlogPosts() {
  const { location } = useStudioLocation();

  return (
    <section
      className={`pb-24 pt-[max(7.75rem,env(safe-area-inset-top)+6.5rem)] sm:pt-[max(8.25rem,env(safe-area-inset-top)+6.75rem)] lg:pt-28 ${PAGE_GUTTER_X}`}
    >
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-strong">Blog</p>
          <h1 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl">
            Insights from the {location.label} studio
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            {withBrandHighlight(
              "Editorial from Vivid In2erio on kitchens, planning, and luxury residential trends.",
            )}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <li key={post.slug}>
              <Link
                href={blogPostHref(location.id, post.slug)}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-panel/40 shadow-sm transition hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-ink/5">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-strong">
                    {formatDate(post.publishedAt)}
                  </p>
                  <h2 className="mt-2 font-display text-2xl text-ink group-hover:text-accent-strong">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{post.summary}</p>
                  <span className="mt-5 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
                    Read article →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
