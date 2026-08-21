"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { DESTINATIONS_DATA } from "@/lib/data";
import { DestinationCard } from "../DestinationCard";
import { SectionHeading } from "../ui/SectionHeading";
import { MapPin, ArrowRight, Star, Compass, Clock } from "lucide-react";

export function PopularDestinations() {
  return (
    <section className="py-14 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#0B0C0E] border-t border-gray-200 dark:border-white/10 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ========================================================================= */}
        {/* MOBILE HEADER: Clean App Title + "See all →" Action (Mobile Viewport)    */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between pb-4 lg:hidden text-left">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-red font-display block">
              THE 8 SISTER STATES
            </span>
            <h2 className="text-xl font-black font-display text-gray-900 dark:text-white uppercase tracking-tight">
              Popular Destinations
            </h2>
          </div>
          <Link
            href="/destinations"
            className="text-xs font-bold font-display text-brand-red flex items-center gap-1 hover:underline"
          >
            <span>See all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE HORIZONTAL SNAP CAROUSEL (Reference-Inspired Mobile Cards)         */}
        {/* ========================================================================= */}
        <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory gap-3.5 pb-2 -mx-4 px-4 scrollbar-none">
          {DESTINATIONS_DATA.map((dest) => (
            <Link
              key={dest.id}
              href={`/destinations/${dest.slug}`}
              className="w-[78vw] shrink-0 snap-center bg-white dark:bg-[#14161A] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg flex flex-col justify-between text-left group active:scale-[0.98] transition-transform"
            >
              {/* 16:9 Image with Overlays */}
              <div className="relative h-44 w-full bg-black overflow-hidden">
                <Image
                  src={dest.coverImage}
                  alt={dest.name}
                  fill
                  sizes="78vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Top Badges */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2">
                  <span className="bg-brand-red text-white text-[9px] font-black font-display px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-md">
                    {dest.stateName}
                  </span>
                  <span className="bg-black/75 backdrop-blur-md border border-white/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>4.9</span>
                  </span>
                </div>

                {/* Bottom Left City Tag */}
                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-white font-bold border border-white/15">
                  <MapPin className="w-3 h-3 text-brand-red" />
                  <span>{dest.name}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="text-base font-black font-display uppercase tracking-tight text-gray-900 dark:text-white line-clamp-1">
                    {dest.name} Explorer
                  </h3>
                  <p className="text-[11px] text-gray-600 dark:text-white/70 line-clamp-2 leading-relaxed">
                    {dest.tagline}
                  </p>
                </div>

                {/* Footer Pricing & Action Buttons */}
                <div className="pt-2 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-gray-500 dark:text-white/50 uppercase block font-bold font-display">
                      STARTS AT
                    </span>
                    <span className="text-sm font-black font-display text-gray-900 dark:text-white">
                      ₹17,999
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 text-gray-800 dark:text-white text-[10px] font-bold font-display uppercase tracking-wider rounded-lg">
                      Details
                    </span>
                    <span className="px-3 py-1 bg-brand-red text-white text-[10px] font-bold font-display uppercase tracking-wider rounded-lg shadow-sm">
                      Book
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP VIEW CONTAINER (100% UNTOUCHED - Viewport >= 1024px)              */}
        {/* ========================================================================= */}
        <div className="hidden lg:block">
          <SectionHeading
            tag="The 8 Sister States"
            title="DISCOVER NORTHEAST DESTINATIONS"
            subtitle="From the cascading waterfalls and living root bridges of Meghalaya to snow peaks in Arunachal Pradesh and tea estates in Assam."
          />

          <div className="grid grid-cols-4 gap-6">
            {DESTINATIONS_DATA.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gray-900 dark:bg-white/10 hover:bg-black dark:hover:bg-white/20 border border-gray-700 dark:border-white/20 text-white text-xs font-black font-display uppercase tracking-widest transition-all hover:scale-[1.02] shadow-lg backdrop-blur-md"
            >
              <MapPin className="w-4 h-4 text-brand-red" />
              View State Travel Guides & Permits
              <ArrowRight className="w-4 h-4 text-brand-red" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
