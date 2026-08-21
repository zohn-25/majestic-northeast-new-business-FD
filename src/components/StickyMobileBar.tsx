"use client";

import React from "react";
import { Phone, MessageCircle, CalendarCheck, ArrowRight } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/utils";

interface StickyMobileBarProps {
  onOpenEnquire?: (mode?: "car" | "bike") => void;
}

export function StickyMobileBar({ onOpenEnquire }: StickyMobileBarProps) {
  const whatsAppUrl = buildWhatsAppUrl("919876543210", "Hi Majestic Northeast! I want to join an upcoming 4x4 Car Trip / Bike Expedition.");

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E1013]/95 backdrop-blur-2xl border-t border-white/15 px-4 py-2.5 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] pb-[calc(0.65rem+env(safe-area-inset-bottom,0px))]">
      <div className="max-w-md mx-auto flex items-center gap-2.5">
        {/* Quick Phone Call Icon */}
        <a
          href="tel:+919876543210"
          aria-label="Call Trip Desk"
          className="w-11 h-11 bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-xl flex items-center justify-center transition-all border border-white/15 shrink-0 shadow-sm"
        >
          <Phone className="w-4 h-4 text-brand-red" />
        </a>

        {/* Quick WhatsApp Icon */}
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Trip Desk"
          className="w-11 h-11 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-xl flex items-center justify-center transition-all shadow-md shadow-emerald-900/40 shrink-0"
        >
          <MessageCircle className="w-5 h-5" />
        </a>

        {/* Primary Book Expedition CTA */}
        <button
          onClick={() => onOpenEnquire?.("car")}
          className="flex-1 h-11 bg-brand-red hover:bg-brand-red-hover active:scale-[0.98] text-white rounded-xl text-xs font-bold font-display uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-red/40 px-3"
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Book Group Trip</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
