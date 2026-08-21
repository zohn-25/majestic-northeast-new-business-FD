"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/utils";

export function WhatsAppFloating() {
  const whatsAppUrl = buildWhatsAppUrl("919876543210", "Hi Majestic Northeast! I need quick assistance with booking.");

  return (
    <a
      href={whatsAppUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="hidden lg:flex fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-500/50 hover:bg-emerald-400 items-center justify-center transition-all hover:scale-110 group border-2 border-white/20"
    >
      <MessageCircle className="w-7 h-7" strokeWidth={1.5} />
      <span className="absolute right-16 top-2 bg-brand-surface text-brand-text-primary text-xs font-semibold px-3.5 py-2 rounded-xl border border-brand-border whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
        Chat with Trip Expert 👋
      </span>
    </a>
  );
}
