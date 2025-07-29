"use client";
import React from "react";
import Image from "next/image";
import * as media from "@/constants/media";
import useObserver from "@/hooks/observer.hook";
import useMousePosition from "@/hooks/mouse.hook";
import HeroImage from "@/assets/images/hero.jpg";

export default function Banner() {
  const pos = useMousePosition();
  const { ref, entryData } = useObserver();

  const x = React.useMemo(() => pos.x - window.innerWidth / 2, [pos.x]);
  const y = React.useMemo(() => pos.y - window.innerHeight / 2, [pos.y]);

  const transforms = React.useMemo(() => {
    return {
      text: `translateX(${-x / 10}px) translateY(${y / 10}px)`,
      back: `translateX(${-x / 30}px) translateY(${-y / 30}px) scale(1.1)`,
      front: `translateX(${-x / 15}px) translateY(${-y / 15}px) scale(1.1)`,
      spiral: `translateX(${-x / 45}px) translateY(${-y / 45}px) scale(1.1)`,
    };
  }, [x, y]);

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
        width={2000}
        height={2000}
        src={media.homeSliderBackImg}
        style={{ transform: transforms.back }}
        className="w-full h-full absolute bg-cover"
      />
      <Image
        alt=""
        width={2000}
        height={2000}
        src={HeroImage}
        style={{ transform: transforms.front }}
        className="w-full h-full absolute bg-contain"
      />
      {/* <Image
        alt=""
        width={2000}
        height={2000}
        src={media.spiralImg}
        style={{ transform: transforms.spiral }}
        className="w-full h-full absolute object-cover object-center opacity-60 mix-blend-overlay"
      /> */}
      <div className="absolute inset-0 w-full h-full bg-black-200 z-50" />
      <div
        style={{ transform: transforms.text }}
        className="absolute text-2xl md:text-4xl lg:text-6xl 2xl:text-7xl z-20 flex flex-col items-center justify-start text-left gap-2 uppercase top-60 md:top-36 md:left-28"
      >
        <h2 className="text-white">Empowering Communities,</h2>
        <h2 className="text-white">Building Peace,</h2>
        <h2 className="bg-white p-2 text-cyan-600">Transforming Lives.</h2>
      </div>
    </section>
  );
}
