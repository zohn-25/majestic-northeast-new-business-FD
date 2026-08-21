"use client";

import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedRentals } from "@/components/home/FeaturedRentals";
import { FeaturedTours } from "@/components/home/FeaturedTours";
import { PopularDestinations } from "@/components/home/PopularDestinations";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { GallerySection } from "@/components/home/GallerySection";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { WhatsAppFloating } from "@/components/WhatsAppFloating";
import { EnquiryModal } from "@/components/EnquiryModal";
import { SharedTour } from "@/lib/types";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"car" | "bike">("car");
  const [preselectedTour, setPreselectedTour] = useState<SharedTour | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleOpenCarModal = (tour?: SharedTour) => {
    setModalMode("car");
    setPreselectedTour(tour || null);
    setModalOpen(true);
  };

  const handleOpenBikeModal = (tour?: SharedTour) => {
    setModalMode("bike");
    setPreselectedTour(tour || null);
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#0B0C0E] text-white flex flex-col justify-between">
      {/* Header */}
      <Header onOpenEnquire={() => handleOpenCarModal()} />

      {/* Homepage Sections */}
      <div className="flex-1 space-y-0">
        <HeroSection
          onOpenEnquire={() => handleOpenCarModal()}
        />
        {/* Option 1: 4x4 Car Group Expeditions */}
        <FeaturedRentals onOpenEnquire={handleOpenCarModal} />
        {/* Option 2: Motorcycle Bike Expeditions */}
        <FeaturedTours onOpenEnquire={handleOpenBikeModal} />
        <PopularDestinations />
        <WhyChooseUs />
        <HowItWorks />
        <CustomerReviews />
        <GallerySection />
        <FaqSection />
        <CtaBanner
          onOpenEnquire={() => handleOpenCarModal()}
        />
      </div>

      {/* Footer */}
      <Footer />

      {/* Sticky Mobile CTA Bar */}
      <StickyMobileBar
        onOpenEnquire={() => handleOpenCarModal()}
      />

      {/* Floating Desktop WhatsApp Button */}
      <WhatsAppFloating />

      {/* Lead Capture Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialMode={modalMode}
        preselectedTour={preselectedTour}
      />
    </main>
  );
}
