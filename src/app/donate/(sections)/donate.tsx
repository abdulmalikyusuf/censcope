import Image from "next/image";
import Link from "next/link";

export default function Donate() {
  return (
    <section
      id="donate"
      className="w-full flex flex-col gap-4 py-10 px-2 lg:px-20%"
    >
      <div className="w-full flex flex-col gap-2 z-10">
        <span className="self-center lg:self-end">language</span>

        <Link href="/" replace className=" self-center lg:self-start">
          <Image
            alt=""
            width={1000}
            height={1000}
            src="/LOGOJ2.png"
            className="w-32"
          />
        </Link>
      </div>

      <article className="hidden text-lg lg:flex flex-col p-10 text-center items-center justify-center gap-4 text-white bg-cyan-600/60 rounded">
        <span className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil quos
          similique expedita voluptate repudiandae! Perspiciatis, iusto.
        </span>
        <span className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil quos
          similique expedita voluptate repudiandae! Perspiciatis, iusto.
        </span>
        <h3 className="text-2xl">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </h3>

        <span className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil quos
          similique expedita voluptate repudiandae! Perspiciatis, iusto.
        </span>
        <span className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil quos
          similique expedita voluptate repudiandae! Perspiciatis, iusto.
        </span>
        <h3 className="text-2xl">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </h3>
      </article>

      <div className="w-full gap-0 lg:gap-6 grid items-start grid-cols-fit-20">
        <div className="flex flex-col bg-cyan-950/80 backdrop-blur shadow-sm lg:rounded-md overflow-hidden">
          <header className="w-full flex items-center justify-center p-4">
            <h4 className="text-white text-lg capitalize font-titillium">
              my donation
            </h4>
          </header>
        </div>
        <div className="flex flex-col bg-cyan-950/80 backdrop-blur shadow-sm lg:rounded-md overflow-hidden">
          <header className="w-full flex items-center justify-center p-4">
            <h4 className="text-white text-lg capitalize font-titillium">
              my details
            </h4>
          </header>
        </div>
        <div className="flex flex-col bg-cyan-950/80 backdrop-blur shadow-sm lg:rounded-md overflow-hidden">
          <header className="w-full flex items-center justify-center p-4">
            <h4 className="text-white text-lg capitalize font-titillium">
              my payment
            </h4>
          </header>
        </div>
      </div>
    </section>
  );
}
