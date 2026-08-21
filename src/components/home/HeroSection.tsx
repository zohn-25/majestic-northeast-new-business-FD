"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Car, Bike, Compass, MessageCircle, ChevronDown, ShieldCheck, Star, Users, Flame, MapPin, Search, ArrowRight, Sparkles, Luggage, Building2, Wand2 } from "lucide-react";
import { SearchWidget } from "./SearchWidget";
import { buildWhatsAppUrl } from "@/lib/utils";

interface HeroSectionProps {
  onOpenEnquire?: (mode?: "rental" | "tour") => void;
}

export function HeroSection({ onOpenEnquire }: HeroSectionProps) {
  const router = useRouter();
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [activePill, setActivePill] = useState("All");

  const whatsAppUrl = buildWhatsAppUrl("919876543210", "Hi Majestic Northeast! I want to join an upcoming 4x4 Car Trip / Bike Expedition.");

  const quickFilterPills = [
    { label: "All Circuits", query: "" },
    { label: "🚗 Meghalaya", query: "meghalaya" },
    { label: "🏍️ Tawang", query: "tawang" },
    { label: "🚗 Kaziranga", query: "kaziranga" },
    { label: "🏍️ Zuluk Silk Route", query: "zuluk" },
    { label: "🚗 Arunachal", query: "arunachal" },
  ];

  const handleMobileSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (mobileSearchQuery.trim()) {
      router.push(`/tours?q=${encodeURIComponent(mobileSearchQuery.trim())}`);
    } else {
      router.push("/tours");
    }
  };

  const scrollToMiddle = () => {
    window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-24 sm:pt-40 lg:pt-48 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 overflow-x-clip bg-[#0B0C0E]">
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

      {/* ========================================================================= */}
      {/* MOBILE-ONLY DEDICATED APP HERO (Reference Inspired - Viewport < 1024px)  */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full my-auto space-y-4 text-left lg:hidden pt-4">
        {/* Small Tag */}
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-brand-red font-display">
            EXPLORE NORTHEAST INDIA
          </span>
        </div>

        {/* Big Bold Friendly Heading */}
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-[1.05]">
          Where do you <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-orange-400 to-amber-300 italic font-medium">
            want to explore?
          </span>
        </h1>

        {/* Interactive Search Pill Bar */}
        <form onSubmit={handleMobileSearch} className="relative flex items-center bg-white dark:bg-[#14161A] rounded-full p-1.5 shadow-2xl border border-gray-200 dark:border-white/20">
          <Search className="w-5 h-5 text-gray-400 dark:text-white/40 ml-3.5 shrink-0" />
          <input
            type="text"
            value={mobileSearchQuery}
            onChange={(e) => setMobileSearchQuery(e.target.value)}
            placeholder="Search 4x4 trails, waterfalls, high passes..."
            className="w-full bg-transparent px-3 py-2 text-xs text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none font-medium"
          />
          <button
            type="submit"
            aria-label="Search Expeditions"
            className="w-10 h-10 rounded-full bg-brand-red hover:bg-brand-red-hover active:scale-95 text-white flex items-center justify-center shadow-lg shadow-brand-red/40 shrink-0 transition-transform"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Horizontal Destination Quick Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4">
          {quickFilterPills.map((pill) => (
            <button
              key={pill.label}
              type="button"
              onClick={() => {
                setActivePill(pill.label);
                if (pill.query) {
                  router.push(`/tours?q=${encodeURIComponent(pill.query)}`);
                } else {
                  router.push("/tours");
                }
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-display whitespace-nowrap transition-all border ${
                activePill === pill.label
                  ? "bg-brand-red text-white border-brand-red shadow-md"
                  : "bg-white/90 dark:bg-black/60 text-gray-800 dark:text-white/80 border-gray-200 dark:border-white/15 backdrop-blur-md"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* 4 Quick Category App Service Tiles (2x2 Grid) */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          {/* Tile 1: 4x4 Thar Convoys */}
          <Link
            href="/rentals"
            className="bg-white/95 dark:bg-[#14161A]/95 backdrop-blur-xl p-3.5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg flex items-center gap-3 active:scale-95 transition-transform"
          >
            <div className="w-11 h-11 rounded-xl bg-red-500/15 text-brand-red flex items-center justify-center shrink-0 border border-brand-red/20 shadow-sm">
              <Car className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <span className="text-xs font-black font-display uppercase tracking-wide text-gray-900 dark:text-white block">
                4x4 Car Trips
              </span>
              <span className="text-[10px] text-gray-500 dark:text-white/60 font-medium block">
                Thar & Fortuner
              </span>
            </div>
          </Link>

          {/* Tile 2: Bike Expeditions */}
          <Link
            href="/bikes"
            className="bg-white/95 dark:bg-[#14161A]/95 backdrop-blur-xl p-3.5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg flex items-center gap-3 active:scale-95 transition-transform"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/20 shadow-sm">
              <Bike className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <span className="text-xs font-black font-display uppercase tracking-wide text-gray-900 dark:text-white block">
                Bike Trips
              </span>
              <span className="text-[10px] text-gray-500 dark:text-white/60 font-medium block">
                Himalayan 450
              </span>
            </div>
          </Link>

          {/* Tile 3: Vehicle Rentals */}
          <Link
            href="/rentals"
            className="bg-white/95 dark:bg-[#14161A]/95 backdrop-blur-xl p-3.5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg flex items-center gap-3 active:scale-95 transition-transform"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center shrink-0 border border-blue-500/20 shadow-sm">
              <Compass className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <span className="text-xs font-black font-display uppercase tracking-wide text-gray-900 dark:text-white block">
                Self-Drive Fleet
              </span>
              <span className="text-[10px] text-gray-500 dark:text-white/60 font-medium block">
                Guwahati Depot
              </span>
            </div>
          </Link>

          {/* Tile 4: Custom Group Convoy */}
          <button
            type="button"
            onClick={() => onOpenEnquire?.("tour")}
            className="bg-white/95 dark:bg-[#14161A]/95 backdrop-blur-xl p-3.5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg flex items-center gap-3 active:scale-95 transition-transform text-left"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20 shadow-sm">
              <Wand2 className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <span className="text-xs font-black font-display uppercase tracking-wide text-gray-900 dark:text-white block">
                Custom Trip
              </span>
              <span className="text-[10px] text-gray-500 dark:text-white/60 font-medium block">
                Tailored Routes
              </span>
            </div>
          </button>
        </div>

        {/* Mobile Trust Strip */}
        <div className="flex items-center justify-between gap-2 pt-1 text-[11px] text-white/80 font-bold font-display">
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-red shrink-0" />
            <span>Backup Mechanic Van</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
            <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Max 10–12 / Batch</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP CONTENT CONTAINER (100% UNTOUCHED - Viewport >= 1024px)           */}
      {/* ========================================================================= */}
      <div className="hidden lg:grid relative z-10 max-w-7xl mx-auto w-full my-auto grid-cols-12 gap-12 items-center">
        {/* Left Column: Text & CTAs */}
        <div className="col-span-7 text-left space-y-6">
          {/* Badge */}
          <div>
            <span className="brush-badge text-xs font-black tracking-widest uppercase">
              All-Inclusive Guided Group Expeditions
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl lg:text-7xl font-black font-display text-white uppercase tracking-tight leading-[0.95] max-w-2xl">
            NORTHEAST INDIA <br />
            <span className="text-brand-red">GROUP EXPEDITIONS.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/85 text-base lg:text-lg max-w-xl font-normal leading-relaxed">
            Choose between thrilling <strong>4x4 SUV Convoy Trips</strong> (Mahindra Thar / Fortuner) and guided <strong>Motorcycle Expeditions</strong> (Royal Enfield Himalayan 450) with backup mechanic truck, road marshals, boutique stays, and Inner Line Permits.
          </p>

          {/* Desktop Action Buttons */}
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
          <div className="flex flex-wrap items-center gap-6 text-xs text-white/80 pt-1 font-semibold">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/15">
              <ShieldCheck className="w-4 h-4 text-brand-red shrink-0" />
              <span>Backup Mechanic Van</span>
            </div>
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/15">
              <Users className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Max 10–12 / Batch</span>
            </div>
          </div>
        </div>

        {/* Right Column: Search Widget Embed */}
        <div className="col-span-5 w-full">
          <SearchWidget
            onSearchRental={() => onOpenEnquire?.("tour")}
            onSearchTour={() => onOpenEnquire?.("tour")}
          />
        </div>
      </div>

      {/* Red Scroll Indicator */}
      <div className="relative z-10 text-center pt-4 sm:pt-6">
        <button
          onClick={scrollToMiddle}
          className="inline-flex items-center gap-1.5 text-white/60 hover:text-brand-red text-[10px] sm:text-[11px] font-bold font-display uppercase tracking-widest transition-colors"
        >
          <span>Explore 4x4 & Bike Departures</span>
          <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce text-brand-red" />
        </button>
      </div>
    </section>
  );
}
