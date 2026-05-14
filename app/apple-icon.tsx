import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };

export const contentType = "image/png";

/** Home-screen / PWA bookmark tile — matches favicon mark at readable size. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1b3f2e",
          borderRadius: 40,
        }}
      >
        <svg width="108" height="108" viewBox="0 0 128 128" aria-hidden>
          <path d="M34 33h20l10 24 10-24h20L67 95h-6L34 33z" fill="#d9a229" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
