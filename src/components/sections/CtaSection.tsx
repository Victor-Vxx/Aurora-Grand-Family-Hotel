"use client";

import { motion } from "framer-motion";

const BOOKING_URL = "https://www.booking.com/hotel/br/grand-aurora.pt-br.html?aid=2127532&label=metagha-link-MRBR-hotel-15547767_dev-desktop_los-1_bw-25_dow-Sunday_defdate-1_room-0_gstadt-2_rateid-public_aud-0_gacid-_mcid-10_ppa-0_clrid-0_ad-0_gstkid-0_checkin-20260329_ppt-&sid=537c405d99f98f9b648eb521b439e089&all_sr_blocks=1554776701_426617100_2_1_0&checkin=2026-03-29&checkout=2026-03-30&dest_id=15547767&dest_type=hotel&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=1554776701_426617100_2_1_0&hpos=1&matching_block_id=1554776701_426617100_2_1_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=1554776701_426617100_2_1_0__29495&srepoch=1772732186&srpvid=d38a7bc99dfd022b&type=total&ucfs=1&";

export default function CtaSection() {
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
                        <span className="italic font-light">à beira-mar.</span>
                    </h2>

                    <p className="text-white/80 font-sans text-lg font-light leading-relaxed mb-12 max-w-xl mx-auto">
                        Reserve agora diretamente pelo Booking.com e assegure os melhores quartos para criar memórias inesquecíveis.
                    </p>

                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={BOOKING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-white text-ocean px-12 py-5 uppercase tracking-widest text-sm font-bold shadow-2xl hover:bg-sand transition-colors duration-300 rounded-sm"
                    >
                        Ver Disponibilidade no Booking
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
