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
          backgroundColor: "#1B3322",
          borderRadius: 40,
        }}
      >
        <svg width="108" height="108" viewBox="0 0 128 128" aria-hidden>
          <path
            d="M36 48 L64 28 L92 48"
            stroke="#E6DDC4"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="64" cy="57" r="6.5" fill="#D4A017" />
          <path
            d="M64 78 C52 78 36 68 32 54 C30 46 36 42 42 46 L54 62 L64 57 L74 62 L86 46 C92 42 98 46 96 54 C92 68 76 78 64 78 Z"
            fill="#D4A017"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
