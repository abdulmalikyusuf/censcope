"use client";
import { Hero } from "@/components/hero";
import Scrollable from "@/components/scrollable";
import aboutBannerImg from "../../../assets/images/about-us-bg.jpg";

import { OurCommitment } from "./(sections)/our-commitment";
import { OurImpact } from "./(sections)/our-impact";
import { OurDonors } from "./(sections)/our-donors";
import { WhoWeAre } from "./(sections)/who-we-are";

export default function Page() {
  const sections = [
    { label: "Who we are", id: "who-we-are", component: WhoWeAre },
    { label: "Our donors", id: "our-donors", component: OurDonors },
    { label: "Our commitment", id: "our-commitment", component: OurCommitment },
    { label: "Our impact", id: "our-impact", component: OurImpact },
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
