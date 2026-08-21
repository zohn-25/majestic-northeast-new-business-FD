"use client";

import React, { useState } from "react";
import { HOW_IT_WORKS_STEPS } from "@/lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { Car, Bike, ArrowRight } from "lucide-react";

export function HowItWorks() {
  const [tab, setTab] = useState<"cars" | "bikes">("cars");
  const steps = HOW_IT_WORKS_STEPS[tab];

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#0B0C0E] border-t border-gray-200 dark:border-white/10 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          tag="Simple 4-Step Process"
          title="HOW OUR GROUP EXPEDITIONS WORK"
          subtitle="Everything you need to know about joining a 4x4 SUV Convoy Trip or a guided Motorcycle Mountain Ride."
        />

        {/* Tab Switcher */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex p-1.5 bg-white dark:bg-black/60 border border-gray-200 dark:border-white/10 rounded-lg shadow-sm">
            <button
              onClick={() => setTab("cars")}
              className={`px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 font-display ${
                tab === "cars"
                  ? "bg-brand-red text-white shadow-md shadow-brand-red/30"
                  : "text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Car className="w-4 h-4" />
              4x4 Car Convoy Steps
            </button>
            <button
              onClick={() => setTab("bikes")}
              className={`px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 font-display ${
                tab === "bikes"
                  ? "bg-brand-red text-white shadow-md shadow-brand-red/30"
                  : "text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Bike className="w-4 h-4" />
              Bike Expedition Steps
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="card-dark rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between group text-left"
            >
              {/* Step Number Backdrop */}
              <span className="absolute -top-4 -right-2 text-7xl font-black font-display text-gray-900/[0.04] dark:text-white/[0.04] group-hover:text-brand-red/10 transition-colors pointer-events-none">
                0{item.step}
              </span>

              <div className="space-y-4 relative z-10">
                <div className="w-10 h-10 rounded-lg bg-brand-red text-white font-black font-display flex items-center justify-center text-sm shadow-md">
                  0{item.step}
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-display text-gray-900 dark:text-white group-hover:text-brand-red dark:group-hover:text-brand-red transition-colors uppercase leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-white/70 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3.5 -translate-y-1/2 z-20">
                  <div className="w-7 h-7 rounded-full bg-white dark:bg-[#131518] border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white flex items-center justify-center text-xs shadow-lg">
                    <ArrowRight className="w-3.5 h-3.5 text-brand-red" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
