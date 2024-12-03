"use client";
import React from "react";

export function useIntersectionObserver(options: IntersectionObserverInit = { threshold: [0, 0.25, 0.5, 0.75, 1] }) {
    const ref = React.useRef(null);
    const [entryData, setEntryData] = React.useState<IntersectionObserverEntry & { percentageInView?: number }>();

    React.useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const { intersectionRatio } = entry;
                const percentageInView = Math.round(intersectionRatio * 100);

                setEntryData((prev) => { prev = entry; prev.percentageInView = percentageInView; return prev; });
            }, options
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [options]);

    return { ref, entryData };
}
