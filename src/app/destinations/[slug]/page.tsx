"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useData } from "@/context/DataContext";
import { Destination, SharedTour, Vehicle } from "@/lib/types";
import { buildWhatsAppUrl } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { WhatsAppFloating } from "@/components/WhatsAppFloating";
import { TourCard } from "@/components/TourCard";
import { VehicleCard } from "@/components/VehicleCard";
import { EnquiryModal } from "@/components/EnquiryModal";
import {
  MapPin,
  Calendar,
  Compass,
  Car,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  FileCheck2,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  Info,
  ShieldCheck,
  Bike,
  Sparkles,
} from "lucide-react";

export default function StateDestinationPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { destinations, tours, vehicles } = useData();

  const destination = destinations.find(
    (d) => d.slug === slug || d.id === slug || d.name.toLowerCase() === slug.toLowerCase()
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"rental" | "tour">("tour");
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  if (!destination) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-[#0B0C0E] text-gray-900 dark:text-white flex flex-col justify-between pt-24">
        <Header />
        <div className="max-w-md mx-auto text-center py-20 px-4 space-y-4">
          <h1 className="text-3xl font-bold font-display">Destination Not Found</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-normal">
            The requested state destination guide does not exist.
          </p>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-red text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-red/30"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Destinations
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  // Get matching tours and vehicles
  const stateTours = tours.filter((t: SharedTour) => t.destinationId === destination.id);
  const stateVehicles = vehicles.filter((v: Vehicle) =>
    destination.availableVehicleIds.includes(v.id)
  );

  const whatsAppText = `Hi Majestic Northeast! I want to enquire about trips and convoys in ${destination.name}. Could you please share available batch dates?`;
  const whatsAppUrl = buildWhatsAppUrl("919876543210", whatsAppText);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#0B0C0E] text-gray-900 dark:text-white flex flex-col justify-between transition-colors duration-300">
      <Header onOpenEnquire={() => setModalOpen(true)} />

      <div className="flex-1">
        {/* State Hero Cover with Seamless Full-Bleed Behind Navbar */}
        <section className="relative pt-40 sm:pt-48 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black flex items-end">
          {/* Animated Zooming Background Image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src={destination.coverImage}
              alt={destination.name}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-[0.88] contrast-[1.08] animate-zoom-out"
            />
            {/* Subtle Lighting Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#0B0C0E] via-black/25 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full space-y-4 text-left">
            {/* Breadcrumb Strip */}
            <div className="flex items-center gap-2 text-xs text-white/80 font-display">
              <Link href="/" className="hover:text-brand-red">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <Link href="/destinations" className="hover:text-brand-red">
                Destinations
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <span className="text-white font-bold truncate">{destination.name}</span>
            </div>

            <div>
              <span className="brush-badge text-xs font-bold font-display uppercase tracking-widest shadow-lg shadow-brand-red/40">
                {destination.stateName} Overland Circuit
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-white tracking-wide uppercase leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              {destination.name.toUpperCase()}
            </h1>
            <p className="text-white/95 text-xs sm:text-sm lg:text-base max-w-3xl font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {destination.tagline}
            </p>
          </div>
        </section>

        {/* State Content Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
          {/* Overview & Best Time to Visit */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 card-dark rounded-3xl p-6 sm:p-8 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold font-display border-b border-gray-200 dark:border-white/10 pb-3">
                About {destination.name}
              </h2>
              <p className="text-gray-600 dark:text-white/80 text-xs sm:text-sm leading-relaxed font-normal">
                {destination.overview}
              </p>
            </div>

            <div className="lg:col-span-4 card-dark rounded-3xl p-6 sm:p-8 space-y-3">
              <h3 className="text-base font-bold font-display flex items-center gap-2 border-b border-gray-200 dark:border-white/10 pb-3">
                <Calendar className="w-5 h-5 text-brand-red" />
                Best Time to Visit
              </h3>
              <p className="text-xs text-gray-600 dark:text-white/80 leading-relaxed font-normal">
                {destination.bestTimeToVisit}
              </p>
            </div>
          </div>

          {/* Popular Places */}
          {destination.popularPlaces.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-display flex items-center gap-2">
                <MapPin className="w-6 h-6 text-brand-red" />
                POPULAR PLACES & ATTRACTIONS IN {destination.name.toUpperCase()}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {destination.popularPlaces.map((place, idx) => (
                  <div
                    key={idx}
                    className="card-dark rounded-2xl overflow-hidden group"
                  >
                    <div className="relative h-48 w-full bg-black/40 overflow-hidden">
                      <Image
                        src={place.image}
                        alt={place.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 space-y-2">
                      <h3 className="text-base font-bold font-display group-hover:text-brand-red transition-colors">
                        {place.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-white/70 leading-relaxed font-normal">
                        {place.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Routes */}
          {destination.suggestedRoutes.length > 0 && (
            <div className="card-dark rounded-3xl p-6 sm:p-8 space-y-6">
              <h2 className="text-2xl font-bold font-display flex items-center gap-2">
                <Compass className="w-6 h-6 text-brand-red" />
                RECOMMENDED ROAD TRIP ROUTES
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {destination.suggestedRoutes.map((route, idx) => (
                  <div key={idx} className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-5 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-bold font-display">{route.name}</h3>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-brand-red/15 text-brand-red border border-brand-red/30">
                        {route.duration}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-white/70 font-normal leading-relaxed">{route.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Available Shared Tours */}
          {stateTours.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-display flex items-center gap-2">
                <Compass className="w-6 h-6 text-brand-red" />
                AVAILABLE GROUP EXPEDITIONS IN {destination.name.toUpperCase()}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stateTours.map((tour) => (
                  <TourCard
                    key={tour.id}
                    tour={tour}
                    onEnquire={(t) => {
                      setModalMode("tour");
                      setModalOpen(true);
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Recommended Rental Vehicles */}
          {stateVehicles.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-display flex items-center gap-2">
                <Car className="w-6 h-6 text-brand-red" />
                RECOMMENDED EXPEDITION VEHICLES FOR {destination.name.toUpperCase()}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stateVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    onEnquire={(v) => {
                      setModalMode("rental");
                      setModalOpen(true);
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Travel Tips & Permit Details */}
          {destination.travelTips.length > 0 && (
            <div className="card-dark rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-xl font-bold font-display flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-amber-500" />
                Travel Tips & Inner Line Permit (ILP) Rules
              </h3>
              <ul className="space-y-2.5 text-xs text-gray-600 dark:text-white/80">
                {destination.travelTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* State FAQs */}
          {destination.faqs.length > 0 && (
            <div className="card-dark rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-xl font-bold font-display flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand-red" />
                Frequently Asked Questions for {destination.name}
              </h3>
              <div className="space-y-3">
                {destination.faqs.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div key={faq.id} className="border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden bg-gray-50 dark:bg-white/5">
                      <button
                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                        className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm hover:text-brand-red transition-colors"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${
                            isOpen ? "rotate-180 text-brand-red" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs text-gray-600 dark:text-white/80 font-normal border-t border-gray-200 dark:border-white/5">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* State Conversion Banner */}
          <div className="bg-gradient-to-r from-brand-red/20 via-black/40 to-brand-red/20 border border-brand-red/30 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white uppercase">
              READY TO EXPEDITION ACROSS {destination.name.toUpperCase()}?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto font-normal">
              Connect with our convoy leads for fixed departure batch seats, 4x4 Thar rentals, or Himalayan 450 bike convoys.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setModalMode("tour");
                  setModalOpen(true);
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold font-display uppercase tracking-widest shadow-glow-red transition-all"
              >
                Plan {destination.name} Trip Now
              </button>
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-display uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Direct Quote
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
      <StickyMobileBar onOpenEnquire={() => setModalOpen(true)} />
      <WhatsAppFloating />

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialMode={modalMode}
      />
    </main>
  );
}
