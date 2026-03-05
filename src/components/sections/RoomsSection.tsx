"use client";

import { motion } from "framer-motion";
import { Wifi, Coffee, Tv, Bath, Wind } from "lucide-react";

const BOOKING_URL = "https://www.booking.com/hotel/br/grand-aurora.pt-br.html?aid=2127532&label=metagha-link-MRBR-hotel-15547767_dev-desktop_los-1_bw-25_dow-Sunday_defdate-1_room-0_gstadt-2_rateid-public_aud-0_gacid-_mcid-10_ppa-0_clrid-0_ad-0_gstkid-0_checkin-20260329_ppt-&sid=537c405d99f98f9b648eb521b439e089&all_sr_blocks=1554776701_426617100_2_1_0&checkin=2026-03-29&checkout=2026-03-30&dest_id=15547767&dest_type=hotel&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=1554776701_426617100_2_1_0&hpos=1&matching_block_id=1554776701_426617100_2_1_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=1554776701_426617100_2_1_0__29495&srepoch=1772732186&srpvid=d38a7bc99dfd022b&type=total&ucfs=1&";

const rooms = [
    {
        id: 1,
        name: "Suíte Ocean View",
        description: "Espaçosa e elegante, com varanda privativa e vista deslumbrante e ininterrupta para o mar. O refúgio perfeito para casais.",
        image: "/img-qrt/img-quarto1.jpg",
        amenities: [
            { icon: <Wind className="w-4 h-4" />, label: "Ar Condicionado" },
            { icon: <Wifi className="w-4 h-4" />, label: "Wi-Fi Premium" },
            { icon: <Bath className="w-4 h-4" />, label: "Banheira" },
            { icon: <Coffee className="w-4 h-4" />, label: "Máquina Expresso" },
        ]
    },
    {
        id: 2,
        name: "Suíte Family Grand",
        description: "Com dois ambientes integrados, esta suíte acomoda sua família com conforto absoluto, sem abrir mão do requinte e privacidade.",
        image: "/img-qrt/img-quarto3.jpg",
        amenities: [
            { icon: <Wind className="w-4 h-4" />, label: "Ar Condicionado" },
            { icon: <Tv className="w-4 h-4" />, label: "Smart TV 55\"" },
            { icon: <Wifi className="w-4 h-4" />, label: "Wi-Fi Premium" },
        ]
    },
    {
        id: 3,
        name: "Quarto Standard Premium",
        description: "Acolhedor e finamente decorado. Oferece a mesma qualidade de sono e banho premium das nossas suítes principais.",
        image: "/img-qrt/img-quarto5.jpg",
        amenities: [
            { icon: <Wind className="w-4 h-4" />, label: "Ar Condicionado" },
            { icon: <Wifi className="w-4 h-4" />, label: "Wi-Fi Premium" },
            { icon: <Tv className="w-4 h-4" />, label: "Smart TV 43\"" },
        ]
    }
];

export default function RoomsSection() {
    return (
        <section id="suites" className="py-24 md:py-32 bg-white">
            <div className="container mx-auto px-6 md:px-12">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-ocean-light tracking-[0.2em] uppercase text-xs font-sans mb-4 block">Acomodações</span>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ocean leading-tight mb-6">
                            O Seu <br className="md:hidden" />
                            <span className="italic font-light">Descanso Ideal</span>
                        </h2>
                        <p className="text-foreground/70 font-sans font-light leading-relaxed">
                            Lençóis de fios egípcios, travesseiros de plumas e um silêncio que só é quebrado pelo som das ondas.
                        </p>
                    </motion.div>
                </div>

                {/* Rooms Grid */}
                <div className="flex flex-col gap-16 md:gap-24">
                    {rooms.map((room, index) => {
                        const isEven = index % 2 !== 0;
                        return (
                            <div
                                key={room.id}
                                className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${isEven ? 'lg:flex-row-reverse' : ''}`}
                            >
                                {/* Image */}
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8 }}
                                    className="w-full lg:w-3/5"
                                >
                                    <div className="relative aspect-[4/3] w-full overflow-hidden shadow-xl rounded-sm group">
                                        <img
                                            src={room.image}
                                            alt={room.name}
                                            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />
                                    </div>
                                </motion.div>

                                {/* Details */}
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="w-full lg:w-2/5 flex flex-col justify-center"
                                >
                                    <h3 className="font-serif text-3xl md:text-4xl text-ocean mb-4">{room.name}</h3>
                                    <div className="w-12 h-px bg-sand-dark mb-6 mt-2" />

                                    <p className="text-foreground/70 font-sans font-light text-base leading-relaxed mb-8">
                                        {room.description}
                                    </p>

                                    <ul className="grid grid-cols-2 gap-y-4 gap-x-6 mb-10">
                                        {room.amenities.map((amenity, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-sm text-ocean-light/80">
                                                {amenity.icon}
                                                <span className="font-sans tracking-wide uppercase text-[10px]">{amenity.label}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <a
                                        href={BOOKING_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-ocean text-white uppercase tracking-widest text-xs hover:bg-ocean-light transition-colors duration-300 rounded-sm"
                                    >
                                        Consultar Disponibilidade
                                    </a>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
