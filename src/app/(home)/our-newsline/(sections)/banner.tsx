import Image from "next/image";
import { socialLinks } from "@/constants/data";
import { aboutUsImg } from "@/constants/media";

export default function Banner() {
  return (
    <section className="flex flex-col gap-20 items-center mt-28 justify-center bg-gray-200 pt-20 pb-10 px-5% lg:px-20% bg-center bg-cover overflow-hidden">
      <Image
        alt=""
        width={1000}
        height={1000}
        src={aboutUsImg.src}
        className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
      />

      <div className="z-10 flex flex-col items-center gap-10 w-full lg:w-4/5 mx-auto">
        <h2 className="capitalize text-4xl text-cyan-600">News</h2>
        <div className="w-full bg-white p-10 rounded flex flex-col items-center justify-center gap-4">
          <p className="w-full text-lg text-center">
            Read the latest news on our humanitarian missions around the world.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 px-sm">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:bg-cyan-600 transition-all"
              >
                <link.icon className="transition-all" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
