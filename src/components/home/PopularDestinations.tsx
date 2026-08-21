import React from "react";
import Link from "next/link";
import { DESTINATIONS_DATA } from "@/lib/data";
import { DestinationCard } from "../DestinationCard";
import { SectionHeading } from "../ui/SectionHeading";
import { MapPin, ArrowRight } from "lucide-react";

export function PopularDestinations() {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#0B0C0E] border-t border-gray-200 dark:border-white/10 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          tag="The 8 Sister States"
          title="DISCOVER NORTHEAST DESTINATIONS"
          subtitle="From the cascading waterfalls and living root bridges of Meghalaya to snow peaks in Arunachal Pradesh and tea estates in Assam."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
    </section>
  );
}
