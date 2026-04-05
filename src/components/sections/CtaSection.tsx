"use client";

import { motion } from "framer-motion";
import { useBookingStore } from "@/store/useBookingStore";

export default function CtaSection() {
    const { openBooking } = useBookingStore();

    return (
        <section className="relative py-32 md:py-48 bg-ocean overflow-hidden flex items-center justify-center">

            {/* Background Graphic / Pattern overlay - subtle */}
            <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
                <div className="w-[800px] h-[800px] rounded-full border-[1px] border-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150" />
                <div className="w-[1200px] h-[1200px] rounded-full border-[1px] border-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto flex flex-col items-center"
                >
                    <span className="text-sand tracking-[0.3em] uppercase text-xs font-sans mb-6 block">Seja nosso convidado</span>

                    <h2 className="font-serif text-5xl md:text-7xl text-white leading-tight mb-8">
                        Garanta sua experiência <br />
                        <span className="italic font-light">à 350m da Praia de Peruíbe.</span>
                    </h2>

                    <p className="text-white/80 font-sans text-lg font-light leading-relaxed mb-12 max-w-xl mx-auto">
                        Reserve agora e assegure os melhores quartos para criar memórias inesquecíveis com sua família.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openBooking()}
                        className="inline-flex items-center justify-center bg-white text-ocean px-12 py-5 uppercase tracking-widest text-sm font-bold shadow-2xl hover:bg-sand transition-colors duration-300 rounded-sm"
                    >
                        Ver Disponibilidade
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
