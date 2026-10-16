"use client";

import type { TestimonialItem } from "@/lib/reviews/types";
import { isYouTubeUrl, youtubeEmbedSrc } from "@/lib/reviews/youtube";

type Props = {
  stories: readonly TestimonialItem[];
};

export function CustomerStoriesRail({ stories }: Props) {
  const videos = stories.filter((story) => Boolean(story.videoUrl && isYouTubeUrl(story.videoUrl)));

  if (videos.length === 0) {
    return (
      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-ink">
        <div className="flex aspect-video items-center justify-center text-sm text-canvas/70">
          YouTube player
        </div>
      </div>
    );
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
          </li>
        );
      })}
    </ul>
  );
}
