import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "sonner";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Censope Admin",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cn(fontSans.variable, fontSans.className, "w-full")}>
      <Toaster />
      {children}
    </div>
  );
}
