"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function PoolSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

    return (
        <section
            id="piscina"
            ref={containerRef}
            className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden"
        >
            {/* Parallax Background */}
            <motion.div
                style={{ y }}
                className="absolute inset-x-0 -top-[20%] -bottom-[20%] z-0"
            >
                <img
                    src="/img-pcn/img-piscina4.jpg"
                    alt="Piscina Aurora Grand Family Hotel"
                    className="w-full h-full object-cover object-center"
                />
                {/* Dual gradient for elegant text contrast over water */}
                <div className="absolute inset-0 bg-ocean/30 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />
            </motion.div>

            {/* Content overlays */}
            <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
                <motion.div style={{ opacity }}>
                    <span className="block text-sand tracking-[0.3em] uppercase text-sm font-sans mb-6">
                        Oásis Particular
                    </span>
                    <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white drop-shadow-xl leading-tight mb-8">
                        Mergulhe na <br />
                        <span className="italic font-light text-sand-dark">Tranquilidade</span>
                    </h2>
                    <p className="text-white/90 font-sans font-light max-w-xl mx-auto text-base md:text-lg mb-12 drop-shadow-md">
                        Relaxe em nossa elegante piscina ao ar livre, um espaço pensado para proporcionar conforto, tranquilidade e momentos especiais durante sua estadia. Com água cristalina e um ambiente moderno ao redor, a área da piscina é perfeita para um mergulho refrescante, aproveitar o sol ou simplesmente descansar em um cenário acolhedor e sofisticado.
                    </p>

                    <div className="h-px w-32 bg-white/30 mx-auto" />
                </motion.div>
            </div>

        </section>
    );
}
