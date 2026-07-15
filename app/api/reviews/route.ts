import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { addCustomerReview } from "@/lib/reviews/store";
import { parseReviewInput } from "@/lib/reviews/validation";

export async function GET() {
  const { listPublishedReviews } = await import("@/lib/reviews/store");
  const reviews = await listPublishedReviews();
  return NextResponse.json({ ok: true, reviews });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = parseReviewInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  try {
    const review = await addCustomerReview(parsed.data);
    revalidatePath("/hyderabad");
    revalidatePath("/bhubaneswar");
    revalidatePath("/review");

    return NextResponse.json({ ok: true, review: { id: review.id, createdAt: review.createdAt } });
  } catch (error) {
    console.error("[reviews] store error", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not save your review right now. Please try again in a few minutes or message us on WhatsApp.",
      },
      { status: 503 },
    );
  }
}
