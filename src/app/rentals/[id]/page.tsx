"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { VEHICLES_DATA } from "@/lib/data";
import { Vehicle } from "@/lib/types";
import { formatINR, getAvailabilityStatus, buildWhatsAppUrl } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { WhatsAppFloating } from "@/components/WhatsAppFloating";
import { VehicleCard } from "@/components/VehicleCard";
import { BadgeChip } from "@/components/ui/BadgeChip";
import { EnquiryModal } from "@/components/EnquiryModal";
import { CustomSelect } from "@/components/ui/CustomSelect";
import {
  Users,
  Gauge,
  Fuel,
  Shield,
  CheckCircle2,
  XCircle,
  FileCheck2,
  MapPin,
  AlertTriangle,
  Clock,
  MessageCircle,
  Send,
  ArrowLeft,
  ChevronRight,
  User,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";

export default function VehicleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const vehicleId = params.id as string;

  const vehicle = VEHICLES_DATA.find((v) => v.id === vehicleId);

  // States
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [submittedInline, setSubmittedInline] = useState(false);

  // Inline Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    whatsAppNumber: "",
    email: "",
    startDate: "",
    endDate: "",
    pickupLocation: vehicle?.pickupDropLocations[0] || "Guwahati Airport (GAU)",
    dropLocation: vehicle?.pickupDropLocations[0] || "Guwahati Airport (GAU)",
    message: "",
  });

  if (!vehicle) {
    return (
      <main className="min-h-screen bg-brand-dark text-white flex flex-col justify-between pt-24">
        <Header />
        <div className="max-w-md mx-auto text-center py-20 px-4 space-y-4">
          <h1 className="text-3xl font-bold font-display">Vehicle Not Found</h1>
          <p className="text-gray-400 text-sm">
            The requested vehicle does not exist or has been removed from our fleet.
          </p>
          <Link
            href="/rentals"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-orange text-white text-xs font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Vehicle Fleet
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const statusInfo = getAvailabilityStatus(vehicle.bookedUnits, vehicle.totalUnits);

  const whatsAppText = `Hi Majestic Northeast! I want to book/enquire about the ${vehicle.name} (₹${vehicle.rentalPricePerDay}/day). Dates: ${formData.startDate || "TBD"} to ${formData.endDate || "TBD"}. Pickup: ${formData.pickupLocation}.`;
  const whatsAppUrl = buildWhatsAppUrl("919876543210", whatsAppText);

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedInline(true);
  };

  const similarVehicles = VEHICLES_DATA.filter(
    (v) => v.id !== vehicle.id && v.category === vehicle.category
  ).slice(0, 3);

  return (
    <main className="min-h-screen bg-brand-dark text-gray-100 flex flex-col justify-between pt-24">
      <Header onOpenEnquire={() => setModalOpen(true)} />

      <div className="flex-1">
        {/* Breadcrumb Strip */}
        <div className="bg-brand-navy border-b border-white/10 py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-brand-orange">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/rentals" className="hover:text-brand-orange">
              Vehicle Rentals
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold truncate">{vehicle.name}</span>
          </div>
        </div>

        {/* Hero Detail Grid */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column (8 cols): Gallery + Specs + Details */}
            <div className="lg:col-span-8 space-y-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden border border-white/15 bg-black/50 shadow-2xl">
                  <Image
                    src={vehicle.images[activeImageIdx]}
                    alt={vehicle.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
                      {vehicle.type}
                    </span>
                    <span className={`border text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md ${statusInfo.badgeColor}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                </div>

                {/* Thumbnails */}
                {vehicle.images.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-2">
                    {vehicle.images.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIdx(idx)}
                        className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                          activeImageIdx === idx
                            ? "border-brand-orange shadow-md shadow-brand-orange/40 scale-105"
                            : "border-white/10 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image src={imgUrl} alt="Thumbnail" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Title & Overview Header */}
              <div className="bg-brand-card border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                    {vehicle.category === "car" ? "4WD Self-Drive Car Rental" : "High Altitude Adventure Motorcycle"}
                  </span>
                  <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white mt-1">
                    {vehicle.name}
                  </h1>
                  <p className="text-sm text-gray-300 font-light mt-2 leading-relaxed">
                    {vehicle.tagline}
                  </p>
                </div>

                {/* Quick Specs Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs">
                  <div className="bg-white/[0.03] p-3 rounded-xl border border-white/5 flex items-center gap-3">
                    <Users className="w-5 h-5 text-brand-orange" />
                    <div>
                      <span className="text-gray-400 block text-[10px]">Capacity</span>
                      <strong className="text-white text-xs font-bold">{vehicle.seatingCapacity} Seats</strong>
                    </div>
                  </div>

                  <div className="bg-white/[0.03] p-3 rounded-xl border border-white/5 flex items-center gap-3">
                    <Gauge className="w-5 h-5 text-brand-orange" />
                    <div>
                      <span className="text-gray-400 block text-[10px]">Gearbox</span>
                      <strong className="text-white text-xs font-bold">{vehicle.transmission}</strong>
                    </div>
                  </div>

                  <div className="bg-white/[0.03] p-3 rounded-xl border border-white/5 flex items-center gap-3">
                    <Fuel className="w-5 h-5 text-brand-orange" />
                    <div>
                      <span className="text-gray-400 block text-[10px]">Engine Fuel</span>
                      <strong className="text-white text-xs font-bold">{vehicle.fuelType} ({vehicle.engineCC || "Standard"})</strong>
                    </div>
                  </div>

                  <div className="bg-white/[0.03] p-3 rounded-xl border border-white/5 flex items-center gap-3">
                    <Shield className="w-5 h-5 text-brand-orange" />
                    <div>
                      <span className="text-gray-400 block text-[10px]">Security Deposit</span>
                      <strong className="text-white text-xs font-bold">{formatINR(vehicle.securityDeposit)}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inclusions */}
                <div className="bg-brand-card border border-white/10 rounded-3xl p-6 space-y-3">
                  <h3 className="text-base font-bold font-display text-white flex items-center gap-2 border-b border-white/10 pb-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    What&apos;s Included in Rental
                  </h3>
                  <ul className="space-y-2 text-xs text-gray-300">
                    {vehicle.inclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="bg-brand-card border border-white/10 rounded-3xl p-6 space-y-3">
                  <h3 className="text-base font-bold font-display text-white flex items-center gap-2 border-b border-white/10 pb-3">
                    <XCircle className="w-5 h-5 text-red-400" />
                    What&apos;s Excluded
                  </h3>
                  <ul className="space-y-2 text-xs text-gray-300">
                    {vehicle.exclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Required Documents */}
              <div className="bg-brand-card border border-white/10 rounded-3xl p-6 space-y-4">
                <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-brand-orange" />
                  Required Eligibility & Documents
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-300">
                  {vehicle.requiredDocuments.map((doc, idx) => (
                    <div key={idx} className="bg-white/[0.03] p-3 rounded-xl border border-white/5 flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-brand-orange/20 text-brand-orange font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {idx + 1}
                      </div>
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pickup / Drop-off Locations & Rental Rules */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pickup & Drop Points */}
                <div className="bg-brand-card border border-white/10 rounded-3xl p-6 space-y-3">
                  <h3 className="text-base font-bold font-display text-white flex items-center gap-2 border-b border-white/10 pb-3">
                    <MapPin className="w-5 h-5 text-brand-orange" />
                    Available Pickup & Drop Depots
                  </h3>
                  <ul className="space-y-2 text-xs text-gray-300">
                    {vehicle.pickupDropLocations.map((loc, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-orange" />
                        <span>{loc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rules & Speed Limits */}
                <div className="bg-brand-card border border-white/10 rounded-3xl p-6 space-y-3">
                  <h3 className="text-base font-bold font-display text-white flex items-center gap-2 border-b border-white/10 pb-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    Rental Rules & Safety Limits
                  </h3>
                  <ul className="space-y-2 text-xs text-gray-300">
                    {vehicle.rentalRules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Cancellation Policy Tiers */}
              <div className="bg-brand-card border border-white/10 rounded-3xl p-6 space-y-4">
                <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-orange" />
                  Cancellation & Refund Tiers
                </h3>
                <div className="space-y-2">
                  {vehicle.cancellationPolicyTiers.map((tier, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                      <span className="text-gray-300 font-medium">{tier.description}</span>
                      <span className="font-bold text-brand-orange px-2.5 py-1 rounded-lg bg-brand-orange/10 border border-brand-orange/30">
                        {tier.refundPercent}% Refund
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (4 cols): Sticky Booking / Enquiry Form Card */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 bg-brand-card border border-white/15 rounded-3xl p-6 space-y-6 shadow-2xl">
                {/* Price Display */}
                <div className="bg-brand-navy p-5 rounded-2xl border border-white/10 text-center space-y-1">
                  <span className="text-xs uppercase font-bold tracking-wider text-gray-400">Daily Rental Rate</span>
                  <div className="text-3xl font-extrabold text-white font-display">
                    {formatINR(vehicle.rentalPricePerDay)}
                    <span className="text-xs text-gray-400 font-normal"> / day</span>
                  </div>
                  <p className="text-[11px] text-brand-orange-light font-medium">
                    Refundable Security Deposit: {formatINR(vehicle.securityDeposit)}
                  </p>
                </div>

                {/* Inline Enquiry Form */}
                {submittedInline ? (
                  <div className="text-center py-6 space-y-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                    <h4 className="text-lg font-bold text-white">Enquiry Submitted!</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      We have received your enquiry for <strong>{vehicle.name}</strong>. Our fleet manager will reach out via WhatsApp/Phone shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleInlineSubmit} className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
                      Check & Reserve Dates
                    </h4>

                    {/* Full Name */}
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-300 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-300 mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 9876543210"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-300 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
                      />
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-300 mb-1">Start Date *</label>
                        <input
                          type="date"
                          required
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-brand-orange"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-300 mb-1">End Date *</label>
                        <input
                          type="date"
                          required
                          value={formData.endDate}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-brand-orange"
                        />
                      </div>
                    </div>

                    {/* Pickup Location Custom Dropdown */}
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-300 mb-1">Pickup Location *</label>
                      <CustomSelect
                        options={vehicle.pickupDropLocations.map((loc) => ({
                          value: loc,
                          label: loc,
                        }))}
                        value={formData.pickupLocation}
                        onChange={(val) => setFormData({ ...formData, pickupLocation: val })}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-orange/30"
                    >
                      <Send className="w-4 h-4" />
                      Submit Rental Enquiry
                    </button>
                  </form>
                )}

                {/* WhatsApp Direct Option */}
                <div className="pt-2 border-t border-white/10">
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors text-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Book Instantly via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Related / Similar Vehicles Grid */}
          {similarVehicles.length > 0 && (
            <div className="mt-16 pt-12 border-t border-white/10 space-y-6">
              <h3 className="text-2xl font-bold font-display text-white">
                SIMILAR {vehicle.category === "car" ? "CARS & SUVs" : "MOTORCYCLES"} FOR RENT
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarVehicles.map((simVeh) => (
                  <VehicleCard key={simVeh.id} vehicle={simVeh} onEnquire={() => setModalOpen(true)} />
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      <Footer />
      <StickyMobileBar onOpenEnquire={() => setModalOpen(true)} />
      <WhatsAppFloating />

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialMode="rental"
        preselectedVehicle={vehicle}
      />
    </main>
  );
}
