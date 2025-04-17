import React from "react";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata: Metadata = {};

export default function Layout(properties: HomeLayoutProps) {
  return (
    <>
      {properties.header}
      <main className="w-full flex grow flex-col z-10 bg-white">
        <NuqsAdapter>{properties.children}</NuqsAdapter>
      </main>
      {properties.footer}
    </>
  );
}
