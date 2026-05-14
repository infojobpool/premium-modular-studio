"use client";

import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { vividBlogPosts } from "@/lib/vivid-reference";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

export function CityBlogPosts() {
  const { location } = useStudioLocation();

  return (
    <section className={`py-24 ${PAGE_GUTTER_X}`}>
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">Blog</p>
          <h1 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl">
            Insights from the {location.label} studio
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            Editorial from Vivid In2erio on kitchens, planning, and luxury residential trends.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {vividBlogPosts.map((post) => (
            <li key={post.href} className="rounded-2xl border border-ink/10 bg-panel/40 p-6 shadow-sm">
              <h2 className="font-display text-2xl text-ink">{post.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{post.summary}</p>
              <a
                href={post.href}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent"
              >
                Read article →
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
