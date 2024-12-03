"use client";
import React from "react";
import { useIntersectionObserver } from "@/hooks/observe.hook";

export default function Commit() {
    const { ref } = useIntersectionObserver();

    return <section ref={ref} id="commit" className="h-80"></section>
}