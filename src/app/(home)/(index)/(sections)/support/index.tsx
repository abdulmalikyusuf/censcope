"use client";
import Image from "next/image";
import SupportCard from "./card";
import { supports } from "@/constants/data";
import useObserver from "@/hooks/observer.hook";
import SupportBgImage from "../../../../../assets/images/support-bg.jpg";

export default function Support() {
  const { ref, entryData } = useObserver();

  return (
    <section
      ref={ref}
      id="support"
      className="w-full flex flex-col relative py-14 lg:py-16 xl:py-20 px-10% lg:px-16"
    >
      <Image
        alt=""
        width={1920}
        height={900}
        src={SupportBgImage}
        className={`top-0 left-0 w-full h-full absolute object-cover duration-500 transition-all ${
          entryData?.isIntersecting
            ? "scale-100 opacity-100"
            : "scale-125 opacity-0"
        }`}
      />

      <div className="w-full h-full z-10 flex flex-col gap-8 lg:gap-10 items-center lg:items-start justify-between text-white">
        <div
          className={`flex flex-col gap-4 ${
            entryData?.isIntersecting
              ? "translate-y-0 opacity-100"
              : "translate-y-20 opacity-0"
          }`}
        >
          <h2 className="text-2xl md:text-5xl first-letter:capitalize">
            support us
          </h2>
          <p className="text-md md:text-xl md:w-96 font-medium">
            It is thanks to your commitment that we can carry out our
            humanitarian missions.
          </p>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap items-stretch justify-evenly gap-4 md:gap-6 xl:gap-8">
          {supports.map((card, index) => (
            <SupportCard
              key={index}
              index={index}
              support={card}
              delay={400 * (index + 1)}
              visible={!!entryData?.isIntersecting}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
