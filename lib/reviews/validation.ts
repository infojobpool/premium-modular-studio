import type { StudioLocationId } from "@/lib/locations";
import type { CustomerReviewInput } from "./types";

export type ParsedReviewInput =
  | { ok: true; data: Omit<CustomerReviewInput, "company"> }
  | { ok: false; error: string };

export function parseReviewInput(body: unknown): ParsedReviewInput {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request." };
  }

  const raw = body as Record<string, unknown>;

  if (typeof raw.company === "string" && raw.company.trim() !== "") {
    return { ok: false, error: "Invalid request." };
  }

  const quote = typeof raw.quote === "string" ? raw.quote.trim() : "";
  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const role = typeof raw.role === "string" ? raw.role.trim() : "";
  const photoRaw = typeof raw.photo === "string" ? raw.photo.trim() : "";
  const videoRaw = typeof raw.videoUrl === "string" ? raw.videoUrl.trim() : "";
  const cityRaw = typeof raw.city === "string" ? raw.city.trim() : "";

  if (quote.length < 20 || quote.length > 600) {
    return { ok: false, error: "Please write a review between 20 and 600 characters." };
  }
  if (name.length < 2 || name.length > 80) {
    return { ok: false, error: "Please enter your name." };
  }
  if (role.length < 3 || role.length > 120) {
    return {
      ok: false,
      error: "Please add a short line about your project (e.g. Homeowner · Villa — Hyderabad).",
    };
  }

  let photo: string | undefined;
  if (photoRaw) {
    try {
      const url = new URL(photoRaw);
      if (url.protocol !== "https:") {
        return { ok: false, error: "Photo link must start with https://." };
      }
      photo = url.toString();
    } catch {
      return { ok: false, error: "Please enter a valid photo link, or leave it blank." };
    }
  }

  let videoUrl: string | undefined;
  if (videoRaw) {
    try {
      const url = new URL(videoRaw);
      if (url.protocol !== "https:") {
        return { ok: false, error: "Video link must start with https://." };
      }
      if (!url.hostname.endsWith(".blob.vercel-storage.com")) {
        return { ok: false, error: "Invalid review video." };
      }
      videoUrl = url.toString();
    } catch {
      return { ok: false, error: "Invalid video upload. Please try again." };
    }
  }

  let city: StudioLocationId | undefined;
  if (cityRaw === "hyderabad" || cityRaw === "bhubaneswar") {
    city = cityRaw;
  } else if (cityRaw !== "") {
    return { ok: false, error: "Please choose Hyderabad or Bhubaneswar." };
  }

  return {
    ok: true,
    data: { quote, name, role, photo, videoUrl, city },
  };
}
