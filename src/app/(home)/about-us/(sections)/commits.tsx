import { supportImg } from "@/constants/media";
import Image from "next/image";
import React from "react";

export default function Commit() {
  return (
    <section
      id="commit"
      className="flex flex-col items-center gap-6 lg:gap-10 bg-cyan-100/30 padding-vertical padding-horizontal"
    >
      <header className="w-full flex flex-col items-center justify-center gap-4 md:gap-6 pt-8 lg:pt-12">
        <h3 className="text-xl md:text-2xl lg:text-4xl">Our commitments</h3>

        <p className="text-center">
          At CENSCOPE, our commitment to vulnerable communities is rooted in
          dignity, inclusion, and resilience. We supported 105 survivors of
          explosive ordnance with medical care, rehabilitation, and livelihood
          assistance. Through community education and advocacy, we promoted
          disability inclusion and safer environments.
        </p>
      </header>

      <div className="w-full gap-10 flex flex-wrap items-center justify-center">
        <Image
          alt=""
          width={1000}
          height={1000}
          src={supportImg.src}
          className="w-80 basis-80 flex flex-1 flex-col object-cover"
        />

        <div className="basis-80 flex flex-1 flex-col gap-2 items-start">
          <p className="lg:text-lg">
            Our engagement reached nine Local Government Areas, with 130
            advocacy visits and 10 coordination meetings. Stories like that of
            Mala Abuna, who became an advocate after resisting risk education,
            inspire our work. Media partnerships helped us reach over 1.7
            million people with life saving messages. We remain steadfast in
            building safer, more inclusive communities where every voice is
            heard and valued.
          </p>
        </div>
      </div>
    </section>
  );
}
