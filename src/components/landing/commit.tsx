"use client";
import React from "react";
import CommitCard from "./cards/commit";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useIntersectionObserver } from "@/hooks/observe.hook";

export default function Commit() {
    const { ref,entryData } = useIntersectionObserver();

    return <section ref={ref} id="commit" className="flex flex-col gap-10 py-10">
        <header className="w-full flex gap-4 items-center justify-between flex-wrap px-md md:px-2xl">
            <div className="flex flex-col md:gap-4 ">
                <h2 className="text-2xl md:text-5xl first-letter:capitalize">
                    Sharing is committing
                </h2>
                <p className="text-md md:text-xl">
                    Follow and share our news via social networks.
                </p>
            </div>

            <div className="flex ml-auto items-center gap-2 text-white">
                <FaArrowLeft onClick={() => { }} className="p-2 cursor-pointer rounded-full bg-black w-10 h-10 active:scale-90 hover:bg-red-600 transition-all" />
                <FaArrowRight onClick={() => { }} className="p-2 cursor-pointer rounded-full bg-black w-10 h-10 active:scale-90 hover:bg-red-600 transition-all" />
            </div>
        </header>

        <div className="w-10/12 md:w-4/5 mx-auto flex items-start justify-start gap-4 overflow-auto snap-x snap-mandatory hide-scrollbar">
            {Array.from({ length: 10 }).map((_, id) => (
                <CommitCard key={id} visible={!!entryData?.isIntersecting} />
            ))}
        </div>
    </section>
}