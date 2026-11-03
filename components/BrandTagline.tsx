type Props = {
  /** Cream surfaces vs full-bleed hero stills. */
  variant?: "light" | "onDark";
  className?: string;
  /** Extra-small tracked line vs display-size highlight. */
  size?: "sm" | "md";
};

/** Gold-underlined studio tagline — same highlight language as city names. */
export function BrandTagline({ variant = "light", className = "", size = "sm" }: Props) {
  const onDark = variant === "onDark";
  const mark = onDark
    ? "font-semibold text-accent-soft underline decoration-accent decoration-2 underline-offset-[6px]"
    : "font-semibold text-accent-strong underline decoration-accent/70 decoration-2 underline-offset-[6px]";
  const dot = onDark ? "text-white/45" : "text-ink/30";
  const scale =
    size === "md"
      ? "font-display text-lg tracking-tight sm:text-xl"
      : "font-display text-[13px] tracking-[0.04em] sm:text-sm";

  return (
    <p className={`${scale} ${className}`.trim()}>
      <span className={mark}>You Aspire</span>
      <span className={`mx-1.5 ${dot}`} aria-hidden>
        ·
      </span>
      <span className={mark}>We Deliver</span>
    </p>
  );
}
