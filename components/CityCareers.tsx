"use client";

import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { STUDIO_EMAIL_HREF } from "@/lib/locations";
import { vividCareerBenefits, vividCareerOpenings } from "@/lib/vivid-reference";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

export function CityCareers() {
  const { location } = useStudioLocation();

  return (
    <section className={`py-24 ${PAGE_GUTTER_X}`}>
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-strong">Careers</p>
          <h1 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl">
            Build your career in luxury design & architecture
          </h1>
          <p className="mt-4 max-w-3xl text-muted">
            Join the {location.label} office — a culture of creativity, precision, and disciplined execution.
            We value commitment, accountability, and people who want to grow with the work.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-strong">Why join</p>
          <h2 className="mt-2 font-display text-2xl tracking-tight text-ink sm:text-3xl">
            Growth, craft, and real responsibility
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            You are not hired to sit in a lane. You are hired to get better — and to take on more as you do.
          </p>
        </Reveal>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {vividCareerBenefits.map((benefit) => (
            <li key={benefit.title} className="rounded-2xl border border-ink/10 bg-canvas p-6 shadow-sm">
              <h3 className="font-display text-xl text-ink">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{benefit.body}</p>
            </li>
          ))}
        </ul>

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {vividCareerOpenings.map((job) => (
            <li key={job.role} className="rounded-2xl border border-ink/10 bg-panel/35 p-6 shadow-sm">
              <h2 className="font-display text-2xl text-ink">{job.role}</h2>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
                Experience · {job.experience}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{job.skills}</p>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-muted">
          To apply, email your profile, portfolio, and resume to{" "}
          <a href={STUDIO_EMAIL_HREF} className="font-semibold text-ink underline-offset-2 hover:underline">
            the {location.id === "hyderabad" ? "office" : "studio"} team
          </a>
          .
        </p>
      </div>
    </section>
  );
}
