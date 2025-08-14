"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import DiscoverCard from "./card";
import { discovers } from "@/constants/data";
import { FaArrowRight } from "react-icons/fa";
import { spiralImg } from "@/constants/media";
import useObserver from "@/hooks/observer.hook";

export default function Discover() {
  const router = useRouter();
  const { ref, entryData } = useObserver();

  return (
    <section
      ref={ref}
      id="discover"
      className="py-12 lg:py-16 flex flex-none gap-8 lg:gap-12 flex-col items-center px-10%"
    >
      <Image
        alt=""
        width={1000}
        height={1000}
        src={spiralImg}
        className="top-0 left-0 w-full h-full absolute object-cover opacity-10"
      />
      <div className="w-full flex flex-col items-center md:items-start gap-4 relative z-10">
        <h2 className="text-2xl md:text-4xl capitalize">
          Learn more about our{" "}
          <span className="text-red-700 uppercase font-anton">
            Explosive Ordinance Risk Education (EORE)
          </span>{" "}
          and{" "}
          <span className="text-cyan-700 font-anton capitalize">
            Protecting children from violence in context of insecurity and
            promoting social-economic resilience in Borno State - North-east
            Nigeria
          </span>{" "}
        </h2>
        <p className="text-md md:text-xl">
          CENSCOPE is a non-profit, apolitical and secular international NGO.
        </p>
      </div>

      <div className="bg-white flex flex-wrap gap-y-10 relative z-10 py-10 md:py-12 px-6 lg:px-10 w-full">
        <div className="basis-80 md:basis-2/5">
          <p className="text-md md:text-xl font-titillium">
            The Centre for Social Cohesion, Peace and Empowerment (CENSCOPE)
            helps civilian victims marginalized or excluded by the effects of
            war, climate shocks, and economic collapse.
          </p>

          <button
            type="button"
            onClick={() => router.push("/about-us")}
            className="mt-6 outline-none border-2 relative border-black hover:border-cyan-600 px-8 py-3 group transition-all before:absolute before:w-0 hover:before:w-full before:h-full before:bg-cyan-600 before:left-0 before:top-0 before:transition-all before:duration-300 before:-z-10"
          >
            <span className="z-50 gap-2 flex items-center  group-hover:text-white">
              learn more{" "}
              <FaArrowRight className=" text-cyan-600 group-hover:text-white transition-all" />
            </span>
          </button>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(12rem,100%),16rem))] gap-8 items-end justify-center md:justify-start flex-[3] basis-80 md:basis-96 bg-white md:bg-discover bg-center bg-cover bg-no-repeat">
          {discovers.map((item, index) => (
            <DiscoverCard
              key={item.title}
              index={index}
              discover={item}
              visible={!!entryData?.isIntersecting}
              delay={400 * (index + 1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
