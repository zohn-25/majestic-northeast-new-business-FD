"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { SHARED_TOURS_DATA, DESTINATIONS_DATA } from "@/lib/data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TourCard } from "@/components/TourCard";
import { TourCardSkeleton } from "@/components/ui/LoadingSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { WhatsAppFloating } from "@/components/WhatsAppFloating";
import { Search, RefreshCw, Bike, ShieldCheck, Truck, Wrench } from "lucide-react";
import { CustomSelect, OptionItem } from "@/components/ui/CustomSelect";

export default function BikeExpeditionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [loading, setLoading] = useState(false);

  const destinationOptions: OptionItem[] = [
    { value: "all", label: "All Motorcycle Circuits", subLabel: "Full Northeast Bike Coverage" },
    ...DESTINATIONS_DATA.map((d) => ({
      value: d.id,
      label: d.name,
      subLabel: `${d.stateName} Motorcycle Ride`,
    })),
  ];

  const sortOptions: OptionItem[] = [
    { value: "featured", label: "Featured Departures", subLabel: "Handpicked by Road Captains" },
    { value: "price-asc", label: "Price: Low to High", subLabel: "Budget friendly first" },
    { value: "price-desc", label: "Price: High to Low", subLabel: "Premium bike expeditions first" },
  ];

  // Only motorcycle bike trips
  const bikeTours = useMemo(() => {
    return SHARED_TOURS_DATA.filter((tour) => tour.tripFormat === "bike");
  }, []);

  const filteredTours = useMemo(() => {
    return bikeTours.filter((tour) => {
      // 1. Destination Filter
      if (selectedDestination !== "all" && tour.destinationId !== selectedDestination) {
        return false;
      }

      // 2. Search Query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchTitle = tour.title.toLowerCase().includes(query);
        const matchRoute = tour.route.toLowerCase().includes(query);
        const matchDest = tour.destinationName.toLowerCase().includes(query);
        const matchVeh = tour.vehicleProvided.toLowerCase().includes(query);
        if (!matchTitle && !matchRoute && !matchDest && !matchVeh) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.pricePerPerson - b.pricePerPerson;
      if (sortBy === "price-desc") return b.pricePerPerson - a.pricePerPerson;
      return 0;
    });
  }, [bikeTours, selectedDestination, searchQuery, sortBy]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedDestination("all");
    setSortBy("featured");
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#0B0C0E] text-gray-900 dark:text-white flex flex-col justify-between transition-colors duration-300">
      <Header />

      <div className="flex-1">
        {/* Cinematic Hero Header with Seamless Full-Bleed Behind Navbar */}
        <section className="relative pt-40 sm:pt-48 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black">
          {/* Animated Zooming Background Image - Extends Full-Height behind Navbar */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=2000&q=80"
              alt="Guided Royal Enfield Motorcycle Expeditions"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-[0.88] contrast-[1.08] animate-zoom-out"
            />
            {/* Subtle Lighting Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#0B0C0E] via-black/20 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto text-left space-y-4">
            <div className="flex items-center gap-2">
              <span className="brush-badge flex items-center gap-1.5 shadow-lg shadow-brand-red/40">
                <Bike className="w-3.5 h-3.5" />
                Motorcycle Expeditions
              </span>
              <span className="text-xs text-brand-red font-bold font-display uppercase tracking-wider bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-brand-red/30 shadow-md">
                ● Royal Enfield Himalayan 450 Rides
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-wide uppercase text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              Guided Motorcycle Group Expeditions
            </h1>
            <p className="text-xs sm:text-sm text-white/95 max-w-2xl font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Ride Royal Enfield Himalayan 450 motorcycles in escorted convoys across high mountain passes. All-inclusive package includes RE Himalayan 450, fuel, luggage backup truck, master mechanic, boutique stays, all meals & ILP permit processing.
            </p>

            {/* Quick Specs Badges */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/90 pt-1 font-semibold font-display">
              <span className="flex items-center gap-1.5 text-brand-red bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <Truck className="w-4 h-4" /> Luggage Truck Carries All Duffels
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <Wrench className="w-4 h-4" /> RE Master Mechanic Escort
              </span>
              <span className="flex items-center gap-1.5 text-blue-400 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <ShieldCheck className="w-4 h-4" /> 100% Guaranteed ILP Permits
              </span>
            </div>
          </div>
        </section>

        {/* Filter & Listing Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Controls Bar with Dropdowns */}
          <div className="card-dark p-5 sm:p-6 rounded-2xl border border-gray-200 dark:border-white/15 shadow-2xl mb-12 space-y-4 relative z-30 overflow-visible">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              {/* Search Bar */}
              <div className="md:col-span-2 relative">
                <Search className="w-4 h-4 text-brand-red absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search bike circuit (Tawang, Silk Route, Meghalaya, Kaziranga...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-black/80 border border-gray-300 dark:border-white/20 rounded-xl text-xs text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:border-brand-red"
                />
              </div>

              {/* Destination Filter Custom Dropdown */}
              <div>
                <CustomSelect
                  options={destinationOptions}
                  value={selectedDestination}
                  onChange={(val) => setSelectedDestination(val)}
                  placeholder="Filter Destination"
                />
              </div>

              {/* Sort By Custom Dropdown */}
              <div>
                <CustomSelect
                  options={sortOptions}
                  value={sortBy}
                  onChange={(val) => setSortBy(val as any)}
                  placeholder="Sort Expeditions"
                />
              </div>
            </div>

            {/* Reset Button */}
            {(selectedDestination !== "all" || searchQuery !== "" || sortBy !== "featured") && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleReset}
                  className="text-xs text-brand-red font-bold hover:underline flex items-center gap-1 font-display uppercase tracking-wider"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TourCardSkeleton />
              <TourCardSkeleton />
              <TourCardSkeleton />
            </div>
          ) : filteredTours.length === 0 ? (
            <EmptyState
              title="No motorcycle expeditions match your search"
              message="Try adjusting your destination filter or search keywords."
              actionLabel="View All Bike Trips"
              onAction={handleReset}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          )}
        </section>
      </div>

      <WhatsAppFloating />
      <StickyMobileBar />
      <Footer />
    </main>
  );
}
