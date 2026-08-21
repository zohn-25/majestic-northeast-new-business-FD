import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { CheckCircle2, ShieldCheck, PhoneCall, Award, Clock, FileCheck, Wrench, Truck, Users } from "lucide-react";

export function WhyChooseUs() {
  const bulletFeatures = [
    "DEDICATED LUGGAGE TRUCK & EMERGENCY BACKUP CREW",
    "ROYAL ENFIELD & 4x4 MASTER MECHANIC ON EVERY TRIP",
    "100% INNER LINE PERMIT (ILP) & MILITARY CLEARANCES",
    "HANDPICKED 3-STAR MOUNTAIN STAYS & RIVERSIDE GLAMPING",
    "CERTIFIED NATIVE TRIP CAPTAINS & HIGH-PASS MARSHALS",
    "WALKIE-TALKIE RADIO CONVOY ON ALL 4x4 EXPEDITIONS",
  ];

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#101216] border-t border-gray-200 dark:border-white/10 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Text & Checkmark List */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="space-y-3">
            <span className="brush-badge text-xs font-black uppercase">
              Guided Expedition Safety & Support
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-gray-900 dark:text-white uppercase tracking-tight leading-[0.95]">
              FULL CONVOY BACKUP, <br />
              <span className="text-brand-red">ZERO MOUNTAIN WORRIES.</span>
            </h2>
            <p className="text-gray-600 dark:text-white/80 text-sm leading-relaxed font-normal pt-1">
              Whether you are driving in our 4x4 Thar convoy or riding a Royal Enfield Himalayan 450 across Sela Pass (13,700 ft), our dedicated backup mechanic van, emergency oxygen support, and certified road marshals escort your group from start to finish.
            </p>
          </div>

          {/* Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {bulletFeatures.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-2.5 bg-gray-50 dark:bg-black/50 p-3.5 rounded-lg border border-gray-200 dark:border-white/10 text-xs font-bold text-gray-800 dark:text-white uppercase font-display"
              >
                <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-3">
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-black font-display uppercase tracking-widest rounded-lg transition-all shadow-glow-red hover:scale-[1.02]"
            >
              <PhoneCall className="w-4 h-4" />
              Speak To Expedition Lead (+91 98765 43210)
            </a>
          </div>
        </div>

        {/* Right Column: Key Stats / Pillars */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          <div className="card-dark p-6 rounded-2xl text-center space-y-2">
            <Truck className="w-8 h-8 text-brand-red mx-auto" />
            <span className="text-3xl sm:text-4xl font-black font-display text-gray-900 dark:text-white block">100%</span>
            <span className="text-[11px] font-black font-display text-gray-500 dark:text-white/70 uppercase tracking-wider block">Backup Van Escort</span>
          </div>

          <div className="card-dark p-6 rounded-2xl text-center space-y-2">
            <Wrench className="w-8 h-8 text-brand-red mx-auto" />
            <span className="text-3xl sm:text-4xl font-black font-display text-gray-900 dark:text-white block">24/7</span>
            <span className="text-[11px] font-black font-display text-gray-500 dark:text-white/70 uppercase tracking-wider block">Mechanic on Trip</span>
          </div>

          <div className="card-dark p-6 rounded-2xl text-center space-y-2">
            <Users className="w-8 h-8 text-brand-red mx-auto" />
            <span className="text-3xl sm:text-4xl font-black font-display text-gray-900 dark:text-white block">10–12</span>
            <span className="text-[11px] font-black font-display text-gray-500 dark:text-white/70 uppercase tracking-wider block">Small Batch Size</span>
          </div>

          <div className="card-dark p-6 rounded-2xl text-center space-y-2">
            <FileCheck className="w-8 h-8 text-brand-red mx-auto" />
            <span className="text-3xl sm:text-4xl font-black font-display text-gray-900 dark:text-white block">Free</span>
            <span className="text-[11px] font-black font-display text-gray-500 dark:text-white/70 uppercase tracking-wider block">ILP Processing</span>
          </div>
        </div>
      </div>
    </section>
  );
}
