"use client";
import Image from "next/image";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { CreatePostButton } from "./create-post-button";

export function Header() {
  const pathname = usePathname();

  const handleLogout = async () => {
    // signOut with redirect (which will reload automatically)
    await signOut({ callbackUrl: "/admin/signin", redirect: true });
  };

  return (
    <div className="fixed inset-x-0 top-0 z-10 border-b border-black/5 dark:border-white/10">
      <div className="bg-white flex h-14 items-center justify-between gap-8 px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <div className="shrink-0 overflow-y-clip">
            <Image
              alt="Censcope logo"
              src="/logo.png"
              width={120}
              height={28}
              className="h-20 object-top"
            />
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-6 max-md:hidden">
            <Link
              className={cn(
                "text-sm/6",
                pathname === "/admin"
                  ? "text-gray-950"
                  : "text-gray-600 dark:text-white"
              )}
              href="/admin"
            >
              Posts
            </Link>
            <Link
              className={cn(
                "text-sm/6",
                pathname === "/admin/gallery"
                  ? "text-gray-950"
                  : "text-gray-600 dark:text-white"
              )}
              href="/admin/gallery"
            >
              Gallery
            </Link>
            <Link
              className={cn(
                "text-sm/6",
                pathname === "/admin/users"
                  ? "text-gray-950"
                  : "text-gray-600 dark:text-white"
              )}
              href="/admin/users"
            >
              Users
            </Link>
            <Link
              className={cn(
                "text-sm/6",
                pathname === "/admin/settings"
                  ? "text-gray-950"
                  : "text-gray-600 dark:text-white"
              )}
              href="/admin/settings"
            >
              Settings
            </Link>
            <Link
              className={cn(
                "text-sm/6",
                pathname === "/admin/reports"
                  ? "text-gray-950"
                  : "text-gray-600 dark:text-white"
              )}
              href="/admin/reports"
            >
              Reports
            </Link>
            <CreatePostButton className="group inline-flex gap-0.5 flex-nowrap relative px-1.5 text-sm/6 text-sky-800 dark:text-sky-300">
              <span className="absolute inset-0 border border-dashed border-sky-300/60 bg-sky-400/10 group-hover:bg-sky-400/15 dark:border-sky-300/30"></span>
              Post
              <svg
                width="5"
                height="5"
                viewBox="0 0 5 5"
                className="absolute top-[-2px] left-[-2px] fill-sky-300 dark:fill-sky-300/50"
              >
                <path d="M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z"></path>
              </svg>
              <svg
                width="5"
                height="5"
                viewBox="0 0 5 5"
                className="absolute top-[-2px] right-[-2px] fill-sky-300 dark:fill-sky-300/50"
              >
                <path d="M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z"></path>
              </svg>
              <svg
                width="5"
                height="5"
                viewBox="0 0 5 5"
                className="absolute bottom-[-2px] left-[-2px] fill-sky-300 dark:fill-sky-300/50"
              >
                <path d="M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z"></path>
              </svg>
              <svg
                width="5"
                height="5"
                viewBox="0 0 5 5"
                className="absolute right-[-2px] bottom-[-2px] fill-sky-300 dark:fill-sky-300/50"
              >
                <path d="M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z"></path>
              </svg>
            </CreatePostButton>
          </div>
          <div>
            {/* <form
          action={async () => {
            'use server';
            await signOut();
          }}
        > */}
            <button
              type="button"
              aria-label="Search"
              onClick={handleLogout}
              className="flex items-center flex-row-reverse gap-2 whitespace-nowrap"
            >
              <LogOutIcon className="size-4" />
              <span className="">Log Out</span>
            </button>
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
}
