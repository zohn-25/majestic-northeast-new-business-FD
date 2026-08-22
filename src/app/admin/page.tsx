"use client";

import React from "react";
import Link from "next/link";
import {
  Car,
  Compass,
  MapPin,
  MessageSquareText,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Users,
  ShieldCheck,
  Calendar,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Phone,
  Mail,
  AlertCircle,
} from "lucide-react";
import { useData } from "@/context/DataContext";
import { EnquiryStatus } from "@/lib/types";

export default function AdminDashboardPage() {
  const { vehicles, tours, destinations, enquiries, updateEnquiryStatus } = useData();

  // Compute live statistics from Context state
  const totalVehicles = vehicles.length;
  const totalCars = vehicles.filter((v) => v.category === "car").length;
  const totalBikes = vehicles.filter((v) => v.category === "bike").length;

  const totalTours = tours.length;
  const carTours = tours.filter((t) => t.tripFormat === "car").length;
  const bikeTours = tours.filter((t) => t.tripFormat === "bike").length;

  const pendingEnquiries = enquiries.filter((e) => e.status === "New").length;
  const contactedEnquiries = enquiries.filter((e) => e.status === "Contacted").length;
  const confirmedEnquiries = enquiries.filter((e) => e.status === "Confirmed").length;
  const totalDestinations = destinations.length;

  // Last 5 recent enquiries
  const recentEnquiries = enquiries.slice(0, 5);

  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case "New":
        return "bg-brand-red/20 text-brand-red border-brand-red/40";
      case "Contacted":
        return "bg-amber-500/20 text-amber-400 border-amber-500/40";
      case "Confirmed":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";
      case "Cancelled":
        return "bg-gray-500/20 text-gray-400 border-gray-500/40";
    }
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* Top Banner / Welcome Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#121418] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-red font-display">
              DISPATCH & FLEET OVERVIEW
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white">
            Operations Dashboard
          </h1>
          <p className="text-xs text-white/60 font-medium">
            Live overview of 4x4 convoys, motorcycle rides, rentals & guest booking requests.
          </p>
        </div>

        {/* Quick Top Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/vehicles"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold font-display uppercase tracking-wider text-white transition-all hover:scale-105"
          >
            <Car className="w-3.5 h-3.5 text-brand-red" />
            <span>Vehicles ({totalVehicles})</span>
          </Link>
          <Link
            href="/admin/tours"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold font-display uppercase tracking-wider text-white transition-all hover:scale-105"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Tours ({totalTours})</span>
          </Link>
          <Link
            href="/admin/enquiries"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold font-display uppercase tracking-wider transition-all shadow-glow-red hover:scale-105"
          >
            <MessageSquareText className="w-3.5 h-3.5" />
            <span>Enquiries ({pendingEnquiries} New)</span>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4 DYNAMIC STATS CARDS (Pull real counts from Context)                     */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        
        {/* Card 1: Total Vehicles */}
        <Link
          href="/admin/vehicles"
          className="bg-[#121418] hover:bg-[#16191E] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-lg transition-all group hover:border-white/20"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <Car className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </div>
          <div className="mt-3 space-y-0.5">
            <span className="text-2xl sm:text-3xl font-black font-display text-white block">
              {totalVehicles}
            </span>
            <span className="text-xs font-bold font-display uppercase tracking-wider text-white/70 block">
              Total Fleet Units
            </span>
            <span className="text-[11px] text-white/40 block font-medium">
              {totalCars} 4x4 Cars • {totalBikes} Adv Bikes
            </span>
          </div>
        </Link>

        {/* Card 2: Total Tours & Expeditions */}
        <Link
          href="/admin/tours"
          className="bg-[#121418] hover:bg-[#16191E] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-lg transition-all group hover:border-white/20"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </div>
          <div className="mt-3 space-y-0.5">
            <span className="text-2xl sm:text-3xl font-black font-display text-white block">
              {totalTours}
            </span>
            <span className="text-xs font-bold font-display uppercase tracking-wider text-white/70 block">
              Active Circuits
            </span>
            <span className="text-[11px] text-white/40 block font-medium">
              {carTours} Car Convoys • {bikeTours} Bike Tours
            </span>
          </div>
        </Link>

        {/* Card 3: Pending Enquiries & Leads */}
        <Link
          href="/admin/enquiries"
          className="bg-[#121418] hover:bg-[#16191E] border border-brand-red/30 rounded-2xl p-4 sm:p-5 shadow-lg transition-all group hover:border-brand-red/60 relative overflow-hidden"
        >
          {pendingEnquiries > 0 && (
            <div className="absolute top-0 right-0 w-16 h-16 bg-brand-red/10 rounded-bl-full pointer-events-none" />
          )}
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-red-500/15 text-brand-red border border-brand-red/30 flex items-center justify-center">
              <MessageSquareText className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 bg-brand-red text-white text-[9px] font-black rounded-full uppercase tracking-wider">
              {pendingEnquiries} New
            </span>
          </div>
          <div className="mt-3 space-y-0.5">
            <span className="text-2xl sm:text-3xl font-black font-display text-white block">
              {enquiries.length}
            </span>
            <span className="text-xs font-bold font-display uppercase tracking-wider text-white/70 block">
              Total Enquiries
            </span>
            <span className="text-[11px] text-brand-red block font-bold">
              {pendingEnquiries} Pending • {confirmedEnquiries} Confirmed
            </span>
          </div>
        </Link>

        {/* Card 4: Destinations & Sister States */}
        <Link
          href="/admin/destinations"
          className="bg-[#121418] hover:bg-[#16191E] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-lg transition-all group hover:border-white/20"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </div>
          <div className="mt-3 space-y-0.5">
            <span className="text-2xl sm:text-3xl font-black font-display text-white block">
              {totalDestinations}
            </span>
            <span className="text-xs font-bold font-display uppercase tracking-wider text-white/70 block">
              State Guides
            </span>
            <span className="text-[11px] text-white/40 block font-medium">
              ILP & Permit Circuits
            </span>
          </div>
        </Link>

      </div>

      {/* ========================================================================= */}
      {/* RECENT ENQUIRIES PREVIEW TABLE / CARD LIST (Last 5 Entries)               */}
      {/* ========================================================================= */}
      <div className="bg-[#121418] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        
        {/* Table Header Row */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-red font-display block">
              INCOMING GUEST REQUESTS
            </span>
            <h2 className="text-lg font-black font-display uppercase tracking-tight text-white mt-0.5">
              Recent Enquiries & Booking Leads
            </h2>
          </div>

          <Link
            href="/admin/enquiries"
            className="text-xs font-bold font-display text-brand-red hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View All ({enquiries.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Table Content for Desktop / Stacked Cards for Mobile */}
        <div className="divide-y divide-white/10">
          {recentEnquiries.map((enquiry) => (
            <div
              key={enquiry.id}
              className="p-4 sm:p-5 hover:bg-white/[0.02] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left Details */}
              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-black font-display text-white tracking-wide">
                    {enquiry.customerName}
                  </span>
                  
                  <span
                    className={`text-[9px] font-black font-display uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                      enquiry.type === "tour"
                        ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                        : "bg-blue-500/15 text-blue-400 border-blue-500/30"
                    }`}
                  >
                    {enquiry.type === "tour" ? "Expedition Tour" : "Vehicle Rental"}
                  </span>

                  <span className="text-[10px] text-white/40 font-medium">
                    • {enquiry.submittedDate}
                  </span>
                </div>

                <p className="text-xs text-white/80 font-bold truncate">
                  {enquiry.relatedItemName}
                </p>

                {enquiry.message && (
                  <p className="text-[11px] text-white/50 line-clamp-1 italic font-normal">
                    &ldquo;{enquiry.message}&rdquo;
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-white/60">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-white/40" />
                    {enquiry.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-white/40" />
                    {enquiry.email}
                  </span>
                </div>
              </div>

              {/* Right Action: Live Status Dropdown */}
              <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0">
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-white/40">
                    Lead Status
                  </span>
                  <select
                    value={enquiry.status}
                    onChange={(e) =>
                      updateEnquiryStatus(enquiry.id, e.target.value as EnquiryStatus)
                    }
                    className={`text-xs font-bold font-display uppercase tracking-wider rounded-xl px-3 py-1.5 border bg-black/60 cursor-pointer focus:outline-none transition-colors ${getStatusBadge(
                      enquiry.status
                    )}`}
                  >
                    <option value="New" className="bg-[#121418] text-white">
                      New
                    </option>
                    <option value="Contacted" className="bg-[#121418] text-amber-400">
                      Contacted
                    </option>
                    <option value="Confirmed" className="bg-[#121418] text-emerald-400">
                      Confirmed
                    </option>
                    <option value="Cancelled" className="bg-[#121418] text-gray-400">
                      Cancelled
                    </option>
                  </select>
                </div>

                <Link
                  href="/admin/enquiries"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                  title="View Full Lead Details"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Link */}
        <div className="p-3 bg-black/30 text-center border-t border-white/10">
          <Link
            href="/admin/enquiries"
            className="text-xs font-bold font-display uppercase tracking-widest text-white/60 hover:text-brand-red transition-colors inline-flex items-center gap-1"
          >
            <span>Manage All Enquiries & Client Communication</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* QUICK SHORTCUTS & OPERATION SUMMARY CARDS                                 */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Fleet & Expeditions Quick Management */}
        <div className="bg-[#121418] border border-white/10 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black font-display uppercase tracking-wider text-white flex items-center gap-2">
              <Car className="w-4 h-4 text-brand-red" />
              <span>Fleet & Convoy Shortcuts</span>
            </h3>
            <span className="text-[10px] text-white/40 font-bold uppercase">
              Management
            </span>
          </div>

          <p className="text-xs text-white/60 leading-relaxed font-normal">
            Manage your self-drive SUV inventory (Thar 4x4, Fortuner, Scorpio-N) and Royal Enfield Himalayan 450 bike rentals.
          </p>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <Link
              href="/admin/vehicles"
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors group"
            >
              <span className="text-xs font-bold font-display uppercase text-white block group-hover:text-brand-red">
                Vehicle List
              </span>
              <span className="text-[10px] text-white/50 block">
                Edit & add vehicles
              </span>
            </Link>

            <Link
              href="/admin/tours"
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors group"
            >
              <span className="text-xs font-bold font-display uppercase text-white block group-hover:text-brand-red">
                Tour Packages
              </span>
              <span className="text-[10px] text-white/50 block">
                Itineraries & dates
              </span>
            </Link>
          </div>
        </div>

        {/* Gallery & Destination Media */}
        <div className="bg-[#121418] border border-white/10 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black font-display uppercase tracking-wider text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Destinations & Media</span>
            </h3>
            <span className="text-[10px] text-white/40 font-bold uppercase">
              Content
            </span>
          </div>

          <p className="text-xs text-white/60 leading-relaxed font-normal">
            Manage high-altitude passes, state travel guides (Meghalaya, Arunachal, Sikkim) and media gallery photos.
          </p>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <Link
              href="/admin/destinations"
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors group"
            >
              <span className="text-xs font-bold font-display uppercase text-white block group-hover:text-emerald-400">
                State Guides
              </span>
              <span className="text-[10px] text-white/50 block">
                8 Sister States
              </span>
            </Link>

            <Link
              href="/admin/gallery"
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors group"
            >
              <span className="text-xs font-bold font-display uppercase text-white block group-hover:text-emerald-400">
                Photo Gallery
              </span>
              <span className="text-[10px] text-white/50 block">
                Upload & manage media
              </span>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
