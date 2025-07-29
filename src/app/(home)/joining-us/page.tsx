"use client";

import Hero from "@/components/hero";
import Scrollable from "@/components/scrollable";

import News from "./(sections)/newsline";
import Meaning from "./(sections)/meaning";
import { joinUsSliderFrontImg } from "@/constants/media";

export default function Page() {
  const sections = [
    { id: "meaning", label: "What working with us means", component: Meaning },
    { id: "newsline", label: "News", component: News },
  ];

  return (
    <>
      <Hero
        title="Join us"
        image={joinUsSliderFrontImg.src}
        links={[{ label: "join us", href: "#" }]}
        description="We are a non-profit organisation that is committed to providing support to the community."
      />
      <Scrollable sections={sections} />
    </>
  );
}
