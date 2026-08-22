"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useData } from "@/context/DataContext";
import { SharedTour } from "@/lib/types";
import { TourCard } from "../TourCard";
import { SectionHeading } from "../ui/SectionHeading";
import { EmptyState } from "../ui/EmptyState";
import { TourCardSkeleton } from "../ui/LoadingSkeleton";
import { Bike, ArrowRight, Wrench, Truck } from "lucide-react";

interface FeaturedToursProps {
  onOpenEnquire?: (tour: SharedTour) => void;
}

export function FeaturedTours({ onOpenEnquire }: FeaturedToursProps) {
  const { tours } = useData();
  const [loading, setLoading] = useState(false);
  const bikeTours = tours.filter((t) => t.tripFormat === "bike");

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#101216] border-t border-gray-200 dark:border-white/10 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          tag="Option 2: Guided Motorcycle Expeditions"
          title="MOTORCYCLE BIKE EXPEDITIONS"
          subtitle="Conquer high-altitude mountain passes of Tawang and the 32 hairpin loops of Zuluk Silk Route on Royal Enfield Himalayan 450s. Escorted by luggage backup truck, lead road marshal, and mechanic."
        />

        {/* Highlight Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 text-xs font-bold font-display text-gray-800 dark:text-white">
          <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-black/60 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/15 shadow-sm">
            <Bike className="w-3.5 h-3.5 text-brand-red" />
            <span>Royal Enfield Himalayan 450 Provided</span>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-black/60 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/15 shadow-sm">
            <Truck className="w-3.5 h-3.5 text-brand-red" />
            <span>Backup Luggage Truck & Spare Parts</span>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-black/60 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/15 shadow-sm">
            <Wrench className="w-3.5 h-3.5 text-brand-red" />
            <span>Certified RE Master Mechanic On Board</span>
          </div>
        </div>

        {/* Cards Grid / Mobile Swipe Rail */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <TourCardSkeleton />
            <TourCardSkeleton />
            <TourCardSkeleton />
          </div>
        ) : bikeTours.length === 0 ? (
          <EmptyState
            title="No bike expeditions scheduled"
            message="Please check back soon or submit a custom group enquiry."
          />
        ) : (
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {bikeTours.map((tour, index) => (
              <div key={tour.id} className="w-[85vw] sm:w-auto shrink-0 snap-center flex flex-col">
                <TourCard
                  tour={tour}
                  onEnquire={onOpenEnquire}
                  featuredLayout={index === 0}
                />
              </div>
            ))}
          </div>
        )}

        {/* View All Action */}
        <div className="mt-14 text-center">
          <Link
            href="/bikes"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold font-display uppercase tracking-widest transition-all shadow-glow-red hover:scale-[1.02]"
          >
            <Bike className="w-4 h-4" />
            View All Motorcycle Expeditions
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
