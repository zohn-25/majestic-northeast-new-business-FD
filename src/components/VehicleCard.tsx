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
  featuredLayout?: boolean;
}

export function VehicleCard({ vehicle, onEnquire, featuredLayout = false }: VehicleCardProps) {
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
    <div className={`card-dark group text-white rounded-xl overflow-hidden flex flex-col justify-between ${featuredLayout ? "md:col-span-2 md:flex-row md:items-stretch" : ""}`}>
      {/* Image Container */}
      <div className={`relative h-64 w-full overflow-hidden bg-black ${featuredLayout ? "md:w-1/2 md:h-auto" : ""}`}>
        <Image
          src={vehicle.images[currentImgIdx]}
          alt={vehicle.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131518] via-transparent to-black/40" />

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <span className="bg-brand-red text-white text-[10px] font-black px-2.5 py-1 rounded font-display uppercase tracking-widest shadow-md">
            {vehicle.type}
          </span>
          <span className="bg-black/70 border border-white/20 text-white text-[10px] font-bold font-display px-2.5 py-1 rounded backdrop-blur-md">
            {statusInfo.label}
          </span>
        </div>

        {/* Carousel arrows */}
        {vehicle.images.length > 1 && (
          <div className="absolute inset-y-0 inset-x-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              onClick={prevImage}
              aria-label="Previous image"
              className="w-8 h-8 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-brand-red transition-colors shadow-lg"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={2} />
            </button>
            <button
              onClick={nextImage}
              aria-label="Next image"
              className="w-8 h-8 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-brand-red transition-colors shadow-lg"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        )}

        {/* Deposit Tag */}
        <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-[11px] text-white/90 font-medium flex items-center gap-1.5 z-10 border border-white/15">
          <Shield className="w-3.5 h-3.5 text-brand-red" />
          <span>Deposit: {formatINR(vehicle.securityDeposit)}</span>
        </div>
      </div>

      {/* Content Container */}
      <div className={`p-6 flex flex-col justify-between space-y-6 text-left ${featuredLayout ? "md:w-1/2" : ""}`}>
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest font-black text-brand-red font-display">
                {vehicle.category === "car" ? "Self-Drive 4x4 / SUV" : "Dual-Sport Motorcycle"}
              </span>
              <span className="text-white/30">•</span>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Yellow-Board Permit
              </span>
            </div>
            <h3 className="text-2xl font-black font-display text-white group-hover:text-brand-red transition-colors uppercase line-clamp-1 mt-1">
              {vehicle.name}
            </h3>
            <p className="text-xs text-white/70 line-clamp-2 mt-1.5 leading-relaxed font-normal">
              {vehicle.tagline}
            </p>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-xs">
            <div className="bg-black/50 p-2.5 rounded text-center border border-white/10">
              <Users className="w-4 h-4 text-brand-red mx-auto mb-1" />
              <span className="font-black font-display block text-white text-[11px]">{vehicle.seatingCapacity} Seats</span>
            </div>
            <div className="bg-black/50 p-2.5 rounded text-center border border-white/10">
              <Gauge className="w-4 h-4 text-brand-red mx-auto mb-1" />
              <span className="font-black font-display block text-white text-[11px] truncate">{vehicle.transmission}</span>
            </div>
            <div className="bg-black/50 p-2.5 rounded text-center border border-white/10">
              <Fuel className="w-4 h-4 text-brand-red mx-auto mb-1" />
              <span className="font-black font-display block text-white text-[11px] truncate">{vehicle.fuelType}</span>
            </div>
          </div>
        </div>

        {/* Pricing & Action Buttons */}
        <div className="space-y-4 pt-1">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-black font-display text-white">{formatINR(vehicle.rentalPricePerDay)}</span>
              <span className="text-xs text-white/60 font-normal ml-1">/ day</span>
            </div>
            <span className="text-[11px] text-white/50 font-medium">Min {vehicle.minDurationDays} {vehicle.minDurationDays === 1 ? "day" : "days"}</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {onEnquire && (
              <button
                onClick={() => onEnquire(vehicle)}
                className="w-full py-3 px-3 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-black font-display uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-all shadow-glow-red hover:scale-[1.02]"
              >
                Enquire
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black font-display uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors text-center shadow-md hover:scale-[1.02]"
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
