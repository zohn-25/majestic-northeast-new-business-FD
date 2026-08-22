import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Destination } from "@/lib/types";
import { MapPin, ArrowUpRight, Compass, Car } from "lucide-react";

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/[0.08] hover:border-brand-red dark:hover:border-brand-red transition-all duration-300 block flex flex-col justify-end p-4 sm:p-5 hover:shadow-xl bg-black"
    >
      {/* Background Image */}
      <Image
        src={destination.coverImage}
        alt={destination.name}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent group-hover:from-black/90 transition-colors" />

      {/* Top Left Badge */}
      <div className="absolute top-3 left-3">
        <span className="bg-brand-red text-white text-[9px] sm:text-[10px] font-extrabold font-display px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1 shadow-md">
          <MapPin className="w-3 h-3" strokeWidth={1.5} />
          {destination.stateName}
        </span>
      </div>

      {/* Top Right Arrow Box */}
      <div className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-black/80 border border-white/20 text-white flex items-center justify-center group-hover:bg-brand-red group-hover:border-brand-red transition-colors shadow-md">
        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.5} />
      </div>

      {/* Card Body */}
      <div className="relative z-10 space-y-1.5 text-left">
        <h3 className="text-base sm:text-xl font-bold font-display text-white group-hover:text-brand-red transition-colors uppercase leading-tight">
          {destination.name}
        </h3>
        <p className="text-[11px] text-white/80 line-clamp-1 leading-relaxed font-normal">
          {destination.tagline}
        </p>

        {/* Quick Stats */}
        <div className="flex items-center gap-3 pt-1.5 border-t border-white/15 text-[10px] text-white/75 font-semibold font-mono">
          <span className="flex items-center gap-1">
            <Compass className="w-3 h-3 text-brand-red" strokeWidth={1.5} />
            {destination.availableTourIds.length} Tours
          </span>
          <span className="flex items-center gap-1">
            <Car className="w-3 h-3 text-brand-red" strokeWidth={1.5} />
            {destination.availableVehicleIds.length} Fleet
          </span>
        </div>
      </div>
    </Link>
  );
}
