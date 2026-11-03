"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
};

/** Word-by-word 3D flip-in for the home hero title. */
export function Hero3DHeadline({ text, className }: Props) {
  const reduce = useReducedMotion();
  const lines = text.split("\n");

  if (reduce) {
    return <h1 className={`${className ?? ""} whitespace-pre-line`}>{text}</h1>;
  }

  return (
    <h1 className={`${className ?? ""} [perspective:1100px]`}>
      {lines.map((line, li) => (
        <span key={`${li}-${line}`} className="block overflow-hidden py-[0.03em]">
          {line.split(" ").map((word, wi) => (
            <motion.span
              key={`${li}-${wi}-${word}`}
              className="mr-[0.28em] inline-block origin-bottom will-change-transform [transform-style:preserve-3d] last:mr-0"
              initial={{ opacity: 0, rotateX: 78, y: 36, z: -48 }}
              animate={{ opacity: 1, rotateX: 0, y: 0, z: 0 }}
              exit={{ opacity: 0, rotateX: -42, y: -16, z: -24 }}
              transition={{
                duration: 0.78,
                delay: 0.04 + li * 0.12 + wi * 0.055,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
}
