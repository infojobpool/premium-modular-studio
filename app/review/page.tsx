import type { Metadata } from "next";
import { Suspense } from "react";
import { ReviewPageContent } from "@/components/ReviewForm";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Share your review",
  description:
    "Tell us about your Vivid In2wrio project — your review appears on our website right after you submit.",
  robots: { index: false, follow: true },
};

export default function ReviewPage() {
  const shareUrl = `${getSiteUrl()}/review`;

  return (
    <Suspense
      fallback={
        <main className="flex min-h-dvh items-center justify-center px-6 py-28 text-muted">
          Loading review form…
        </main>
      }
    >
      <ReviewPageContent shareUrl={shareUrl} />
    </Suspense>
  );
}
