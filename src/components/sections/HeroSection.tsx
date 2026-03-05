"use client";

import { motion } from "framer-motion";

const BOOKING_URL = "https://www.booking.com/hotel/br/grand-aurora.pt-br.html?aid=2127532&label=metagha-link-MRBR-hotel-15547767_dev-desktop_los-1_bw-25_dow-Sunday_defdate-1_room-0_gstadt-2_rateid-public_aud-0_gacid-_mcid-10_ppa-0_clrid-0_ad-0_gstkid-0_checkin-20260329_ppt-&sid=537c405d99f98f9b648eb521b439e089&all_sr_blocks=1554776701_426617100_2_1_0&checkin=2026-03-29&checkout=2026-03-30&dest_id=15547767&dest_type=hotel&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=1554776701_426617100_2_1_0&hpos=1&matching_block_id=1554776701_426617100_2_1_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=1554776701_426617100_2_1_0__29495&srepoch=1772732186&srpvid=d38a7bc99dfd022b&type=total&ucfs=1&";

export default function HeroSection() {
    return (
        <>
            <section className="relative w-full h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden">
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
                        Acorde com o som das ondas.
                    </motion.p>

                    <motion.a
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        href={BOOKING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:inline-flex bg-white text-ocean px-10 py-4 uppercase tracking-widest text-sm hover:bg-sand transition-colors duration-300 shadow-xl"
                    >
                        Consultar Disponibilidade
                    </motion.a>
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
                <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex justify-center items-center bg-ocean text-white py-4 uppercase tracking-widest text-sm shadow-[0_10px_40px_rgba(6,57,78,0.3)] rounded-sm active:scale-95 transition-transform"
                >
                    Ver Disponibilidade
                </a>
            </div>
        </>
    );
}
