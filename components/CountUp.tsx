"use client";

import { useEffect, useState } from "react";

type Props = {
  target: number;
  suffix?: string;
  start: boolean;
};

export function CountUp({ target, suffix = "", start }: Props) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    const durationMs = 1300;
    const startedAt = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);

  if (suffix === "/10") {
    return <>{(value / 10).toFixed(1)}/5</>;
  }

  return (
    <>
      {value}
      {suffix}
    </>
  );
}
