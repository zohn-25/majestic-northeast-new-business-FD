"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SHARED_TOURS_DATA } from "@/lib/data";
import { formatINR, getAvailabilityStatus, buildWhatsAppUrl } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { WhatsAppFloating } from "@/components/WhatsAppFloating";
import { TourCard } from "@/components/TourCard";
import {
  Clock,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  XCircle,
  Shield,
  FileText,
  HelpCircle,
  MessageCircle,
  Send,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Info,
  Car,
  Bike,
  Truck,
  Wrench,
  ShieldCheck,
  Star,
  Maximize2,
  X,
  Compass,
  Check,
  Sparkles,
  Phone,
  User,
  Mail,
  Zap,
  Flame,
  Award,
  HeartPulse,
  FileCheck2,
  Headphones,
} from "lucide-react";

// Helper function to format human-readable date parts with clean letter spacing
function parseExpeditionDate(dateStr: string) {
  try {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const fullMonths = ["September", "September", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const year = parts[0];
      const monthIdx = parseInt(parts[1], 10) - 1;
      const dayNum = parts[2];
      const parsedDate = new Date(parseInt(year, 10), monthIdx, parseInt(dayNum, 10));
      return {
        day: dayNum,
        monthShort: months[monthIdx] || "SEP",
        monthFull: fullMonths[monthIdx] || "September",
        year: year,
        weekday: days[parsedDate.getDay()] || "Saturday",
        formatted: `${dayNum} ${months[monthIdx]} ${year} (${days[parsedDate.getDay()]})`,
      };
    }
    return {
      day: "05",
      monthShort: "SEP",
      monthFull: "September",
      year: "2026",
      weekday: "Saturday",
      formatted: dateStr,
    };
  } catch (e) {
    return {
      day: "05",
      monthShort: "SEP",
      monthFull: "September",
      year: "2026",
      weekday: "Saturday",
      formatted: dateStr,
    };
  }
}

export default function SharedTourDetailPage() {
  const params = useParams();
  const tourId = params.id as string;

  const tour = SHARED_TOURS_DATA.find((t) => t.id === tourId || t.slug === tourId);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeDay, setActiveDay] = useState<number | null>(1);
  const [submittedInline, setSubmittedInline] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [mobileBookingDrawerOpen, setMobileBookingDrawerOpen] = useState(false);

  // Booking Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    preferredDate: tour?.startDates[0] || "",
    numberOfTravellers: 2,
    pickupLocation: tour?.pickupDropPoints[0] || "Guwahati Airport (GAU)",
    message: "",
  });

  if (!tour) {
    return (
      <main className="min-h-screen bg-[#0B0C0E] text-white flex flex-col justify-between pt-36 sm:pt-40">
        <Header />
        <div className="max-w-md mx-auto text-center py-20 px-4 space-y-4">
          <h1 className="text-3xl font-bold font-display uppercase tracking-wider">Expedition Circuit Not Found</h1>
          <p className="text-white/60 text-sm">
            The requested group expedition does not exist or has already completed its seasonal departures.
          </p>
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-red text-white text-xs font-bold font-display uppercase tracking-wider shadow-glow-red"
          >
            <ArrowLeft className="w-4 h-4" />
            Explore All Group Expeditions
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const isBike = tour.tripFormat === "bike";
  const statusInfo = getAvailabilityStatus(tour.seatsBooked, tour.totalSeats);
  const seatsRemaining = statusInfo.seatsRemaining;
  const percentBooked = Math.round((tour.seatsBooked / tour.totalSeats) * 100);

  const totalPrice = tour.pricePerPerson * formData.numberOfTravellers;
  const selectedDateInfo = parseExpeditionDate(formData.preferredDate || tour.startDates[0]);

  const whatsAppText = `Hi Majestic Northeast! I want to book spots on the ${tour.title} (Departure: ${selectedDateInfo.formatted}, ${formData.numberOfTravellers} traveller/s, Total: ${formatINR(totalPrice)}). Please share seat availability and booking details.`;
  const whatsAppUrl = buildWhatsAppUrl("919876543210", whatsAppText);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedInline(true);
  };

  // Related tours
  const relatedTours = SHARED_TOURS_DATA.filter((t) => t.id !== tour.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#0B0C0E] text-gray-900 dark:text-white flex flex-col justify-between pt-36 sm:pt-40 transition-colors duration-300">
      <Header />

      <div className="flex-1 space-y-0">
        {/* 1. Breadcrumb Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs font-semibold font-display text-gray-500 dark:text-white/50 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-red transition-colors uppercase tracking-wider">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/tours" className="hover:text-brand-red transition-colors uppercase tracking-wider">Expeditions</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-white truncate uppercase tracking-wide">{tour.title}</span>
        </div>

        {/* 2. Main Hero Title & Visual Strip */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 space-y-6">
          <div className="space-y-3 text-left">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="bg-brand-red text-white text-xs font-bold font-display px-3.5 py-1.5 rounded-md uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-brand-red/30">
                {isBike ? <Bike className="w-3.5 h-3.5" /> : <Car className="w-3.5 h-3.5" />}
                {isBike ? "Motorcycle Bike Expedition" : "4x4 SUV Convoy Trip"}
              </span>
              <span className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold font-display px-3 py-1.5 rounded-md tracking-wider">
                ✓ Inner Line Permits (ILP) Included
              </span>
              <span className="bg-black/75 dark:bg-white/10 text-white text-xs font-bold font-display px-3 py-1.5 rounded-md tracking-wider">
                {statusInfo.label} ({seatsRemaining} spots left)
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-wide text-gray-900 dark:text-white uppercase leading-tight">
              {tour.title}
            </h1>

            {/* Quick Specs Strip */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold font-display text-gray-600 dark:text-white/80 pt-1 tracking-wide">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-red" />
                <span>{tour.durationDays} Days / {tour.durationNights} Nights</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-red" />
                <span>{tour.destinationName} Circuit</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                {isBike ? <Bike className="w-4 h-4 text-brand-red" /> : <Car className="w-4 h-4 text-brand-red" />}
                <span>{tour.vehicleProvided}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <Truck className="w-4 h-4" />
                <span>Backup Luggage Truck & Mechanic Included</span>
              </div>
            </div>
          </div>

          {/* 3. Photo Gallery Collage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[350px] sm:h-[480px] rounded-2xl overflow-hidden">
            <div
              onClick={() => setLightboxOpen(true)}
              className="lg:col-span-8 relative h-full bg-black rounded-xl overflow-hidden cursor-pointer group"
            >
              <Image
                src={tour.gallery[activeImageIdx] || tour.heroImage}
                alt={tour.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <button
                className="absolute bottom-4 right-4 bg-black/80 hover:bg-brand-red text-white text-xs font-bold font-display uppercase tracking-wider px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all backdrop-blur-md shadow-lg"
              >
                <Maximize2 className="w-4 h-4" />
                View Gallery ({tour.gallery.length + 1} Photos)
              </button>
            </div>

            <div className="hidden lg:grid lg:col-span-4 grid-rows-2 gap-4 h-full">
              {tour.gallery.slice(0, 2).map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveImageIdx(idx);
                    setLightboxOpen(true);
                  }}
                  className="relative h-full rounded-xl overflow-hidden bg-black cursor-pointer group"
                >
                  <Image
                    src={imgUrl}
                    alt={`${tour.title} photo ${idx + 1}`}
                    fill
                    sizes="33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Main Two-Column Layout (Rich Left Details + Sticky Right Information & Booking Hub) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Itinerary, Vehicle Specs, Inclusions, FAQs */}
            <div className="lg:col-span-7 space-y-12 text-left">
              {/* Route Waypoint Strip */}
              <div className="card-dark p-6 rounded-2xl space-y-3">
                <h3 className="text-xs font-bold font-display uppercase tracking-wider text-brand-red flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  Expedition Route Circuit
                </h3>
                <p className="text-xs sm:text-sm font-medium leading-relaxed text-gray-700 dark:text-white/90">
                  {tour.route}
                </p>
              </div>

              {/* Expedition Highlights */}
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-wide text-gray-900 dark:text-white">
                  Expedition Key Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tour.shortHighlights.map((hl, idx) => (
                    <div
                      key={idx}
                      className="card-dark p-4 rounded-xl flex items-start gap-3 text-xs leading-relaxed font-normal"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Convoy & Support Vehicle Specs */}
              <div className="card-dark p-6 sm:p-8 rounded-2xl space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-red font-display block">
                    Expedition Fleet Specifications
                  </span>
                  <h3 className="text-2xl font-bold font-display uppercase text-gray-900 dark:text-white mt-0.5 tracking-wide">
                    {tour.vehicleProvided} Fleet & Convoy Support
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-gray-100 dark:bg-black/50 border border-gray-200 dark:border-white/10 space-y-1 text-center">
                    {isBike ? <Bike className="w-6 h-6 text-brand-red mx-auto" /> : <Car className="w-6 h-6 text-brand-red mx-auto" />}
                    <span className="font-bold font-display block text-gray-900 dark:text-white text-sm uppercase tracking-wide">
                      {isBike ? "RE Himalayan 450" : "Mahindra Thar 4x4"}
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-white/60 block">All-Terrain Tires & Racks</span>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-100 dark:bg-black/50 border border-gray-200 dark:border-white/10 space-y-1 text-center">
                    <Truck className="w-6 h-6 text-brand-red mx-auto" />
                    <span className="font-bold font-display block text-gray-900 dark:text-white text-sm uppercase tracking-wide">
                      Luggage Truck
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-white/60 block">Carries All Duffel Bags</span>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-100 dark:bg-black/50 border border-gray-200 dark:border-white/10 space-y-1 text-center">
                    <Wrench className="w-6 h-6 text-brand-red mx-auto" />
                    <span className="font-bold font-display block text-gray-900 dark:text-white text-sm uppercase tracking-wide">
                      Master Mechanic
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-white/60 block">Spare Parts & 24/7 Tools</span>
                  </div>
                </div>
              </div>

              {/* Day by Day Detailed Itinerary */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-wide text-gray-900 dark:text-white">
                    Day-By-Day Itinerary ({tour.durationDays} Days)
                  </h2>
                  <span className="text-xs text-brand-red font-bold font-display uppercase tracking-wider">
                    Click day to expand
                  </span>
                </div>

                <div className="space-y-4">
                  {tour.itinerary.map((dayItem) => {
                    const isOpen = activeDay === dayItem.day;
                    return (
                      <div
                        key={dayItem.day}
                        className="card-dark rounded-2xl overflow-hidden transition-all duration-200"
                      >
                        <button
                          onClick={() => setActiveDay(isOpen ? null : dayItem.day)}
                          className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-base sm:text-lg uppercase text-gray-900 dark:text-white hover:text-brand-red dark:hover:text-brand-red transition-colors tracking-wide"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-brand-red text-white text-xs font-bold flex items-center justify-center shrink-0 font-display">
                              0{dayItem.day}
                            </span>
                            <span className="line-clamp-1">{dayItem.title}</span>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-400 dark:text-white/50 shrink-0 transition-transform duration-300 ${
                              isOpen ? "rotate-180 text-brand-red" : ""
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="px-6 pb-6 pt-2 space-y-4 text-xs sm:text-sm text-gray-700 dark:text-white/80 leading-relaxed font-normal border-t border-gray-200 dark:border-white/10 animate-in fade-in duration-200">
                            <p>{dayItem.description}</p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-semibold text-gray-600 dark:text-white/70">
                              {dayItem.distance && (
                                <div className="p-3 bg-gray-100 dark:bg-black/50 rounded-lg border border-gray-200 dark:border-white/10">
                                  <span className="text-[10px] uppercase font-bold text-brand-red block font-display tracking-wider">Distance:</span>
                                  <span>{dayItem.distance}</span>
                                </div>
                              )}
                              {dayItem.accommodation && (
                                <div className="p-3 bg-gray-100 dark:bg-black/50 rounded-lg border border-gray-200 dark:border-white/10">
                                  <span className="text-[10px] uppercase font-bold text-brand-red block font-display tracking-wider">Night Stay:</span>
                                  <span>{dayItem.accommodation}</span>
                                </div>
                              )}
                              {dayItem.meals && (
                                <div className="p-3 bg-gray-100 dark:bg-black/50 rounded-lg border border-gray-200 dark:border-white/10">
                                  <span className="text-[10px] uppercase font-bold text-brand-red block font-display tracking-wider">Meals:</span>
                                  <span>{dayItem.meals}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Inclusions */}
                <div className="card-dark p-6 sm:p-7 rounded-2xl space-y-4">
                  <h3 className="text-lg font-bold font-display uppercase tracking-wide text-emerald-500 dark:text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    What&apos;s Included
                  </h3>
                  <ul className="space-y-2.5 text-xs text-gray-700 dark:text-white/80 font-normal">
                    {tour.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="card-dark p-6 sm:p-7 rounded-2xl space-y-4">
                  <h3 className="text-lg font-bold font-display uppercase tracking-wide text-rose-500 flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    What&apos;s Excluded
                  </h3>
                  <ul className="space-y-2.5 text-xs text-gray-700 dark:text-white/80 font-normal">
                    {tour.exclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* FAQs */}
              {tour.faqs.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold font-display uppercase tracking-wide text-gray-900 dark:text-white">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-3">
                    {tour.faqs.map((faq) => (
                      <div key={faq.id} className="card-dark p-5 rounded-xl space-y-2 text-xs">
                        <h4 className="font-bold font-display uppercase text-sm text-gray-900 dark:text-white flex items-center gap-2 tracking-wide">
                          <HelpCircle className="w-4 h-4 text-brand-red shrink-0" />
                          {faq.question}
                        </h4>
                        <p className="text-gray-600 dark:text-white/80 leading-relaxed pl-6 font-normal">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Sticky Booking Card & Rich Trust Pillars */}
            <div className="lg:col-span-5 lg:sticky lg:top-36 space-y-5">
              {/* 1. Main Booking Console Card */}
              <div className="relative rounded-3xl overflow-hidden p-1 bg-gradient-to-b from-brand-red via-brand-red/30 to-black/30 shadow-2xl">
                <div className="bg-white dark:bg-[#131518] rounded-[22px] p-5 sm:p-6 space-y-4 text-left relative z-10 transition-colors">
                  
                  {/* Top Header Badge */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-bold font-display uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                        Official Booking Desk
                      </span>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white bg-brand-red px-2 py-0.5 rounded font-display">
                      Fixed Departures
                    </span>
                  </div>

                  {/* Price & Inclusions Strip */}
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-gray-900 dark:text-white">
                          {formatINR(tour.pricePerPerson)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-white/60 font-normal">/ person</span>
                      </div>
                      <span className="text-[10px] font-bold text-brand-red bg-brand-red/10 px-2 py-0.5 rounded border border-brand-red/20 font-display uppercase tracking-wider">
                        Early Bird Active
                      </span>
                    </div>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>Includes {tour.vehicleProvided} + 3★ Stays + All Meals + ILP</span>
                    </p>
                  </div>

                  {submittedInline ? (
                    <div className="py-6 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/30">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-bold font-display uppercase text-gray-900 dark:text-white tracking-wide">
                        Booking Confirmed!
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-white/70 leading-relaxed max-w-xs mx-auto">
                        Thank you, <strong>{formData.fullName}</strong>. Our expedition lead will connect on WhatsApp within 15 minutes.
                      </p>
                      <a
                        href={whatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-display uppercase tracking-wider shadow-lg"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Chat on WhatsApp Now
                      </a>
                    </div>
                  ) : (
                    <form onSubmit={handleBookingSubmit} className="space-y-3.5 text-xs">
                      {/* Date Selector */}
                      <div className="relative space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-900 dark:text-white font-display flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-brand-red" />
                            Select Departure Date *
                          </label>
                          <span className="text-[9px] text-brand-red font-bold font-display uppercase tracking-wider">
                            {tour.startDates.length} Batches Active
                          </span>
                        </div>

                        <div
                          onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
                          className="bg-gradient-to-r from-red-500/10 via-brand-red/5 to-transparent dark:from-brand-red/20 dark:via-black/50 dark:to-black/40 border border-brand-red/50 hover:border-brand-red rounded-xl p-2.5 cursor-pointer transition-all shadow-sm flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-11 rounded-lg overflow-hidden shadow-sm flex flex-col border border-brand-red/40 shrink-0">
                              <div className="bg-brand-red text-white text-[8px] font-bold font-display text-center py-0.5 tracking-widest uppercase">
                                {selectedDateInfo.monthShort}
                              </div>
                              <div className="bg-white dark:bg-[#1A1D22] text-gray-900 dark:text-white text-sm font-bold font-display flex items-center justify-center flex-1">
                                {selectedDateInfo.day}
                              </div>
                            </div>

                            <div>
                              <span className="font-bold font-display text-sm text-gray-900 dark:text-white uppercase tracking-wider block">
                                {selectedDateInfo.monthFull} {selectedDateInfo.day}, {selectedDateInfo.year}
                              </span>
                              <span className="text-[10px] text-gray-500 dark:text-white/70 block tracking-wide">
                                {selectedDateInfo.weekday} • Guaranteed Batch
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 text-[10px] text-brand-red font-bold font-display uppercase tracking-wider pl-1">
                            <span>Change</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                                dateDropdownOpen ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        </div>

                        {dateDropdownOpen && (
                          <div className="custom-scrollbar absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-[#181A1F] border-2 border-brand-red rounded-xl shadow-2xl p-2 pr-3 z-50 space-y-1.5 animate-in fade-in zoom-in-95 duration-150 max-h-[220px] overflow-y-auto">
                            {tour.startDates.map((dateStr, idx) => {
                              const isSelected = formData.preferredDate === dateStr;
                              const dInfo = parseExpeditionDate(dateStr);
                              return (
                                <div
                                  key={dateStr}
                                  onClick={() => {
                                    setFormData({ ...formData, preferredDate: dateStr });
                                    setDateDropdownOpen(false);
                                  }}
                                  className={`p-2 rounded-lg cursor-pointer flex items-center justify-between transition-all border ${
                                    isSelected
                                      ? "bg-brand-red text-white border-brand-red shadow-md"
                                      : "bg-gray-50 dark:bg-black/60 hover:bg-gray-100 dark:hover:bg-white/10 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-9 rounded overflow-hidden flex flex-col border border-black/10 shrink-0">
                                      <div className={`text-[7px] font-bold font-display text-center py-0.5 uppercase ${
                                        isSelected ? "bg-black text-white" : "bg-brand-red text-white"
                                      }`}>
                                        {dInfo.monthShort}
                                      </div>
                                      <div className={`text-xs font-bold font-display flex items-center justify-center flex-1 ${
                                        isSelected ? "bg-white text-brand-red" : "bg-white dark:bg-[#22262C] text-gray-900 dark:text-white"
                                      }`}>
                                        {dInfo.day}
                                      </div>
                                    </div>
                                    <div>
                                      <span className="font-bold font-display text-xs uppercase tracking-wider block">
                                        {dInfo.monthFull} {dInfo.day}, {dInfo.year}
                                      </span>
                                      <span className={`text-[9px] block ${isSelected ? "text-white/80" : "text-gray-500 dark:text-white/60"}`}>
                                        {dInfo.weekday} Departure
                                      </span>
                                    </div>
                                  </div>
                                  {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Travellers Selector */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-1.5 font-display flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-brand-red" />
                            {isBike ? "Riders *" : "Travellers *"}
                          </span>
                          <span className="text-[9px] text-gray-500 dark:text-white/50 font-normal">
                            {formatINR(tour.pricePerPerson)} each
                          </span>
                        </label>

                        <div className="grid grid-cols-4 gap-1.5">
                          {[1, 2, 3, 4].map((num) => {
                            const isSelected = formData.numberOfTravellers === num;
                            return (
                              <button
                                key={num}
                                type="button"
                                onClick={() => setFormData({ ...formData, numberOfTravellers: num })}
                                className={`py-1.5 px-1 rounded-lg text-[11px] font-bold font-display uppercase tracking-wider transition-all flex items-center justify-center border ${
                                  isSelected
                                    ? "bg-brand-red text-white border-brand-red shadow-sm scale-105"
                                    : "bg-gray-50 dark:bg-black/50 border-gray-200 dark:border-white/15 text-gray-700 dark:text-white/80 hover:border-brand-red"
                                }`}
                              >
                                {num} {num === 1 ? "Person" : "Persons"}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Contact Inputs */}
                      <div className="space-y-2 pt-0.5">
                        <div>
                          <input
                            type="text"
                            required
                            placeholder="Full Name *"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full bg-gray-50 dark:bg-black/70 border border-gray-300 dark:border-white/20 focus:border-brand-red rounded-lg px-3 py-2 text-xs text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="tel"
                            required
                            placeholder="Phone / WhatsApp *"
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                            className="w-full bg-gray-50 dark:bg-black/70 border border-gray-300 dark:border-white/20 focus:border-brand-red rounded-lg px-3 py-2 text-xs text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none"
                          />

                          <input
                            type="email"
                            required
                            placeholder="Email Address *"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-gray-50 dark:bg-black/70 border border-gray-300 dark:border-white/20 focus:border-brand-red rounded-lg px-3 py-2 text-xs text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Live Total Box */}
                      <div className="p-3 bg-gray-100 dark:bg-black/60 rounded-lg border border-brand-red/30 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[10px] text-gray-500 dark:text-white/60 block">
                            Total for {formData.numberOfTravellers} {formData.numberOfTravellers === 1 ? "Person" : "Persons"}:
                          </span>
                          <span className="text-base font-bold font-display text-brand-red">
                            {formatINR(totalPrice)}
                          </span>
                        </div>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase font-display">
                          ✓ ILP Free (₹0)
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2 pt-0.5">
                        <button
                          type="submit"
                          className="w-full py-3.5 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold font-display uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all shadow-glow-red hover:scale-[1.01]"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Reserve Spot Online (No Advance)
                        </button>

                        <a
                          href={whatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-display uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm text-center"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Instant WhatsApp Booking
                        </a>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* 2. Mountain Safety & Emergency Support Card */}
              <div className="card-dark p-5 rounded-2xl border border-gray-200 dark:border-white/10 space-y-3 text-left">
                <div className="flex items-center gap-2 text-brand-red">
                  <HeartPulse className="w-4 h-4" />
                  <h4 className="text-xs font-bold font-display uppercase tracking-wider text-gray-900 dark:text-white">
                    High-Altitude Mountain Safety Shield
                  </h4>
                </div>
                <ul className="space-y-2 text-[11px] text-gray-600 dark:text-white/80 font-normal">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Medical Oxygen Cylinder & AMS first-aid kit onboard</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Certified master mechanic with spare parts & tires</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Walkie-Talkie convoy radios & Satellite tracking</span>
                  </li>
                </ul>
              </div>

              {/* 3. Direct Expedition Lead Helpline */}
              <div className="card-dark p-5 rounded-2xl border border-gray-200 dark:border-white/10 space-y-2.5 text-left bg-gradient-to-br from-brand-red/5 via-transparent to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-brand-red" />
                    <span className="text-xs font-bold font-display uppercase tracking-wider text-gray-900 dark:text-white">
                      Need Help Customizing?
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-500 font-bold uppercase font-display">Live Desk</span>
                </div>
                <p className="text-[11px] text-gray-600 dark:text-white/70 font-normal">
                  Connect directly with our Guwahati trip marshals for custom dates, private convoys, or airport pickups.
                </p>
                <div className="pt-1 flex items-center gap-3">
                  <a
                    href="tel:+919876543210"
                    className="flex-1 py-2 bg-gray-900 dark:bg-white/10 hover:bg-black dark:hover:bg-white/20 text-white rounded-lg text-center text-xs font-bold font-display uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-red" />
                    Call Desk
                  </a>
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-center text-xs font-bold font-display uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Related Expeditions Carousel/Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200 dark:border-white/10">
          <div className="space-y-8 text-left">
            <h2 className="text-2xl sm:text-4xl font-bold font-display uppercase tracking-wide text-gray-900 dark:text-white">
              Other Popular Northeast Expeditions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTours.map((relTour) => (
                <TourCard key={relTour.id} tour={relTour} />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-brand-red transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-5xl w-full h-[80vh]">
            <Image
              src={tour.gallery[activeImageIdx] || tour.heroImage}
              alt={tour.title}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      <WhatsAppFloating />

      {/* Mobile-Exclusive Sticky Expedition Booking Dock (Pinned at Bottom) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E1013]/95 backdrop-blur-2xl border-t border-white/15 px-4 py-2.5 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] pb-[calc(0.65rem+env(safe-area-inset-bottom,0px))]">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          {/* Live Price & Date Summary */}
          <div className="text-left">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black font-display text-gray-900 dark:text-white">
                {formatINR(totalPrice)}
              </span>
              <span className="text-[10px] text-gray-500 dark:text-white/60 font-normal">
                {formData.numberOfTravellers > 1 ? `(${formData.numberOfTravellers} pers)` : "/ seat"}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-brand-red font-bold font-display uppercase tracking-wider">
              <Calendar className="w-3 h-3" />
              <span>{selectedDateInfo.day} {selectedDateInfo.monthShort} • {seatsRemaining} Left</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Trip Desk"
              className="w-11 h-11 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-xl flex items-center justify-center transition-all shadow-md shrink-0"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            <button
              onClick={() => setMobileBookingDrawerOpen(true)}
              className="h-11 px-4 bg-brand-red hover:bg-brand-red-hover active:scale-95 text-white text-xs font-bold font-display uppercase tracking-wider rounded-xl flex items-center gap-1.5 shadow-lg shadow-brand-red/40 shrink-0"
            >
              <span>Book Spot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile App Bottom Sheet Booking Drawer */}
      {mobileBookingDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end animate-in fade-in duration-200">
          <div
            onClick={() => setMobileBookingDrawerOpen(false)}
            className="flex-1"
          />
          <div className="bg-white dark:bg-[#131518] rounded-t-3xl border-t border-gray-200 dark:border-white/15 p-5 max-h-[88vh] overflow-y-auto space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Sheet Handle Bar */}
            <div className="w-12 h-1.5 bg-gray-300 dark:bg-white/20 rounded-full mx-auto" />

            {/* Header */}
            <div className="flex items-start justify-between border-b border-gray-200 dark:border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-bold text-brand-red uppercase tracking-wider font-display block">
                  {isBike ? "Motorcycle Expedition Booking" : "4x4 SUV Convoy Booking"}
                </span>
                <h3 className="text-base font-black font-display uppercase text-gray-900 dark:text-white line-clamp-1">
                  {tour.title}
                </h3>
              </div>
              <button
                onClick={() => setMobileBookingDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {submittedInline ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold font-display uppercase text-gray-900 dark:text-white">
                  Booking Confirmed!
                </h4>
                <p className="text-xs text-gray-600 dark:text-white/70">
                  Thank you, <strong>{formData.fullName}</strong>. Our Guwahati trip marshal will connect on WhatsApp within 15 minutes.
                </p>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold font-display uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp Now
                </a>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-3.5 text-left text-xs">
                {/* Date Picker Tiles */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-1.5 font-display flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-red" />
                      Select Departure Date *
                    </span>
                    <span className="text-[10px] text-brand-red font-semibold">
                      {tour.startDates.length} Batches Active
                    </span>
                  </label>

                  <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1">
                    {tour.startDates.map((dStr) => {
                      const isSel = formData.preferredDate === dStr;
                      const dInfo = parseExpeditionDate(dStr);
                      return (
                        <div
                          key={dStr}
                          onClick={() => setFormData({ ...formData, preferredDate: dStr })}
                          className={`p-2 rounded-xl border cursor-pointer transition-all flex items-center gap-2 ${
                            isSel
                              ? "bg-brand-red text-white border-brand-red shadow-md"
                              : "bg-gray-50 dark:bg-black/50 border-gray-200 dark:border-white/10 text-gray-800 dark:text-white/80"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex flex-col items-center justify-center text-center shrink-0 ${
                            isSel ? "bg-black text-white" : "bg-brand-red text-white"
                          }`}>
                            <span className="text-[7px] font-bold uppercase">{dInfo.monthShort}</span>
                            <span className="text-xs font-black">{dInfo.day}</span>
                          </div>
                          <div className="leading-tight truncate">
                            <span className="text-[11px] font-bold block truncate">{dInfo.monthFull} {dInfo.day}</span>
                            <span className={`text-[9px] block ${isSel ? "text-white/80" : "text-gray-500 dark:text-white/50"}`}>{dInfo.weekday}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Travellers Selector Chips */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-1.5 font-display flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-brand-red" />
                      {isBike ? "Riders Count *" : "Travellers Count *"}
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-white/60">
                      {formatINR(tour.pricePerPerson)} each
                    </span>
                  </label>

                  <div className="grid grid-cols-4 gap-1.5">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFormData({ ...formData, numberOfTravellers: num })}
                        className={`py-2 rounded-xl text-xs font-bold font-display uppercase transition-all border ${
                          formData.numberOfTravellers === num
                            ? "bg-brand-red text-white border-brand-red shadow-sm"
                            : "bg-gray-50 dark:bg-black/50 border-gray-200 dark:border-white/10 text-gray-700 dark:text-white/80"
                        }`}
                      >
                        {num} {num === 1 ? "Person" : "Persons"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Inputs */}
                <div className="space-y-2 pt-1">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-black/60 border border-gray-300 dark:border-white/20 focus:border-brand-red rounded-xl px-3.5 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp Number *"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-black/60 border border-gray-300 dark:border-white/20 focus:border-brand-red rounded-xl px-3.5 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-black/60 border border-gray-300 dark:border-white/20 focus:border-brand-red rounded-xl px-3.5 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Live Total Box */}
                <div className="p-3 bg-gray-100 dark:bg-black/60 rounded-xl border border-brand-red/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 dark:text-white/60 block">
                      Total ({formData.numberOfTravellers} {formData.numberOfTravellers === 1 ? "Person" : "Persons"}):
                    </span>
                    <span className="text-base font-bold font-display text-brand-red">
                      {formatINR(totalPrice)}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase font-display">
                    ✓ ILP Included (₹0)
                  </span>
                </div>

                {/* Action CTA */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold font-display uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-red/40"
                >
                  <Send className="w-4 h-4" />
                  Confirm Spot (Zero Advance)
                </button>

                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-display uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 shadow-sm text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  Instant WhatsApp Booking
                </a>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
