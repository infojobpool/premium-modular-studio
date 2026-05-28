"use client";

import Image from "next/image";
import Link from "next/link";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { vividBlogPosts, vividGalleryImagePool } from "@/lib/vivid-reference";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

const BLOG_IMAGES = [
  vividGalleryImagePool[3]!,
  vividGalleryImagePool[4]!,
  vividGalleryImagePool[5]!,
] as const;

export function HomeMagazineStrip() {
  const { location } = useStudioLocation();

  return (
    <section className={`border-y border-ink/10 bg-panel/25 py-12 sm:py-14 ${PAGE_GUTTER_X}`} aria-labelledby="home-magazine-heading">
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-strong">
              Magazine
            </p>
            <h2 id="home-magazine-heading" className="mt-2 font-display text-2xl tracking-tight text-ink sm:text-3xl md:text-4xl">
              Ideas & planning
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Kitchens, architecture, and luxury residential trends from the {location.label} studio.
            </p>
          </div>
          <Link
            href={`/${location.id}/blog`}
            className="text-xs font-bold uppercase tracking-[0.18em] text-ink underline-offset-4 hover:underline"
          >
            View all articles →
          </Link>
        </Reveal>

        <ul className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {vividBlogPosts.map((post, i) => (
            <li key={post.href}>
              <a
                href={post.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-canvas shadow-sm transition hover:border-accent/35 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-ink/5">
                  <Image
                    src={BLOG_IMAGES[i]!}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg leading-snug text-ink transition group-hover:text-accent-strong sm:text-xl">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{post.summary}</p>
                  <span className="mt-4 inline-flex text-[10px] font-bold uppercase tracking-[0.16em] text-accent-strong">
                    Read article →
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
