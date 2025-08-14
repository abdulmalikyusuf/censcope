import React from "react";
import Image from "next/image";

import { spiralImg } from "@/constants/media";
import WhoWeAreImage from "src/assets/images/who-we-are.jpg";

export default function Reason() {
  const titles = [
    "Donate occasionally",
    "Donate regularly",
    "Life insurance: a gift within everyone's reach",
    "Give with confidence",
  ];
  return (
    <section
      id="reason"
      className="flex flex-col items-center gap-8 lg:gap-12 bg-cyan-100/30 padding-horizontal"
    >
      <header className="flex flex-col items-center justify-center gap-6 lg:gap-10">
        <h3 className="text-xl md:text-3xl lg:text-4xl">Our commitments</h3>

        <p className="text-center lg:text-lg">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus
          provident hic cumque dolorum vitae fugiat consequuntur delectus
          deleniti odit, distinctio magni, doloremque aliquid numquam architecto
          natus error incidunt! Illo, consequuntur! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. In, saepe cumque necessitatibus quas
          maxime quibusdam voluptates. Accusantium facere reprehenderit ex.
        </p>
      </header>

      <div className="flex flex-col gap-4 lg:gap-6 items-start max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-screen-md w-full mx-auto">
        {Array.from(titles).map((title) => (
          <React.Fragment key={title}>
            <h4 className="text-cyan-600 font-titillium text-lg md:text-xl lg:text-2xl relative">
              {title}
            </h4>

            <p className="text-sm lg:text-base">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos non
              pariatur necessitatibus natus consectetur consequuntur. Inventore,
              beatae repellat! Cum itaque voluptatibus error sed accusantium
              vitae cupiditate accusamus dolor nisi dicta!
            </p>
          </React.Fragment>
        ))}
      </div>

      <div className="w-full relative overflow-hidden px-4 md:px-6 lg:px-10 py-8 md:py-10 lg:py-12">
        <Image
          alt=""
          width={1000}
          height={1000}
          src={spiralImg}
          className="absolute top-0 left-0 w-full h-full object-cover opacity-10"
        />

        <div className="w-fit flex flex-col md:flex-row items-center z-10 relative bg-white lg:items-stretch max-w-[90%] md:max-w-xl lg:max-w-2xl h-64 sm:h-72 md:h-80 lg:h-96">
          <div className="aspect-[2/3]">
            <Image
              alt=""
              width={1000}
              height={1000}
              src={WhoWeAreImage}
              className="w-full h-full object-cover bg-gray-50"
            />
          </div>

          <div className="flex flex-col px-6 md:px-8 lg:px-10 py-12 lg:py-16 w-full bg-white gap-2 items-start">
            <h4 className="text-cyan-600 font-cavet text-lg md:text-xl lg:text-2xl">
              Christelle André
            </h4>
            <span className="lg:text-lg">
              Fundraising Officer © Première Urgence Internationale
            </span>

            <blockquote className="text-justify mt-4 lg:text-base">
              Your donations guarantee Première Urgence Internationale&#39;s
              freedom of action. Every year, your support enables us to have a
              positive impact on the lives of millions of people in crisis
              zones, including “forgotten” crises that receive little attention
              from the media or institutional donors.
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
