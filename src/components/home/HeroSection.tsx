"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Car, Bike, Compass, MessageCircle, ChevronDown, ShieldCheck, Star, Users } from "lucide-react";
import { SearchWidget } from "./SearchWidget";
import { buildWhatsAppUrl } from "@/lib/utils";

interface HeroSectionProps {
  onOpenEnquire?: (mode?: "rental" | "tour") => void;
}

export function HeroSection({ onOpenEnquire }: HeroSectionProps) {
  const whatsAppUrl = buildWhatsAppUrl("919876543210", "Hi Majestic Northeast! I want to join an upcoming 4x4 Car Trip / Bike Expedition.");

  const scrollToMiddle = () => {
    window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-36 sm:pt-44 lg:pt-48 pb-12 px-4 sm:px-6 lg:px-8 overflow-x-clip bg-[#0B0C0E]">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=2000&q=80"
          alt="4x4 Car and Bike Group Expeditions in Northeast India"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.65] scale-105"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E]/90 via-[#0B0C0E]/60 to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-7 text-left space-y-6">
          {/* Badge */}
          <div>
            <span className="brush-badge text-xs font-black tracking-widest uppercase">
              All-Inclusive Guided Group Expeditions
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display text-white uppercase tracking-tight leading-[0.95] max-w-2xl">
            NORTHEAST INDIA <br />
            <span className="text-brand-red">GROUP EXPEDITIONS.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 text-sm sm:text-base lg:text-lg max-w-xl font-normal leading-relaxed">
            Choose between thrilling <strong>4x4 SUV Convoy Trips</strong> (Mahindra Thar / Fortuner) and guided <strong>Motorcycle Expeditions</strong> (Royal Enfield Himalayan 450) with backup mechanic truck, road marshals, boutique stays, and Inner Line Permits.
          </p>

          {/* Action Buttons for 2 formats */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/rentals"
              className="px-7 py-3.5 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-black font-display uppercase tracking-widest rounded transition-all shadow-glow-red hover:scale-[1.02] flex items-center gap-2"
            >
              <Car className="w-4 h-4" />
              4x4 Car Trips
            </Link>

            <Link
              href="/bikes"
              className="px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold font-display uppercase tracking-widest rounded-xl transition-all backdrop-blur-md hover:scale-[1.02] flex items-center gap-2"
            >
              <Bike className="w-4 h-4 text-brand-red" />
              Bike Expeditions
            </Link>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black font-display uppercase tracking-widest rounded transition-all shadow-md flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-white/80 pt-2 font-semibold">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded border border-white/15">
              <ShieldCheck className="w-4 h-4 text-brand-red" />
              <span>Dedicated Backup Mechanic & Luggage Truck</span>
            </div>
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded border border-white/15">
              <Users className="w-4 h-4 text-amber-400" />
              <span>Max 10–12 Adventurers Per Batch</span>
            </div>
          </div>
        </div>

        {/* Right Column: Search Widget Embed */}
        <div className="lg:col-span-5 w-full">
          <SearchWidget
            onSearchRental={() => onOpenEnquire?.("tour")}
            onSearchTour={() => onOpenEnquire?.("tour")}
          />
        </div>
      </div>

      {/* Red Scroll Indicator */}
      <div className="relative z-10 text-center pt-6">
        <button
          onClick={scrollToMiddle}
          className="inline-flex items-center gap-1.5 text-white/60 hover:text-brand-red text-[11px] font-bold font-display uppercase tracking-widest transition-colors"
        >
          <span>Explore 4x4 & Bike Departures</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-brand-red" />
        </button>
      </div>
    </section>
  );
}
