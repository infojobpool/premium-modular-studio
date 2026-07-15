import { head, put } from "@vercel/blob";
import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { CustomerReview, CustomerReviewInput, ReviewsDatabase } from "./types";

const BLOB_PATHNAME = "customer-reviews.json";
const LOCAL_FILE = path.join(process.cwd(), "data", "customer-reviews.json");

function isBlobStorageEnabled(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

async function readLocalDatabase(): Promise<ReviewsDatabase> {
  try {
    const raw = await fs.readFile(LOCAL_FILE, "utf8");
    const parsed = JSON.parse(raw) as ReviewsDatabase;
    if (!Array.isArray(parsed.reviews)) return { reviews: [] };
    return parsed;
  } catch {
    return { reviews: [] };
  }
}

async function writeLocalDatabase(db: ReviewsDatabase): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(db, null, 2), "utf8");
}

async function readBlobDatabase(): Promise<ReviewsDatabase> {
  try {
    const meta = await head(BLOB_PATHNAME);
    const res = await fetch(meta.url, { cache: "no-store" });
    if (!res.ok) return { reviews: [] };
    const parsed = (await res.json()) as ReviewsDatabase;
    if (!Array.isArray(parsed.reviews)) return { reviews: [] };
    return parsed;
  } catch {
    return { reviews: [] };
  }
}

async function writeBlobDatabase(db: ReviewsDatabase): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify(db), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

async function readDatabase(): Promise<ReviewsDatabase> {
  return isBlobStorageEnabled() ? readBlobDatabase() : readLocalDatabase();
}

async function writeDatabase(db: ReviewsDatabase): Promise<void> {
  if (isBlobStorageEnabled()) {
    await writeBlobDatabase(db);
    return;
  }
  await writeLocalDatabase(db);
}

export async function listPublishedReviews(): Promise<CustomerReview[]> {
  const db = await readDatabase();
  return db.reviews
    .filter((review) => review.published)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addCustomerReview(
  input: Omit<CustomerReviewInput, "company">,
): Promise<CustomerReview> {
  const db = await readDatabase();
  const review: CustomerReview = {
    id: randomUUID(),
    quote: input.quote,
    name: input.name,
    role: input.role,
    photo: input.photo,
    photoAlt: input.photo ? `Portrait of ${input.name}` : undefined,
    city: input.city,
    createdAt: new Date().toISOString(),
    published: true,
  };

  db.reviews.unshift(review);
  await writeDatabase(db);
  return review;
}
