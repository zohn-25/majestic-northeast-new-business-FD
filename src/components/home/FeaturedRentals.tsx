"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SharedTour } from "@/lib/types";
import { SHARED_TOURS_DATA } from "@/lib/data";
import { TourCard } from "../TourCard";
import { SectionHeading } from "../ui/SectionHeading";
import { EmptyState } from "../ui/EmptyState";
import { TourCardSkeleton } from "../ui/LoadingSkeleton";
import { Car, ArrowRight, ShieldCheck, Users } from "lucide-react";

interface FeaturedRentalsProps {
  onOpenEnquire?: (tour: SharedTour) => void;
}

export function FeaturedRentals({ onOpenEnquire }: FeaturedRentalsProps) {
  const [loading, setLoading] = useState(false);
  const carTours = SHARED_TOURS_DATA.filter((t) => t.tripFormat === "car");

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#0B0C0E] border-t border-gray-200 dark:border-white/10 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          tag="Option 1: 4x4 SUV Convoy Trips"
          title="4x4 CAR GROUP EXPEDITIONS"
          subtitle="Join an all-inclusive 4x4 SUV convoy in Mahindra Thar 4x4, Toyota Fortuner, or Scorpio-N. Drive yourself or sit back with our expedition drivers across Arunachal, Meghalaya, and Sikkim."
        />

        {/* Highlight Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 text-xs font-bold font-display text-gray-800 dark:text-white">
          <div className="flex items-center gap-1.5 bg-white dark:bg-black/60 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/15 shadow-sm">
            <Car className="w-3.5 h-3.5 text-brand-red" />
            <span>Mahindra Thar 4x4 & Fortuner Fleet</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white dark:bg-black/60 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/15 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-red" />
            <span>Support Lead Vehicle & Walkie-Talkies</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white dark:bg-black/60 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/15 shadow-sm">
            <Users className="w-3.5 h-3.5 text-brand-red" />
            <span>Max 12 Travellers Per Convoy</span>
          </div>
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TourCardSkeleton />
            <TourCardSkeleton />
            <TourCardSkeleton />
          </div>
        ) : carTours.length === 0 ? (
          <EmptyState
            title="No 4x4 car expeditions found"
            message="Check our all tours page for custom departures."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {carTours.map((tour, index) => (
              <TourCard
                key={tour.id}
                tour={tour}
                onEnquire={onOpenEnquire}
                featuredLayout={index === 0}
              />
            ))}
          </div>
        )}

        {/* View All Action */}
        <div className="mt-14 text-center">
          <Link
            href="/rentals"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-brand-red hover:bg-brand-red-hover text-white text-xs font-black font-display uppercase tracking-widest transition-all shadow-glow-red hover:scale-[1.02]"
          >
            <Car className="w-4 h-4" />
            View All 4x4 Car Convoy Trips
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
