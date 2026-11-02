"use client";

import { useMemo, useState } from "react";
import type { TestimonialItem } from "@/lib/reviews/types";
import { isYouTubeUrl, youtubeEmbedSrc, youtubeThumbnailUrl } from "@/lib/reviews/youtube";
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
    return <StoriesPagePlayer videos={videos} />;
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

function StoriesPagePlayer({ videos }: { videos: TestimonialItem[] }) {
  const [index, setIndex] = useState(0);
  const current = videos[Math.min(index, videos.length - 1)]!;
  const embed = youtubeEmbedSrc(current.videoUrl!);
  const still = youtubeThumbnailUrl(current.videoUrl!) ?? current.photo;

  return (
    <div>
      {videos.length > 1 ? (
        <div
          className="flex flex-wrap gap-x-8 gap-y-2 border-b border-ink/10"
          role="tablist"
          aria-label="Customer films"
        >
          {videos.map((story, i) => {
            const active = i === index;
            return (
              <button
                key={story.videoUrl}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setIndex(i)}
                className={`${FOCUS_RING} -mb-px border-b-2 pb-3 font-body text-sm sm:text-base ${
                  active
                    ? "border-ink text-ink"
                    : "border-transparent text-ink/45 hover:text-ink/75"
                }`}
              >
                {story.name}
              </button>
            );
          })}
        </div>
      ) : null}

      {embed ? (
        <div
          className={`${videos.length > 1 ? "mt-8" : ""} overflow-hidden rounded-2xl bg-ink sm:rounded-[1.35rem]`}
        >
          <iframe
            src={embed}
            title={current.name}
            className="aspect-video w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      ) : still ? (
        <div
          className={`${videos.length > 1 ? "mt-8" : ""} overflow-hidden rounded-2xl bg-ink sm:rounded-[1.35rem]`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- YouTube stills */}
          <img src={still} alt={current.name} className="aspect-video w-full object-cover" />
        </div>
      ) : null}

      <p className="mt-5 font-display text-2xl tracking-tight text-ink">{current.name}</p>
      {current.role ? (
        <p className="mt-1.5 max-w-2xl font-body text-sm leading-relaxed text-ink/70 sm:text-base">
          {current.role}
        </p>
      ) : null}
    </div>
  );
}
