import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function SupportCard(properties: SupportCardProps) {
  return (
    <div
      style={{
        transitionDelay: `${properties.visible ? properties.delay : 0}ms`,
      }}
      className={`flex items-center justify-center flex-none aspect-square ${
        properties.support.bgColor
      } md:odd:mb-16 md:even:mt-16 relative group transition-all duration-500 ${
        properties.visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-16"
      }`}
    >
      {/* <span
        className={`absolute h-full w-20 translate-y-6 bg-inherit transition-all before:h-full before:w-full before:bg-inherit before:absolute before:-left-full before:rotate-[15deg] after:h-4/5 after:w-full after:bg-inherit after:absolute after:left-full after:top-4 ${
          properties.index % 2 && "rotate-45"
        }`}
      /> */}
      <span className="hidden lg:block absolute -bottom-6 w-40 h-40 bg-inherit rotate-45 -z-10" />

      <div className="z-10 flex flex-col gap-2 lg:gap-4 text-white p-6 lg:p-10 justify-start">
        <h3 className="text-3xl first-letter:capitalize">
          {properties.support.title}{" "}
          <span className="md:text-5xl">
            {properties.support.titleHighlight}
          </span>
        </h3>
        <p className="text-md first-letter:capitalize text-lg font-titillium">
          {properties.support.description}
        </p>

        <Link href={properties.support.href} className="mt-2">
          <span className="gap-2 flex items-center  text-white first-letter:capitalize">
            {properties.support.buttonText}{" "}
            <FaArrowRight className=" transition-all group-hover:ml-2 group-hover:scale-110" />
          </span>
        </Link>
      </div>
    </div>
  );
}
