import { Hero } from "@/components/hero";

import OurAction from "src/assets/images/our-action.jpg";
import { Actions } from "../(index)/(sections)/actions";
import { Pillars } from "./(sections)/pillars";
import { actionsMetadata } from "@/config/metadata";

export const metadata = actionsMetadata;

export default function Page() {
  return (
    <>
      <Hero
        title="What we do"
        image={OurAction.src}
        links={[{ label: "what we do", href: "#" }]}
        description="We deliver holistic humanitarian support that includes medical care, psychosocial assistance, livelihood empowerment, and inclusive education. By engaging local leaders, volunteers, and stakeholders, we foster community-driven solutions that promote safety, resilience, and social cohesion"
      />

      <Actions />
      <Pillars />
    </>
  );
}
