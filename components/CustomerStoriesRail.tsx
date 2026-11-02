"use client";

import { useMemo, useState } from "react";
import type { TestimonialItem } from "@/lib/reviews/types";
import {
  isYouTubeUrl,
  parseYouTubeVideoId,
  youtubeEmbedSrc,
  youtubeThumbnailUrl,
} from "@/lib/reviews/youtube";
import { FOCUS_RING } from "@/lib/ui-classes";

type Props = {
  stories: readonly TestimonialItem[];
  variant?: "grid" | "page";
};

function videoStories(stories: readonly TestimonialItem[]) {
  return stories.filter((story) => Boolean(story.videoUrl && isYouTubeUrl(story.videoUrl)));
}

export function CustomerStoriesRail({ stories, variant = "grid" }: Props) {
  const videos = useMemo(() => videoStories(stories), [stories]);

  if (videos.length === 0) {
    return (
      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-ink">
        <div className="flex aspect-video items-center justify-center text-sm text-canvas/70">
          YouTube player
        </div>
      </div>
    );
  }

  if (variant === "page") {
    return <StoriesPageTiles videos={videos} />;
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2 sm:gap-8">
      {videos.map((story) => {
        const embed = youtubeEmbedSrc(story.videoUrl!);
        if (!embed) return null;
        return (
          <li key={story.videoUrl}>
            <div className="overflow-hidden rounded-2xl border border-ink/10 bg-ink">
              <iframe
                src={embed}
                title={story.name}
                className="aspect-video w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <p className="mt-3 font-display text-lg text-ink">{story.name}</p>
            {story.role ? (
              <p className="mt-1 text-sm font-medium leading-snug text-ink/75">{story.role}</p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

function StoriesPageTiles({ videos }: { videos: TestimonialItem[] }) {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <section aria-labelledby="films-heading">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-strong">Watch</p>
      <h2 id="films-heading" className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">
        Films
      </h2>
      <ul className="mt-8 grid gap-8 sm:mt-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:gap-x-10">
        {videos.map((story) => {
          const id = parseYouTubeVideoId(story.videoUrl!);
          const thumb = (id ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` : null) ?? story.photo;
          const embed = youtubeEmbedSrc(story.videoUrl!);
          const active = playing === story.videoUrl;
          return (
            <li key={story.videoUrl}>
              <div className="overflow-hidden rounded-2xl bg-ink shadow-[0_18px_40px_-28px_rgba(27,63,46,0.55)]">
                {active && embed ? (
                  <iframe
                    src={`${embed}&autoplay=1`}
                    title={story.name}
                    className="aspect-video w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlaying(story.videoUrl!)}
                    className={`${FOCUS_RING} group relative block aspect-video w-full overflow-hidden`}
                    aria-label={`Play film: ${story.name}`}
                  >
                    {thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element -- YouTube stills
                      <img
                        src={thumb}
                        alt=""
                        className="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    ) : null}
                    <span className="absolute inset-0 bg-ink/25 transition group-hover:bg-ink/35" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex size-14 items-center justify-center rounded-full border border-accent/70 bg-canvas text-ink shadow-md transition group-hover:border-accent group-hover:bg-accent">
                        <svg viewBox="0 0 20 20" className="ml-0.5 size-5" aria-hidden>
                          <path fill="currentColor" d="M6.5 4.5v11l9-5.5z" />
                        </svg>
                      </span>
                    </span>
                  </button>
                )}
              </div>
              <p className="mt-4 font-display text-xl tracking-tight text-ink sm:text-2xl">{story.name}</p>
              {story.role ? (
                <p className="mt-1.5 font-body text-sm leading-relaxed text-ink/70">{story.role}</p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
