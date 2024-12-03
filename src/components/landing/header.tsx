"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { useScroll } from "@/hooks/scroll.hook";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose, IoSearch } from "react-icons/io5";

export default function Header() {
    const { top } = useScroll();
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (open) setOpen(false);
    }, [top]);

    const Hamburger = React.useMemo(() => open ? IoClose : GiHamburgerMenu, [open])

    return (
        <header className={`w-full gap-2 shadow-md fixed flex items-center justify-between py-4 px-md top-0 z-50 duration-500 transition-all bg-white ${top > 10 ? 'md:bg-white' : 'md:bg-transparent'}`}>
            <button className="z-50 md:hidden mr-auto">
                <Hamburger size={26} onClick={() => setOpen((prev) => !prev)} className="text-red-600" />
            </button>

            <Link href="/" className="bg-logo bg-contain w-20 md:w-44 h-14 md:h-20 bg-left md:bg-center bg-no-repeat" />


            <nav onClick={() => setOpen(false)} className={`fixed md:relative flex flex-col md:flex-row font-bold md:font-normal pt-40 md:pt-0 top-0 left-0 w-screen h-screen md:w-auto md:h-auto bg-white bg-opacity-80 backdrop-blur md:backdrop-blur-none md:bg-transparent md:flex items-center transition-all gap-10 md:gap-16 text-3xl md:text-lg capitalize md:pointer-events-auto md:opacity-100 ${top > 10 ? "md:text-black" : "md:text-white"} ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <Link href="#about" className="relative flex flex-col transition-all hover:text-red-600 md:hover:text-inherit text-center after:h-1 after:bg-red-600 after:w-0 md:hover:after:w-full after:transition-all">
                    about us
                </Link>

                <Link href="#about" className="relative flex flex-col transition-all hover:text-red-600 md:hover:text-inherit text-center after:h-1 after:bg-red-600 after:w-0 md:hover:after:w-full after:transition-all">
                    news
                </Link>

                <Link href="#about" className="relative flex flex-col transition-all hover:text-red-600 md:hover:text-inherit text-center after:h-1 after:bg-red-600 after:w-0 md:hover:after:w-full after:transition-all">
                    our actions
                </Link>

                <Link href="#about" className="relative flex flex-col transition-all hover:text-red-600 md:hover:text-inherit text-center after:h-1 after:bg-red-600 after:w-0 md:hover:after:w-full after:transition-all">
                    support us
                </Link>

                <Link href="#about" className="relative flex flex-col transition-all hover:text-red-600 md:hover:text-inherit text-center after:h-1 after:bg-red-600 after:w-0 md:hover:after:w-full after:transition-all">
                    join us
                </Link>
            </nav>

            <Link href="#" className="flex gap-4 items-center px-8 py-2 text-white group  md:text-xl bg-red-600 capitalize">
                donate <FaArrowRight className=" text-white group-hover:scale-125 transition-all" />
            </Link>

            <IoSearch className="md:hidden text-2xl transition-all hover:bg-red-600 hover:text-white p-3 rounded-full w-12 h-12 ml-auto" />
        </header>
    );
}
