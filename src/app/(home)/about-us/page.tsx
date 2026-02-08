import Image from "next/image";

import { Hero } from "@/components/hero";
import aboutBannerImg from "@/assets/images/about-us-bg.jpg";
import WhoWeAreImage from "@/assets/images/executive director.png";
import { OurCommitment } from "./(sections)/our-commitment";
import { OurImpact } from "./(sections)/our-impact";
import { OurDonors } from "./(sections)/our-donors";
import { WhoWeAre } from "./(sections)/who-we-are";
import { VisionMission } from "./(sections)/vision-mission";
import { CoreValues } from "./(sections)/core-values";
import { GeographicCoverage } from "./(sections)/geographic-coverage";
import { OrganizationalStructure } from "./(sections)/organizational-structure";
import { aboutMetadata } from "@/config/metadata";

export const metadata = aboutMetadata

export default function Page() {
  return (
    <>
      <Hero
        title="About us"
        image={aboutBannerImg.src}
        links={[{ label: "about us", href: "#" }]}
        description="We are a non-profit organisation committed to comprehensive support for communities affected by conflict and disaster. Our Strategic Plan (2026–2031) guides our mission for enduring peace, empowerment, and social equity."
      />
      <div className="flex flex-col gap-10 md:gap-14 xl:gap-16">
        <WhoWeAre />
        <VisionMission />
        <CoreValues />
        <GeographicCoverage />
        <OrganizationalStructure />
        <OurDonors />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-8 flex flex-col gap-4 md:gap-6 lg:gap-8">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-sm font-medium tracking-wide text-cyan-600 uppercase">
              From Our Leadership
            </p>
            <h2 className="mt-1 text-gray-900 font-bold text-2xl md:text-3xl">
              Executive Director&apos;s Message
            </h2>
            <p className="mt-2 lg:text-xl text-gray-600">
              Aligned with our Strategic Plan (2026–2031): building a legacy of enduring peace, empowerment, and social equity.
            </p>
          </div>
          <div className="w-fit flex flex-col md:flex-row items-center justify-center z-10 lg:items-stretch max-w-[90%] md:max-w-3xl lg:max-w-4xl h-fit 64 sm:h-72 md:h-80 lg:h-96">
            <div className="w-full md:aspect-[2/3] max-w-xs">
              <Image
                alt="Abubakar Abdullahi Suleiman - Executive Director"
                width={320}
                height={640}
                src={WhoWeAreImage}
                className="w-full h-full object-cover bg-gray-50 rounded-lg"
              />
            </div>

            <div className="px-6 md:px-8 lg:px-10 py-4 lg:py-6 w-full bg-white items-start">
              <h4 className="text-cyan-600 font-cavet text-lg md:text-xl lg:text-2xl">
                ABUBAKAR ABDULLAHI SULEIMAN
              </h4>
              <span className="lg:text-lg text-gray-700 font-medium">
                Executive Director
              </span>

              <div className="text-justify mt-4 lg:text-base text-gray-700 leading-relaxed space-y-4">
                <p>
                  As we launch our Strategic Plan for 2026–2031, I am honoured to lead CENSCOPE in its mission to build a legacy of enduring peace, empowerment, and social equity. Our plan reflects our commitment to the communities we serve across the Lake Chad Basin and beyond—those affected by conflict, displacement, and climate-related challenges.
                </p>
                <p>
                  Over the coming years, we will focus on protecting and restoring the dignity and rights of conflict-affected people; strengthening community resilience through peacebuilding, livelihoods, and inclusion; supporting the sustainable reintegration of displaced people and survivors of violence; promoting climate-smart solutions and environmental stewardship; and institutionalizing accountability, gender equality, and locally led humanitarian action.
                </p>
                <p>
                  We invite our partners, donors, and communities to join us in this journey. Together, we can advance peace, resilience, and sustainable development across Nigeria&apos;s most vulnerable regions.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <OurCommitment />
          <OurImpact />
        </div>
      </div>
    </>
  );
}
