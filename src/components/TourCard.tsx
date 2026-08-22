"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SharedTour } from "@/lib/types";
import { formatINR, getAvailabilityStatus, buildWhatsAppUrl } from "@/lib/utils";
import { Clock, MapPin, Users, ArrowRight, MessageCircle, CheckCircle2, Car, Bike } from "lucide-react";

interface TourCardProps {
  tour: SharedTour;
  onEnquire?: (tour: SharedTour) => void;
}

export function TourCard({ tour, onEnquire }: TourCardProps) {
  const statusInfo = getAvailabilityStatus(tour.seatsBooked, tour.totalSeats);
  const seatsRemaining = statusInfo.seatsRemaining;
  const percentBooked = Math.round((tour.seatsBooked / tour.totalSeats) * 100);

  const whatsAppText = `Hi Majestic Northeast! I'm interested in joining the ${tour.title} (₹${tour.pricePerPerson}/person). Could you please share departure dates and booking details?`;
  const whatsAppUrl = buildWhatsAppUrl("919876543210", whatsAppText);

  const isBike = tour.tripFormat === "bike";
  const tourDetailUrl = `/tours/${tour.id}`;

  return (
    <div className="card-dark group rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 h-full border border-gray-200 dark:border-white/[0.08] hover:border-brand-red/50 dark:hover:border-brand-red/50 shadow-md hover:shadow-xl bg-white dark:bg-[#111318]">
      
      {/* 1. Top Image Container */}
      <Link href={tourDetailUrl} className="relative h-44 sm:h-48 w-full overflow-hidden bg-black block shrink-0">
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
        />
        {/* Subtle Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40" />

        {/* Floating Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 z-10">
          <span className="bg-brand-red text-white text-[10px] font-black font-display px-2.5 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1 shadow-md">
            {isBike ? <Bike className="w-3 h-3" /> : <Car className="w-3 h-3" />}
            <span>{isBike ? "Adv Bike Ride" : "4x4 SUV Convoy"}</span>
          </span>

          <span className="bg-black/75 backdrop-blur-md border border-white/20 text-white text-[9px] font-mono px-2 py-0.5 rounded-md font-semibold">
            {statusInfo.label}
          </span>
        </div>

        {/* Floating Bottom Info Strip */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 z-10">
          <div className="bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white font-bold flex items-center gap-1 border border-white/15">
            <MapPin className="w-3 h-3 text-brand-red" />
            <span>{tour.destinationName}</span>
          </div>

          <div className="bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white font-mono font-bold border border-white/15 flex items-center gap-1">
            <Clock className="w-3 h-3 text-brand-red" />
            <span>{tour.durationDays}D / {tour.durationNights}N</span>
          </div>
        </div>
      </Link>

      {/* 2. Content Body */}
      <div className="p-4 sm:p-4.5 flex flex-col justify-between flex-1 space-y-3 text-left">
        <div className="space-y-2">
          
          {/* Sub Header / Fleet & Permit */}
          <div className="flex items-center justify-between gap-1.5 flex-wrap">
            <span className="text-[10px] uppercase tracking-wider font-bold text-brand-red font-mono flex items-center gap-1 truncate">
              {tour.vehicleProvided || (isBike ? "RE Himalayan 450" : "Mahindra Thar 4x4")}
            </span>
            <span className="text-[9px] uppercase tracking-wider font-semibold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/25">
              ✓ ILP Included
            </span>
          </div>

          {/* Tour Title */}
          <Link href={tourDetailUrl} className="block group-hover:text-brand-red transition-colors">
            <h3 className="text-sm sm:text-base font-bold font-display tracking-tight text-gray-900 dark:text-white uppercase line-clamp-2 leading-snug">
              {tour.title}
            </h3>
          </Link>

          {/* Route Circuit Strip */}
          <div className="py-1 px-2 bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/[0.06] rounded text-[10px] text-gray-600 dark:text-zinc-400 truncate font-mono">
            {tour.route}
          </div>

          {/* Highlights Checklist (Concise 2 lines) */}
          <div className="space-y-1 pt-0.5">
            {tour.shortHighlights.slice(0, 2).map((hl, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-[11px] text-gray-700 dark:text-zinc-300 leading-tight">
                <CheckCircle2 className="w-3 h-3 text-brand-red shrink-0 mt-0.5" />
                <span className="line-clamp-1">{hl}</span>
              </div>
            ))}
          </div>

          {/* Seat Capacity Progress Bar */}
          <div className="space-y-1 pt-1 border-t border-gray-200 dark:border-white/[0.06]">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="flex items-center gap-1 text-gray-700 dark:text-zinc-300">
                <Users className="w-3 h-3 text-brand-red" />
                <span>{seatsRemaining} spots available</span>
              </span>
              <span className="text-gray-500 dark:text-zinc-500">{percentBooked}% Filled</span>
            </div>
            <div className="h-1 w-full bg-gray-200 dark:bg-black/60 rounded-full overflow-hidden">
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
        <div className="space-y-2 pt-1 border-t border-gray-100 dark:border-white/[0.06]">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-lg sm:text-xl font-bold font-display tracking-tight text-gray-900 dark:text-white">
                {formatINR(tour.pricePerPerson)}
              </span>
              <span className="text-[10px] text-gray-500 dark:text-zinc-400 font-normal ml-1">/ person</span>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">All-Inclusive</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <Link
              href={tourDetailUrl}
              className="w-full py-2 px-2 bg-brand-red hover:bg-brand-red-hover text-white text-[10px] sm:text-[11px] font-bold font-display uppercase tracking-wider rounded-lg flex items-center justify-center gap-1 transition-all shadow-sm hover:scale-[1.01] text-center"
            >
              <span>Book Spot</span>
              <ArrowRight className="w-3 h-3" />
            </Link>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] sm:text-[11px] font-bold font-display uppercase tracking-wider rounded-lg flex items-center justify-center gap-1 transition-colors text-center shadow-sm hover:scale-[1.01]"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
