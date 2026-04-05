"use client";

import { motion } from "framer-motion";
import { useBookingStore } from "@/store/useBookingStore";

export default function HeroSection() {
    const { openBooking } = useBookingStore();

    return (
        <>
            <section className="relative w-full h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 6, ease: "easeOut" }}
                        src="/img-pcp/img-principal.jpg"
                        alt="Aurora Grand Family Hotel - Visão Principal"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-ocean/40 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center mt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <span className="block font-sans lowercase tracking-[0.3em] text-white/80 mb-4 text-sm md:text-base">
                            Bem-vindo ao
                        </span>
                        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white drop-shadow-lg mb-6 leading-tight">
                            Aurora Grand<br />
                            <span className="italic font-light text-sand">Family Hotel</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-white/90 font-sans text-lg md:text-xl max-w-2xl font-light mb-12 drop-shadow-md"
                    >
                        Onde a brisa do mar encontra a sofisticação que sua família merece.
                        <br />
                        A brisa do Mar em Peruíbe.
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        onClick={() => openBooking()}
                        className="hidden md:inline-flex bg-white text-ocean px-10 py-4 uppercase tracking-widest text-sm hover:bg-sand transition-colors duration-300 shadow-xl"
                    >
                        Consultar Disponibilidade
                    </motion.button>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center"
                >
                    <span className="text-white/60 uppercase tracking-widest text-[10px] mb-2 font-sans">Descobrir</span>
                    <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
                        <motion.div
                            animate={{ y: [0, 48] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            className="w-full h-1/2 bg-white absolute top-0"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Mobile Fixed CTA */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-white/95 via-white/80 to-transparent pb-6 pt-10">
                <button
                    onClick={() => openBooking()}
                    className="w-full flex justify-center items-center bg-ocean text-white py-4 uppercase tracking-widest text-sm shadow-[0_10px_40px_rgba(6,57,78,0.3)] rounded-sm active:scale-95 transition-transform"
                >
                    Ver Disponibilidade
                </button>
            </div>
        </>
    );
}
