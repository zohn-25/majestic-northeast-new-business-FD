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
import { PaintBrushDivider } from "@/components/ui/PaintBrushDivider";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  User,
  HelpCircle,
} from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/utils";
import { CustomSelect, OptionItem } from "@/components/ui/CustomSelect";

export default function ContactPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    category: "vehicle-rental",
    message: "",
  });

  const serviceOptions: OptionItem[] = [
    { value: "vehicle-rental", label: "4x4 SUV Convoy Trip", subLabel: "Mahindra Thar & Fortuner Convoys" },
    { value: "shared-tour", label: "Motorcycle Bike Expedition", subLabel: "RE Himalayan 450 with Support Van" },
    { value: "custom-itinerary", label: "Custom Private Road Trip", subLabel: "Tailored family & corporate groups" },
    { value: "ilp-permits", label: "ILP Permit Assistance", subLabel: "Arunachal & Nagaland permits" },
  ];

  const whatsAppUrl = buildWhatsAppUrl("919876543210", "Hi Majestic Northeast! I am contacting you via website for trip assistance.");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#0B0C0E] text-gray-900 dark:text-white flex flex-col justify-between transition-colors duration-300">
      <Header onOpenEnquire={() => setModalOpen(true)} />

      <div className="flex-1 space-y-0">
        {/* Full-Bleed Hero Header with Zoom-Out Background */}
        <section className="relative pt-40 sm:pt-48 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black text-left text-white">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=2000&q=80"
              alt="Contact Majestic Northeast Expeditions"
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
                <Phone className="w-3.5 h-3.5" />
                We&apos;re Here To Help
              </span>
              <span className="text-xs text-brand-red font-bold font-display uppercase tracking-wider bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-brand-red/30 shadow-md">
                ● 24/7 Expedition Assistance
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-white tracking-wide uppercase leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              CONTACT OUR TRIP DESK
            </h1>
            <p className="text-white/95 text-xs sm:text-sm lg:text-base max-w-2xl font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Have questions about upcoming expedition dates, Inner Line Permits, 4x4 Thar convoy seats, or motorcycle rides? Connect with us directly.
            </p>
          </div>
        </section>

        {/* Contact Grid Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
            {/* Left: Contact Details & Office */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="card-dark p-8 rounded-2xl border border-gray-200 dark:border-white/15 space-y-6 shadow-xl">
                <div className="space-y-2">
                  <span className="text-xs font-bold font-display text-brand-red uppercase tracking-widest block">
                    Head Office
                  </span>
                  <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white uppercase tracking-wide">
                    Guwahati Hub Depot
                  </h3>
                </div>

                <ul className="space-y-4 text-xs text-gray-600 dark:text-white/70 font-normal">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-gray-900 dark:text-white block font-bold font-display uppercase">Address:</strong>
                      GS Road, Opposite Supermarket, Dispur, Guwahati, Assam 781006
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-gray-900 dark:text-white block font-bold font-display uppercase">Working Hours:</strong>
                      Mon – Sun: 07:00 AM – 10:00 PM (24/7 Phone Support)
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-gray-900 dark:text-white block font-bold font-display uppercase">Phone Inquiries:</strong>
                      +91 98765 43210 / +91 98765 43211
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-gray-900 dark:text-white block font-bold font-display uppercase">Email:</strong>
                      booking@majesticnortheast.com
                    </span>
                  </li>
                </ul>

                <div className="pt-2">
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-display uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat Directly on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <div className="card-dark p-8 rounded-2xl border border-gray-200 dark:border-white/15 shadow-xl text-left">
                {submitted ? (
                  <div className="py-12 text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-600 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-2xl font-bold font-display text-gray-900 dark:text-white uppercase tracking-wide">
                        Message Sent Successfully!
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-white/70 max-w-md mx-auto leading-relaxed">
                        Thank you for contacting Majestic Northeast. An expedition coordinator will contact you via WhatsApp or phone shortly.
                      </p>
                    </div>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-8 py-3 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold font-display uppercase tracking-widest rounded-xl shadow-glow-red"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white uppercase tracking-wide">
                        Send An Expedition Enquiry
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-white/60">
                        Fill in your expedition preferences and our team will get back to you within 30 minutes.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold font-display text-gray-900 dark:text-white uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Vikramaditya Roy"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full bg-gray-50 dark:bg-black/80 border border-gray-300 dark:border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-brand-red"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold font-display text-gray-900 dark:text-white uppercase tracking-wider mb-1.5">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-gray-50 dark:bg-black/80 border border-gray-300 dark:border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-brand-red"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold font-display text-gray-900 dark:text-white uppercase tracking-wider mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-gray-50 dark:bg-black/80 border border-gray-300 dark:border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-brand-red"
                        />
                      </div>

                      {/* Custom Dropdown for Service Needed */}
                      <div>
                        <label className="block text-xs font-bold font-display text-gray-900 dark:text-white uppercase tracking-wider mb-1.5">
                          Service Needed *
                        </label>
                        <CustomSelect
                          options={serviceOptions}
                          value={formData.category}
                          onChange={(val) => setFormData({ ...formData, category: val })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold font-display text-gray-900 dark:text-white uppercase tracking-wider mb-1.5">
                        Your Trip Requirement / Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Tell us your travel dates, preferred vehicle, or group size..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-gray-50 dark:bg-black/80 border border-gray-300 dark:border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-brand-red"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold font-display uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all shadow-glow-red hover:scale-[1.01]"
                    >
                      <Send className="w-4 h-4" />
                      Submit Trip Enquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialMode="car"
      />
      <WhatsAppFloating />
      <StickyMobileBar onOpenEnquire={() => setModalOpen(true)} />
      <Footer />
    </main>
  );
}
