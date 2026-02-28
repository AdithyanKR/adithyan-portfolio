"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

interface Ripple {
    id: number;
    x: number;
    y: number;
}

export default function CustomCursor() {
    const [isPointer, setIsPointer] = useState(false);
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth out the cursor movement
    const springConfig = { damping: 25, stiffness: 250 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    const handleClick = useCallback((e: MouseEvent) => {
        const newRipple = {
            id: Date.now(),
            x: e.clientX,
            y: e.clientY,
        };
        setRipples((prev) => [...prev, newRipple]);

        // Remove ripple after animation
        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Check if the cursor is over a clickable element
            const target = e.target as HTMLElement;
            setIsPointer(
                window.getComputedStyle(target).cursor === "pointer" ||
                target.tagName === "A" ||
                target.tagName === "BUTTON"
            );
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleClick);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleClick);
        };
    }, [mouseX, mouseY, handleClick]);

    return (
        <>
            <AnimatePresence>
                {ripples.map((ripple) => (
                    <motion.div
                        key={ripple.id}
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 4, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        style={{
                            left: ripple.x - 16,
                            top: ripple.y - 16,
                        }}
                        className="fixed w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference"
                    />
                ))}
            </AnimatePresence>
            <motion.div
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                    left: -16,
                    top: -16,
                }}
                animate={{
                    scale: isPointer ? 2.5 : 1,
                }}
                className="fixed w-8 h-8 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
            />
        </>
    );
}
