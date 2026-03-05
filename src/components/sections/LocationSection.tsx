"use client";

import { motion } from "framer-motion";

export default function LocationSection() {
    return (
        <section id="localizacao" className="py-24 md:py-32 bg-white border-t border-sand">
            <div className="container mx-auto px-6 md:px-12">

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

                    {/* Text Content */}
                    <div className="w-full lg:w-2/5">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-ocean-light tracking-[0.2em] uppercase text-xs font-sans mb-4 block">Como Chegar</span>
                            <h2 className="font-serif text-4xl md:text-5xl text-ocean leading-tight mb-8">
                                Um pedaço <br />
                                <span className="italic font-light">do Paraíso</span>
                            </h2>

                            <div className="space-y-6 text-foreground/80 font-sans text-base lg:text-lg font-light leading-relaxed">
                                <p>
                                    Localizado com vista privilegiada para o mar, o Aurora Grand Family Hotel oferece o equilíbrio perfeito: pé na areia e fácil acesso às principais atrações da região.
                                </p>
                                <div className="pt-6 border-t border-sand-dark inline-block w-full">
                                    <p className="font-sans font-medium text-ocean mb-2 uppercase tracking-widest text-xs">Endereço:</p>
                                    <p className="mb-6">R. Manoel da Nóbrega, 105<br />Cidade Nova Peruíbe, Peruíbe - SP</p>

                                    <p className="font-sans font-medium text-ocean mb-2 uppercase tracking-widest text-xs">Distâncias:</p>
                                    <ul className="space-y-2 opacity-80">
                                        <li>• 5 min da Praia (A pé)</li>
                                        <li>• Menos de 10 min do Centro Comercial</li>
                                        <li>• Menos de 5 min até o Supermercado mais próximo</li>
                                        <li>• Menos de 10 min até o Pão de Maçã mais próximo (A pé)</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Map Embed */}
                    <div className="w-full lg:w-3/5 h-[400px] md:h-[600px] relative">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="w-full h-full relative p-2 md:p-4 bg-white shadow-2xl rounded-sm"
                        >
                            <div className="w-full h-full bg-sand overflow-hidden relative border border-sand-dark">
                                {/* Google Maps iframe */}
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3641.8767962453664!2d-46.99468088498458!3d-24.316887584313214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ceb700b0ff1ebd%3A0xe10433d3d4b4a3a3!2sR.%20Manoel%20da%20N%C3%B3brega%2C%20105%20-%20Cidade%20Nova%20Peru%C3%ADbe%2C%20Peru%C3%ADbe%20-%20SP%2C%2011772-010!5e0!3m2!1spt-BR!2sbr!4v1709663737380!5m2!1spt-BR!2sbr"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: "grayscale(30%) contrast(1.1) brightness(1) sepia(20%) hue-rotate(-10deg)" }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Localização do Hotel"
                                    className="w-full h-full object-cover"
                                ></iframe>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
