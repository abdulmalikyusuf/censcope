"use client";
import { useScroll } from "@/hooks/scroll.hook";

export default function Header() {
    const { top, ...rest } = useScroll();
    console.log(top, rest)

    return (
        <header className={`w-full p-10 shadow-md fixed top-0 z-50 transition-all ${top > 10 ? 'bg-black' : 'bg-transparent'}`}></header>
    );
}
