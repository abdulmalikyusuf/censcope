"use client";
import React from "react";
import { useIntersectionObserver } from "@/hooks/observe.hook";

export default function Actions() {
    const { ref } = useIntersectionObserver();

    return <section ref={ref} id="actions" className="flex flex-col py-10">
        <header className="w-full flex flex-col items-center md:gap-4 font-bold">
            <h2 className="text-2xl md:text-5xl first-letter:capitalize">
                our actions
            </h2>
            <p className="text-md md:text-xl">
                Première Urgence Internationale is <span className="text-red-600">199 projects</span> in <span className="text-red-600">25 different countries.</span>
            </p>
        </header>

        <div className="w-full py-10 px-xl">
            <div className="w-full aspect-video bg-gray-400"></div>
        </div>
    </section>
}