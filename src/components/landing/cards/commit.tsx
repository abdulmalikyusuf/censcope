"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function CommitCard(props: { visible: boolean }) {
    const length = React.useMemo(() => Math.ceil(Math.random() * 5), []);

    return <Link href="#" className="w-80 h-auto group bg-gray-200 flex flex-none flex-col items-start justify-between snap-start relative overflow-hidden">
        <div className="w-full relative h-auto aspect-square">
            <div className="absolute top-10 left-10 w-12 h-12 rounded-full z-10 bg-black"></div>
            <Image alt="" width={1000} height={1000} src="/images/support.jpg" className={`w-full h-full object-cover transition-transform duration-500 ${props.visible ? 'scale-100' : 'scale-0'}`} />
        </div>

        <div className="w-full h-full p-10">
            <p className="text-lg group-hover:text-cyan-600 font-serif">
                {Array.from({ length: length }).map((_, id) => (
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                ))}
            </p>
        </div>
    </Link>;
}
