"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
    {
        id: 1,
        text: "Simplesmente deslumbrante. A atenção aos detalhes, do lençol à gastronomia, nos fez sentir em um verdadeiro paraíso. Foi a melhor experiência com a nossa família de longe.",
        author: "Mariana Costa",
        location: "São Paulo, SP"
    },
    {
        id: 2,
        text: "Um refúgio de paz. A piscina ao ar livre é um espetáculo à parte, e o café da manhã com produtos regionais era o ponto alto das nossas manhãs.",
        author: "Ricardo Alcantara",
        location: "Belo Horizonte, MG"
    },
    {
        id: 3,
        text: "Arquitetura linda e atendimento impecável. Acordar com o som do mar na Suíte Ocean View é uma memória que vou guardar para sempre.",
        author: "Elena Vasconcelos",
        location: "Lisboa, PT"
    }
];

export default function ReviewsSection() {
    return (
        <section className="py-24 md:py-32 bg-sand-beige relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 relative z-10">

                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-ocean-light tracking-[0.2em] uppercase text-xs font-sans mb-4 block">Avaliações</span>
                        <h2 className="font-serif text-4xl md:text-5xl text-ocean leading-tight mb-6">
                            O Que Nossos <br className="hidden md:block" />
                            <span className="italic font-light">Hóspedes Dizem</span>
                        </h2>
                    </motion.div>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="bg-white p-10 lg:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] rounded-sm flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-500"
                        >
                            <div className="flex gap-1 mb-8 text-sand-dark">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>

                            <p className="font-serif text-lg md:text-xl text-ocean mb-10 italic leading-relaxed">
                                "{review.text}"
                            </p>

                            <div className="mt-auto">
                                <div className="h-px w-12 bg-ocean/20 mx-auto mb-4" />
                                <h4 className="font-sans uppercase tracking-wider text-xs font-bold text-ocean mb-1">
                                    {review.author}
                                </h4>
                                <span className="font-sans text-[10px] uppercase tracking-widest text-foreground/50">
                                    {review.location}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
