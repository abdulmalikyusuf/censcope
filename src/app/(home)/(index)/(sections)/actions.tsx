"use client";
import useObserver from "@/hooks/observer.hook";
import Image from "next/image";
import { spiralImg } from "@/constants/media";
import Photo from "@/assets/images/WhatsApp Image 2025-07-30 at 16.24.05.jpeg";

export default function Actions() {
  const { ref } = useObserver();

  return (
    <section
      ref={ref}
      id="actions"
      className="flex flex-col padding-horizontal padding-vertical"
    >
      <header className="w-full flex flex-col items-center md:gap-4">
        <h2 className="text-xl md:text-3xl lg:4xl capitalize">our actions</h2>
        <p className="lg:text-lg text-center">
          Centre for Social Cohesion, Peace and Empowerment takes decisive and
          compassionate action to uplift{" "}
          <span className="text-cyan-600">vulnerable communities</span> affected
          by <span className="text-cyan-600">conflict and crisis.</span>
          projects
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-6 lg:gap-10 mt-10 lg:mt-16">
        <div className="w-full flex flex-col items-start gap-6">
          <p className="text-sm lg:text-base font-titillium">
            We deliver holistic humanitarian support that includes medical care,
            psychosocial assistance, livelihood empowerment, and inclusive
            education. By engaging local leaders, volunteers, and stakeholders,
            we foster community-driven solutions that promote safety,
            resilience, and social cohesion.
          </p>
          <p className="text-sm lg:text-base font-titillium">
            Through targeted interventions such as Explosive Ordnance Risk
            Education, socio-economic reintegration, disaster response, and
            advocacy for disability inclusion, we address immediate needs while
            building sustainable pathways to peace and empowerment.
          </p>
          <p className="text-sm lg:text-base font-titillium">
            Our partnerships with government agencies, NGOs, and media amplify
            our reach and impact, ensuring that every person we serve is heard,
            protected, and equipped to thrive.
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
            src={Photo}
            className="w-full object-contain z-10"
          />
        </div>
      </div>
    </section>
  );
}
