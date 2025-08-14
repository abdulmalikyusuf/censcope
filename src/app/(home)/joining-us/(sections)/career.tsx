import React from "react";
import Image from "next/image";

import { spiralImg } from "@/constants/media";
import WhoWeAreImage from "src/assets/images/who-we-are.jpg";

export default function Career() {
  const titles = [
    "Working at headquarters or in the field",
    "Encouraging change and mobility",
  ];

  return (
    <section id="career" className="py-10 flex flex-col items-start gap-20">
      <header className="w-full flex flex-col gap-6 px-5% lg:px-25%">
        <h3 className="text-lg lg:text-3xl">Make a career</h3>

        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi tenetur
          fugit omnis rerum, officiis placeat veniam. Fugiat veritatis sunt
          delectus ab rerum pariatur quidem impedit perspiciatis! Eum aliquid
          odio nesciunt ipsum!
        </p>
      </header>

      <div className="w-full relative overflow-hidden py-20 px-5% lg:px-20%">
        <Image
          alt=""
          width={1000}
          height={1000}
          src={spiralImg}
          className="absolute top-0 left-0 w-full h-full object-cover opacity-10"
        />

        <Image
          alt=""
          width={1000}
          height={1000}
          src={WhoWeAreImage}
          className="z-10 w-full h-full relative object-cover"
        />
      </div>

      <div className="w-full flex flex-col gap-6 px-5% lg:px-25%">
        {Array.from(titles).map((title) => (
          <React.Fragment key={title}>
            <h3 className="text-lg lg:text-3xl">{title}</h3>

            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
              tenetur fugit omnis rerum, officiis placeat veniam. Fugiat
              veritatis sunt delectus ab rerum pariatur quidem impedit
              perspiciatis! Eum aliquid odio nesciunt ipsum!
            </p>

            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
              tenetur fugit omnis rerum, officiis placeat veniam. Fugiat
              veritatis sunt delectus ab rerum pariatur quidem impedit
              perspiciatis! Eum aliquid odio nesciunt ipsum!
            </p>

            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
              tenetur fugit omnis rerum, officiis placeat veniam. Fugiat
              veritatis sunt delectus ab rerum pariatur quidem impedit
              perspiciatis! Eum aliquid odio nesciunt ipsum!
            </p>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
