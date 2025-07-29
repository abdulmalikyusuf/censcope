"use client";
import React from "react";
import useObserver from "@/hooks/observer.hook";

export default function Scrollable(properties: ScrollableType) {
  const { ref, entryData } = useObserver();

  const [activeSection, setActiveSection] = React.useState("");
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const sectionRefs = React.useRef<{ [key: string]: IntersectionObserver }>({});

  React.useEffect(() => {
    if (entryData) {
      const { height, top } = entryData.boundingClientRect;
      const progress = (top / height) * 100;

      setScrollProgress(Math.max(-progress + 10, 0));
    }
  }, [entryData]);

  React.useEffect(() => {
    properties.sections.forEach(({ id }) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          const { top } = entry.boundingClientRect;

          // When scrolling down, activate when element reaches top
          if (top <= 0 && entry.isIntersecting) setActiveSection(id);

          // When scrolling up, activate when element is 200px from top
          if (top <= 200 && top > 0 && entry.isIntersecting)
            setActiveSection(id);
        },
        {
          threshold: [0, 0.25, 0.5, 0.75, 1],
          rootMargin: "-200px 0px 0px 0px",
        }
      );

      const element = document.getElementById(id);
      if (element) {
        element.style.scrollMarginTop = "12em";

        observer.observe(element);
        sectionRefs.current[id] = observer;
      }
    });

    return () => {
      Object.values(sectionRefs.current).forEach((observer) =>
        observer.disconnect()
      );
    };
  }, [properties.sections]);

  return (
    <>
      <header className="w-full z-50 bg-white shadow-md sticky top-[5.5rem] lg:top-24">
        <div className="hidden lg:flex gap-4 py-5 px-10% items-center justify-evenly">
          {properties.sections.map((section) => (
            <button
              key={section.id}
              className={`duration-300 transition-all !font-inter ${
                activeSection === section.id ? "text-cyan-600" : "text-gray-500"
              }`}
              onClick={() => {
                const element = document.getElementById(section.id);
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {section.label}
            </button>
          ))}
        </div>

        <div
          className="h-0.5 rounded-full bg-cyan-600 transition-all ease-linear duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </header>

      <div
        ref={ref}
        className="flex flex-col gap-12 md:gap-16 lg:gap-20 overflow-x-hidden"
      >
        {properties.sections.map((section) => (
          <section.component key={section.id} />
        ))}
      </div>
    </>
  );
}
