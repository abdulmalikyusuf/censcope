import { ReactNode } from "react";
import type { Metadata } from "next";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Censope Blog Post Editor",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider className="">
      <AppSidebar />
      <SidebarInset className="h-full">{children}</SidebarInset>
    </SidebarProvider>
  );
}
