import type { StudioLocationId } from "@/lib/locations";

export type CustomerReview = {
  id: string;
  quote: string;
  name: string;
  role: string;
  photo?: string;
  photoAlt?: string;
  /** Optional short clip uploaded on /review only. */
  videoUrl?: string;
  city?: StudioLocationId;
  createdAt: string;
  published: boolean;
};

export type CustomerReviewInput = {
  quote: string;
  name: string;
  role: string;
  photo?: string;
  videoUrl?: string;
  city?: StudioLocationId;
  /** Honeypot — must be empty */
  company?: string;
};

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  photo: string;
  photoAlt: string;
  videoUrl?: string;
};

export type ReviewsDatabase = {
  reviews: CustomerReview[];
};
