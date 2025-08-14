import React from "react";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import Header from "@/components/main-header";
import Footer from "@/components/main-footer";

export const metadata: Metadata = {};

export default function Layout(properties: HomeLayoutProps) {
  return (
    <>
      <Header />
      <main className="w-full flex grow flex-col z-10 bg-white max-md:mt-[88px]">
        <NuqsAdapter>{properties.children}</NuqsAdapter>
      </main>
      <Footer />
    </>
  );
}
