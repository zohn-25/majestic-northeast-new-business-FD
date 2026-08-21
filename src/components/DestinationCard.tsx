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
      className="group relative h-80 rounded overflow-hidden border border-brand-border hover:border-brand-red transition-all duration-300 block flex flex-col justify-end p-6 hover:shadow-2xl bg-brand-dark"
    >
      {/* Background Image */}
      <Image
        src={destination.coverImage}
        alt={destination.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent group-hover:from-black/90 transition-colors" />

      {/* Top Left Badge */}
      <div className="absolute top-4 left-4">
        <span className="bg-brand-red text-white text-[10px] font-extrabold font-display px-2.5 py-1 rounded-sm uppercase tracking-widest flex items-center gap-1.5 shadow-md">
          <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
          {destination.stateName}
        </span>
      </div>

      {/* Top Right Arrow Box */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded bg-black/80 border border-white/20 text-white flex items-center justify-center group-hover:bg-brand-red group-hover:border-brand-red transition-colors shadow-md">
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.5} />
      </div>

      {/* Card Body */}
      <div className="relative z-10 space-y-2 text-left">
        <h3 className="text-2xl font-extrabold font-display text-white group-hover:text-brand-red transition-colors uppercase">
          {destination.name}
        </h3>
        <p className="text-xs text-white/80 line-clamp-2 leading-relaxed font-normal">
          {destination.tagline}
        </p>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 pt-2 border-t border-white/15 text-xs text-white/70 font-semibold">
          <span className="flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-brand-red" strokeWidth={1.5} />
            {destination.availableTourIds.length} Tours
          </span>
          <span className="flex items-center gap-1">
            <Car className="w-3.5 h-3.5 text-brand-red" strokeWidth={1.5} />
            {destination.availableVehicleIds.length} Rentals
          </span>
        </div>
      </div>
    </Link>
  );
}
