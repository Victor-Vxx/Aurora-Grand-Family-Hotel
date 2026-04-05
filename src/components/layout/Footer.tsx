"use client";

import { MapPin, Instagram, Phone } from "lucide-react";
import { useBookingStore } from "@/store/useBookingStore";

export default function Footer() {
    const { openBooking } = useBookingStore();

    return (
        <footer className="bg-ocean text-white pt-20 pb-10">
            <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/20 pb-16">

                {/* Brand */}
                <div>
                    <h2 className="font-serif text-3xl tracking-wider mb-6">AURORA</h2>
                    <p className="text-white/70 max-w-sm mb-8 text-sm leading-relaxed">
                        Uma experiência sofisticada e inesquecível à beira-mar. Descubra o verdadeiro significado de relaxamento e conforto.
                    </p>
                    <div className="flex space-x-4">
                        <a href="https://www.instagram.com/auroragrandfamilyhotel/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-ocean transition-colors">
                            <Instagram className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h3 className="font-sans uppercase text-sm tracking-widest text-white/50 mb-6">Navegação</h3>
                    <ul className="space-y-4">
                        {[
                            { name: "A Pousada", href: "#sobre" },
                            { name: "Estrutura", href: "#estrutura" },
                            { name: "Suítes", href: "#suites" },
                            { name: "Culinária", href: "#culinaria" }
                        ].map((link) => (
                            <li key={link.name}>
                                <a href={link.href} className="hover:text-sand-dark transition-colors text-sm">
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-sans uppercase text-sm tracking-widest text-white/50 mb-6">Contato</h3>
                    <ul className="space-y-4 text-sm text-white/80">
                        <li className="flex items-start space-x-3">
                            <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span>R. Manoel da Nóbrega, 105<br />Cidade Nova Peruíbe, Peruíbe - SP</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 flex-shrink-0" />
                            <span>(13) 98126-7251</span>
                        </li>
                        <li className="pt-4">
                            <button
                                onClick={() => openBooking()}
                                className="w-full bg-white/10 border border-white/20 text-white py-3 px-6 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-ocean transition-colors duration-300 rounded-sm"
                            >
                                Consultar Disponibilidade
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
                <p>&copy; {new Date().getFullYear()} Aurora Grand Family Hotel. Todos os direitos reservados.</p>
                <p className="mt-4 md:mt-0">Design & Desenvolvimento focado em conversão.</p>
            </div>
        </footer>
    );
}
