import DonorsImage from "@/assets/images/donors.jpg";
import Image from "next/image";

export function OurDonors() {
  return (
    <section
      id="our-donors"
      className="padding-horizontal flex flex-col md:flex-row-reverse items-start md:items-center gap-6 md:gap-10"
    >
      <div className="w-full flex flex-col items-start gap-2 lg:text-lg">
        <h3 className="text-xl lg:text-4xl">Our donors</h3>

        <p className="font-titillium">
          We extend our sincere gratitude to all organizations, partners, and
          stakeholders whose tireless efforts and unwavering commitment continue
          to support humanitarian, development, and peacebuilding initiatives
          across the region. The acronyms listed in this document represent more
          than just names; they stand for collective action, life saving
          interventions, and impactful collaborations that have brought hope and
          resilience to countless communities.
        </p>
        <p className="font-titillium">
          Your continued partnership, technical expertise, and resource
          contributions are deeply valued. Together we remain committed to
          fostering a safer, more inclusive, and empowered society.
        </p>
      </div>
      <div className="">
        <Image
          src={DonorsImage.src}
          alt=""
          width={1000}
          height={1000}
          className="w-full object-contain"
        />
      </div>
    </section>
  );
}
