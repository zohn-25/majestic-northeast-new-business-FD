"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Vehicle } from "@/lib/types";
import { formatINR, getAvailabilityStatus, buildWhatsAppUrl } from "@/lib/utils";
import { Users, Fuel, Gauge, Shield, MessageCircle, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

interface VehicleCardProps {
  vehicle: Vehicle;
  onEnquire?: (vehicle: Vehicle) => void;
}

export function VehicleCard({ vehicle, onEnquire }: VehicleCardProps) {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const statusInfo = getAvailabilityStatus(vehicle.bookedUnits, vehicle.totalUnits);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev + 1) % vehicle.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
  };

  const whatsAppText = `Hi Majestic Northeast! I'm interested in renting the ${vehicle.name} (₹${vehicle.rentalPricePerDay}/day). Could you please share availability and details?`;
  const whatsAppUrl = buildWhatsAppUrl("919876543210", whatsAppText);

  return (
    <div className="card-dark group text-white rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 h-full border border-gray-200 dark:border-white/[0.08] hover:border-brand-red/50 dark:hover:border-brand-red/50 shadow-md hover:shadow-xl bg-white dark:bg-[#111318]">
      
      {/* Top Image Container */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-black shrink-0">
        <Image
          src={vehicle.images[currentImgIdx] || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80"}
          alt={vehicle.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40" />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 z-10">
          <span className="bg-brand-red text-white text-[10px] font-black font-display px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-md">
            {vehicle.type}
          </span>
          <span className="bg-black/75 backdrop-blur-md border border-white/20 text-white text-[9px] font-mono px-2 py-0.5 rounded-md font-semibold">
            {statusInfo.label}
          </span>
        </div>

        {/* Carousel arrows */}
        {vehicle.images.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              onClick={prevImage}
              aria-label="Previous image"
              className="w-7 h-7 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-brand-red transition-colors shadow-lg"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={nextImage}
              aria-label="Next image"
              className="w-7 h-7 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-brand-red transition-colors shadow-lg"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Deposit Tag */}
        <div className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white/90 font-mono font-medium flex items-center gap-1 z-10 border border-white/15">
          <Shield className="w-3 h-3 text-brand-red" />
          <span>Deposit: {formatINR(vehicle.securityDeposit)}</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-4.5 flex flex-col justify-between flex-1 space-y-3 text-left">
        <div className="space-y-2">
          
          <div className="flex items-center justify-between gap-1.5 flex-wrap">
            <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-brand-red">
              {vehicle.category === "car" ? "Self-Drive 4x4 SUV" : "Dual-Sport Adv Bike"}
            </span>
            <span className="text-[9px] uppercase tracking-wider font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/25 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Yellow-Board
            </span>
          </div>

          <h3 className="text-sm sm:text-base font-bold font-display text-gray-900 dark:text-white group-hover:text-brand-red transition-colors uppercase line-clamp-1">
            {vehicle.name}
          </h3>

          <p className="text-[11px] text-gray-600 dark:text-zinc-400 line-clamp-1 leading-tight font-normal">
            {vehicle.tagline}
          </p>

          {/* Specs Grid */}
          <div className="grid grid-cols-3 gap-1.5 py-2 border-y border-gray-100 dark:border-white/[0.06] text-xs">
            <div className="bg-gray-50 dark:bg-black/40 p-1.5 rounded text-center border border-gray-200 dark:border-white/[0.06]">
              <Users className="w-3 h-3 text-brand-red mx-auto mb-0.5" />
              <span className="font-mono block text-gray-900 dark:text-zinc-200 text-[10px]">{vehicle.seatingCapacity} Seats</span>
            </div>
            <div className="bg-gray-50 dark:bg-black/40 p-1.5 rounded text-center border border-gray-200 dark:border-white/[0.06]">
              <Gauge className="w-3 h-3 text-brand-red mx-auto mb-0.5" />
              <span className="font-mono block text-gray-900 dark:text-zinc-200 text-[10px] truncate">{vehicle.transmission}</span>
            </div>
            <div className="bg-gray-50 dark:bg-black/40 p-1.5 rounded text-center border border-gray-200 dark:border-white/[0.06]">
              <Fuel className="w-3 h-3 text-brand-red mx-auto mb-0.5" />
              <span className="font-mono block text-gray-900 dark:text-zinc-200 text-[10px] truncate">{vehicle.fuelType}</span>
            </div>
          </div>
        </div>

        {/* Pricing & Action Buttons */}
        <div className="space-y-2 pt-1 border-t border-gray-100 dark:border-white/[0.06]">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-lg sm:text-xl font-bold font-display tracking-tight text-gray-900 dark:text-white">
                {formatINR(vehicle.rentalPricePerDay)}
              </span>
              <span className="text-[10px] text-gray-500 dark:text-zinc-400 font-normal ml-1">/ day</span>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">Min {vehicle.minDurationDays} {vehicle.minDurationDays === 1 ? "day" : "days"}</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {onEnquire ? (
              <button
                onClick={() => onEnquire(vehicle)}
                className="w-full py-2 px-2 bg-brand-red hover:bg-brand-red-hover text-white text-[10px] sm:text-[11px] font-bold font-display uppercase tracking-wider rounded-lg flex items-center justify-center gap-1 transition-all shadow-sm hover:scale-[1.01]"
              >
                <span>Enquire</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            ) : (
              <Link
                href={`/rentals#${vehicle.id}`}
                className="w-full py-2 px-2 bg-brand-red hover:bg-brand-red-hover text-white text-[10px] sm:text-[11px] font-bold font-display uppercase tracking-wider rounded-lg flex items-center justify-center gap-1 transition-all shadow-sm hover:scale-[1.01] text-center"
              >
                <span>Book Fleet</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
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
