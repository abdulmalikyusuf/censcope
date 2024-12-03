"use client";
import React from "react";

export function useMousePosition() {
    const prevPositionRef = React.useRef({ x: 0, y: 0, time: Date.now() });
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0, speed: 0, direction: { x: 0, y: 0 }, });

    React.useEffect(() => {
        const handleMouseMove = ({ clientX: x, clientY: y }: MouseEvent) => {
            const currentTime = Date.now();
            const { x: prevX, y: prevY, time: prevTime } = prevPositionRef.current;

            const timeElapsed = (currentTime - prevTime) / 1000; // in seconds

            const distance = Math.sqrt((x - prevX) ** 2 + (y - prevY) ** 2);
            const speed = timeElapsed > 0 ? distance / timeElapsed : 0;

            const direction = { x: x - prevX, y: y - prevY, };

            setMousePosition({ x, y, speed, direction });
            prevPositionRef.current = { x, y, time: currentTime };
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);

    }, []);

    return mousePosition;


}
