import type { Metadata } from "next";
import { HubLanding } from "@/components/HubLanding";

export const metadata: Metadata = {
  title: "Choose your studio",
  description:
    "Vivid In2wrio — premium & luxury interiors in Hyderabad and Bhubaneswar. Select your city for consultations, projects, and studio contact.",
};

export default function Home() {
  return <HubLanding />;
}
