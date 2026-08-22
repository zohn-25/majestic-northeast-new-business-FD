"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, MapPin, Car, CalendarCheck, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/utils";

interface StickyMobileBarProps {
  onOpenEnquire?: (mode?: "rental" | "tour") => void;
}

export function StickyMobileBar({ onOpenEnquire }: StickyMobileBarProps) {
  const pathname = usePathname();
  const whatsAppUrl = buildWhatsAppUrl(
    "919876543210",
    "Hi Majestic Northeast! I want to join an upcoming 4x4 Car Trip / Bike Expedition."
  );

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      {/* Floating WhatsApp Action Button (Mobile Only) */}
      <aside aria-label="Quick WhatsApp Contact" className="lg:hidden fixed bottom-20 right-4 z-40">
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-13 h-13 p-3 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white rounded-full shadow-[0_8px_25px_rgba(16,185,129,0.5)] flex items-center justify-center transition-transform border-2 border-white/20"
        >
          <MessageCircle className="w-6 h-6 fill-white text-emerald-500" />
        </a>
      </aside>

      {/* Floating Mobile Bottom Navigation Dock */}
      <nav aria-label="Mobile Bottom Navigation" className="lg:hidden fixed bottom-3 left-3 right-3 z-40">
        <div className="bg-[#0B0C0E]/95 dark:bg-[#0B0C0E]/95 backdrop-blur-2xl border border-white/15 rounded-full px-3 py-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.8)] flex items-center justify-between max-w-md mx-auto">
          {/* Item 1: Home */}
          <Link
            href="/"
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-full text-[10px] font-bold font-display uppercase tracking-wider transition-all ${
              isActive("/")
                ? "text-brand-red font-black"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Home className={`w-4 h-4 ${isActive("/") ? "text-brand-red" : "text-white/60"}`} />
            <span>Home</span>
          </Link>

          {/* Item 2: Group Tours */}
          <Link
            href="/tours"
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-full text-[10px] font-bold font-display uppercase tracking-wider transition-all ${
              isActive("/tours")
                ? "text-brand-red font-black"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Compass className={`w-4 h-4 ${isActive("/tours") ? "text-brand-red" : "text-white/60"}`} />
            <span>Tours</span>
          </Link>

          {/* Item 3: 8 States / Destinations */}
          <Link
            href="/destinations"
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-full text-[10px] font-bold font-display uppercase tracking-wider transition-all ${
              isActive("/destinations")
                ? "text-brand-red font-black"
                : "text-white/70 hover:text-white"
            }`}
          >
            <MapPin className={`w-4 h-4 ${isActive("/destinations") ? "text-brand-red" : "text-white/60"}`} />
            <span>States</span>
          </Link>

          {/* Item 4: 4x4 & Bike Rentals */}
          <Link
            href="/rentals"
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-full text-[10px] font-bold font-display uppercase tracking-wider transition-all ${
              isActive("/rentals")
                ? "text-brand-red font-black"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Car className={`w-4 h-4 ${isActive("/rentals") ? "text-brand-red" : "text-white/60"}`} />
            <span>Fleet</span>
          </Link>

          {/* Item 5: Book Action */}
          <button
            type="button"
            onClick={() => onOpenEnquire?.("tour")}
            className="flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-full text-[10px] font-bold font-display uppercase tracking-wider text-white bg-brand-red hover:bg-brand-red-hover shadow-sm transition-all"
          >
            <CalendarCheck className="w-4 h-4 text-white" />
            <span>Book</span>
          </button>
        </div>
      </nav>
    </>
  );
}
