import { listPublishedReviews } from "./store";
import type { TestimonialItem } from "./types";
import { CURATED_YOUTUBE_STORIES, parseYouTubeVideoId, youtubeThumbnailUrl, youtubeWatchUrl } from "./youtube";

const FALLBACK_PHOTO =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=320&h=320&fit=crop&crop=faces";

function toStory(item: {
  quote: string;
  name: string;
  role: string;
  photo?: string;
  photoAlt?: string;
  videoUrl?: string;
}): TestimonialItem {
  return {
    quote: item.quote,
    name: item.name,
    role: item.role,
    photo: item.photo ?? FALLBACK_PHOTO,
    photoAlt: item.photoAlt ?? `Portrait of ${item.name}`,
    videoUrl: item.videoUrl,
  };
}

/** YouTube customer testimonials only. */
export async function getCustomerStories(): Promise<TestimonialItem[]> {
  const youtube = CURATED_YOUTUBE_STORIES.flatMap((item) => {
    const url = youtubeWatchUrl(item.url);
    if (!url || !parseYouTubeVideoId(item.url)) return [];
    return [
      toStory({
        quote: item.quote?.trim() || item.name,
        name: item.name,
        role: item.role,
        photo: youtubeThumbnailUrl(item.url) ?? undefined,
        photoAlt: item.quote ?? `YouTube video: ${item.name}`,
        videoUrl: url,
      }),
    ];
  });

  const published = await listPublishedReviews();
  const fromReviews = published
    .filter((review) => Boolean(review.videoUrl && parseYouTubeVideoId(review.videoUrl)))
    .map((review) =>
      toStory({
        ...review,
        videoUrl: youtubeWatchUrl(review.videoUrl!) ?? review.videoUrl,
        photo: youtubeThumbnailUrl(review.videoUrl!) ?? review.photo,
      }),
    );

  const seen = new Set<string>();
  const out: TestimonialItem[] = [];
  for (const story of [...youtube, ...fromReviews]) {
    const key = story.videoUrl ?? story.name;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(story);
  }
  return out;
}
