import React from "react";

export default function Hero(properties: HeroProps) {
  const links = [{ label: "home", href: "#" }];
  if (properties.links) links.push(...properties.links);

  return (
    <section
      id="hero"
      style={{ backgroundImage: `url(${properties.image})` }}
      className="flex flex-col gap-10 lg:gap-20 items-end justify-center bg-gray-200 max-md:mt-[88px] padding bg-center bg-cover aspect-[3/2] lg:aspect-[4/3] xl:max-h-[720px]"
    >
      <div className="flex flex-col items-center gap-6 lg:gap-10 w-4/5 mx-auto">
        <h2 className="capitalize heading-6 md:heading-4 lg:heading-3 text-cyan-600">
          {properties.title}
        </h2>

        <p className="w-full p-4 lg:p-6 md:text-lg bg-white text-center">
          {properties.description}
        </p>
      </div>
    </section>
  );
}
