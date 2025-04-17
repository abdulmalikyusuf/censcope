"use client";

import dynamic from "next/dynamic";

export const Banner = dynamic(() => import("./banner"), { ssr: false });
export const Actions = dynamic(() => import("./actions"), { ssr: false });
export const Support = dynamic(() => import("./support"), { ssr: false });
export const Newline = dynamic(() => import("./newsline"), { ssr: false });
export const Discover = dynamic(() => import("./discover"), { ssr: false });
export const SocialMedia = dynamic(() => import("./socialmedia"), {
  ssr: false,
});
