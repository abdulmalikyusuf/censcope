import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import WhoWeAreImage from "@/assets/images/executive director.png";

export function ExecutiveDirector() {
  return (
    <section
      id="executive-director"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16"
    >
      <div className="text-center max-w-4xl mx-auto mb-8 lg:mb-12">
        <p className="text-sm font-medium tracking-wide text-cyan-600 uppercase">
          Our Leadership
        </p>
        <h2 className="mt-1 text-gray-900 font-bold text-2xl md:text-3xl lg:text-4xl">
          Executive Director&apos;s Bio
        </h2>
        <p className="mt-2 lg:text-xl text-gray-600">
          CENSCOPE is driven by experienced, passionate leadership dedicated to peace, cohesion, and empowerment across Northeast Nigeria.
        </p>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-8 max-w-5xl mx-auto">
        <div className="w-full md:w-1/3 max-w-xs">
          <Image
            alt="Abubakar Abdullahi Suleiman - Executive Director"
            width={320}
            height={640}
            src={WhoWeAreImage}
            className="w-full h-full object-cover bg-gray-50 rounded-lg shadow-lg"
          />
        </div>

        <div className="px-6 md:px-8 lg:px-10 py-4 lg:py-6 w-full md:w-2/3 bg-white">
          <h4 className="text-cyan-600 font-cavet text-lg md:text-xl lg:text-2xl">
            ABUBAKAR ABDULLAHI SULEIMAN
          </h4>
          <span className="lg:text-lg text-gray-700 font-medium">
            Executive Director
          </span>

          <blockquote className="text-justify mt-4 lg:text-base text-gray-700 leading-relaxed">
            Abubakar Abdullahi Suleiman is a passionate humanitarian aid worker with 9 years of field experience
            in different programmes across Borno, Adamawa and Yobe states. His interest in humanitarian
            service began in his period of higher educational pursuit which coincided with the heat of Boko
            Haram insurgency during which he served as the President of Students&apos; Union Government in
            University of Maiduguri, where he bagged a Bachelor&apos;s Degree in Library and Information Sciences.
            He views a Master&apos;s Degree in Information and Communication Technology from the National
            Open University of Nigeria.
          </blockquote>

          <Link
            href="/about-us"
            className="inline-flex items-center gap-2 mt-6 relative border-2 border-cyan-600 hover:border-cyan-700 text-cyan-600 hover:text-white px-6 py-3 group transition-all before:absolute before:w-0 hover:before:w-full before:h-full before:bg-cyan-600 before:left-0 before:top-0 before:transition-all before:duration-300 before:-z-10"
          >
            <span className="group-hover:text-white transition-all font-medium">
              Learn More About Us
            </span>
            <FaArrowRight className="group-hover:text-white transition-all" />
          </Link>
        </div>
      </div>
    </section>
  );
}
