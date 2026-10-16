import type { ReactNode } from "react";

type Props = {
  number?: string;
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
  align?: "left" | "between";
  trailing?: ReactNode;
};

export function EditorialSectionHeader({
  number,
  eyebrow,
  title,
  description,
  id,
  align = "left",
  trailing,
}: Props) {
  const isBetween = align === "between" && trailing;

  return (
    <div
      className={
        isBetween
          ? "flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          : "max-w-3xl"
      }
    >
      <div className="min-w-0">
        <div className="flex items-start gap-4">
          {number ? (
            <span
              className="font-display text-5xl leading-none text-accent/35 sm:text-6xl"
              aria-hidden
            >
              {number}
            </span>
          ) : null}
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-strong">
              {eyebrow}
            </p>
            <h2
              id={id}
              className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl md:text-[2.65rem]"
            >
              {title}
            </h2>
            <span className="editorial-gold-rule mt-4" aria-hidden />
            {description ? (
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                {description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
      {trailing ? <div className="shrink-0">{trailing}</div> : null}
    </div>
  );
}
