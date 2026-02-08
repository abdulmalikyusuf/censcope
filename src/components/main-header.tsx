"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navlinks = [
  { label: "who we are", href: "/about-us" },
  { label: "what we do", href: "/our-actions" },
  { label: "news", href: "/news" },
  { label: "reports", href: "/reports" },
  { label: "partnership", href: "/partnership" },
  { label: "career", href: "/career" },
  { label: "support us", href: "/support-us" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [isOpaque, setIsOpaque] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      setIsOpaque(pathname.startsWith("/news/") ? scrollY > 112 : scrollY > viewportHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);
  const Hamburger = open ? X : Menu;

  return (
    <header
      id="main-header"
      className={cn("w-full gap-2 shadow-sm fixed flex items-center justify-between py-4 px-4% top-0 left-0 z-50 duration-500 transition-all bg-white",
        isOpaque ? "md:bg-white" : "md:bg-transparent"
      )}
    >


      <Link
        href="/"
        className="bg-logo bg-contain w-20 md:w-40 h-14 md:h-16 bg-left md:bg-center bg-no-repeat"
      />
      <button
        className="z-50 md:hidden"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Hamburger className="size-10 text-cyan-600" />
      </button>

      <nav
        onClick={() => setOpen(false)}
        className={`fixed max-md:top-[88px] z-20 md:relative flex flex-col md:flex-row md:flex-1 md:justify-center max-md:py-10 md:pt-0 max-md:p-10 top-0 left-0 w-screen h-screen md:w-auto md:h-auto bg-white bg-opacity-80 backdrop-blur md:backdrop-blur-none md:bg-transparent items-center transition-all gap-10 md:gap-8 text-2xl md:text-base font-bold md:font-semibold capitalize md:pointer-events-auto md:opacity-100 ${isOpaque ? "md:text-black" : "md:text-white"
          } ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        {navlinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`relative flex flex-col transition-all md:hover:text-inherit text-center after:h-0.5 after:bg-cyan-600 after:scale-0 after:w-full md:hover:after:scale-100 after:origin-center after:transition-transform after:duration-300 after:delay-100 ${pathname === link.href
              ? "text-cyan-600 font-medium"
              : "hover:text-cyan-600"
              }`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/support-us"
          className={`mt-4 md:mt-0 px-6 py-2 md:py-2.5 rounded-md font-semibold text-base md:text-sm transition-all ${
            isOpaque
              ? "bg-cyan-600 text-white hover:bg-cyan-700"
              : "bg-white text-cyan-600 hover:bg-gray-100 md:bg-cyan-600 md:text-white md:hover:bg-cyan-700"
          } ${open ? "opacity-100" : "md:opacity-100"}`}
        >
          Donate Now
        </Link>
      </nav>
    </header>
  );
}
