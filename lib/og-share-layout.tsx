/**
 * JSX for `next/og` ImageResponse — inline styles only (Satori subset).
 * Used by `app/opengraph-image.tsx` and `app/twitter-image.tsx`.
 */
export function OgShareLayout() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "space-between",
        padding: 56,
        backgroundColor: "#eae1c8",
        backgroundImage: "linear-gradient(165deg, #f4ecd8 0%, #ded8c4 45%, #d4c9a8 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundColor: "#1b3f2e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#d9a229", fontSize: 28, fontWeight: 700 }}>V</span>
          </div>
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#5c4510",
            }}
          >
            Premium interiors
          </span>
        </div>
        <span
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#3d5a4d",
          }}
        >
          Hyderabad · Bhubaneswar
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 24 }}>
        <div
          style={{
            fontSize: 76,
            fontWeight: 600,
            lineHeight: 1.05,
            color: "#1b3f2e",
            fontFamily: "Georgia, 'Times New Roman', serif",
            letterSpacing: "-0.02em",
          }}
        >
          Vivid In2erio
        </div>
        <div
          style={{
            fontSize: 32,
            lineHeight: 1.35,
            color: "#3d5a4d",
            maxWidth: 920,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Design-to-delivery luxury homes & workspaces — curated materials, modular craft, and studio-led
          site coordination across Telangana and Odisha.
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ height: 4, width: 200, backgroundColor: "#d9a229", borderRadius: 4 }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#1b3f2e",
            fontWeight: 600,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <span>Book a private studio consultation</span>
          <span style={{ color: "#5c4510", fontSize: 20 }}>viviin2rio.com</span>
        </div>
      </div>
    </div>
  );
}
