"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Car, Bike, CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/utils";

interface StickyMobileBarProps {
  onOpenEnquire?: (mode?: "car" | "bike") => void;
}

export function StickyMobileBar({ onOpenEnquire }: StickyMobileBarProps) {
  const pathname = usePathname();
  const whatsAppUrl = buildWhatsAppUrl("919876543210", "Hi Majestic Northeast! I want to join an upcoming 4x4 Car Trip / Bike Expedition.");

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

      {/* Reference-Inspired Floating Mobile Bottom Navigation Dock */}
      <nav aria-label="Mobile Bottom Navigation" className="lg:hidden fixed bottom-3 left-4 right-4 z-40">
        <div className="bg-[#111317]/95 dark:bg-[#111317]/95 backdrop-blur-2xl border border-white/15 rounded-full px-4 py-2 shadow-[0_10px_35px_rgba(0,0,0,0.8)] flex items-center justify-between max-w-md mx-auto">
          {/* Item 1: Home */}
          <Link
            href="/"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold font-display transition-all ${
              pathname === "/"
                ? "bg-brand-red text-white shadow-md shadow-brand-red/30"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>

          {/* Item 2: 4x4 Convoys */}
          <Link
            href="/rentals"
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-lg text-[10px] font-bold font-display uppercase tracking-wider transition-all ${
              pathname === "/rentals"
                ? "text-brand-red"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Car className="w-4 h-4" />
            <span>4x4 Trips</span>
          </Link>

          {/* Item 3: Bike Rides */}
          <Link
            href="/bikes"
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-lg text-[10px] font-bold font-display uppercase tracking-wider transition-all ${
              pathname === "/bikes"
                ? "text-brand-red"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Bike className="w-4 h-4" />
            <span>Bikes</span>
          </Link>

          {/* Item 4: Book Trip Action */}
          <button
            type="button"
            onClick={() => onOpenEnquire?.("car")}
            className="flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-lg text-[10px] font-bold font-display uppercase tracking-wider text-white/90 hover:text-brand-red transition-all"
          >
            <div className="relative">
              <CalendarCheck className="w-4 h-4 text-brand-red" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span>Book</span>
          </button>
        </div>
      </nav>
    </>
  );
}
