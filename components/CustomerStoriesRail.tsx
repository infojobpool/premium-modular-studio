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
      <ul className="flex flex-wrap items-start gap-x-5 gap-y-4 sm:gap-x-7">
        {videos.map((story, i) => {
          const thumb = youtubeThumbnailUrl(story.videoUrl!) ?? story.photo;
          const active = i === index;
          return (
            <li key={story.videoUrl} className="w-[4.5rem] sm:w-[5.25rem]">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={active}
                className={`group mx-auto flex w-full flex-col items-center ${FOCUS_RING} rounded-full`}
              >
                <span
                  className={`relative block aspect-square w-full overflow-hidden rounded-full ${
                    active ? "ring-2 ring-ink ring-offset-2 ring-offset-canvas" : "ring-1 ring-ink/15"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- YouTube stills */}
                  <img src={thumb} alt="" className="size-full object-cover" />
                </span>
                <span className="mt-2 line-clamp-2 text-center font-body text-[11px] font-semibold leading-snug text-ink sm:text-xs">
                  {story.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {embed ? (
        <div className="relative left-1/2 right-1/2 mt-8 w-screen -translate-x-1/2 overflow-hidden bg-ink sm:mt-10">
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
        <div className="relative left-1/2 right-1/2 mt-8 w-screen -translate-x-1/2 overflow-hidden bg-ink sm:mt-10">
          {/* eslint-disable-next-line @next/next/no-img-element -- YouTube stills */}
          <img src={still} alt={current.name} className="aspect-video w-full object-cover" />
        </div>
      ) : null}

      <p className="mt-4 font-display text-xl text-ink sm:text-2xl">{current.name}</p>
      {current.role ? (
        <p className="mt-1.5 max-w-2xl font-body text-sm font-medium leading-relaxed text-ink/80 sm:text-base">
          {current.role}
        </p>
      ) : null}
    </div>
  );
}
