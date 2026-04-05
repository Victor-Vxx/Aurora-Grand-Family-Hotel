import { create } from "zustand";

interface PersonalDetails {
    name: string;
    email: string;
    phone: string;
}

export type PaymentMethod = 'credit_card' | 'pix' | null;

interface BookingState {
    isOpen: boolean;
    checkIn: string | null;
    checkOut: string | null;
    adults: number;
    children: number;
    selectedRooms: Record<number, number>; // roomId -> quantity
    preselectedRoomId: number | null;
    personalDetails: PersonalDetails;
    paymentMethod: PaymentMethod;

    openBooking: (initialRoomId?: number) => void;
    closeBooking: () => void;
    setDates: (checkIn: string, checkOut: string) => void;
    setGuests: (adults: number, children: number) => void;
    setRoomQuantity: (roomId: number, qty: number) => void;
    setPersonalDetails: (details: Partial<PersonalDetails>) => void;
    setPaymentMethod: (method: PaymentMethod) => void;
    resetBooking: () => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
    isOpen: false,
    checkIn: null,
    checkOut: null,
    adults: 2,
    children: 0,
    selectedRooms: {},
    preselectedRoomId: null,
    personalDetails: {
        name: "",
        email: "",
        phone: ""
    },
    paymentMethod: null,

    openBooking: (initialRoomId) => {
        set({ isOpen: true, selectedRooms: {}, preselectedRoomId: initialRoomId || null });
    },
    
    closeBooking: () => set({ isOpen: false }),
    
    setDates: (checkIn, checkOut) => set({ checkIn, checkOut }),
    
    setGuests: (adults, children) => {
        set({ adults, children });
        
        const maxRooms = Math.ceil((adults + children) / 4);
        const { selectedRooms } = get();
        const totalSelected = Object.values(selectedRooms).reduce((a, b) => a + b, 0);
        
        if (totalSelected > maxRooms) {
            set({ selectedRooms: {} });
        }
    },

    setRoomQuantity: (roomId, qty) => {
        const { adults, children, selectedRooms } = get();
        const maxRooms = Math.ceil((adults + children) / 4);
        
        let newQty = Math.max(0, qty);
        
        if (maxRooms === 1 && newQty > 0) {
            set({ selectedRooms: { [roomId]: 1 } });
            return;
        }
        
        const otherSelectedQty = Object.entries(selectedRooms)
                                    .filter(([id]) => Number(id) !== roomId)
                                    .reduce((acc, [_, count]) => acc + count, 0);
                                    
        if (otherSelectedQty + newQty > maxRooms) {
            newQty = maxRooms - otherSelectedQty;
        }

        const newSelectedRooms = { ...selectedRooms };
        if (newQty === 0) {
            delete newSelectedRooms[roomId];
        } else {
            newSelectedRooms[roomId] = newQty;
        }
        
        set({ selectedRooms: newSelectedRooms });
    },

    setPersonalDetails: (details) => set((state) => ({ 
        personalDetails: { ...state.personalDetails, ...details } 
    })),

    setPaymentMethod: (method) => set({ paymentMethod: method }),

    resetBooking: () => set({
        checkIn: null,
        checkOut: null,
        adults: 2,
        children: 0,
        selectedRooms: {},
        preselectedRoomId: null,
        personalDetails: { name: "", email: "", phone: "" },
        paymentMethod: null
    })
}));
