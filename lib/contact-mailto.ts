import { STUDIO_EMAIL } from "@/lib/locations";

export function buildContactMailto(params: {
  studio: string;
  name: string;
  email: string;
  message: string;
}): string {
  const subject = encodeURIComponent(
    `Interior enquiry — ${params.studio} — ${params.name}`,
  );
  const body = encodeURIComponent(
    `Studio: ${params.studio}\nName: ${params.name}\nReply-to: ${params.email}\n\n${params.message}\n`,
  );
  return `mailto:${STUDIO_EMAIL}?subject=${subject}&body=${body}`;
}
