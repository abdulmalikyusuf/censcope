"use client";
import { Hero } from "@/components/hero";
import Scrollable from "@/components/scrollable";
import Events from "./(sections)/events";
import Reason from "./(sections)/reason";
import Donate from "./(sections)/donate";
import CrowdFunding from "./(sections)/funding";
import SupportUs from "src/assets/images/support-us.jpg";

export default function Page() {
  const sections = [
    { id: "donate", label: "Make a donation", component: Donate },
    { id: "reason", label: "Why and How to donate?", component: Reason },
    { id: "funding", label: "Crowdfunding", component: CrowdFunding },
    { id: "events", label: "Take part in our events", component: Events },
  ];

  return (
    <>
      <Hero
        title="Support us"
        image={SupportUs.src}
        links={[{ label: "support us", href: "#" }]}
        description="We are a non-profit organisation that is committed to providing support to the community."
      />

      <Scrollable sections={sections} />
    </>
  );
}
