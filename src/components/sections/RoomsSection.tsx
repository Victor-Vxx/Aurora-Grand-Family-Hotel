"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, Tv, Wind, Refrigerator, ShowerHead, ChevronLeft, ChevronRight } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/message/72YRQLT5HIUAE1";

const rooms = [
    {
        id: 1,
        name: "Suíte Grand Family 1º Andar",
        description: "Quarto amplo e sofisticado, com ambiente elegante e muita luz natural, pensado para oferecer conforto e uma experiência de descanso especial. O espaço conta com cama de casal e beliche, ar-condicionado, ventilador de teto, TV e frigobar, criando um ambiente aconchegante e refinado para relaxar e aproveitar momentos únicos durante a estadia.",
        images: [
            "/img-suitegrandandar1/img-suiteS.jpg",
            "/img-suitegrandandar1/img-suiteS1.jpg",
            "/img-suitegrandandar1/img-suiteS2.jpg",
            "/img-suitegrandandar1/img-suiteS3.jpg"
        ],
        amenities: [
            { icon: <Wind className="w-4 h-4" />, label: "Ar Condicionado" },
            { icon: <Wifi className="w-4 h-4" />, label: "Wi-Fi Premium" },
            { icon: <Tv className="w-4 h-4" />, label: "Smart TV" },
            { icon: <Refrigerator className="w-4 h-4" />, label: "FrigoBar" },
            { icon: <ShowerHead className="w-4 h-4" />, label: "Banheiro Privativo" },
        ]
    },
    {
        id: 2,
        name: "Suíte Double Family Térrea",
        description: "Quarto amplo, confortável e bem iluminado, com cama de casal e beliche, ideal para quem viaja em grupo ou em família. O ambiente conta com ar-condicionado, ventilador de teto, frigobar e um espaço aconchegante perfeito para descansar e aproveitar momentos juntos com praticidade e conforto.",
        images: [
            "/img-suitedoubleterrea/img-suiteT.jpg",
            "/img-suitedoubleterrea/img-suiteT1.jpg",
            "/img-suitedoubleterrea/img-suiteT2.jpg",
            "/img-suitedoubleterrea/img-suiteT3.jpg",
            "/img-suitedoubleterrea/img-suiteT4.jpg",
            "/img-suitedoubleterrea/img-suiteT5.jpg",
            "/img-suitedoubleterrea/img-suiteT6.jpg",
            "/img-suitedoubleterrea/img-suiteT7.jpg",
            "/img-suitedoubleterrea/img-suiteT8.jpg"
        ],
        amenities: [
            { icon: <Wind className="w-4 h-4" />, label: "Ar Condicionado" },
            { icon: <Tv className="w-4 h-4" />, label: "Smart TV" },
            { icon: <Wifi className="w-4 h-4" />, label: "Wi-Fi Premium" },
            { icon: <Refrigerator className="w-4 h-4" />, label: "FrigoBar" },
            { icon: <ShowerHead className="w-4 h-4" />, label: "Banheiro Privativo" },
        ]
    }
];

function RoomCarousel({ images, name }: { images: string[], name: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div className="relative aspect-[4/3] w-full overflow-hidden shadow-xl rounded-sm group">
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`${name} - ${currentIndex + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover object-center"
                />
            </AnimatePresence>

            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                    <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? 'bg-white w-4' : 'bg-white/40'}`}
                    />
                ))}
            </div>
        </div>
    );
}

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
                                    <RoomCarousel images={room.images} name={room.name} />
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
                                        href={WHATSAPP_URL}
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
