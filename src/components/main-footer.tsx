import Link from "next/link";

import SubscribeForm from "@/components/forms/subscribe";
import { FaArrowRight } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex flex-col bg-gray-50">
      <div className="padding-horizontal padding-vertical">
        <div className="flex flex-col md:flex-row gap-4 lg:gap-6 items-start bg-white">
          <div className="px-8 py-6 md:py-10 md:px-12 relative flex flex-col items-start justify-center gap-6 bg-cyan-600 text-white">
            <div className="z-10 flex flex-col gap-1 justify-start">
              <h3 className="heading-6 md:heading-4 first-letter:capitalize">
                CENSCOPE
              </h3>
              <p className="md:text-lg !leading-none font-titillium mt-1">
                2, rue Auguste Thomas 92600 Asnières-sur-Seine, France +33 (0)1
                55 66 99 66
              </p>
              <Link
                href="/our-newsline"
                className="group relative transition-all mt-2 self-start border-2 border-current hover:border-transparent text-white hover:text-black"
              >
                <span className="top-0 left-0 h-full w-0 absolute transition-all group-hover:w-full bg-white" />
                <span className="z-10 relative flex items-center justify-center transition-all px-7 py-3 gap-4">
                  <b className="transition-all">See all news</b>
                  <FaArrowRight className="ytransition-all" />
                </span>
              </Link>
            </div>
            <div className="flex flex-1 flex-col gap-1 items-start text-sm lg:text-base">
              <p className="">
                Centre for Social Cohesion, Peace and Empowerment helps civilian
                victims, marginalized or excluded by the effects of conflict,
                climate related disasters and situations of economic collapse.
              </p>
              <p className="">
                Each year, Centre for Social Cohesion, Peace and Empowerment
                most of its resources to the programs it deploys in its various
                areas of intervention and only 0.2% to fundraising. Your
                donations are essential.
              </p>
            </div>
          </div>

          <SubscribeForm />
        </div>
      </div>

      <div className="w-full flex gap-4 lg:gap-6 flex-col md:flex-row py-4 lg:py-8 px-4 md:px-6 lg:px-10 justify-evenly">
        <div className="flex flex-col gap-4 items-center md:items-start">
          <h3 className="text-lg lg:text-xl">Get informed</h3>
          <nav className="flex flex-col gap-2">
            <Link href="#" className="flex flex-col relative">
              Contact us
            </Link>
            <Link href="#" className="flex flex-col relative">
              Press area
            </Link>
          </nav>
        </div>

        <div className="h-full w-0.5 bg-black/20 flex-none hidden md:flex" />

        <div className="flex flex-col gap-4 items-center md:items-start">
          <h3 className="text-lg lg:text-xl">Get involved</h3>
          <nav className="flex flex-col gap-2">
            <Link href="#" className="flex flex-col relative">
              Support our action
            </Link>
            <Link href="#" className="flex flex-col relative">
              Our job offers
            </Link>
          </nav>
        </div>
      </div>

      <nav className="w-full flex items-center capitalize text-white p-6 md:px-4% font-titillium justify-around bg-cyan-600">
        <Link
          href="#"
          className="flex flex-col relative after:h-0.5 after:bg-white after:w-0 after:transition-all hover:after:w-full"
        >
          sitemap
        </Link>
        <Link
          href="#"
          className="flex flex-col relative after:h-0.5 after:bg-white after:w-0 after:transition-all hover:after:w-full"
        >
          legal notices
        </Link>
        <Link
          href="#"
          className="flex flex-col relative after:h-0.5 after:bg-white after:w-0 after:transition-all hover:after:w-full"
        >
          cookie policy
        </Link>
        <Link
          href="#"
          className="flex flex-col relative after:h-0.5 after:bg-white after:w-0 after:transition-all hover:after:w-full"
        >
          contact us
        </Link>
      </nav>
    </footer>
  );
}
