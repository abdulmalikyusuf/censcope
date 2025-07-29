"use client";
import Hero from "@/components/hero";
import Scrollable from "@/components/scrollable";
import { aboutBannerImg } from "@/constants/media";

import Commit from "./(sections)/commits";
import Account from "./(sections)/accounts";
import History from "./(sections)/histories";
import Identity from "./(sections)/identities";

export default function Page() {
  const sections = [
    { label: "Who we are", id: "who-we-are", component: Identity },
    { label: "Our donors", id: "donors", component: History },
    { label: "Our commitment", id: "commit", component: Commit },
    { label: "Our impact", id: "section-4", component: Account },
  ];

  return (
    <>
      <Hero
        title="About us"
        image={aboutBannerImg.src}
        links={[{ label: "about us", href: "#" }]}
        description="We are a non-profit organisation that is committed to providing comprehensive support to individuals and communities who have been adversely affected by violent conflicts and natural disasters."
      />
      <Scrollable sections={sections} />
    </>
  );
}
