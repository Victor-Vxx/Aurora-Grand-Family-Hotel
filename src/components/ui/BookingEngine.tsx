"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Users, Bed, User, CreditCard, CheckCircle2, ChevronDown, ChevronUp, AlertCircle, QrCode, ArrowRight } from "lucide-react";
import { useBookingStore } from "@/store/useBookingStore";

// Mock das Suítes
const suites = [
    {
        id: 1,
        name: "Suíte Grand Family 1º Andar",
        description: "Quarto amplo com luz natural, cama de casal e beliche.",
        price: "R$ 450",
        image: "/img-suitegrandandar1/img-suiteS.jpg",
        capacity: 4
    },
    {
        id: 2,
        name: "Suíte Double Family Térrea",
        description: "Quarto confortável no térreo, cama de casal e beliche.",
        price: "R$ 410",
        image: "/img-suitedoubleterrea/img-suiteT.jpg",
        capacity: 4
    }
];

export default function BookingEngine() {
    const { 
        isOpen, closeBooking, 
        checkIn, checkOut, adults, children, 
        setDates, setGuests, 
        selectedRooms, setRoomQuantity,
        personalDetails, setPersonalDetails,
        paymentMethod, setPaymentMethod,
        preselectedRoomId,
        resetBooking
    } = useBookingStore();

    const [activeStep, setActiveStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    // Pix State
    const [pixState, setPixState] = useState<'idle' | 'active' | 'expired'>('idle');
    const [pixTimeLeft, setPixTimeLeft] = useState(15);

    const checkOutRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (pixState === 'active' && pixTimeLeft > 0) {
            interval = setInterval(() => {
                setPixTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (pixState === 'active' && pixTimeLeft === 0) {
            setPixState('expired');
        }
        return () => clearInterval(interval);
    }, [pixState, pixTimeLeft]);

    // Bloqueia o scroll da página principal (body) quando o motor estiver aberto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.classList.add('overscroll-none');
        } else {
            document.body.style.overflow = '';
            document.body.classList.remove('overscroll-none');
        }
        
        return () => {
            document.body.style.overflow = '';
            document.body.classList.remove('overscroll-none');
        };
    }, [isOpen]);

    const handleGeneratePix = () => {
        setPixTimeLeft(15);
        setPixState('active');
    };

    const today = new Date().toISOString().split('T')[0];

    // Cálculos
    const checkInDate = checkIn ? new Date(checkIn) : null;
    const checkOutDate = checkOut ? new Date(checkOut) : null;
    const nights = (checkInDate && checkOutDate) ? Math.max(1, Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))) : 1;

    // Validações
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalDetails.email);
    const isValidPhone = personalDetails.phone.replace(/\D/g, '').length >= 10;
    const isStep3Valid = personalDetails.name.trim().length > 0 && isValidEmail && isValidPhone;

    const totalGuests = adults + children;
    const maxRooms = Math.ceil(totalGuests / 4);
    const selectedRoomsCount = Object.values(selectedRooms).reduce((a, b) => a + b, 0);
    const totalPrice = Object.entries(selectedRooms).reduce((acc, [id, qty]) => {
        const price = suites.find(s => s.id === Number(id))?.price.replace(/\D/g, '') || "0";
        return acc + (parseInt(price) * qty);
    }, 0) * nights;

    const handleNextStep = (step: number) => {
        if (step === 2 && preselectedRoomId && Object.keys(selectedRooms).length === 0) {
            setRoomQuantity(preselectedRoomId, 1);
        }
        setActiveStep(step);
    };

    const handleCheckout = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 1500);
    };

    const handleClose = () => {
        closeBooking();
        setTimeout(() => {
            if (isSuccess) {
                resetBooking();
                setIsSuccess(false);
                setActiveStep(1);
            }
        }, 400); // Wait for exit animation
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex justify-end"
            >
                {/* Backdrop with a beautiful lifestyle image blurred */}
                <div 
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-all" 
                    onClick={handleClose}
                >
                    <img 
                        src="/img-pcn/img-piscina4.jpg" 
                        alt="Background" 
                        className="w-full h-full object-cover mix-blend-overlay opacity-20"
                    />
                </div>

                {/* Drawer */}
                <motion.div 
                    initial={{ x: "100%" }} 
                    animate={{ x: 0 }} 
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="relative w-full max-w-xl h-full bg-[#FAFAFA] shadow-2xl flex flex-col overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 bg-white border-b border-sand-dark/30 z-10">
                        <div>
                            <span className="text-ocean-light tracking-[0.2em] uppercase text-[10px] font-bold block mb-1">Aurora</span>
                            <h2 className="font-serif text-2xl text-ocean">Sua Reserva</h2>
                        </div>
                        <button 
                            onClick={handleClose}
                            aria-label="Fechar motor de reservas"
                            className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-sand-dark/10 text-ocean hover:bg-sand-dark/30 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className={`flex-1 px-6 py-8 space-y-6 ${isSuccess ? 'overflow-hidden flex flex-col justify-center' : 'overflow-y-auto'}`}>
                        
                        {isSuccess ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }} 
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="w-24 h-24 flex-shrink-0 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6 shadow-xl shadow-green-500/10">
                                    <CheckCircle2 className="w-12 h-12" />
                                </div>
                                <h3 className="font-serif text-3xl text-ocean mb-4">Reserva Confirmada!</h3>
                                <p className="text-foreground/70 mb-8 max-w-sm">
                                    Sr(a). {personalDetails.name}, sua simulação de reserva foi finalizada com sucesso. Esperamos ver você em breve!
                                </p>
                                <img src="/img-fxd/img-faixada.jpg" alt="Fachada" className="w-full h-48 object-cover object-[100%_75%] rounded-sm shadow-md mb-8" />
                                <button 
                                    onClick={handleClose}
                                    className="w-full py-4 bg-ocean text-white uppercase tracking-widest text-xs font-bold hover:bg-ocean-light transition-colors rounded-sm"
                                >
                                    Voltar para o site
                                </button>
                            </motion.div>
                        ) : (
                            <>
                                {/* Step 1: Datas e Hóspedes */}
                                <AccordionItem 
                                    title="Datas e Hóspedes" 
                                    icon={<Calendar className="w-5 h-5" />}
                                    isActive={activeStep === 1}
                                    isCompleted={activeStep > 1}
                                    onClick={() => setActiveStep(1)}
                                >
                                    <div className="space-y-5 p-1">
                                        <div className="flex items-center w-full bg-white border border-sand-dark/40 hover:border-ocean/60 rounded-xl shadow-sm focus-within:border-ocean focus-within:ring-1 focus-within:ring-ocean transition-all mb-2 divide-x divide-sand-dark/20 relative">
                                            
                                            {/* CHECK-IN */}
                                            <div className="flex-1 relative flex items-center group hover:bg-ocean/5 rounded-l-xl transition-colors overflow-hidden cursor-pointer">
                                                <div className="flex items-center justify-center pl-4 pr-3 text-ocean/60 group-hover:text-ocean transition-colors flex-shrink-0">
                                                    <Calendar className="w-4 h-4" />
                                                </div>
                                                <div className="py-2.5 pr-4 pointer-events-none w-full flex flex-col justify-center min-h-[64px]">
                                                    <span className="text-[10px] uppercase font-bold text-ocean-light tracking-[0.1em] mb-1">Check-in</span>
                                                    {checkIn ? (
                                                        <span className="text-sm md:text-base tracking-wide text-ocean font-bold leading-none">{checkIn.split('-').reverse().join('/')}</span>
                                                    ) : (
                                                        <span className="text-sm md:text-base text-foreground/40 font-medium leading-none">Selecionar data</span>
                                                    )}
                                                </div>
                                                <input 
                                                    type="date" 
                                                    min={today}
                                                    value={checkIn || ""}
                                                    onChange={(e) => {
                                                        const newCheckIn = e.target.value;
                                                        const newCheckOut = (checkOut && newCheckIn > checkOut) ? "" : (checkOut || "");
                                                        setDates(newCheckIn, newCheckOut);
                                                        
                                                        // Automatically open the checkout date picker
                                                        setTimeout(() => {
                                                            if (checkOutRef.current) {
                                                                try {
                                                                    if ('showPicker' in HTMLInputElement.prototype) {
                                                                        checkOutRef.current.showPicker();
                                                                    } else {
                                                                        checkOutRef.current.focus();
                                                                    }
                                                                } catch (err) {
                                                                    checkOutRef.current.focus();
                                                                }
                                                            }
                                                        }, 50);
                                                    }}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-datetime-edit]:hidden" 
                                                />
                                            </div>

                                            {/* CHECK-OUT */}
                                            <div className="flex-1 relative flex items-center group hover:bg-ocean/5 rounded-r-xl transition-colors overflow-hidden cursor-pointer">
                                                <div className="py-2.5 px-5 pointer-events-none w-full flex flex-col justify-center min-h-[64px]">
                                                    <span className="text-[10px] uppercase font-bold text-ocean-light tracking-[0.1em] mb-1">Check-out</span>
                                                    {checkOut ? (
                                                        <span className="text-sm md:text-base tracking-wide text-ocean font-bold leading-none">{checkOut.split('-').reverse().join('/')}</span>
                                                    ) : (
                                                        <span className="text-sm md:text-base text-foreground/40 font-medium leading-none">Selecionar data</span>
                                                    )}
                                                </div>
                                                <input 
                                                    type="date" 
                                                    ref={checkOutRef}
                                                    min={checkIn || today}
                                                    value={checkOut || ""}
                                                    onChange={(e) => setDates(checkIn || "", e.target.value)}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-datetime-edit]:hidden" 
                                                />
                                            </div>

                                            {/* Seta no meio como enfeite visual */}
                                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-sand-dark/20 rounded-full flex items-center justify-center shadow-sm z-10 pointer-events-none">
                                                <ArrowRight className="w-3 h-3 text-ocean-light" />
                                            </div>
                                        </div>
                                        <div className="p-4 bg-ocean/5 rounded-sm border border-ocean/10">
                                            <p className="text-xs text-ocean mb-4 flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4" /> 
                                                Regra: Limite de 4 pessoas por quarto. Hóspedes Extras destravarão múltiplos quartos.
                                            </p>
                                            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-4">
                                                <div className="flex items-center justify-between bg-white px-4 py-3 border border-sand-dark/50 rounded-sm">
                                                    <span className="text-sm text-foreground/80 font-medium">Adultos</span>
                                                    <div className="flex items-center gap-2">
                                                        <button aria-label="Diminuir adultos" onClick={() => setGuests(Math.max(1, adults - 1), children)} className="w-10 h-10 flex-shrink-0 flex justify-center items-center rounded-full bg-sand-dark/30 hover:bg-sand-dark text-ocean">-</button>
                                                        <span className="w-4 text-center font-bold text-ocean">{adults}</span>
                                                        <button aria-label="Aumentar adultos" onClick={() => setGuests(adults + 1, children)} className="w-10 h-10 flex-shrink-0 flex justify-center items-center rounded-full bg-ocean text-white hover:bg-ocean-light">+</button>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between bg-white px-4 py-3 border border-sand-dark/50 rounded-sm">
                                                    <span className="text-sm text-foreground/80 font-medium">Crianças</span>
                                                    <div className="flex items-center gap-2">
                                                        <button aria-label="Diminuir crianças" onClick={() => setGuests(adults, Math.max(0, children - 1))} className="w-10 h-10 flex-shrink-0 flex justify-center items-center rounded-full bg-sand-dark/30 hover:bg-sand-dark text-ocean">-</button>
                                                        <span className="w-4 text-center font-bold text-ocean">{children}</span>
                                                        <button aria-label="Aumentar crianças" onClick={() => setGuests(adults, children + 1)} className="w-10 h-10 flex-shrink-0 flex justify-center items-center rounded-full bg-ocean text-white hover:bg-ocean-light">+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button 
                                            disabled={!checkIn || !checkOut}
                                            onClick={() => handleNextStep(2)}
                                            className="w-full py-4 bg-ocean text-white uppercase tracking-widest text-xs font-bold hover:bg-ocean-light transition-colors rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Buscar Suítes
                                        </button>
                                    </div>
                                </AccordionItem>

                                {/* Step 2: Seleção de Suíte */}
                                <AccordionItem 
                                    title="Suítes Disponíveis" 
                                    icon={<Bed className="w-5 h-5" />}
                                    isActive={activeStep === 2}
                                    isCompleted={activeStep > 2}
                                    onClick={() => checkIn && checkOut ? handleNextStep(2) : null}
                                >
                                    <div className="space-y-4">
                                        <p className="text-xs text-ocean-light flex items-center justify-between">
                                            <span>Para <strong>{totalGuests}</strong> hóspedes, você pode selecionar <strong>{maxRooms}</strong> {maxRooms === 1 ? 'suíte' : 'suítes'}.</span>
                                            <span className="font-bold bg-sand-dark/30 px-2 py-1 rounded text-ocean">{selectedRoomsCount}/{maxRooms}</span>
                                        </p>
                                        
                                        {suites.map((suite) => {
                                            const qty = selectedRooms[suite.id] || 0;
                                            const isSelected = qty > 0;
                                            const canAdd = selectedRoomsCount < maxRooms;

                                            return (
                                                <div 
                                                    key={suite.id}
                                                    onClick={() => maxRooms === 1 && setRoomQuantity(suite.id, isSelected ? 0 : 1)}
                                                    className={`relative overflow-hidden rounded-sm border-2 transition-all group ${
                                                        isSelected ? 'border-ocean shadow-md' : 'border-sand-dark/50 hover:border-ocean/50'
                                                    } ${maxRooms === 1 ? 'cursor-pointer' : ''}`}
                                                >
                                                    <div className="flex min-h-[9rem] items-stretch">
                                                        <div className="w-1/3 relative overflow-hidden bg-sand-dark/10">
                                                            <img src={suite.image} alt={suite.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                        </div>
                                                        <div className="w-2/3 p-4 flex flex-col justify-between bg-white">
                                                            <div>
                                                                <h4 className="font-serif text-ocean text-lg leading-tight mb-1">{suite.name}</h4>
                                                                <p className="text-[10px] text-foreground/60 leading-snug line-clamp-2">{suite.description}</p>
                                                            </div>
                                                            <div className="flex flex-wrap items-end justify-between gap-x-2 gap-y-3 mt-2">
                                                                <div className="flex flex-col">
                                                                    <span className="font-bold text-ocean">{suite.price} <span className="text-[10px] font-normal">/ noite</span></span>
                                                                    {checkIn && checkOut && qty > 0 && (
                                                                        <span className="flex items-center gap-1 text-[10px] text-ocean-light font-medium bg-[#FAFAFA] border border-sand-dark/60 shadow-[0_2px_4px_rgba(0,0,0,0.02)] px-2 py-1 rounded-md mt-1.5 w-fit">
                                                                            <span className="text-ocean/90">Total:</span>
                                                                            <strong className="text-ocean font-bold text-[11px]">R$ {(parseInt(suite.price.replace(/\D/g, '')) * nights * qty).toLocaleString('pt-BR')}</strong>
                                                                            <span className="text-ocean/60 ml-0.5">({nights} {nights === 1 ? 'noite' : 'noites'}, {qty} {qty === 1 ? 'qto' : 'qtos'})</span>
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                
                                                                {maxRooms > 1 ? (
                                                                    <div className="flex items-center gap-1 pb-1">
                                                                        <button 
                                                                            aria-label="Diminuir quarto"
                                                                            onClick={(e) => { e.stopPropagation(); setRoomQuantity(suite.id, qty - 1); }}
                                                                            className={`w-10 h-10 flex-shrink-0 flex justify-center items-center rounded-full border ${qty === 0 ? 'opacity-50 cursor-not-allowed border-sand-dark/50 text-foreground/50' : 'border-ocean text-ocean hover:bg-ocean/10'}`}
                                                                            disabled={qty === 0}
                                                                        >-</button>
                                                                        <span className="w-4 mx-1 text-center font-bold text-ocean text-sm">{qty}</span>
                                                                        <button 
                                                                            aria-label="Aumentar quarto"
                                                                            onClick={(e) => { e.stopPropagation(); setRoomQuantity(suite.id, qty + 1); }}
                                                                            className={`w-10 h-10 flex-shrink-0 flex justify-center items-center rounded-full border ${!canAdd ? 'opacity-50 cursor-not-allowed border-sand-dark/50 text-foreground/50' : 'border-ocean bg-ocean text-white hover:bg-ocean-light'}`}
                                                                            disabled={!canAdd}
                                                                        >+</button>
                                                                    </div>
                                                                ) : (
                                                                    <div className={`w-5 h-5 mb-1 rounded-full border flex items-center justify-center cursor-pointer ${isSelected ? 'border-ocean bg-ocean text-white' : 'border-sand-dark/80 group-hover:border-ocean/50'}`}>
                                                                        {isSelected && <CheckCircle2 className="w-3 h-3" />}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                        <button 
                                            disabled={selectedRoomsCount !== maxRooms}
                                            onClick={() => handleNextStep(3)}
                                            className="w-full mt-4 py-4 bg-ocean text-white uppercase tracking-widest text-xs font-bold hover:bg-ocean-light transition-colors rounded-sm disabled:bg-sand-dark/30 disabled:text-foreground/50 disabled:cursor-not-allowed"
                                        >
                                            {selectedRoomsCount < maxRooms ? `Selecione mais ${maxRooms - selectedRoomsCount} ${maxRooms - selectedRoomsCount === 1 ? 'quarto' : 'quartos'}` : 'Prosseguir'}
                                        </button>
                                    </div>
                                </AccordionItem>

                                {/* Step 3: Dados Pessoais */}
                                <AccordionItem 
                                    title="Seus Dados" 
                                    icon={<User className="w-5 h-5" />}
                                    isActive={activeStep === 3}
                                    isCompleted={activeStep > 3}
                                    onClick={() => selectedRoomsCount === maxRooms ? handleNextStep(3) : null}
                                >
                                    <div className="space-y-4">
                                        <div>
                                            <input 
                                                type="text" 
                                                placeholder="Nome Completo"
                                                value={personalDetails.name}
                                                onChange={(e) => setPersonalDetails({ name: e.target.value })}
                                                className="w-full bg-white border border-sand-dark/50 px-4 py-3 text-base focus:border-ocean focus:ring-1 focus:ring-ocean outline-none rounded-sm transition-all" 
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <input 
                                                type="email" 
                                                placeholder="E-mail"
                                                value={personalDetails.email}
                                                onChange={(e) => setPersonalDetails({ email: e.target.value })}
                                                className="w-full bg-white border border-sand-dark/50 px-4 py-3 text-base focus:border-ocean focus:ring-1 focus:ring-ocean outline-none rounded-sm transition-all" 
                                            />
                                            <input 
                                                type="tel" 
                                                placeholder="Telefone / WhatsApp"
                                                value={personalDetails.phone}
                                                onChange={(e) => setPersonalDetails({ phone: e.target.value })}
                                                className="w-full bg-white border border-sand-dark/50 px-4 py-3 text-base focus:border-ocean focus:ring-1 focus:ring-ocean outline-none rounded-sm transition-all" 
                                            />
                                        </div>
                                        <button 
                                            disabled={!isStep3Valid}
                                            onClick={() => handleNextStep(4)}
                                            className="w-full mt-2 py-4 bg-ocean text-white uppercase tracking-widest text-xs font-bold hover:bg-ocean-light transition-colors rounded-sm disabled:bg-sand-dark/30 disabled:text-foreground/50 disabled:cursor-not-allowed"
                                        >
                                            {isStep3Valid ? 'Revisar Reserva' : 'Preencha os dados corretamente'}
                                        </button>
                                    </div>
                                </AccordionItem>

                                {/* Step 4: Resumo da Reserva */}
                                <AccordionItem 
                                    title="Resumo da Reserva" 
                                    icon={<CheckCircle2 className="w-5 h-5" />}
                                    isActive={activeStep === 4}
                                    isCompleted={activeStep > 4}
                                    onClick={() => isStep3Valid ? handleNextStep(4) : null}
                                >
                                    <div className="bg-white border border-sand-dark/50 rounded-sm p-6 shadow-sm">
                                        <h4 className="font-serif text-xl text-ocean mb-4 border-b border-sand-dark/30 pb-4">Detalhes da Estadia</h4>
                                        
                                        <div className="space-y-4 text-sm mb-6">
                                            <div className="flex justify-between items-center gap-4">
                                                <span className="text-foreground/70">Check-in / Check-out</span>
                                                <span className="font-bold text-ocean text-right">
                                                    {checkIn?.split('-').reverse().join('/')} a {checkOut?.split('-').reverse().join('/')}
                                                    {checkIn && checkOut && <span className="block text-[10px] text-ocean-light font-normal leading-tight mt-0.5">({nights} {nights === 1 ? 'noite' : 'noites'})</span>}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-foreground/70">Hóspedes</span>
                                                <span className="font-bold text-ocean flex gap-2">
                                                    <Users className="w-4 h-4" /> {totalGuests} ({adults} Ad., {children} Cr.)
                                                </span>
                                            </div>
                                            <div className="flex justify-between border-t border-sand-dark/20 pt-4 mt-2">
                                                <span className="text-foreground/70">Suítes Selecionadas ({selectedRoomsCount})</span>
                                                <div className="text-right">
                                                    {Object.entries(selectedRooms).map(([id, qty]) => {
                                                        const s = suites.find(suite => suite.id === Number(id));
                                                        return <div key={id} className="font-bold text-ocean">{qty}x {s?.name}</div>
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-sand-dark/10 p-4 rounded-sm flex justify-between items-center mb-6">
                                            <span className="font-serif text-lg text-ocean">Total Simulado</span>
                                            <span className="font-serif text-2xl text-ocean">
                                                {/* Preço Falso Misto para impressionar */}
                                                R$ {totalPrice.toLocaleString('pt-BR')}
                                                <span className="text-xs font-sans text-ocean-light line-through ml-2">R$ {(totalPrice * 1.15).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</span> {/* Âncora visual */}
                                            </span>
                                        </div>

                                        <button 
                                            onClick={() => handleNextStep(5)}
                                            className="w-full mt-2 py-4 bg-ocean text-white uppercase tracking-widest text-xs font-bold hover:bg-ocean-light transition-colors rounded-sm"
                                        >
                                            Ir para Pagamento
                                        </button>
                                    </div>
                                </AccordionItem>

                                {/* Step 5: Pagamento e Finalização */}
                                <AccordionItem 
                                    title="Pagamento" 
                                    icon={<CreditCard className="w-5 h-5" />}
                                    isActive={activeStep === 5}
                                    isCompleted={false}
                                    onClick={() => activeStep >= 4 ? handleNextStep(5) : null}
                                >
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <button 
                                                onClick={() => setPaymentMethod('credit_card')}
                                                className={`flex flex-col items-center justify-center p-6 border-2 rounded-sm transition-all ${paymentMethod === 'credit_card' ? 'border-ocean bg-ocean/5 text-ocean' : 'border-sand-dark/50 text-foreground/60 hover:border-ocean/30'}`}
                                            >
                                                <CreditCard className="w-8 h-8 mb-3" />
                                                <span className="text-sm font-bold">Cartão de Crédito</span>
                                            </button>
                                            <button 
                                                onClick={() => setPaymentMethod('pix')}
                                                className={`flex flex-col items-center justify-center p-6 border-2 rounded-sm transition-all ${paymentMethod === 'pix' ? 'border-ocean bg-ocean/5 text-ocean' : 'border-sand-dark/50 text-foreground/60 hover:border-ocean/30'}`}
                                            >
                                                <QrCode className="w-8 h-8 mb-3" />
                                                <span className="text-sm font-bold">Pix</span>
                                            </button>
                                        </div>

                                        <AnimatePresence mode="wait">
                                            {paymentMethod === 'credit_card' && (
                                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-3 overflow-hidden mt-4">
                                                    <input type="text" placeholder="Número do Cartão" className="w-full bg-white border border-sand-dark/50 px-4 py-3 text-base focus:border-ocean focus:ring-1 focus:ring-ocean outline-none rounded-sm transition-all" />
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <input type="text" placeholder="Validade (MM/AA)" className="w-full bg-white border border-sand-dark/50 px-4 py-3 text-base focus:border-ocean focus:ring-1 focus:ring-ocean outline-none rounded-sm transition-all" />
                                                        <input type="text" placeholder="CVV" className="w-full bg-white border border-sand-dark/50 px-4 py-3 text-base focus:border-ocean focus:ring-1 focus:ring-ocean outline-none rounded-sm transition-all" />
                                                    </div>
                                                    <input type="text" placeholder="Nome como no Cartão" className="w-full bg-white border border-sand-dark/50 px-4 py-3 text-base focus:border-ocean focus:ring-1 focus:ring-ocean outline-none rounded-sm transition-all" />
                                                </motion.div>
                                            )}
                                            {paymentMethod === 'pix' && (
                                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden pt-2">
                                                    <div className="bg-sand-dark/10 p-6 rounded-sm flex flex-col items-center justify-center border border-sand-dark/30 min-h-[300px]">
                                                        {pixState === 'idle' && (
                                                            <div className="text-center">
                                                                <QrCode className="w-12 h-12 text-ocean/40 mx-auto mb-4" />
                                                                <p className="text-sm font-bold text-ocean mb-2">QR Code Pix</p>
                                                                <p className="text-xs text-foreground/70 mb-6 max-w-[250px] mx-auto">
                                                                    Gere o código para realizar o pagamento. Você terá 15 segundos antes que ele expire.
                                                                </p>
                                                                <button
                                                                    onClick={handleGeneratePix}
                                                                    className="px-6 py-3 bg-ocean text-white uppercase tracking-widest text-[10px] font-bold hover:bg-ocean-light transition-colors rounded-sm"
                                                                >
                                                                    Gerar QR Code
                                                                </button>
                                                            </div>
                                                        )}

                                                        {pixState === 'expired' && (
                                                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                                                                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4 border border-red-500/10 shadow-sm shadow-red-500/10">
                                                                    <AlertCircle className="w-8 h-8" />
                                                                </div>
                                                                <p className="text-sm font-bold text-ocean mb-2">QR Code Expirado</p>
                                                                <p className="text-xs text-foreground/70 mb-6 max-w-[240px] mx-auto">
                                                                    Por motivos de segurança, este código Pix expirou.
                                                                </p>
                                                                <button
                                                                    onClick={handleGeneratePix}
                                                                    className="px-6 py-3 bg-ocean text-white uppercase tracking-widest text-[10px] font-bold hover:bg-ocean-light transition-colors rounded-sm shadow-md"
                                                                >
                                                                    Gerar Novo Código
                                                                </button>
                                                            </motion.div>
                                                        )}

                                                        {pixState === 'active' && (
                                                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center w-full">
                                                                <div className="w-40 h-40 bg-white p-2 rounded-sm shadow-sm mb-4 flex items-center justify-center">
                                                                    {/* QR Code Falso CSS Pattern */}
                                                                    <div className="w-full h-full border-[6px] border-ocean relative transition-all duration-1000">
                                                                        <div className="absolute inset-1 border-[16px] border-dotted border-ocean/80 opacity-60"></div>
                                                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-ocean rounded-sm"></div>
                                                                        <div className="absolute top-2 left-2 w-4 h-4 bg-ocean"></div>
                                                                        <div className="absolute top-2 right-2 w-4 h-4 bg-ocean"></div>
                                                                        <div className="absolute bottom-2 left-2 w-4 h-4 bg-ocean"></div>
                                                                        <div className="absolute bottom-3 right-3 w-6 h-6 border-4 border-dashed border-ocean"></div>
                                                                    </div>
                                                                </div>
                                                                <p className="text-sm font-bold text-ocean mb-2">Aponte a câmera do seu celular</p>
                                                                <p className="text-xs text-foreground/70 text-center mb-5 max-w-sm">
                                                                    Abra o app do seu banco, escolha pagar via Pix com QR Code e escaneie a imagem acima.
                                                                </p>
                                                                <p className={`text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5 mb-5 transition-colors duration-300 ${pixTimeLeft <= 5 ? 'text-red-500 scale-105' : 'text-ocean-light'}`}>
                                                                    <AlertCircle className="w-3.5 h-3.5" /> Expira em 00:{pixTimeLeft.toString().padStart(2, '0')}
                                                                </p>
                                                                <div className="w-full">
                                                                    <p className="text-[10px] uppercase font-bold text-ocean-light mb-1">Ou use o Pix Copia e Cola</p>
                                                                    <div className="flex items-center gap-2">
                                                                        <input 
                                                                            type="text" 
                                                                            readOnly 
                                                                            value={`00020126580014br.gov.bcb.pix0136aurora@reservas.simulacao.com.br5204000053039865405${totalPrice}.005802BR5912AURORA HOTEL6009SAO PAULO62070503***6304ED3B-${pixTimeLeft}`} 
                                                                            className="w-full bg-white border border-sand-dark/50 px-3 py-2 text-xs text-foreground/50 rounded-sm outline-none truncate transition-colors duration-500"
                                                                        />
                                                                        <button 
                                                                            type="button"
                                                                            className="px-4 py-2 bg-ocean text-white text-[10px] font-bold uppercase rounded-sm hover:bg-ocean-light transition-colors whitespace-nowrap"
                                                                        >
                                                                            Copiar
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <button 
                                            onClick={handleCheckout}
                                            disabled={isSubmitting || !paymentMethod || (paymentMethod === 'pix' && pixState !== 'active')}
                                            className="relative flex items-center justify-center w-full mt-2 py-4 bg-ocean text-white uppercase tracking-widest text-xs font-bold hover:bg-ocean-light transition-all rounded-sm disabled:opacity-80 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                "Finalizar Simulação"
                                            )}
                                        </button>
                                        <p className="text-center text-[10px] text-foreground/50 mt-4 uppercase tracking-wider">Módulo de Teste / Não haverá cobranças</p>
                                    </div>
                                </AccordionItem>
                            </>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

// Subcomponente de Acordeão com Framer Motion
function AccordionItem({ title, icon, isActive, isCompleted, onClick, children }: { 
    title: string; icon: React.ReactNode; isActive: boolean; isCompleted: boolean; onClick: () => void; children: React.ReactNode 
}) {
    return (
        <div className={`border-b border-sand-dark/40 overflow-hidden transition-colors ${isActive ? 'bg-white shadow-sm' : ''}`}>
            <button 
                onClick={onClick}
                className="w-full min-h-[64px] flex items-center justify-between p-4 outline-none group hover:bg-white transition-colors"
                aria-expanded={isActive}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full transition-colors ${isActive ? 'bg-ocean text-white' : isCompleted ? 'bg-green-100 text-green-600' : 'bg-sand-dark/20 text-ocean-light group-hover:bg-sand-dark/40'}`}>
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : icon}
                    </div>
                    <span className={`font-serif text-lg ${isActive ? 'text-ocean' : isCompleted ? 'text-ocean' : 'text-ocean-light'}`}>
                        {title}
                    </span>
                </div>
                {isActive ? <ChevronUp className="w-5 h-5 text-ocean" /> : <ChevronDown className="w-5 h-5 text-sand-dark" />}
            </button>
            <AnimatePresence initial={false}>
                {isActive && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="p-4 pt-0">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
