"use client";

import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import { useLenis } from "lenis/react";
import { useCallback, useState } from "react";

/**
 * Thin reading-progress rail synced to Lenis scroll (`lenis.progress`).
 */
export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback((lenis: Lenis) => {
    setProgress(lenis.progress);
  }, []);

  useLenis(onScroll, [], 0);

  if (reduceMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] bg-ink/5"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      aria-label="Page scroll progress"
    >
      <div
        className="h-full origin-left bg-accent"
        style={{
          transform: `scaleX(${progress})`,
          transition: "transform 80ms ease-out",
        }}
      />
    </div>
  );
}
