"use client";
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Newsline() {
    return <section id="newsline" className="flex flex-col gap-10 py-10">
        <header className="w-full flex gap-4 items-center justify-between flex-wrap px-md md:px-2xl">
            <div className="flex flex-col md:gap-4 font-bold">
                <h2 className="text-2xl md:text-5xl first-letter:capitalize">
                    our latest news
                </h2>
                <p className="text-md md:text-xl">
                    Find out about our <span className="text-red-600">field actions</span> through our reports, news, events,…
                </p>
            </div>

            <div className="flex ml-auto items-center gap-2 text-white">
                <FaArrowLeft onClick={() => { }} className="p-2 cursor-pointer rounded-full bg-black w-10 h-10 active:scale-90 hover:bg-red-600 transition-all" />
                <FaArrowRight onClick={() => { }} className="p-2 cursor-pointer rounded-full bg-black w-10 h-10 active:scale-90 hover:bg-red-600 transition-all" />
            </div>
        </header>

        <div className="w-full flex items-center justify-start gap-4 overflow-auto snap-x snap-mandatory hide-scrollbar">
            <div className="h-96 aspect-[3/4] snap-start hidden md:flex" />
            {Array.from({ length: 10 }).map((_, id) => (
                <div key={id} className="h-96 aspect-[3/4] bg-black snap-start" />
            ))}
        </div>

        <button className="mx-auto outline-none border-2 relative border-black hover:border-red-600 px-8 py-3 group transition-all before:absolute before:w-0 hover:before:w-full before:h-full before:bg-red-600 before:left-0 before:top-0 before:transition-all before:duration-300 before:-z-10">
            <span className="z-50 gap-2 flex items-center font-bold group-hover:text-white">
                see all news <FaArrowRight className=" text-red-600 group-hover:text-white transition-all" />
            </span>
        </button>
    </section>
}