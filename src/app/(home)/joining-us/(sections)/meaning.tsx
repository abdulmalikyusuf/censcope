import Button from "@/components/primary/button";
import PhotoToUse from "../../../../assets/images/MSME 2.jpg";
import { spiralImg } from "@/constants/media";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

export function Meaning() {
  return (
    <section
      id="meaning"
      className="py-6 md:py-10 flex flex-col items-start gap-6"
    >
      <div className="w-full flex flex-col gap-2 px-5% lg:px-25%">
        <h3 className="text-lg lg:text-3xl">
          What working at Center for Social Cohesion, Peace and Empowerment
          (CENSCOPE) means
        </h3>
        <p className="flex gap-2 items-start">
          <FaArrowRight size={22} className="shrink-0 mt-1 text-cyan-600" />
          <span className="">
            Working with us is more than a partnership—it is a shared commitment
            to humanity, dignity, and lasting change. We value collaboration
            built on trust, respect, and transparency. Each relationship with
            donors, partners, volunteers, and communities strengthens our
            ability to respond effectively and innovatively to complex
            challenges. To us, working together means honoring the voices and
            experiences of those we serve, learning continuously, and holding
            ourselves accountable to the highest standards of integrity.
          </span>
        </p>
        <p className="flex gap-2 items-start">
          <FaArrowRight size={22} className="shrink-0 mt-1 text-cyan-600" />
          <span className="">
            It means building resilient communities through collective action,
            empathy, and unwavering dedication to peace and empowerment.
            Together, we turn challenges into opportunities and vision into
            reality.
          </span>
        </p>
      </div>

      <div className="w-full relative overflow-hidden py-20 px-5% lg:px-20%">
        <Image
          alt=""
          width={1000}
          height={1000}
          src={spiralImg}
          className="absolute top-0 left-0 w-full h-full object-cover opacity-10"
        />

        <div className="flex flex-1 flex-col lg:flex-row items-center z-10 relative bg-white lg:items-stretch">
          <div className="w-72 min-h-96 relative">
            <Image
              alt=""
              width={1000}
              height={1000}
              src={PhotoToUse}
              className="w-full h-full top-0 left-0 absolute object-cover bg-gray-50"
            />
          </div>

          <div className="flex flex-1 flex-col p-10 lg:py-20 w-full bg-white min-h-96 gap-2 items-start">
            <h4 className="text-cyan-600 font-cavet text-3xl lg:text-5xl">
              Christelle André
            </h4>
            <span className="text-sm">
              Director of Human Resources © Première Urgence Internationale
            </span>

            <blockquote className="lg:w-5/6 text-justify font-anton my-4 text-xl">
              Taking people into account and enjoying working together are
              essential to the success of our missions.
            </blockquote>

            <Button
              withIcon
              withShadow
              title="About us"
              shadowClassName="bg-cyan-600"
              containerClassName="text-cyan-600 hover:text-white border-2 border-current"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
