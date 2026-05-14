"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { HeroSlide } from "@/lib/hero-media";

const INTERVAL_MS = 6500;

export function useHeroCarousel(slides: HeroSlide[]) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const list = useMemo(() => {
    if (!reduceMotion) return slides;
    const noVideo = slides.filter((s) => s.kind !== "video");
    return noVideo.length > 0 ? noVideo : slides;
  }, [reduceMotion, slides]);

  const len = list.length;
  const safeIndex = len ? index % len : 0;
  const current = list[safeIndex] ?? null;

  useEffect(() => {
    setIndex(0);
  }, [list]);

  useEffect(() => {
    if (reduceMotion || len < 2 || paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % len);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [len, paused, reduceMotion]);

  const go = useCallback(
    (dir: -1 | 1) => {
      if (!len) return;
      setIndex((i) => (i + dir + len) % len);
    },
    [len],
  );

  return {
    list,
    len,
    safeIndex,
    current,
    reduceMotion,
    setIndex,
    go,
    setPaused,
  };
}
