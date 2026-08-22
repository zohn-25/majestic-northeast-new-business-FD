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
  Flag,
  FileCheck2,
} from "lucide-react";
import { useData } from "@/context/DataContext";
import { EnquiryStatus, BatchStatus } from "@/lib/types";

export default function AdminDashboardPage() {
  const { vehicles, tours, destinations, enquiries, batches, passengers, updateEnquiryStatus } = useData();

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

  // Batches and Departure statistics
  const activeBatches = batches.filter((b) => b.status === "Departed / In Progress");
  const upcomingBatches = batches.filter((b) => b.status === "Upcoming" || b.status === "Filling Fast" || b.status === "Sold Out");
  const departedPassengers = passengers.filter((p) => p.tripStatus === "Boarded / Departed" || p.tripStatus === "On Tour").length;
  const totalBookedPassengers = passengers.length;

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

  const getBatchStatusBadge = (status: BatchStatus) => {
    switch (status) {
      case "Departed / In Progress":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";
      case "Sold Out":
        return "bg-red-500/20 text-red-400 border-red-500/40";
      case "Filling Fast":
        return "bg-amber-500/20 text-amber-400 border-amber-500/40";
      case "Completed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/40";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/40";
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
            Live overview of group departure batches, passenger manifest attendance, 4x4 rentals & guest booking requests.
          </p>
        </div>

        {/* Quick Top Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/batches"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-xs font-bold font-display uppercase tracking-wider text-emerald-400 transition-all hover:scale-105"
          >
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>Passenger Roster ({totalBookedPassengers})</span>
          </Link>
          <Link
            href="/admin/vehicles"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold font-display uppercase tracking-wider text-white transition-all hover:scale-105"
          >
            <Car className="w-3.5 h-3.5 text-brand-red" />
            <span>Vehicles ({totalVehicles})</span>
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
        
        {/* Card 1: Group Batches & Passenger Manifest */}
        <Link
          href="/admin/batches"
          className="bg-[#121418] hover:bg-[#16191E] border border-emerald-500/30 rounded-2xl p-4 sm:p-5 shadow-lg transition-all group hover:border-emerald-500/60 relative overflow-hidden"
        >
          {activeBatches.length > 0 && (
            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full pointer-events-none" />
          )}
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 bg-emerald-600 text-white text-[9px] font-black rounded-full uppercase tracking-wider">
              {departedPassengers} On Trail
            </span>
          </div>
          <div className="mt-3 space-y-0.5">
            <span className="text-2xl sm:text-3xl font-black font-display text-white block">
              {totalBookedPassengers}
            </span>
            <span className="text-xs font-bold font-display uppercase tracking-wider text-white/70 block">
              Group Travellers
            </span>
            <span className="text-[11px] text-emerald-400 block font-bold">
              {departedPassengers} Departed • {batches.length} Batches
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

        {/* Card 3: Total Fleet Vehicles */}
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

        {/* Card 4: Pending Enquiries & Leads */}
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

      </div>

      {/* ========================================================================= */}
      {/* ACTIVE BATCH DEPARTURE & PASSENGER MANIFEST MONITOR                       */}
      {/* ========================================================================= */}
      <div className="bg-[#121418] border border-white/10 rounded-3xl p-5 sm:p-7 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 font-display">
                DEPARTURE ROSTERS
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h3 className="text-lg sm:text-xl font-black font-display uppercase tracking-tight text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-brand-red" />
              <span>Upcoming & In-Progress Group Batches</span>
            </h3>
          </div>

          <Link
            href="/admin/batches"
            className="inline-flex items-center gap-1 text-xs font-bold font-display uppercase tracking-wider text-brand-red hover:underline"
          >
            <span>Open Manifest Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Batches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {batches.slice(0, 3).map((b) => {
            const batchPax = passengers.filter((p) => p.batchId === b.id);
            const departedPax = batchPax.filter((p) => p.tripStatus === "Boarded / Departed" || p.tripStatus === "On Tour").length;

            return (
              <div
                key={b.id}
                className="bg-black/40 border border-white/10 rounded-2xl p-4 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9px] font-black font-display uppercase tracking-wider px-2 py-0.5 rounded border ${getBatchStatusBadge(
                        b.status
                      )}`}
                    >
                      {b.status}
                    </span>
                    <span className="text-[10px] text-brand-red font-mono font-bold">
                      {b.startDate}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold font-display text-white line-clamp-1">
                    {b.tourTitle}
                  </h4>
                  <p className="text-[10px] text-white/50">
                    👨‍✈️ Lead: {b.leadCaptainName} • 🚗 {b.assignedVehicles.length} Units
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-white/60">Traveller Attendance</span>
                    <span className="font-bold text-white">
                      <strong className="text-emerald-400">{departedPax} Departed</strong> / {batchPax.length} Booked
                    </span>
                  </div>

                  <Link
                    href={`/admin/batches`}
                    className="w-full py-1.5 bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold font-display uppercase tracking-wider rounded-lg flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Inspect Manifest & Roster</span>
                    <ChevronRight className="w-3 h-3 text-white/50" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RECENT GUEST BOOKING ENQUIRIES TABLE                                      */}
      {/* ========================================================================= */}
      <div className="bg-[#121418] border border-white/10 rounded-3xl p-5 sm:p-7 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-lg sm:text-xl font-black font-display uppercase tracking-tight text-white flex items-center gap-2">
              <MessageSquareText className="w-5 h-5 text-brand-red" />
              <span>Recent Guest Booking Enquiries</span>
            </h3>
            <p className="text-xs text-white/60">
              Latest incoming leads submitted via public quote forms.
            </p>
          </div>

          <Link
            href="/admin/enquiries"
            className="inline-flex items-center gap-1 text-xs font-bold font-display uppercase tracking-wider text-brand-red hover:underline"
          >
            <span>View All ({enquiries.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Enquiries Table */}
        <div className="border border-white/10 rounded-2xl overflow-hidden shadow-inner bg-black/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-black/60 text-[10px] font-black font-display uppercase tracking-widest text-white/50">
                  <th className="p-4">Guest</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Requested Item</th>
                  <th className="p-4">Submitted</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <div className="space-y-0.5">
                        <span className="font-bold font-display text-white text-xs block">
                          {enq.customerName}
                        </span>
                        <span className="text-[10px] text-white/50 block font-mono">
                          {enq.phone}
                        </span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black font-display uppercase tracking-wider border ${
                          enq.type === "tour"
                            ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                            : "bg-blue-500/15 text-blue-400 border-blue-500/30"
                        }`}
                      >
                        {enq.type === "tour" ? "Tour" : "Rental"}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="text-xs font-bold text-white/90 block truncate max-w-[200px]">
                        {enq.relatedItemName}
                      </span>
                    </td>

                    <td className="p-4 text-[11px] text-white/60 font-mono">
                      {enq.submittedDate}
                    </td>

                    <td className="p-4">
                      <select
                        value={enq.status}
                        onChange={(e) =>
                          updateEnquiryStatus(enq.id, e.target.value as EnquiryStatus)
                        }
                        className={`text-[10px] font-black font-display uppercase tracking-wider rounded-lg px-2.5 py-1 border bg-black/60 cursor-pointer focus:outline-none ${getStatusBadge(
                          enq.status
                        )}`}
                      >
                        <option value="New" className="bg-[#121418] text-white">New</option>
                        <option value="Contacted" className="bg-[#121418] text-amber-400">Contacted</option>
                        <option value="Confirmed" className="bg-[#121418] text-emerald-400">Confirmed</option>
                        <option value="Cancelled" className="bg-[#121418] text-gray-400">Cancelled</option>
                      </select>
                    </td>

                    <td className="p-4 text-right">
                      <Link
                        href="/admin/enquiries"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white inline-flex items-center"
                        title="View In Enquiries Desk"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}
