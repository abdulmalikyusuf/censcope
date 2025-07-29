import Image from "next/image";
import { aboutUsImg, spiralImg } from "@/constants/media";

export default function Identity() {
  return (
    <section
      id="who-we-are"
      className="flex flex-col md:flex-row gap-6 lg:gap-10 padding-horizontal padding-vertical !pb-0"
    >
      <div className="w-full flex flex-col items-start gap-6">
        <h3 className="text-xl lg:text-4xl">Who we are?</h3>

        <p className="lg:text-lg font-titillium">
          CENSCOPE is a nationally registered non-governmental organization
          (NGO) recognized by the Corporate Affairs Commission (CAC) and
          actively operating in the regions of Borno, Adamawa, and Yobe states.
          Established in 2018, CENSCOPE was created with the mission to provide
          comprehensive support to individuals and communities who have been
          adversely affected by violent conflicts and natural disasters. Our
          programming is designed to address the urgent needs of victims by
          offering a wide range of interventions aimed at rebuilding lives and
          restoring community stability.
        </p>
      </div>

      <div className="w-full py-6 lg:py-0 px-4% lg:px-0 flex relative items-center justify-center">
        <Image
          alt=""
          width={1000}
          height={1000}
          src={spiralImg.src}
          className="top-0 left-0 absolute w-full h-full object-cover opacity-10"
        />

        <Image
          alt=""
          width={1000}
          height={1000}
          src={aboutUsImg.src}
          className="w-full object-contain z-10"
        />
      </div>
    </section>
  );
}
