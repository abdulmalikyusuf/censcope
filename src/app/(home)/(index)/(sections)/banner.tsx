"use client";
import React from "react";
import Image from "next/image";

import useObserver from "@/hooks/observer.hook";
import HeroImage from "@/assets/images/hero.jpg";

export default function Banner() {
  const { ref, entryData } = useObserver();

  return (
    <section
      ref={ref}
      id="banner"
      className={`flex relative items-center justify-center max-md:h-[50vh] max-md:max-h-[480px] md:aspect-[4/3] lg:h-screen lg:max-h-[720px] overflow-hidden bg-black ${
        entryData?.isIntersecting ? "bg-opacity-100" : "bg-opacity-0"
      }`}
    >
      <Image
        alt=""
        width={1920}
        height={900}
        src={HeroImage}
        className="absolute"
      />
      <div className="flex items-center justify-center z-10 px-4 md:px-10 lg:px-20 md:max-w-5xl">
        <h2 className="font-anton text-white text-3xl md:text-4xl lg:text-6xl 2xl:text-7xl font-bold text-center text-pretty uppercase">
          Empowering Communities, Building Peace,{" "}
          <span className="ml-2 mt-1 px-2 whitespace-nowrap bg-white text-cyan-600 inline-flex">
            Transforming Lives.
          </span>
        </h2>
      </div>
    </section>
  );
}
