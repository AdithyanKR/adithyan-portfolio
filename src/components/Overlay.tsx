"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Overlay() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Opacity transforms
    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0, 1, 0]);
    const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0]);

    // Parallax Y transforms
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.4], [50, -50]);
    const y3 = useTransform(scrollYProgress, [0.5, 0.7], [50, -50]);

    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10">
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 md:px-24">

                {/* Section 1 */}
                <motion.div
                    style={{ opacity: opacity1, y: y1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center"
                >

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95, y: 30, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="text-5xl md:text-8xl font-bold text-white tracking-tighter"
                    >
                        Adityan K
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
                        className="mt-6 text-lg md:text-2xl text-white/50 font-light tracking-wide max-w-xl leading-relaxed"
                    >
                        Senior Creative Developer.
                    </motion.p>
                </motion.div>

                {/* Section 2 */}
                <motion.div
                    style={{ opacity: opacity2, y: y2 }}
                    className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-24"
                >
                    <h2 className="text-4xl md:text-7xl max-w-3xl font-bold tracking-tighter text-white leading-tight">
                        I build digital <span className="text-white/50 italic font-mono font-light tracking-normal">experiences.</span>
                    </h2>
                </motion.div>

                {/* Section 3 */}
                <motion.div
                    style={{ opacity: opacity3, y: y3 }}
                    className="absolute inset-0 flex flex-col items-end justify-center px-8 md:px-24 text-right"
                >
                    <h2 className="text-4xl md:text-7xl max-w-3xl font-bold tracking-tighter text-white leading-tight">
                        Bridging design and <br />
                        <span className="text-white/50 italic font-mono font-light tracking-normal">engineering.</span>
                    </h2>
                </motion.div>

            </div>
        </div>
    );
}
