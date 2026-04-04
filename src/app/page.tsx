import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import FacilitiesSection from "@/components/sections/FacilitiesSection";
import PoolSection from "@/components/sections/PoolSection";
import CulinarySection from "@/components/sections/CulinarySection";
import RoomsSection from "@/components/sections/RoomsSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import LocationSection from "@/components/sections/LocationSection";
import CtaSection from "@/components/sections/CtaSection";
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
