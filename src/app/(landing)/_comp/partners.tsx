"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function Partners() {
    return (
        <section id="partners" className="flex flex-col items-center py-10 gap-10">
            <h2 className="capitalize font-bold text-xl md:text-4xl">partners</h2>

            <div className="w-10/12 md:w-2/3">
                <Marquee speed={50} gradient={false} className="">
                    {Array.from({ length: 7 }, (_, id) => (<Image key={id} alt="" width={500} height={500} src={`/icons/partners/${id + 1}.png`} className="w-44 h-44 object-contain mx-6" />))}
                </Marquee>
            </div>
        </section>
    );
}
