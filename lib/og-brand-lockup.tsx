/** Inline brand lockup for OG images — no external assets (Satori-safe). */
export function OgBrandLockup({ compact = false }: { compact?: boolean }) {
  const markSize = compact ? 56 : 72;
  const titleSize = compact ? 30 : 38;
  const tagSize = compact ? 11 : 13;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: compact ? 12 : 18,
        backgroundColor: "#eae1c8",
        borderRadius: compact ? 14 : 18,
        padding: compact ? "10px 16px" : "14px 22px",
        border: "1px solid rgba(217,162,41,0.42)",
        boxShadow: "0 10px 28px -8px rgba(0,0,0,0.35)",
      }}
    >
      <div
        style={{
          width: markSize,
          height: markSize,
          borderRadius: compact ? 12 : 16,
          backgroundImage: "linear-gradient(135deg, #1b3f2e 0%, #0f2d20 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width={markSize * 0.55} height={markSize * 0.55} viewBox="0 0 64 64" fill="none">
          <path
            d="M17 16h10l7 17 7-17h10L32 48h-4L17 16z"
            fill="#d9a229"
          />
        </svg>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span
          style={{
            fontFamily: "Cormorant Garamond",
            fontSize: titleSize,
            fontWeight: 600,
            lineHeight: 1,
            color: "#1b3f2e",
            letterSpacing: "-0.02em",
          }}
        >
          Vivid In2erio
        </span>
        <span
          style={{
            fontFamily: "DM Sans",
            fontSize: tagSize,
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#5c4510",
          }}
        >
          Premium interiors
        </span>
      </div>
    </div>
  );
}
