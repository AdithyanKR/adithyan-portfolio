"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Myself", href: "#myself" },
        { name: "Projects", href: "#projects" },
        { name: "Clients", href: "#clients" },
        { name: "About", href: "#about" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex justify-center pt-6 pb-4 px-6 ${scrolled ? "pt-4" : ""
                }`}
        >
            <div
                className={`flex items-center gap-1 md:gap-2 px-6 py-3 rounded-full border transition-all duration-500 ${scrolled
                    ? "bg-black/40 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/50"
                    : "bg-black/20 backdrop-blur-md border-white/5"
                    }`}
            >
                {navLinks.map((link, i) => (
                    <a
                        key={i}
                        href={link.href}
                        className="relative px-3 md:px-5 py-2 text-xs md:text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 rounded-full hover:bg-white/10"
                    >
                        {link.name}
                    </a>
                ))}
            </div>
        </motion.nav>
    );
}
