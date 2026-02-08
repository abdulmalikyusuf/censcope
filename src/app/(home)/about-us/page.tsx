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
        description="We are a non-profit organisation that is committed to providing comprehensive support to individuals and communities who have been adversely affected by violent conflicts and natural disasters."
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
              Our Leadership
            </p>
            <h2 className="mt-1 text-gray-900 font-bold">
              Guiding CENSCOPE&apos;s Mission
            </h2>
            <p className="mt-2 lg:text-xl text-gray-600">
              CENSCOPE is driven by experienced, passionate leadership dedicated to peace, cohesion, and empowerment across Northeast Nigeria.
            </p>
          </div>
          <div className="w-fit flex flex-col md:flex-row items-center justify-center z-10 lg:items-stretch max-w-[90%] md:max-w-3xl lg:max-w-4xl h-fit 64 sm:h-72 md:h-80 lg:h-96">
            <div className="w-full md:aspect-[2/3] max-w-xs">
              <Image
                alt=""
                width={320}
                height={640}
                src={WhoWeAreImage}
                className="w-full h-full object-cover bg-gray-50"
              />
            </div>

            <div className="px-6 md:px-8 lg:px-10 py-4 lg:py-6 w-full bg-white items-start">
              <h4 className="text-cyan-600 font-cavet text-lg md:text-xl lg:text-2xl">
                ABUBAKAR ABDULLAHI SULEIMAN
              </h4>
              <span className="lg:text-lg">
                Executive Director
              </span>

              <blockquote className="text-justify mt-4 lg:text-base">
                Abubakar Abdullahi Suleiman is a passionate humanitarian aid worker with 9 years of field experience
                in different programmes across Borno, Adamawa and Yobe states. His interest in humanitarian
                service began in his period of higher educational pursuit which coincided with the heat of Boko
                Haram insurgency during which he served as the President of Students’ Union Government in
                University of Maiduguri, where he bagged a Bachelor’s Degree in Library and Information Sciences.
                He views a Master’s Degree in Information and Communication Technology from the National
                Open University of Nigeria.
              </blockquote>
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
