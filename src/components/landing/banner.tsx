"use client";
import { useMousePosition } from "@/hooks/mouse.hook";
import { useIntersectionObserver } from "@/hooks/observe.hook";
import React from "react";

export default function Banner() {
    const { x, y } = useMousePosition();
    const { ref, entryData } = useIntersectionObserver();

    const xAxis = React.useMemo(() => typeof window === "undefined" ? 0 : x - (window.innerWidth / 2), [x]);
    const yAxis = React.useMemo(() => typeof window === "undefined" ? 0 : y - (window.innerHeight / 2), [y]);

    return <section ref={ref} id="banner" className={`flex relative items-center justify-center h-screen md:h-[80vh] overflow-hidden bg-black ${entryData?.isIntersecting ? 'bg-opacity-100' : 'bg-opacity-0'}`}>
        <div style={{ transform: `translateX(${-xAxis / 15}px) translateY(${-yAxis / 15}px) scale(1.1)` }} className="w-full h-full absolute bg-banner-slide-back bg-cover bg-center bg-no-repeat" />
        <div style={{ transform: `translateX(${-xAxis / 30}px) translateY(${-yAxis / 30}px) scale(1.1)` }} className="w-full h-full absolute bg-banner-slide-front bg-cover bg-center" />
        <div style={{ transform: `translateX(${-xAxis / 45}px) translateY(${-yAxis / 45}px) scale(1.1)` }} className="w-full h-full absolute bg-spiral mix-blend-overlay" />

        <div style={{ transform: `translateX(${xAxis / 10}px) translateY(${yAxis / 10}px)` }} className="absolute text-2xl md:text-7xl z-20 flex flex-col items-center gap-2 uppercase  top-60 md:top-36 md:left-28">
            <h2 className="text-white ">helping communities</h2>
            <h2 className="bg-white-paper p-2 text-cyan-600">out of the red zone</h2>
        </div>
    </section>;
}
