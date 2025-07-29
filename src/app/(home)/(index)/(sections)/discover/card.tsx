export default function DiscoverCard(properties: DiscoverCardProps) {
  return (
    <div
      style={{
        transitionDelay: `${properties.visible ? properties.delay : 0}ms`,
      }}
      className={`basis-48 flex items-center justify-center flex-none aspect-square bg-cyan-600 relative group transition-all duration-500 ${
        properties.visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-20"
      }`}
    >
      <div className="z-10 flex flex-col gap-4 text-white py-10 px-lg text-center justify-center h-full">
        <h3 className="text-4xl first-letter:capitalize">
          {properties.discover.title}
        </h3>
        <p className="text-md first-letter:capitalize font-titillium">
          {properties.discover.content}
        </p>
      </div>
    </div>
  );
}
