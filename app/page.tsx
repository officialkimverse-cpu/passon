import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhatIsPassOnSection from "@/components/WhatIsPassOnSection";
import TwoWaysSection from "@/components/TwoWaysSection";
import HowItWorks from "@/components/HowItWorks";
import BuyerActionsSection from "@/components/BuyerActionsSection";
import ValueProps from "@/components/ValueProps";
import FeaturedListings from "@/components/FeaturedListings";
import ProductSimulationSection from "@/components/ProductSimulationSection";
import TrustSection from "@/components/TrustSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <WhatIsPassOnSection />
        <TwoWaysSection />
        <HowItWorks />
        <BuyerActionsSection />
        <ValueProps />
        <FeaturedListings />
        <ProductSimulationSection />
        <TrustSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
