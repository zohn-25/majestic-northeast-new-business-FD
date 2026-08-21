"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SharedTour } from "@/lib/types";
import { formatINR, getAvailabilityStatus, buildWhatsAppUrl } from "@/lib/utils";
import { Calendar, Clock, MapPin, Users, ArrowRight, MessageCircle, CheckCircle2, Car, Bike, ShieldCheck, Sparkles } from "lucide-react";

interface TourCardProps {
  tour: SharedTour;
  onEnquire?: (tour: SharedTour) => void;
  featuredLayout?: boolean;
}

export function TourCard({ tour, onEnquire, featuredLayout = false }: TourCardProps) {
  const statusInfo = getAvailabilityStatus(tour.seatsBooked, tour.totalSeats);
  const seatsRemaining = statusInfo.seatsRemaining;
  const percentBooked = Math.round((tour.seatsBooked / tour.totalSeats) * 100);

  const whatsAppText = `Hi Majestic Northeast! I'm interested in joining the ${tour.title} (₹${tour.pricePerPerson}/person). Could you please share departure dates and booking details?`;
  const whatsAppUrl = buildWhatsAppUrl("919876543210", whatsAppText);

  const isBike = tour.tripFormat === "bike";
  const tourDetailUrl = `/tours/${tour.id}`;

  return (
    <div
      className={`card-dark group rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 ${
        featuredLayout ? "md:col-span-2 md:flex-row md:items-stretch" : ""
      }`}
    >
      {/* 1. Image Container with Link */}
      <Link href={tourDetailUrl} className={`relative h-64 sm:h-72 w-full overflow-hidden bg-black block ${featuredLayout ? "md:w-1/2 md:h-auto" : ""}`}>
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
        />
        {/* Subtle Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

        {/* Floating Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
          <span className="bg-brand-red text-white text-[11px] font-black font-display px-3 py-1 rounded-md uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-brand-red/30">
            {isBike ? <Bike className="w-3.5 h-3.5" /> : <Car className="w-3.5 h-3.5" />}
            {isBike ? "Motorcycle Ride" : "4x4 SUV Convoy"}
          </span>

          <span className="bg-black/75 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold font-display px-2.5 py-1 rounded-md">
            {statusInfo.label}
          </span>
        </div>

        {/* Floating Bottom Info Pill */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
          <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-md text-xs text-white font-bold flex items-center gap-1.5 border border-white/15">
            <MapPin className="w-3.5 h-3.5 text-brand-red" />
            <span>{tour.destinationName}</span>
          </div>

          <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-md text-xs text-white font-bold border border-white/15 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-brand-red" />
            <span>{tour.durationDays}D / {tour.durationNights}N</span>
          </div>
        </div>
      </Link>

      {/* 2. Content Body */}
      <div className={`p-6 sm:p-7 flex flex-col justify-between space-y-6 text-left ${featuredLayout ? "md:w-1/2" : ""}`}>
        <div className="space-y-4">
          {/* Sub Header / Fleet Details */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
              <span className="text-[11px] uppercase tracking-wider font-black text-brand-red font-display flex items-center gap-1">
                {tour.vehicleProvided || (isBike ? "RE Himalayan 450" : "Mahindra Thar 4x4")}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                ✓ ILP Permits Included
              </span>
            </div>

            <Link href={tourDetailUrl}>
              <h3 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-gray-900 dark:text-white hover:text-brand-red dark:hover:text-brand-red transition-colors uppercase line-clamp-2 leading-[0.95]">
                {tour.title}
              </h3>
            </Link>

            {/* Route Circuit Pill */}
            <div className="mt-2.5 py-1.5 px-3 bg-gray-100 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded text-[11px] text-gray-600 dark:text-white/70 truncate font-normal">
              {tour.route}
            </div>
          </div>

          {/* Highlights Checklist */}
          <div className="space-y-2 pt-1">
            {tour.shortHighlights.slice(0, 2).map((hl, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-gray-700 dark:text-white/80 font-normal">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-red shrink-0 mt-0.5" />
                <span className="line-clamp-1">{hl}</span>
              </div>
            ))}
          </div>

          {/* Seat Capacity Progress Bar */}
          <div className="space-y-1.5 pt-2 border-t border-gray-200 dark:border-white/10">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5 text-gray-700 dark:text-white/80">
                <Users className="w-3.5 h-3.5 text-brand-red" />
                <span>{seatsRemaining} spots available</span>
              </span>
              <span className="text-[11px] text-gray-500 dark:text-white/50">{percentBooked}% Filled</span>
            </div>
            <div className="h-1.5 w-full bg-gray-200 dark:bg-black/60 rounded-full overflow-hidden border border-gray-300 dark:border-white/10">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  percentBooked > 80 ? "bg-amber-500" : "bg-brand-red"
                }`}
                style={{ width: `${percentBooked}%` }}
              />
            </div>
          </div>
        </div>

        {/* 3. Pricing & Call to Actions */}
        <div className="space-y-4 pt-2">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-3xl sm:text-4xl font-black font-display tracking-tight text-gray-900 dark:text-white">
                {formatINR(tour.pricePerPerson)}
              </span>
              <span className="text-xs text-gray-500 dark:text-white/60 font-normal ml-1">/ person</span>
            </div>
            <span className="text-[11px] text-gray-500 dark:text-white/50 font-medium">All-Inclusive</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <Link
              href={tourDetailUrl}
              className="w-full py-3 px-3 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-black font-display uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-glow-red hover:scale-[1.02] text-center"
            >
              Book Spot
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black font-display uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-colors text-center shadow-md hover:scale-[1.02]"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
