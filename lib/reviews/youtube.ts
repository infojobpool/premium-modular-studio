/** Public YouTube watch / share URLs that play in the Stories player. */

const YOUTUBE_ID = /^[\w-]{11}$/;

export function parseYouTubeVideoId(raw: string): string | null {
  try {
    const url = new URL(raw.trim());
    const host = url.hostname.replace(/^www\./, "").toLowerCase();

    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0] ?? "";
      return YOUTUBE_ID.test(id) ? id : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
      const v = url.searchParams.get("v");
      if (v && YOUTUBE_ID.test(v)) return v;

      const parts = url.pathname.split("/").filter(Boolean);
      if ((parts[0] === "embed" || parts[0] === "shorts" || parts[0] === "live") && parts[1] && YOUTUBE_ID.test(parts[1])) {
        return parts[1];
      }
    }

    return null;
  } catch {
    return null;
  }
}

export function isYouTubeUrl(raw: string): boolean {
  return Boolean(parseYouTubeVideoId(raw));
}

export function youtubeWatchUrl(raw: string): string | null {
  const id = parseYouTubeVideoId(raw);
  return id ? `https://www.youtube.com/watch?v=${id}` : null;
}

export function youtubeEmbedSrc(raw: string): string | null {
  const id = parseYouTubeVideoId(raw);
  return id ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1` : null;
}

export function youtubeThumbnailUrl(raw: string): string | null {
  const id = parseYouTubeVideoId(raw);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}

export const CURATED_YOUTUBE_STORIES: readonly {
  url: string;
  name: string;
  role: string;
  quote?: string;
}[] = [
  {
    url: "https://youtu.be/MIF2QN0twlE",
    name: "Mr. Partha & Mrs. Beena",
    role: "Customer testimonial · Vivid In2erio Interiors",
    quote: "Customer Testimonial | Mr. Partha & Mrs. Beena | Vivid In2erio Interiors",
  },
  {
    url: "https://youtu.be/ABPxzBWizI8",
    name: "A Home Built on Trust",
    role: "Customer testimonial · Vivid In2erio Interiors",
    quote: "A Home Built on Trust — every dream home begins with trust.",
  },
];
