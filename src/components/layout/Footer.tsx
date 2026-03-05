import { MapPin, Instagram, Mail, Phone } from "lucide-react";

const BOOKING_URL = "https://www.booking.com/hotel/br/grand-aurora.pt-br.html?aid=2127532&label=metagha-link-MRBR-hotel-15547767_dev-desktop_los-1_bw-25_dow-Sunday_defdate-1_room-0_gstadt-2_rateid-public_aud-0_gacid-_mcid-10_ppa-0_clrid-0_ad-0_gstkid-0_checkin-20260329_ppt-&sid=537c405d99f98f9b648eb521b439e089&all_sr_blocks=1554776701_426617100_2_1_0&checkin=2026-03-29&checkout=2026-03-30&dest_id=15547767&dest_type=hotel&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=1554776701_426617100_2_1_0&hpos=1&matching_block_id=1554776701_426617100_2_1_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=1554776701_426617100_2_1_0__29495&srepoch=1772732186&srpvid=d38a7bc99dfd022b&type=total&ucfs=1&";

export default function Footer() {
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
                        <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-ocean transition-colors">
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
