"use client";

import React, { useState } from "react";
import { GENERAL_FAQS_DATA } from "@/lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(GENERAL_FAQS_DATA[0].id);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#101216] border-t border-gray-200 dark:border-white/10 relative transition-colors duration-300">
      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading
          tag="Got Questions?"
          title="FREQUENTLY ASKED QUESTIONS"
          subtitle="Everything you need to know about joining 4x4 car convoys, motorcycle rides, ILP permits, luggage support, and cancellations."
        />

        <div className="space-y-4 text-left">
          {GENERAL_FAQS_DATA.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="card-dark rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-display font-black text-sm sm:text-base uppercase tracking-wide text-gray-900 dark:text-white hover:text-brand-red dark:hover:text-brand-red transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-brand-red shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 dark:text-white/50 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-brand-red dark:text-brand-red" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-600 dark:text-white/80 leading-relaxed font-normal border-t border-gray-200 dark:border-white/10 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
