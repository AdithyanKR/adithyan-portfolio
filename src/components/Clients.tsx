"use client";

import { motion } from "framer-motion";
import { Command, Feather, Figma, Framer, Globe, Hexagon, Layers, Triangle } from "lucide-react";

export default function Clients() {
    const clients = [
        { icon: Triangle, name: "Vercel" },
        { icon: Framer, name: "Framer" },
        { icon: Figma, name: "Figma" },
        { icon: Command, name: "Raycast" },
        { icon: Hexagon, name: "Linear" },
        { icon: Layers, name: "Supabase" },
        { icon: Globe, name: "Stripe" },
        { icon: Feather, name: "Notion" },
    ];

    return (
        <section id="clients" className="relative py-32 bg-[#121212] z-20 overflow-hidden">
            <div className="text-center mb-16 space-y-4 px-6 md:px-24">
                <h2 className="text-sm md:text-base font-mono text-white/40 tracking-widest uppercase">
                    03 / Trusted By
                </h2>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                    Collaborators & Clients.
                </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 max-w-5xl mx-auto px-6 opacity-60">
                {clients.map((client, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="flex flex-col items-center justify-center space-y-3 text-white transition duration-300 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 cursor-default"
                    >
                        <client.icon size={36} strokeWidth={1.5} />
                        <span className="text-lg font-medium tracking-tight">{client.name}</span>
                    </motion.div>
                ))}
            </div>

            <div className="max-w-4xl mx-auto px-6 mt-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="p-10 md:p-16 rounded-3xl bg-white/5 border border-white/10 text-center space-y-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-white/5 blur-[100px] rounded-full pointer-events-none" />
                    <p className="text-xl md:text-3xl font-light leading-relaxed text-white">
                        "Adityan's visual intuition and technical precision transformed our campaign. A rare mix of world-class design and engineering."
                    </p>
                    <div className="text-white/50 space-y-1">
                        <p className="font-medium text-white">Sarah Jenkins</p>
                        <p className="text-sm">Creative Director at Nexus</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
