"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <section id="about" className="relative min-h-screen bg-[#121212] flex items-center justify-center px-6 md:px-24 z-20">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-8"
                >
                    <h2 className="text-sm md:text-base font-mono text-white/40 tracking-widest uppercase">
                        01 / About
                    </h2>
                    <p className="text-3xl md:text-5xl lg:text-6xl font-light text-white leading-tight tracking-tight">
                        I craft immersive digital experiences, blending cutting-edge
                        <span className="italic font-serif text-white/50"> engineering </span>
                        with premium
                        <span className="italic font-serif text-white/50"> design</span>.
                    </p>
                    <div className="pt-8">
                        <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
                            With a relentless focus on performance and aesthetics, I specialize in building highly interactive interfaces, video-driven web experiences, and scalable applications. My approach bridges the gap between creativity and technical precision to deliver software that feels as good as it looks.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
