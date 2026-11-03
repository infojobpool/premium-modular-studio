"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef, type PointerEvent, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  intensity?: number;
};

/** Pointer-follow 3D tilt. Disabled when the user prefers reduced motion. */
export function Tilt3D({ children, className, intensity = 9 }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 200, damping: 20, mass: 0.35 });
  const sy = useSpring(py, { stiffness: 200, damping: 20, mass: 0.35 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-intensity, intensity]);

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    if (!r.width || !r.height) return;
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onPointerLeave() {
    px.set(0);
    py.set(0);
  }

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`h-full will-change-transform [transform-style:preserve-3d] ${className ?? ""}`}
      style={{ rotateX, rotateY }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </motion.div>
  );
}
