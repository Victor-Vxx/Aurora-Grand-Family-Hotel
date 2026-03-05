"use client";

import { motion } from "framer-motion";

const facilities = [
    { id: 1, src: "/img-ext/img-exterior1.jpg", alt: "Restaurante", span: "md:col-span-2 md:row-span-2" },
    { id: 2, src: "/img-ext/img-exterior2.jpg", alt: "Área de Lazer", span: "col-span-1 row-span-1" },
    { id: 3, src: "/img-ext/img-exterior3.jpg", alt: "Bar", span: "col-span-1 row-span-1" },
    { id: 4, src: "/img-ext/img-exterior4.jpg", alt: "Lounge Exterior", span: "col-span-1 row-span-1" },
    { id: 5, src: "/img-ext/img-exterior5.jpg", alt: "Jardim", span: "col-span-1 row-span-1" },
    { id: 6, src: "/img-ext/img-exterior6.jpg", alt: "Espaço Kids", span: "md:col-span-2 col-span-1 row-span-1" },
];

export default function FacilitiesSection() {
    return (
        <section id="estrutura" className="py-24 md:py-32 bg-white">
            <div className="container mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl"
                    >
                        <span className="text-sand-dark tracking-[0.2em] uppercase text-xs font-sans mb-4 block">Nossa Estrutura</span>
                        <h2 className="font-serif text-4xl md:text-5xl text-ocean leading-tight">
                            Pensado para o <br />
                            <span className="italic font-light">Seu Bem-Estar</span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-foreground/70 font-sans font-light max-w-sm text-sm leading-relaxed"
                    >
                        Ambientes integrados e sofisticados onde cada espaço foi desenhado para maximizar o conforto, promovendo encontros e relaxamento à beira-mar.
                    </motion.p>
                </div>

                {/* Elegant Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-none md:grid-rows-3 gap-4 md:gap-6 lg:gap-8 h-auto md:h-[800px]">
                    {facilities.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: index * 0.1 }}
                            className={`relative overflow-hidden group ${item.span} h-64 md:h-auto`}
                        >
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-ocean/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                src={item.src}
                                alt={item.alt}
                                className="w-full h-full object-cover"
                            />

                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20 bg-gradient-to-t from-black/60 to-transparent">
                                <span className="text-white font-sans uppercase tracking-widest text-xs">
                                    {item.alt}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
