"use client";
import Image from "next/image";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";
import { FaSpinner } from "react-icons/fa";

import { createPost } from "@/lib/actions/post";
import { toast } from "sonner";

export function Header() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

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
              className="text-sm/6 text-gray-950 dark:text-white"
              href="/admin"
            >
              Posts
            </Link>
            <Link
              className="text-sm/6 text-gray-950 dark:text-white"
              href="/admin/gallery"
            >
              Gallery
            </Link>
            <Link
              className="text-sm/6 text-gray-950 dark:text-white"
              href="/admin/users"
            >
              Users
            </Link>
            <button
              type="button"
              onClick={async () => {
                const res = await createPost();
                if ("id" in res) {
                  setPending(true);
                  router.push(`/admin/editor/${res.id!}`);
                } else {
                  setPending(false);
                  console.error("Failed to create post:", res);
                  toast.error("Failed to create post. Please try again later.");
                }
              }}
              className="group inline-flex gap-0.5 flex-nowrap relative px-1.5 text-sm/6 text-sky-800 dark:text-sky-300"
            >
              {pending ? (
                <FaSpinner className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              ) : (
                <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              )}
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
            </button>
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
              onClick={async () =>
                await signOut({ redirectTo: "/admin/signin" })
              }
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
