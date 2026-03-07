"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
    return (
        <section id="sobre" className="py-24 md:py-32 bg-sand overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Text Content */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-ocean-light tracking-[0.2em] uppercase text-xs font-sans mb-4 block">A Experiência</span>
                            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ocean leading-tight mb-8">
                                O refúgio perfeito <br className="hidden md:block" />
                                <span className="italic font-light">à 350m da Praia</span>
                            </h2>

                            <div className="space-y-6 text-foreground/80 font-sans text-lg font-light leading-relaxed">
                                <p>
                                    No Aurora Grand Family Hotel, o luxo se traduz na simplicidade dos momentos em família. Localizada de frente para as águas cristalinas, nossa estrutura foi idealizada para harmonizar o conforto contemporâneo com a essência acolhedora da praia.
                                </p>
                                <p>
                                    Cada detalhe da nossa arquitetura conversa com a natureza ao redor. Dos materiais naturais empregados na fachada às brisas oceânicas que percorrem nossos corredores, convidamos você a desacelerar e viver o presente com quem realmente importa.
                                </p>
                            </div>

                            <div className="mt-12">
                                <div className="h-px w-24 bg-ocean/20 mb-6"></div>
                                <p className="font-serif text-xl text-ocean italic">
                                    "Onde memórias inesquecíveis ganham o cenário que merecem."
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Image Collage */}
                    <div className="w-full lg:w-1/2 relative min-h-[500px] lg:min-h-[700px]">
                        {/* Image 1: Main Large */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="absolute top-0 right-0 w-3/4 h-[60%] lg:h-[65%] z-10"
                        >
                            <div className="w-full h-full relative group overflow-hidden">
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.6 }}
                                    src="/img-fxd/img-faixada.jpg"
                                    alt="Fachada do Aurora Grand Family Hotel"
                                    className="w-full h-full object-cover object-center shadow-2xl"
                                />
                            </div>
                        </motion.div>

                        {/* Image 2: Bottom Left (Medium) */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="absolute bottom-6 left-0 w-[55%] h-[45%] lg:h-[50%] z-20"
                        >
                            <div className="w-full h-full relative overflow-hidden ring-4 ring-sand/30 shadow-xl">
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.6 }}
                                    src="/img-fxd/img-faixada2.jpg"
                                    alt="Detalhes da Pousada"
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        </motion.div>

                        {/* Image 3: Small Accent (Optional/Decorative) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="absolute -bottom-4 right-12 w-1/3 h-1/3 z-30 hidden md:block shadow-lg"
                        >
                            <div className="w-full h-full relative overflow-hidden border-8 border-sand">
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.6 }}
                                    src="/img-fxd/img-faixada3.jpg"
                                    alt="Ambiente Externo"
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
