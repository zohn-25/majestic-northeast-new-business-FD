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
  Clock,
  CheckCircle2,
  Users,
  Calendar,
  ExternalLink,
  ChevronRight,
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
  const confirmedEnquiries = enquiries.filter((e) => e.status === "Confirmed").length;
  const totalDestinations = destinations.length;

  // Batches and Departure statistics
  const activeBatches = batches.filter((b) => b.status === "Departed / In Progress");
  const departedPassengers = passengers.filter(
    (p) => p.tripStatus === "Boarded / Departed" || p.tripStatus === "On Tour"
  ).length;
  const totalBookedPassengers = passengers.length;

  // Last 5 recent enquiries
  const recentEnquiries = enquiries.slice(0, 5);

  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case "New":
        return "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30";
      case "Contacted":
        return "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30";
      case "Confirmed":
        return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
      case "Cancelled":
        return "bg-slate-200 dark:bg-zinc-500/15 text-slate-600 dark:text-zinc-400 border-slate-300 dark:border-zinc-500/30";
    }
  };

  const getBatchStatusBadge = (status: BatchStatus) => {
    switch (status) {
      case "Departed / In Progress":
        return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
      case "Sold Out":
        return "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30";
      case "Filling Fast":
        return "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30";
      case "Completed":
        return "bg-slate-200 dark:bg-zinc-500/15 text-slate-600 dark:text-zinc-400 border-slate-300 dark:border-zinc-500/30";
      default:
        return "bg-slate-200 dark:bg-zinc-500/15 text-slate-600 dark:text-zinc-300 border-slate-300 dark:border-zinc-500/30";
    }
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Top Banner / Welcome Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-[#111318] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-xs transition-colors">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-zinc-400">
              Operations Center
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-slate-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Real-time status of group departures, passenger manifests, fleet inventory & customer bookings.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/batches"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white dark:bg-white/10 dark:hover:bg-white/20 hover:bg-slate-800 text-xs font-semibold transition-all border border-slate-700 dark:border-white/15 shadow-xs"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Passenger Roster</span>
          </Link>
          <Link
            href="/admin/enquiries"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-700 dark:text-zinc-300 text-xs font-semibold border border-slate-200 dark:border-white/[0.08] transition-all shadow-xs"
          >
            <MessageSquareText className="w-3.5 h-3.5" />
            <span>Booking Desk</span>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4 CORE KPI TILES (Adaptive Light / Dark Mode)                             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Group Travellers & Active Batches */}
        <Link
          href="/admin/batches"
          className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3 group transition-all shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              Group Travellers
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-slate-900 dark:text-white">
              {totalBookedPassengers}
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400 font-mono pt-1">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{departedPassengers} Departed</span>
              <span>•</span>
              <span>{batches.length} Batches</span>
            </div>
          </div>
        </Link>

        {/* 2. Tour Circuits */}
        <Link
          href="/admin/tours"
          className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3 group transition-all shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              Tour Circuits
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-slate-900 dark:text-white">
              {totalTours}
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400 font-mono pt-1">
              <span>{carTours} 4x4 Convoys</span>
              <span>•</span>
              <span>{bikeTours} Adv Rides</span>
            </div>
          </div>
        </Link>

        {/* 3. Fleet Inventory */}
        <Link
          href="/admin/vehicles"
          className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3 group transition-all shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              Fleet Inventory
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Car className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-slate-900 dark:text-white">
              {totalVehicles}
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400 font-mono pt-1">
              <span>{totalCars} 4x4 SUVs</span>
              <span>•</span>
              <span>{totalBikes} Adv Bikes</span>
            </div>
          </div>
        </Link>

        {/* 4. Booking Desk Leads */}
        <Link
          href="/admin/enquiries"
          className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3 group transition-all shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              Booking Leads
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <MessageSquareText className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-slate-900 dark:text-white">
              {enquiries.length}
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400 font-mono pt-1">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{pendingEnquiries} New</span>
              <span>•</span>
              <span>{confirmedEnquiries} Confirmed</span>
            </div>
          </div>
        </Link>

      </div>

      {/* ========================================================================= */}
      {/* 2-COLUMN SECTION: Active Departures Tracker & Recent Leads                */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols): Live Departure Batches Tracker */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                <Flag className="w-4 h-4 text-emerald-500" />
                <span>Active & Upcoming Departure Batches</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Track stranger passenger attendance and convoy roll-call.
              </p>
            </div>
            <Link
              href="/admin/batches"
              className="text-xs text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 font-medium"
            >
              <span>Manage Manifest</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-white/[0.08] rounded-2xl divide-y divide-slate-100 dark:divide-white/[0.04] overflow-hidden shadow-xs">
            {batches.slice(0, 3).map((b) => {
              const batchPax = passengers.filter((p) => p.batchId === b.id);
              const boardedCount = batchPax.filter(
                (p) => p.tripStatus === "Boarded / Departed" || p.tripStatus === "On Tour"
              ).length;
              return (
                <div key={b.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${getBatchStatusBadge(b.status)}`}>
                        {b.status}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono">
                        {b.startDate} → {b.endDate}
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-zinc-200 truncate">
                      {b.tourTitle}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
                      Lead Captain: <span className="text-slate-700 dark:text-zinc-300 font-sans">{b.leadCaptainName}</span> • Pickup: <span className="text-slate-700 dark:text-zinc-300 font-sans">{b.startLocation}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-white/[0.04] shrink-0">
                    <div className="text-left sm:text-right">
                      <span className="text-xs font-bold font-mono text-slate-800 dark:text-zinc-200 block">
                        {boardedCount} / {b.bookedSeats} Departed
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono block">
                        {b.totalSeats - b.bookedSeats} Seats Remaining
                      </span>
                    </div>

                    <Link
                      href="/admin/batches"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] dark:text-zinc-300 dark:hover:text-white text-xs font-medium transition-colors border border-slate-200 dark:border-white/[0.06]"
                    >
                      Roll-Call
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (1 Col): Recent Booking Leads */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquareText className="w-4 h-4 text-purple-500" />
                <span>Recent Booking Leads</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Latest customer enquiries from site.
              </p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 font-medium"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-white/[0.08] rounded-2xl divide-y divide-slate-100 dark:divide-white/[0.04] overflow-hidden shadow-xs">
            {recentEnquiries.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 dark:text-zinc-500">
                No recent enquiries found.
              </div>
            ) : (
              recentEnquiries.map((enq) => (
                <div key={enq.id} className="p-3.5 space-y-1.5 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-900 dark:text-zinc-200 truncate">
                      {enq.customerName}
                    </span>
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${getStatusBadge(enq.status)}`}>
                      {enq.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 truncate">
                    {enq.relatedItemName}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-zinc-500 font-mono pt-0.5">
                    <span>{enq.phone}</span>
                    <span>{enq.submittedDate}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* QUICK DISPATCH SHORTCUTS                                                  */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs space-y-3 transition-colors">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
          Quick Management Actions
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/admin/batches"
            className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0D10] hover:bg-slate-100 dark:hover:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] text-left transition-all"
          >
            <Users className="w-4 h-4 text-emerald-500 mb-1.5" />
            <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200 block">Add Passenger</span>
            <span className="text-[10px] text-slate-500 dark:text-zinc-500 font-mono">Manifest update</span>
          </Link>

          <Link
            href="/admin/vehicles"
            className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0D10] hover:bg-slate-100 dark:hover:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] text-left transition-all"
          >
            <Car className="w-4 h-4 text-blue-500 mb-1.5" />
            <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200 block">Add Vehicle</span>
            <span className="text-[10px] text-slate-500 dark:text-zinc-500 font-mono">Update fleet count</span>
          </Link>

          <Link
            href="/admin/tours"
            className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0D10] hover:bg-slate-100 dark:hover:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] text-left transition-all"
          >
            <Compass className="w-4 h-4 text-amber-500 mb-1.5" />
            <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200 block">Create Tour</span>
            <span className="text-[10px] text-slate-500 dark:text-zinc-500 font-mono">4x4 / Bike circuit</span>
          </Link>

          <Link
            href="/admin/gallery"
            className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0D10] hover:bg-slate-100 dark:hover:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] text-left transition-all"
          >
            <FileCheck2 className="w-4 h-4 text-purple-500 mb-1.5" />
            <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200 block">Media Library</span>
            <span className="text-[10px] text-slate-500 dark:text-zinc-500 font-mono">Upload photos</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
