import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import {
  REVIEW_VIDEO_CONTENT_TYPES,
  REVIEW_VIDEO_MAX_BYTES,
} from "@/lib/reviews/constants";

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("reviews/videos/")) {
          throw new Error("Invalid upload path.");
        }

        return {
          allowedContentTypes: [...REVIEW_VIDEO_CONTENT_TYPES],
          maximumSizeInBytes: REVIEW_VIDEO_MAX_BYTES,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ purpose: "review-video" }),
        };
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
