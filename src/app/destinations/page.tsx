"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { DESTINATIONS_DATA } from "@/lib/data";
import { Destination } from "@/lib/types";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { WhatsAppFloating } from "@/components/WhatsAppFloating";
import { DestinationCard } from "@/components/DestinationCard";
import { EnquiryModal } from "@/components/EnquiryModal";
import { MapPin, Compass, Car, Bike, ShieldCheck, Search } from "lucide-react";

export default function DestinationsIndexPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDestinations = useMemo(() => {
    if (!searchQuery.trim()) return DESTINATIONS_DATA;
    const q = searchQuery.toLowerCase();
    return DESTINATIONS_DATA.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.stateName.toLowerCase().includes(q) ||
        d.tagline.toLowerCase().includes(q) ||
        d.overview.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#0B0C0E] text-gray-900 dark:text-white flex flex-col justify-between transition-colors duration-300">
      <Header onOpenEnquire={() => setModalOpen(true)} />

      <div className="flex-1">
        {/* Cinematic Hero Header with Full-Bleed Behind Navbar (Single Clean Heading) */}
        <section className="relative pt-40 sm:pt-48 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black text-left text-white">
          {/* Animated Zooming Background Image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80"
              alt="8 Sister States of Northeast India"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-[0.88] contrast-[1.08] animate-zoom-out"
            />
            {/* Subtle Lighting Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#0B0C0E] via-black/20 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto space-y-4">
            <div className="flex items-center gap-2">
              <span className="brush-badge flex items-center gap-1.5 shadow-lg shadow-brand-red/40">
                <MapPin className="w-3.5 h-3.5" />
                8 Sister States
              </span>
              <span className="text-xs text-brand-red font-bold font-display uppercase tracking-wider bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-brand-red/30 shadow-md">
                ● Regional Overlanding & Circuit Guides
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-white tracking-wide uppercase leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              EXPLORE NORTHEAST STATES
            </h1>
            <p className="text-white/95 text-xs sm:text-sm lg:text-base max-w-2xl font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Click on any state card below to view high-altitude mountain passes, suggested 4x4 & motorcycle convoy circuits, best travel months, and permit rules.
            </p>

            {/* Quick Specs Badges */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/90 pt-1 font-semibold font-display">
              <span className="flex items-center gap-1.5 text-brand-red bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <Car className="w-4 h-4" /> 4x4 Thar & SUV Convoys
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <Bike className="w-4 h-4" /> RE Himalayan 450 Rides
              </span>
              <span className="flex items-center gap-1.5 text-blue-400 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <ShieldCheck className="w-4 h-4" /> 100% ILP Permit Assistance
              </span>
            </div>
          </div>
        </section>

        {/* States Grid Section (No Duplicate Heading) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Controls / Search Bar */}
          <div className="card-dark p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-white/15 shadow-2xl mb-10 relative z-30">
            <div className="relative">
              <Search className="w-4 h-4 text-brand-red absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search state (Arunachal, Meghalaya, Sikkim, Nagaland, Assam...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-black/80 border border-gray-300 dark:border-white/20 rounded-xl text-xs text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </section>
      </div>

      <Footer />
      <StickyMobileBar onOpenEnquire={() => setModalOpen(true)} />
      <WhatsAppFloating />

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </main>
  );
}
