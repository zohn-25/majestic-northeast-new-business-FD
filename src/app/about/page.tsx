"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { WhatsAppFloating } from "@/components/WhatsAppFloating";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EnquiryModal } from "@/components/EnquiryModal";
import {
  Compass,
  ShieldCheck,
  Users,
  MapPin,
  Award,
  Clock,
  Car,
  CheckCircle2,
  MessageCircle,
  Phone,
  ArrowRight,
  Bike,
  Wrench,
  Truck,
} from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/utils";

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const whatsAppUrl = buildWhatsAppUrl("919876543210", "Hi Majestic Northeast team! I'd like to learn more about upcoming expeditions.");

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#0B0C0E] text-gray-900 dark:text-white flex flex-col justify-between transition-colors duration-300">
      <Header onOpenEnquire={() => setModalOpen(true)} />

      <div className="flex-1">
        {/* Full-Bleed Hero Header with Zoom-Out Background */}
        <section className="relative pt-40 sm:pt-48 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black text-left text-white">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=80"
              alt="Majestic Northeast Adventure Expeditions"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-[0.88] contrast-[1.08] animate-zoom-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#0B0C0E] via-black/20 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto space-y-4">
            <div className="flex items-center gap-2">
              <span className="brush-badge flex items-center gap-1.5 shadow-lg shadow-brand-red/40">
                <Compass className="w-3.5 h-3.5" />
                Our Story & Mission
              </span>
              <span className="text-xs text-brand-red font-bold font-display uppercase tracking-wider bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-brand-red/30 shadow-md">
                ● Pioneers in Northeast Overlanding
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-white tracking-wide uppercase leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              TRUSTED EXPEDITION PARTNER
            </h1>
            <p className="text-white/95 text-xs sm:text-sm lg:text-base max-w-2xl font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Born in Guwahati and raised on the winding high-altitude mountain passes of Arunachal, Meghalaya, Sikkim & Nagaland. We deliver all-inclusive guided 4x4 SUV and Royal Enfield Himalayan 450 group convoys.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-white/90 pt-1 font-semibold font-display">
              <span className="flex items-center gap-1.5 text-brand-red bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <Truck className="w-4 h-4" /> Luggage Truck Escort
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <Wrench className="w-4 h-4" /> Master Mechanic Support
              </span>
              <span className="flex items-center gap-1.5 text-blue-400 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <ShieldCheck className="w-4 h-4" /> 100% Guaranteed Permits
              </span>
            </div>
          </div>
        </section>

        {/* Story & Vision Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 relative h-80 sm:h-[420px] rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
                alt="Convoy on Northeast mountain roads"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-red font-display">
                  Rooted in the Mountains
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold font-display uppercase leading-tight">
                  Overlanding Across the Unexplored Himalayas
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-white/80 leading-relaxed font-normal">
                Traveling across Northeast India requires more than just a vehicle — it demands experienced mountain road marshals, local Inner Line Permit knowledge, commercial transport permits, and comprehensive mechanical convoy support.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-white/80 leading-relaxed font-normal">
                We operate modern Mahindra Thar 4x4s, Toyota Fortuners, and Royal Enfield Himalayan 450s accompanied by our dedicated luggage truck and master mechanics, ensuring every adventurer returns with lifelong memories.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="card-dark p-4 rounded-2xl border border-gray-200 dark:border-white/10">
                  <span className="text-2xl sm:text-3xl font-bold font-display text-brand-red block">10,000+</span>
                  <span className="text-xs text-gray-500 dark:text-white/60 font-semibold uppercase">Happy Adventurers</span>
                </div>
                <div className="card-dark p-4 rounded-2xl border border-gray-200 dark:border-white/10">
                  <span className="text-2xl sm:text-3xl font-bold font-display text-brand-red block">8 States</span>
                  <span className="text-xs text-gray-500 dark:text-white/60 font-semibold uppercase">100% Northeast Coverage</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
      <StickyMobileBar onOpenEnquire={() => setModalOpen(true)} />
      <WhatsAppFloating />

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </main>
  );
}
