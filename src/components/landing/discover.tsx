"use client";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useIntersectionObserver } from "@/hooks/observe.hook";
import Image from "next/image";

export default function Discover() {
    const { ref } = useIntersectionObserver();

    return <section ref={ref} id="discover" className="py-24 flex flex-none gap-20 flex-col items-center bg-spiral bg-gray-100 bg-contain bg-center">
        <header className="w-full flex flex-col items-center md:items-start  px-xl">
            <h2 className="text-2xl md:text-4xl capitalize">
                Discover Première Urgence Internationale
            </h2>
            <p className="text-md md:text-xl">
                Première Urgence Internationale is a non-profit, apolitical and secular international NGO.
            </p>
        </header>

        <div className="flex mx-auto md:mr-0 w-10/12 md:w-5/6 flex-wrap h-auto bg-white">
            <div className="px-8 md:px-16 ml-auto self-end gap-6 basis-80 xl:w-1/3 flex flex-col h-full items-start justify-center">
                <p className="text-md md:text-xl font-titillium">
                    Première Urgence Internationale helps civilian
                    victims marginalized or excluded by the effects
                    of war, climate shocks, and economic collapse.
                </p>

                <button className="outline-none border-2 relative border-black hover:border-red-600 px-8 py-3 group transition-all before:absolute before:w-0 hover:before:w-full before:h-full before:bg-red-600 before:left-0 before:top-0 before:transition-all before:duration-300 before:-z-10">
                    <span className="z-50 gap-2 flex items-center  group-hover:text-white">
                        learn more <FaArrowRight className=" text-red-600 group-hover:text-white transition-all" />
                    </span>
                </button>
            </div>

            <div className="flex basis-80 relative flex-1 h-96 bg-gray-500 bg-opacity-50">
                {/* <Image alt="" width={1000} height={1000} src="/images/discover.jpg" className="w-full h-full object-cover"/> */}
            </div>
        </div>

        <div className="p-10 flex flex-1 w-10/12 md:w-4/5 xl:w-3/5 flex-col items-center bg-white">
            <p className="italic text-3xl first-letter:capitalize font-cavet">join us </p>
            <h3 className="text-red-600 text-xl md:text-3xl  mb-4">in the field and at headquarters</h3>

            <button className="outline-none border-2 relative border-black hover:border-red-600 px-8 py-3 group transition-all before:absolute before:w-0 hover:before:w-full before:h-full before:bg-red-600 before:left-0 before:top-0 before:transition-all before:duration-300 before:-z-10">
                <span className="z-50 gap-2 flex items-center  group-hover:text-white">
                    view job offers <FaArrowRight className=" text-red-600 group-hover:text-white transition-all" />
                </span>
            </button>
        </div>
    </section>
}