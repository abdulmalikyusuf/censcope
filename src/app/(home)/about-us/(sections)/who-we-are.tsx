import Image from "next/image";

import WhoWeAreImage from "@/assets/images/who-we-are.jpg";

export function WhoWeAre() {
  return (
    <section
      id="who-we-are"
      className="flex flex-col md:flex-row md:items-center gap-6 lg:gap-10 padding-horizontal padding-vertical !pb-0"
    >
      <div className="w-full flex flex-col items-start gap-6">
        <h2 className="">Who we are?</h2>

        <div className="space-y-4 lg:text-lg">
          <p>
            The Centre for Social Cohesion, Peace and Empowerment (CENSCOPE) is a national non-profit organization registered with Nigeria&apos;s Corporate Affairs Commission (CAC/IT/110963). Founded in 2018 and headquartered in Maiduguri, Borno State, CENSCOPE was established in response to the humanitarian crisis caused by armed conflict and natural disasters across the Lake Chad Basin.
          </p>
          <p>
            CENSCOPE promotes self-sustainability, equality, and social justice, focusing on protection, peacebuilding, livelihoods, education, WASH, climate change, and good governance. The organization partners with national and international actors including UN agencies and international non-governmental organizations to deliver principled humanitarian response and long-term development.
          </p>
        </div>
      </div>

      <div className="w-full">
        <Image
          alt=""
          width={1000}
          height={1000}
          src={WhoWeAreImage}
          className="w-full object-contain z-10"
        />
      </div>
    </section>
  );
}
