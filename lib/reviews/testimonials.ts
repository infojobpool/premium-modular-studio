import { vividTestimonials } from "@/lib/vivid-reference";
import { listPublishedReviews } from "./store";
import type { TestimonialItem } from "./types";

const FALLBACK_PHOTO =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=320&h=320&fit=crop&crop=faces";

function toTestimonialItem(review: {
  quote: string;
  name: string;
  role: string;
  photo?: string;
  photoAlt?: string;
}): TestimonialItem {
  return {
    quote: review.quote,
    name: review.name,
    role: review.role,
    photo: review.photo ?? FALLBACK_PHOTO,
    photoAlt: review.photoAlt ?? `Portrait of ${review.name}`,
  };
}

/** Customer reviews when available; otherwise seeded studio testimonials. */
export async function getDisplayTestimonials(): Promise<TestimonialItem[]> {
  const customer = await listPublishedReviews();
  if (customer.length > 0) {
    return customer.map(toTestimonialItem);
  }
  return vividTestimonials.map((item) => toTestimonialItem(item));
}
