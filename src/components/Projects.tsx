"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { useRef } from "react";

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
    });

    // Create a horizontal x translation for a smooth parallax-like slide
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

    const videoFiles = [
        "https://res.cloudinary.com/daw6tfzlv/video/upload/v1772306564/0128_g17tue.mp4",
    ];

    const projects = Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        title: i < videoFiles.length ? `Selected Work 0${i + 1}` : `Video Work 0${i + 1}`,
        category: i % 2 === 0 ? "Commercial" : "Creative",
        videoSrc: i < videoFiles.length ? videoFiles[i] : null,
        gradientStart: i % 3 === 0 ? "from-orange-900/50" : i % 2 === 0 ? "from-blue-900/50" : "from-emerald-900/50",
        gradientEnd: i % 3 === 0 ? "to-rose-900/50" : i % 2 === 0 ? "to-purple-900/50" : "to-teal-900/50"
    }));

    return (
        <section id="projects" ref={containerRef} className="relative min-h-[300vh] bg-[#121212] z-20">
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                <div className="max-w-7xl mx-auto w-full px-6 md:px-24 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-4"
                    >
                        <h2 className="text-sm md:text-base font-mono text-white/40 tracking-widest uppercase">
                            02 / Vertical Works
                        </h2>
                        <h3 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                            Selected Reels.
                        </h3>
                    </motion.div>
                </div>

                {/* Horizontal Scrolling Track */}
                <motion.div
                    style={{ x }}
                    className="flex gap-6 md:gap-12 px-6 md:px-24 w-max"
                >
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "100px" }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.05 }}
                            className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 w-[280px] md:w-[400px] aspect-[9/16] shrink-0 cursor-pointer"
                        >
                            {/* Actual Video */}
                            {project.videoSrc ? (
                                <video
                                    src={project.videoSrc}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition duration-700"
                                />
                            ) : (
                                <div className={`absolute inset-0 opacity-40 group-hover:opacity-60 transition duration-700 bg-gradient-to-br ${project.gradientStart} ${project.gradientEnd}`} />
                            )}

                            {/* Inner gradient for nice shadowing */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/20 to-transparent opacity-90" />

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition duration-500 ease-out">
                                    <Play size={28} className="text-white fill-white ml-2 opacity-80 group-hover:opacity-100" />
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                                <div className="space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                    <span className="text-xs font-mono text-white/50 tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        {project.category}
                                    </span>
                                    <h4 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                                        {project.title}
                                    </h4>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
