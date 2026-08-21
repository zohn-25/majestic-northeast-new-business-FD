"use client";

import React from "react";
import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/utils";

interface StickyMobileBarProps {
  onOpenEnquire?: (mode?: "car" | "bike") => void;
}

export function StickyMobileBar({ onOpenEnquire }: StickyMobileBarProps) {
  const whatsAppUrl = buildWhatsAppUrl("919876543210", "Hi Majestic Northeast! I want to join an upcoming 4x4 Car Trip / Bike Expedition.");

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E1013]/95 backdrop-blur-xl border-t border-white/15 p-2.5 shadow-2xl">
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        <a
          href="tel:+919876543210"
          className="py-2.5 px-2 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-black font-display uppercase tracking-wider flex flex-col items-center justify-center gap-1 transition-colors border border-white/10 text-center"
        >
          <Phone className="w-4 h-4 text-brand-red" />
          <span className="text-[10px]">Call Now</span>
        </a>

        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-black font-display uppercase tracking-wider flex flex-col items-center justify-center gap-1 transition-all shadow-md text-center"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-[10px]">WhatsApp</span>
        </a>

        <button
          onClick={() => onOpenEnquire?.("car")}
          className="py-2.5 px-2 bg-brand-red hover:bg-brand-red-hover text-white rounded text-xs font-black font-display uppercase tracking-wider flex flex-col items-center justify-center gap-1 transition-all shadow-md shadow-brand-red/30 text-center"
        >
          <CalendarCheck className="w-4 h-4" />
          <span className="text-[10px]">Book Trip</span>
        </button>
      </div>
    </div>
  );
}
