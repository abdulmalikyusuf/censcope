import { FaArrowRight } from "react-icons/fa";

export default function Events() {
  const lists = [
    { content: "Exhibitions" },
    { content: "Conferences" },
    { content: "Solidarity bibs" },
    { content: "Charity streamings" },
  ];

  return (
    <section id="events" className="padding-horizontal padding-vertical ">
      <div className="max-w-2xl w-full mx-auto">
        <h2 className="text-xl md:text-3xl lg:text-4xl w-full">
          Throughout the year, you can support us by taking part in the various
          events we organize.
        </h2>

        <div className="flex flex-col gap-2 mt-4 lg:mt-6">
          {lists.map((item) => (
            <p key={item.content} className="text-sm flex items-center gap-2">
              <FaArrowRight size={22} className="text-cyan-600" />
              {item.content}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
