import type { ReactNode } from "react";

/** Wraps the “2” in `.brand-in2-digit` — matches surrounding type (logo lockup) site-wide. */
export const brandIn2DigitClass = "brand-in2-digit";

const BRAND_PATTERN = /Vivid In2erio|Vivid In2terio|In2erio|In2terio/g;

/**
 * Replaces “Vivid In2erio” / “In2erio” (and legacy “In2terio” spellings) with markup that highlights the digit 2.
 */
export function withBrandHighlight(text: string): ReactNode {
  const matches = [...text.matchAll(BRAND_PATTERN)];
  if (matches.length === 0) return text;

  const out: ReactNode[] = [];
  let last = 0;
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i]!;
    const idx = m.index ?? 0;
    if (idx > last) out.push(text.slice(last, idx));
    const raw = m[0]!;
    const isFull = raw.startsWith("Vivid");
    out.push(
      <span key={`brand-${idx}-${i}`}>
        {isFull ? "Vivid In" : "In"}
        <span className={brandIn2DigitClass}>2</span>
        erio
      </span>,
    );
    last = idx + raw.length;
  }
  if (last < text.length) out.push(text.slice(last));
  if (out.length === 1 && typeof out[0] === "string") return out[0];
  return <>{out}</>;
}
