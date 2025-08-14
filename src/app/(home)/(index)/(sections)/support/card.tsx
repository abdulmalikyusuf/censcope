import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function SupportCard(properties: SupportCardProps) {
  return (
    <div
      className={cn(
        "flex-1 min-w-56 relative flex flex-col",
        properties.support.bgColor
      )}
    >
      {/* <span
        className={`absolute h-full w-20 translate-y-6 bg-inherit transition-all before:h-full before:w-full before:bg-inherit before:absolute before:-left-full before:rotate-[15deg] after:h-4/5 after:w-full after:bg-inherit after:absolute after:left-full after:top-4 ${
          properties.index % 2 && "rotate-45"
        }`}
      /> */}
      <span className="hidden lg:block absolute -bottom-6 left-1/2 w-24 h-24 bg-inherit rotate-45 -translate-x-1/2 -z-10" />

      <div className="z-10 flex flex-col gap-2 lg:gap-4 text-white p-6 lg:p-10 justify-start">
        <h3 className="text-xl md:text-2xl xl:text-3xl first-letter:capitalize">
          {properties.support.title}{" "}
          <span className="text-2xl md:text-4xl xl:text-5xl">
            {properties.support.titleHighlight}
          </span>
        </h3>
        <p className="text-md first-letter:capitalize lg:text-lg font-titillium">
          {properties.support.description}
        </p>

        <Link
          href={properties.support.href}
          className="mt-2 text-sm lg:text-base group flex items-center gap-2 text-white first-letter:capitalize"
        >
          {properties.support.buttonText}{" "}
          <FaArrowRight className=" transition-all group-hover:ml-2 group-hover:scale-110" />
        </Link>
      </div>
    </div>
  );
}
