import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import dynamic from "next/dynamic";

const AboutSection = dynamic(() => import("@/components/sections/AboutSection"));
const FacilitiesSection = dynamic(() => import("@/components/sections/FacilitiesSection"));
const PoolSection = dynamic(() => import("@/components/sections/PoolSection"));
const CulinarySection = dynamic(() => import("@/components/sections/CulinarySection"));
const RoomsSection = dynamic(() => import("@/components/sections/RoomsSection"));
const ReviewsSection = dynamic(() => import("@/components/sections/ReviewsSection"));
const LocationSection = dynamic(() => import("@/components/sections/LocationSection"));
const CtaSection = dynamic(() => import("@/components/sections/CtaSection"));
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hotel em Peruíbe | Aurora Grand Family Hotel | Sofisticação e Conforto",
  description: "Descubra o Aurora Grand Family Hotel em Peruíbe. Uma experiência única de luxo e conforto para sua família.",
  openGraph: {
    title: "Aurora Grand Family Hotel",
    description: "Sofisticação e conforto em Peruíbe.",
    images: ["/img-pcp/img-principal.jpg"],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <HeroSection />
      <AboutSection />
      <FacilitiesSection />
      <PoolSection />
      <CulinarySection />
      <RoomsSection />
      <ReviewsSection />
      <LocationSection />
      <CtaSection />

      <Footer />
    </main>
  );
}
