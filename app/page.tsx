import type { Metadata } from "next";
import { HubLanding } from "@/components/HubLanding";
import { buildMetadataForPath } from "@/lib/seo/page-seo";

export async function generateMetadata(): Promise<Metadata> {
  return await buildMetadataForPath("/");
}

export default function Home() {
  return <HubLanding />;
}
