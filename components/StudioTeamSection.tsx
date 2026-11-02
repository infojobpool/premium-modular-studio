"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { STUDIO_LEADERSHIP, STUDIO_TEAM, STUDIO_TEAM_INTRO, type StudioTeamMember } from "@/lib/studio-team";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

function initialsFor(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function studioLabel(member: StudioTeamMember) {
  if (member.studio === "both") return "Hyderabad & Bhubaneswar";
  return member.studio === "bhubaneswar" ? "Bhubaneswar studio" : "Hyderabad office";
}

function MemberCard({
  member,
  featured = false,
}: {
  member: StudioTeamMember;
  featured?: boolean;
}) {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-ink/12 bg-gradient-to-b from-canvas via-canvas/95 to-panel/45 shadow-[0_20px_48px_-32px_rgba(27,63,46,0.35)]">
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        aria-hidden
      />
      <div
        className={`relative mx-auto overflow-hidden rounded-[1.1rem] border border-ink/10 bg-panel/40 shadow-inner ${
          featured ? "mt-6 h-[240px] w-[196px]" : "mt-6 h-[220px] w-[180px]"
        }`}
      >
        {member.imageSrc ? (
          <Image
            src={member.imageSrc}
            alt={member.imageAlt}
            fill
            sizes={featured ? "196px" : "180px"}
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-ink/8 to-accent/10 font-display text-4xl text-ink/35">
            {initialsFor(member.name)}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col px-5 pb-6 pt-5 text-center">
        <h3 className={`font-display tracking-tight text-ink ${featured ? "text-2xl sm:text-[1.7rem]" : "text-2xl"}`}>
          {member.name}
        </h3>
        {member.role ? <p className="mt-2 text-sm leading-relaxed text-muted">{member.role}</p> : null}
        <p
          className={`mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] ${
            member.studio === "both" ? "text-ink/45" : "text-accent-strong"
          }`}
        >
          {studioLabel(member)}
        </p>
        {member.phone && member.phoneHref ? (
          <a
            href={member.phoneHref}
            className="mt-4 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-ink/80 transition hover:text-accent-strong"
          >
            <span aria-hidden>☎</span>
            {member.phone}
          </a>
        ) : null}
      </div>
    </article>
  );
}

export function StudioTeamSection() {
  const { location } = useStudioLocation();

  const studioMembers = STUDIO_TEAM.filter((m) => {
    if (m.tier === "ceo") return false;
    if (location.id === "bhubaneswar") {
      return m.studio === "bhubaneswar" || m.studio === "both";
    }
    return true;
  });

  return (
    <section
      id="team"
      className={`border-t border-ink/10 bg-canvas py-20 sm:py-24 ${PAGE_GUTTER_X}`}
      aria-labelledby="studio-team-heading"
    >
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-strong">
            {STUDIO_TEAM_INTRO.eyebrow}
          </p>
          <h2
            id="studio-team-heading"
            className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl"
          >
            {STUDIO_TEAM_INTRO.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{STUDIO_TEAM_INTRO.body}</p>
        </Reveal>

        <div className="mt-12" aria-labelledby="leadership-heading">
          <p id="leadership-heading" className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-strong">
            Leadership
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-ink sm:text-3xl">CEOs</p>

          <div className="relative mx-auto mt-8 max-w-4xl">
            <div
              className="pointer-events-none absolute left-[25%] right-[25%] top-0 hidden h-8 sm:block"
              aria-hidden
            >
              <span className="absolute left-0 right-0 top-0 h-px bg-ink/15" />
              <span className="absolute left-0 top-0 h-8 w-px bg-ink/15" />
              <span className="absolute right-0 top-0 h-8 w-px bg-ink/15" />
              <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
            </div>
            <ul className="grid gap-5 pt-2 sm:grid-cols-2 sm:gap-8 sm:pt-8">
              {STUDIO_LEADERSHIP.map((member, i) => (
                <motion.li
                  key={member.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <MemberCard member={member} featured />
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {studioMembers.length > 0 ? (
          <div className="mt-16 sm:mt-20" aria-labelledby="studio-people-heading">
            <p id="studio-people-heading" className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-strong">
              Studio
            </p>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {studioMembers.map((member, i) => (
                <motion.li
                  key={member.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="group"
                >
                  <div className="h-full transition duration-400 group-hover:-translate-y-0.5">
                    <MemberCard member={member} />
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
