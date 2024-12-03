"use client";
import React from "react";

export function useScroll() {
    const [scrollPosition, setScrollPosition] = React.useState({ top: 0, left: 0, right: 0, bottom: 0, });

    React.useEffect(() => {
        const updateScrollPosition = () => {
            const clientWidth = document.documentElement.clientWidth;
            const scrollWidth = document.documentElement.scrollWidth;
            
            const clientHeight = document.documentElement.clientHeight;
            const scrollHeight = document.documentElement.scrollHeight;

            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

            setScrollPosition({
                top: scrollTop, left: scrollLeft,
                right: scrollWidth - clientWidth - scrollLeft,
                bottom: scrollHeight - clientHeight - scrollTop,
            });
        };

        updateScrollPosition();
        window.addEventListener('resize', updateScrollPosition);
        window.addEventListener('scroll', updateScrollPosition);

        return () => {
            window.removeEventListener('resize', updateScrollPosition);
            window.removeEventListener('scroll', updateScrollPosition);
        };
    }, []);

    return scrollPosition;
}
