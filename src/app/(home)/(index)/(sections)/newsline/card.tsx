import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { supportImg } from "@/constants/media";

export default function NewsCard() {
  const title = "A poor family living in a dirty, rundown neighborhood";

  return (
    <Link
      href={`/newsline/100`}
      className="basis-80 group gap-2 aspect-[] md:max-h-96 bg-gray-600 flex flex-none flex-col items-start justify-between p-8 snap-center lg:snap-start relative overflow-hidden"
    >
      <Image
        alt=""
        width={1000}
        height={1000}
        src={supportImg.src}
        className="absolute top-0 left-0 w-full h-full object-cover brightness-50 scale-125 rotate-6 transition-all duration-500 group-hover:scale-100 group-hover:rotate-0"
      />
      <span className="px-4 z-10 py-1 capitalize  text-white bg-teal-700">
        news
      </span>

      <div className="z-10 mt-auto flex flex-col gap-2">
        <div className="w-full flex items-center justify-start gap-2 capitalize  text-xs">
          {title
            .split(" ")
            .slice(0, 3)
            .map((word) => (
              <span
                key={word}
                className="rounded-full px-4 py-2 text-black bg-white"
              >
                {word}
              </span>
            ))}

          {title.split(" ").length > 3 && (
            <span className="rounded-full px-4 py-2 text-black bg-white gap-1 flex items-center justify-center relative before:w-1 before:h-1 before:rounded-full before:bg-black">
              1
            </span>
          )}
        </div>

        <h3 className="text-2xl text-white w-full">
          {title.split(" ").map((word) => (
            <span
              key={word}
              className="group-hover:bg-cyan-600 inline-block px-1"
            >
              {word}
            </span>
          ))}
        </h3>
      </div>

      <button className="w-full flex items-center justify-between overflow-hidden text-white -mt-4 group-hover:mt-0 transition-all">
        <span className="font-anton text-xs translate-y-4 group-hover:translate-y-0 transition-all">
          20 december 2024
        </span>
        <FaArrowRight className="text-transparent group-hover:text-white transition-all" />
      </button>
    </Link>
  );
}
