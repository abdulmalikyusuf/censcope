"use client";
import React from "react";
import SupportCard from "./cards/support";
import { supportCards } from "@/constants/config";
import { useIntersectionObserver } from "@/hooks/observe.hook";


export default function Support() {
    const { ref, entryData } = useIntersectionObserver();

    return <section
        ref={ref}
        id="support"
        className={`overflow-hidden flex flex-col gap-10 bg-top before:absolute before:inset-0 before:bg-support before:bg-cover before:bg-top before:bg-no-repeat before:z-0 before:duration-1000 before:transition-all ${entryData?.isIntersecting ? "before:scale-100 before:opacity-100" : "before:scale-125 before:opacity-0"}`}>
        <div className="z-10 p-xl md:p-2xl w-full">
            <div className={`flex flex-col gap-2 duration-500 delay-150 font-bold ${entryData?.isIntersecting ? "translate-y-0" : "translate-y-20"}`}>
                <h2 className="text-2xl md:text-5xl first-letter:capitalize">
                    support us
                </h2>
                <p className="text-md md:text-xl md:w-80">
                    It is thanks to your commitment that we can carry out our humanitarian missions.
                </p>
            </div>
        </div>

        <div className="w-full flex flex-wrap items-start justify-center z-10 p-lg gap-14">
            {supportCards.map((card, index) => (<SupportCard key={index} visible={!!entryData?.isIntersecting} delay={400 * (index + 1)} index={index} support={card} />))}
        </div>
    </section>
}