import React from "react";
import Image from "next/image";
import Link from "next/link";

import HeroImage from "@/assets/images/hero.jpg";

type BannerProps = {
  backgroundImageUrl?: string | null;
};

export function Banner({ backgroundImageUrl }: BannerProps) {
  const imageSrc = backgroundImageUrl || HeroImage;

  return (
    <section
      id="banner"
      className="flex relative items-center justify-center max-md:h-[50vh] max-md:max-h-[480px] md:aspect-[4/3] lg:h-screen lg:max-h-[720px] overflow-hidden bg-black"
    >
      <Image
        alt=""
        width={1920}
        height={900}
        src={imageSrc}
        className="absolute inset-0 h-full object-cover"
        unoptimized={!!backgroundImageUrl}
      />
      <div className="flex flex-col items-center justify-center z-10 px-4 md:px-10 lg:px-20 md:max-w-5xl gap-6 md:gap-8">
        <h2 className="text-white text-3xl md:text-4xl lg:text-6xl 2xl:text-7xl font-bold text-center text-balance uppercase">
          Empowering Communities, Building Peace,{" "}
          <span className="ml-2 mt-1 px-2 whitespace-nowrap bg-white text-cyan-600 inline-flex">
            Transforming Lives.
          </span>
        </h2>
        <p className="text-white/90 text-sm md:text-base font-medium">
          Strategic Plan 2026–2031
        </p>
        <Link
          href="/support-us"
          className="px-8 py-4 bg-cyan-600 text-white font-bold text-lg md:text-xl rounded-md hover:bg-cyan-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Donate Now
        </Link>
      </div>
    </section>
  );
}
