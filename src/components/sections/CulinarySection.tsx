"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const culinaryImages = [
    { src: "/img-cln/img-culinaria.jpg", alt: "Café da manhã com vista", style: "col-span-2 row-span-2 aspect-square md:aspect-auto" },
    { src: "/img-cln/img-culinaria8.jpg", alt: "Pães Artesanais", style: "col-span-1 row-span-1 aspect-square" },
    { src: "/img-cln/img-culinaria9.jpg", alt: "Frutas Frescas", style: "col-span-1 row-span-1 aspect-square" },
    { src: "/img-cln/img-culinaria4.jpg", alt: "Experiência Gastronômica", style: "col-span-1 md:col-span-1 row-span-1 aspect-square" },
    { src: "/img-cln/img-culinaria1.jpg", alt: "Drinks Tropicais", style: "col-span-1 md:col-span-1 row-span-1 aspect-square" }
];

export default function CulinarySection() {
    return (
        <section id="culinaria" className="py-24 md:py-32 bg-ice">
            <div className="container mx-auto px-6 md:px-12">

                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Bento-style Image Grid */}
                    <div className="w-full lg:w-1/2 order-2 lg:order-1">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-min">
                            {culinaryImages.map((img, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className={`relative overflow-hidden shadow-md group ${img.style}`}
                                >
                                    <motion.div
                                        className="w-full h-full absolute inset-0 z-0"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                    >
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover object-center"
                                        />
                                    </motion.div>
                                    {/* Subtle vignette for premium feel */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className="absolute bottom-4 left-4 text-white font-sans text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        {img.alt}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="w-full lg:w-1/2 order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-sand-dark tracking-[0.2em] uppercase text-xs font-sans mb-4 block">Alta Gastronomia</span>
                            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ocean leading-tight mb-8">
                                Sabores da <br />
                                <span className="italic font-light">Nossa Terra</span>
                            </h2>

                            <div className="space-y-6 text-foreground/80 font-sans text-lg font-light leading-relaxed">
                                <p>
                                    O café da manhã no Aurora Grand Family Hotel é uma celebração diária. Desperte com o aroma de pães artesanais saindo do forno, frutas frescas cuidadosamente selecionadas e iguarias regionais preparadas com maestria.
                                </p>
                                <p>
                                    Nossos chefs utilizam ingredientes locais e sazonais para criar pratos que harmonizam perfeitamente com o clima praiano, garantindo que cada refeição seja uma memória sensorial única durante sua estada.
                                </p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.4 }}
                                className="mt-12 flex items-center gap-6"
                            >
                                <div className="w-16 h-px bg-ocean/20" />
                                <span className="font-serif text-sand-dark text-lg italic">Servido das 8h30 às 10h</span>
                            </motion.div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
