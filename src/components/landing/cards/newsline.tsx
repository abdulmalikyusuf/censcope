import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

export default function NewslineCard() {
    const title = "A poor family living in a dirty, rundown neighborhood".split(" ");

    return <Link href="#" className="w-80 group aspect-[3/4.5] bg-gray-600 flex flex-none flex-col items-start justify-between p-8 snap-start relative overflow-hidden">
        <Image
            alt=""
            width={1000}
            height={1000}
            src="/images/support.jpg"
            className="absolute top-0 left-0 w-full h-full object-cover brightness-50 scale-125 rotate-6 transition-all duration-500 group-hover:scale-100 group-hover:rotate-0"
        />
        <span className="px-4 z-10 py-1 capitalize  text-white bg-teal-700">news</span>

        <div className="w-full flex z-10 flex-col items-start gap-4">
            <div className="w-full flex items-center justify-start gap-2 capitalize  text-xs">
                <span className="rounded-full px-4 py-2 text-black bg-white">lebanon</span>
                <span className="rounded-full px-4 py-2 text-black bg-white">yemen</span>

                <span className="rounded-full px-4 py-2 text-black bg-white gap-1 flex items-center justify-center relative before:w-1 before:h-1 before:rounded-full before:bg-black">1</span>
            </div>

            <h3 className="text-2xl text-white  w-full">
                {title.map((word) => (
                    <span key={word} className="group-hover:bg-cyan-600 inline-block px-1">
                        {word}
                    </span>
                ))}
            </h3>

            <button className="w-full flex -mt-6 group-hover:mt-0 items-center text-xs justify-between overflow-hidden duration-300 group-hover:delay-300 transition-all">
                <span style={{ fontVariant: "small-caps" }} className="text-white  translate-y-full group-hover:translate-y-0 duration-300 group-hover:delay-300 transition-all">
                    03 december 2024
                </span>
                <FaArrowRight className="text-transparent group-hover:text-white transition-all" />
            </button>
        </div>
    </Link>;
}
