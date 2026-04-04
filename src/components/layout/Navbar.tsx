"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/message/72YRQLT5HIUAE1";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "A Pousada", href: "#sobre" },
        { name: "Estrutura", href: "#estrutura" },
        { name: "Piscina", href: "#piscina" },
        { name: "Culinária", href: "#culinaria" },
        { name: "Suítes", href: "#suites" },
        { name: "Localização", href: "#localizacao" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.05)] py-4"
                    : "bg-transparent py-6"
                    }`}
            >
                <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                    <a href="#" className="flex-shrink-0">
                        <h1 className={`font-serif text-2xl tracking-wide transition-colors duration-300 ${isScrolled ? "text-ocean" : "text-white drop-shadow-md"
                            }`}>
                            AURORA
                        </h1>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`text-sm uppercase tracking-wider transition-colors hover:text-sand-dark ${isScrolled ? "text-ocean/80" : "text-white/90"
                                    }`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    <div className="hidden lg:block">
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-6 py-3 rounded-sm text-sm uppercase tracking-wider transition-all duration-300 ${isScrolled
                                ? "bg-ocean text-white hover:bg-ocean-light"
                                : "bg-white/20 backdrop-blur-sm text-white border border-white/50 hover:bg-white hover:text-ocean"
                                }`}
                        >
                            Consultar Disponibilidade
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden z-50"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6 text-ocean" />
                        ) : (
                            <Menu className={`w-6 h-6 ${isScrolled ? "text-ocean" : "text-white drop-shadow-md"}`} />
                        )}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-white pt-24 px-6 flex flex-col items-center justify-center space-y-8"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="font-serif text-3xl text-ocean hover:text-ocean-light transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 px-8 py-4 bg-ocean text-white uppercase tracking-widest text-sm rounded-sm"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Consultar Disponibilidade
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
