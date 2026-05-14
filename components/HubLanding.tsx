"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { VividLogo } from "./VividLogo";

const cards = [
  {
    city: "hyderabad" as const,
    title: "Hyderabad",
    line: "Flagship studio · Secunderabad / Sainikpuri",
    href: "/hyderabad",
    accent: "ink" as const,
  },
  {
    city: "bhubaneswar" as const,
    title: "Bhubaneswar",
    line: "Studio · Puri Bypass, Mangaraj Point",
    href: "/bhubaneswar",
    accent: "gold" as const,
  },
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

export function HubLanding() {
  const reduce = useReducedMotion();

  const heroItem = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.52, ease: easeOut },
    },
  };

  const heroLine = {
    hidden: { opacity: reduce ? 1 : 0, scaleX: reduce ? 1 : 0 },
    show: {
      opacity: 1,
      scaleX: 1,
      transition: { duration: reduce ? 0 : 0.52, ease: easeOut },
    },
  };

  return (
    <>
      <div
        className={`relative overflow-hidden mesh-hero ${PAGE_GUTTER_X} pb-12 pt-16 sm:pb-14 sm:pt-20`}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_50%_at_50%_-15%,color-mix(in_oklab,var(--color-accent)_14%,transparent),transparent_55%)]"
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute -right-24 top-1/3 h-[420px] w-[420px] rounded-full bg-accent/8 blur-[100px]"
          aria-hidden
          animate={reduce ? undefined : { scale: [1, 1.06, 1], opacity: [0.55, 0.75, 0.55] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-ink/10 blur-[90px]"
          aria-hidden
          animate={reduce ? undefined : { scale: [1, 1.05, 1], opacity: [0.4, 0.55, 0.4] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <header className="relative mx-auto flex max-w-7xl justify-center sm:justify-start">
          <motion.div
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.65, ease: easeOut }}
          >
            <Link
              href="/"
              className="inline-flex min-w-0 rounded-2xl border border-ink/10 bg-canvas/55 px-3.5 py-2.5 shadow-[0_12px_40px_-24px_rgba(27,63,46,0.35)] ring-1 ring-white/50 backdrop-blur-md transition hover:border-accent/35 hover:shadow-[0_20px_50px_-22px_rgba(27,63,46,0.28)]"
              aria-label="Vivid In2erio home"
            >
              <VividLogo size="home" />
            </Link>
          </motion.div>
        </header>

        <motion.div
          className={`relative mx-auto mt-8 max-w-3xl text-center sm:mt-10 ${CONTENT_MAX}`}
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: reduce ? 0 : 0.09,
                delayChildren: reduce ? 0 : 0.12,
              },
            },
          }}
        >
          <motion.p variants={heroItem} className="text-[11px] font-semibold uppercase tracking-[0.38em] text-accent sm:text-xs">
            Premium & luxury interiors
          </motion.p>
          <motion.div variants={heroLine} className="mx-auto mt-2 h-px w-16 origin-center bg-gradient-to-r from-transparent via-accent to-transparent sm:w-24" />
          <motion.h1
            variants={{
              hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 18 },
              show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.65, ease: easeOut } },
            }}
            className="mt-3 font-display text-[2.1rem] leading-[1.1] tracking-tight text-ink sm:text-[2.65rem] md:text-[3.1rem]"
          >
            Choose your Vivid In2erio studio
          </motion.h1>
          <motion.p variants={heroItem} className="mx-auto mt-4 max-w-2xl text-[0.95rem] leading-snug text-muted sm:text-base">
            We design more than spaces — we curate refined lifestyles. Open the Hyderabad or Bhubaneswar
            studio for local projects, consultations, and contact so your enquiry lands with the right team.
          </motion.p>
          <motion.p
            variants={{
              hidden: { opacity: reduce ? 1 : 0 },
              show: { opacity: 1, transition: { duration: reduce ? 0 : 0.48, ease: easeOut } },
            }}
            className="mx-auto mt-3 max-w-xl text-[11px] font-semibold uppercase tracking-[0.24em] text-ink/55 sm:text-xs"
          >
            Design-to-delivery · Luxury homes & workspaces · By appointment
          </motion.p>
        </motion.div>

        <div className={`relative mx-auto mt-8 grid max-w-5xl gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 ${CONTENT_MAX}`}>
          {cards.map((c, i) => (
            <motion.div
              key={c.city}
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: reduce ? 0 : 0.08 + i * 0.1,
                duration: reduce ? 0 : 0.75,
                ease: easeOut,
              }}
              whileHover={reduce ? undefined : { y: -5 }}
              whileTap={reduce ? undefined : { scale: 0.99 }}
            >
              <Link
                href={c.href}
                className="group relative flex h-full min-h-[200px] flex-col overflow-hidden rounded-[1.35rem] border border-ink/12 bg-gradient-to-b from-canvas/92 via-panel/35 to-panel/65 p-6 shadow-[0_22px_56px_-34px_rgba(27,63,46,0.38)] ring-1 ring-white/55 transition-[box-shadow,border-color] duration-500 hover:border-accent/35 hover:shadow-[0_32px_70px_-28px_rgba(27,63,46,0.42)] sm:min-h-[220px] sm:rounded-[1.5rem] sm:p-7"
              >
                <span
                  className="pointer-events-none absolute inset-x-8 top-0 h-[3px] rounded-full bg-gradient-to-r from-transparent via-accent/70 to-transparent opacity-80"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute -right-4 top-12 font-display text-[4.25rem] font-semibold leading-none text-accent/[0.07] transition-colors duration-500 group-hover:text-accent/[0.12] sm:text-[5rem] sm:top-14"
                  aria-hidden
                >
                  {c.city === "hyderabad" ? "H" : "B"}
                </span>
                <span
                  className={`font-display text-[1.85rem] leading-none tracking-tight sm:text-[2.35rem] ${
                    c.accent === "gold" ? "text-accent" : "text-ink"
                  }`}
                >
                  {c.title}
                </span>
                <p className="relative z-10 mt-2.5 max-w-[22rem] text-sm leading-snug text-muted">
                  {c.line}
                </p>
                <span className="relative z-10 mt-auto inline-flex items-center gap-2 pt-6 text-xs font-semibold uppercase tracking-[0.26em] text-ink transition group-hover:text-accent sm:pt-7">
                  Enter studio
                  <span
                    className="inline-flex h-8 w-8 translate-x-0 items-center justify-center rounded-full border border-ink/12 bg-canvas/80 text-sm transition duration-300 group-hover:translate-x-1 group-hover:border-accent/40 group-hover:bg-accent/15"
                    aria-hidden
                  >
                    →
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: reduce ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : 0.15, ease: easeOut }}
          className={`relative mx-auto mt-10 border-t border-ink/10 pt-6 text-center text-[11px] text-muted sm:mt-12 sm:pt-7 sm:text-xs ${CONTENT_MAX}`}
        >
          © {new Date().getFullYear()} Vivid In2erio ·{" "}
          <Link href="/hyderabad" className="font-medium text-ink/80 underline-offset-2 hover:text-accent hover:underline">
            Hyderabad
          </Link>
          {" · "}
          <Link
            href="/bhubaneswar"
            className="font-medium text-ink/80 underline-offset-2 hover:text-accent hover:underline"
          >
            Bhubaneswar
          </Link>
          {" · "}
          <Link href="/privacy" className="underline-offset-2 hover:text-ink hover:underline">
            Privacy
          </Link>
        </motion.p>
      </div>
    </>
  );
}
