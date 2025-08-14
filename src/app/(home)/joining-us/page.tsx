import { Hero } from "@/components/hero";

import { Newsline } from "./(sections)/newsline";
import { Meaning } from "./(sections)/meaning";
import { joinUsSliderFrontImg } from "@/constants/media";

export default function Page() {
  const sections = [
    { id: "meaning", label: "What working with us means", component: Meaning },
    { id: "newsline", label: "News", component: Newsline },
  ];

  return (
    <>
      <Hero
        title="Join us"
        image={joinUsSliderFrontImg.src}
        links={[{ label: "join us", href: "#" }]}
        description="We are a non-profit organisation that is committed to providing support to the community."
      />
      <div className="flex flex-col gap-12 md:gap-16 lg:gap-20 overflow-x-hidden">
        {sections.map((section) => (
          <section.component key={section.id} />
        ))}
      </div>
    </>
  );
}
