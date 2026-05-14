"use client";

import { useMemo } from "react";
import { ReactLenis } from "lenis/react";
import type { LenisOptions } from "lenis";
import { ScrollProgress } from "./ScrollProgress";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const options = useMemo<LenisOptions>(
    () => ({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.85,
      autoRaf: true,
    }),
    [],
  );

  return (
    <ReactLenis root options={options}>
      <ScrollProgress />
      {children}
    </ReactLenis>
  );
}
