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
          From Our Leadership
        </p>
        <h2 className="mt-1 text-gray-900 font-bold text-2xl md:text-3xl lg:text-4xl">
          Executive Director&apos;s Message
        </h2>
        <p className="mt-2 lg:text-xl text-gray-600">
          Aligned with our Strategic Plan (2026–2031): building a legacy of enduring peace, empowerment, and social equity.
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

          <div className="flex flex-wrap gap-4 mt-6">
            <Link
              href="/about-us"
              className="inline-flex items-center gap-2 relative border-2 border-cyan-600 hover:border-cyan-700 text-cyan-600 hover:text-white px-6 py-3 group transition-all before:absolute before:w-0 hover:before:w-full before:h-full before:bg-cyan-600 before:left-0 before:top-0 before:transition-all before:duration-300 before:-z-10"
            >
              <span className="group-hover:text-white transition-all font-medium">
                Learn More About Us
              </span>
              <FaArrowRight className="group-hover:text-white transition-all" />
            </Link>
            <Link
              href="/reports"
              className="inline-flex items-center gap-2 border-2 border-gray-300 hover:border-cyan-600 text-gray-700 hover:text-cyan-600 px-6 py-3 font-medium transition-all"
            >
              Strategic Plan (2026–2031)
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
