"use client";
import { socialLinks } from "@/constants/config";
import React from "react";

export default function SocialMedia() {

    return <section id="social-media" className="py-24 md:px-6xl bg-spiral bg-gray-100 bg-contain bg-center">
        <div className="p-10 flex flex-col items-center bg-white">
            <p className="italic text-xl first-letter:capitalize">follow us </p>
            <h3 className="text-red-600 text-xl md:text-3xl font-black mb-4">on social media</h3>

            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 px-sm">
                {socialLinks.map(link => (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all">
                        <link.icon className="transition-all" />
                    </a>
                ))}
            </div>
        </div>
    </section>
}