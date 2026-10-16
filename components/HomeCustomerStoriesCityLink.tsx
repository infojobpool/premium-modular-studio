"use client";

import Link from "next/link";
import { FOCUS_RING } from "@/lib/ui-classes";
import { useStudioLocation } from "./LocationProvider";

export function HomeCustomerStoriesCityLink() {
  const { location } = useStudioLocation();

  return (
    <Link
      href={`/${location.id}/projects#stories`}
      className={`text-sm font-semibold uppercase tracking-[0.2em] text-ink underline-offset-4 hover:underline md:text-right ${FOCUS_RING}`}
    >
      All stories →
    </Link>
  );
}
