import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

import { spiralImg } from "@/constants/media";

export function OurImpact() {
  const infos = [
    {
      label: "47,000+",
      className: "bg-red-600",
      description: "people supported EORE",
    },
    {
      label: "16",
      className: "bg-teal-600",
      description: "donors and partners",
    },
    {
      label: "1,747,626",
      className: "bg-slate-600",
      description: "social media reach",
    },
    {
      label: "100+",
      className: "bg-blue-400 text-black",
      description: "field resources deployed",
    },
  ];

  return (
    <section
      id="our-impact"
      className="padding-vertical padding-horizontal relative"
    >
      <Image
        alt=""
        width={1000}
        height={1000}
        src={spiralImg}
        className="w-full top-0 left-0 absolute object-cover object-top z-0 opacity-10"
      />

      <div className="w-full z-10 relative p-8 md:p-10 lg:p-12 bg-white h-full flex flex-col md:flex-row gap-6">
        <div className="flex flex-1 flex-col basis-40 items-start gap-2">
          <h3 className="text-xl lg:text-2xl">Our impact</h3>
          <div className="flex flex-col gap-4">
            <p className="text-justify lg:text-left">
              In 2024, CENSCOPE made remarkable strides in strengthening
              resilience, inclusion, and recovery across Northeast Nigeria. Key
              achievements include:
            </p>

            <ul className="text-justify lg:text-left flex flex-col gap-2 h-full">
              <li className="">
                <b className="">Humanitarian Leadership:</b> Our Executive
                Director was elected to the Humanitarian Country Team,
                amplifying the voice of affected communities at the national
                level.
              </li>
              <li className="">
                <b className="">Civic Empowerment:</b> 586 individuals—including
                186 ex-associates and 400 women—were empowered with civic
                education, financial literacy, and life skills, resulting in
                increased community participation and social cohesion.
              </li>
              <li className="">
                <b className="">Explosive Ordnance Risk Education:</b> We
                reached 47,080 people in 9 LGAs with life-saving safety
                education, training 90 volunteers who improved knowledge by
                74.5%, and helped communities reduce risk through the
                establishment of Mine Action Committees.
              </li>
              <li className="">
                <b className="">Survivor Support:</b> 105 survivors of explosive
                ordnance received holistic assistance, including medical care,
                prosthetics, rehabilitation, and livelihood support.
              </li>
              <li className="">
                <b className="">Livelihoods and Reintegration:</b> 615
                individuals gained startup kits and seed capital, with 580 women
                trained in income-generating skills and linked to cooperatives,
                fostering economic independence and community acceptance.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-1 basis-40 shrink-0 flex flex-col gap-4 lg:gap-6">
          {infos.map((item) => (
            <div
              key={item.label}
              className={`group px-6 py-10 flex text-white relative items-center justify-center ${item.className}`}
            >
              {/* <span className="w-72 h-20 bg-inherit absolute rotate6 before:absolute before:w-4/5 before:h-full before:bg-inherit before:-rotate-12 after:absolute after:w-2/3 after:h-full after:bg-inherit after:-rotate-45 after:translate-y-20" /> */}
              <span className="absolute top-0 w-20 h-20 bg-inherit rotate-45 -z-10 group-first:hidden" />

              <div className="relative flex flex-col items-center justify-center text-center z-10">
                <h4 className="text-xl lg:text-3xl">{item.label}</h4>
                <span className="text-center lg:text-lg !leading-none">
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-none w-full flex items-center justify-center lg:hidden">
          <button className="flex items-center gap-2 relative group border border-black hover:border-red-600 transition-all">
            <span className="absolute top-0 left-0 w-0 h-full duration-300 bg-red-600 transition-all group-hover:w-full" />
            <span className="flex items-center  px-6 py-3 font-bold gap-2 z-10 group-hover:text-white transition-all">
              Lorem, ipsum dolor
              <FaArrowRight className="transition-all" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
