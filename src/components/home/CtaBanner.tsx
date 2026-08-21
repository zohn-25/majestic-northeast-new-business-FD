"use client";

import React from "react";
import { MessageCircle, Phone, Compass, Car, Bike } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/utils";

interface CtaBannerProps {
  onOpenEnquire?: (mode?: "car" | "bike") => void;
}

export function CtaBanner({ onOpenEnquire }: CtaBannerProps) {
  const whatsAppUrl = buildWhatsAppUrl("919876543210", "Hi Majestic Northeast! I want to join an upcoming 4x4 Car Trip / Bike Expedition.");

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0B0C0E] to-black border-t border-white/10 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-red/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto bg-[#131518] border border-white/15 rounded-2xl p-8 sm:p-16 text-center space-y-8 shadow-2xl relative z-10">
        <div>
          <span className="brush-badge text-xs font-black uppercase">
            Ready For The Mountain Trails?
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-white uppercase tracking-tight leading-[0.95]">
          JOIN A NORTHEAST <br />
          <span className="text-brand-red">GROUP EXPEDITION</span>
        </h2>

        <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
          Need help choosing between a 4x4 Thar SUV convoy or a Royal Enfield Himalayan 450 bike ride to Tawang? Connect directly with our Guwahati expedition marshals via WhatsApp or call us now.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black font-display uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>

          <a
            href="tel:+919876543210"
            className="px-8 py-4 rounded bg-white/10 border border-white/20 hover:bg-white/20 text-white text-xs font-black font-display uppercase tracking-widest transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <Phone className="w-4 h-4 text-brand-red" />
            Call +91 98765 43210
          </a>

          {onOpenEnquire && (
            <button
              onClick={() => onOpenEnquire("car")}
              className="px-8 py-4 rounded bg-brand-red hover:bg-brand-red-hover text-white text-xs font-black font-display uppercase tracking-widest transition-all shadow-glow-red flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <Compass className="w-4 h-4" />
              Instant Trip Booking
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
