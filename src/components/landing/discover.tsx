"use client";
import React from "react";
import { useIntersectionObserver } from "@/hooks/observe.hook";

export default function Discover() {
    const { ref } = useIntersectionObserver();

    return <section ref={ref} id="discover" className="h-80"></section>
}