"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import Button from "@/components/primary/button";
import useScrolling from "@/hooks/scrolling.hook";

const navlinks = [
  { label: "about us", href: "/about-us" },
  { label: "news", href: "/our-newsline" },
  { label: "our actions", href: "/our-actions" },
  { label: "support us", href: "/support-us" },
  { label: "join us", href: "/joining-us" },
];

export default function Header() {
  const router = useRouter();
  const { top } = useScrolling();
  const pathname = usePathname();

  const [open, setOpen] = React.useState(false);

  const isOpague = React.useMemo(() => top > 20, [top]);

  const Hamburger = open ? IoClose : GiHamburgerMenu;

  return (
    <header
      id="main-header"
      className={`w-full gap-2 shadow-sm fixed flex items-center justify-between py-4 px-4% top-0 left-0 z-50 duration-500 transition-all bg-white ${
        isOpague ? "md:bg-white" : "md:bg-transparent"
      }`}
    >
      <>
        <button
          className="z-50 md:hidden mr-auto"
          onClick={() => setOpen((prev) => !prev)}
        >
          <Hamburger size={26} className="text-cyan-600" />
        </button>

        <Link
          href="/"
          className="bg-logo bg-contain w-20 md:w-40 h-14 md:h-16 bg-left md:bg-center bg-no-repeat"
        />
      </>

      <nav
        onClick={() => setOpen(false)}
        className={`fixed max-md:top-[88px] z-20 md:relative flex flex-col md:flex-row md:font-normal max-md:py-10 md:pt-0 max-md:p-10 top-0 left-0 w-screen h-screen md:w-auto md:h-auto bg-white bg-opacity-80 backdrop-blur md:backdrop-blur-none md:bg-transparent md:flex items-center transition-all gap-10 md:gap-20 text-2xl md:text-lg font-bold capitalize md:pointer-events-auto md:opacity-100 ${
          isOpague ? "md:text-black" : "md:text-white"
        } ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        {navlinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`relative flex flex-col transition-all md:hover:text-inherit text-center after:h-0.5 after:bg-cyan-600 after:scale-0 after:w-full md:hover:after:scale-100 after:origin-center after:transition-transform after:duration-300 after:delay-100 ${
              pathname === link.href
                ? "text-cyan-600 font-medium"
                : "hover:text-cyan-600"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Button
          withIcon
          title="Donate"
          titleClassName="py-2 px-8 gap-3 text-lg"
          onClick={() => router.push("/donate")}
          containerClassName="md:hidden bg-cyan-600 w-full mx-10 text-white hover:text-cyan-600 border-2 border-cyan-600 capitalize hover:bg-transparent"
        />
      </nav>

      <Button
        withIcon
        title="Donate"
        titleClassName="py-2 px-8 gap-3"
        onClick={() => router.push("/donate")}
        containerClassName="hidden md:flex bg-cyan-600 text-white hover:text-cyan-600 border-2 border-cyan-600 capitalize hover:bg-transparent"
      />

      {/* <IoSearch className="md:hidden text-2xl transition-all hover:bg-cyan-600 hover:text-white p-3 rounded-full w-12 h-12 ml-auto" /> */}
    </header>
  );
}
