"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS, blogPostHref } from "@/lib/blog-posts";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { FOCUS_RING } from "@/lib/ui-classes";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

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
            className={`text-xs font-bold uppercase tracking-[0.18em] text-ink underline-offset-4 hover:underline ${FOCUS_RING}`}
          >
            View all articles →
          </Link>
        </Reveal>

        <ul className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {BLOG_POSTS.map((post, i) => (
            <motion.li
              key={post.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={blogPostHref(location.id, post.slug)}
                className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-canvas shadow-sm transition hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-md ${FOCUS_RING}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-ink/5">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
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
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
