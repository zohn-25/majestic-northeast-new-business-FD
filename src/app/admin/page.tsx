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
        return "bg-blue-500/15 text-blue-400 border-blue-500/30";
      case "Contacted":
        return "bg-amber-500/15 text-amber-400 border-amber-500/30";
      case "Confirmed":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "Cancelled":
        return "bg-zinc-500/15 text-zinc-400 border-zinc-500/30";
    }
  };

  const getBatchStatusBadge = (status: BatchStatus) => {
    switch (status) {
      case "Departed / In Progress":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "Sold Out":
        return "bg-rose-500/15 text-rose-400 border-rose-500/30";
      case "Filling Fast":
        return "bg-amber-500/15 text-amber-400 border-amber-500/30";
      case "Completed":
        return "bg-zinc-500/15 text-zinc-400 border-zinc-500/30";
      default:
        return "bg-zinc-500/15 text-zinc-300 border-zinc-500/30";
    }
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Top Banner / Welcome Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#111318] border border-white/[0.08] rounded-2xl p-5 sm:p-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
              Operations Center
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
            Dashboard Overview
          </h1>
          <p className="text-xs text-zinc-400">
            Real-time status of group departures, passenger manifests, fleet inventory & customer bookings.
          </p>
        </div>

        {/* Quick Top Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/batches"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-xs font-medium text-zinc-200 hover:text-white transition-all"
          >
            <Users className="w-3.5 h-3.5 text-zinc-400" />
            <span>Manifests ({totalBookedPassengers})</span>
          </Link>
          <Link
            href="/admin/vehicles"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-xs font-medium text-zinc-200 hover:text-white transition-all"
          >
            <Car className="w-3.5 h-3.5 text-zinc-400" />
            <span>Vehicles ({totalVehicles})</span>
          </Link>
          <Link
            href="/admin/enquiries"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-all border border-white/10"
          >
            <MessageSquareText className="w-3.5 h-3.5 text-zinc-300" />
            <span>Leads ({pendingEnquiries} New)</span>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4 MINIMALIST STATS CARDS                                                  */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        
        {/* Card 1: Group Batches & Passenger Manifest */}
        <Link
          href="/admin/batches"
          className="bg-[#111318] hover:bg-[#15181E] border border-white/[0.08] hover:border-white/20 rounded-2xl p-4 sm:p-5 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-300 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <span className="px-2 py-0.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono rounded-md">
              {departedPassengers} On Trail
            </span>
          </div>
          <div className="mt-3.5 space-y-0.5">
            <span className="text-2xl sm:text-3xl font-bold font-display text-white block">
              {totalBookedPassengers}
            </span>
            <span className="text-xs font-medium text-zinc-300 block">
              Group Travellers
            </span>
            <span className="text-[11px] text-zinc-500 block font-mono">
              {batches.length} departure batches
            </span>
          </div>
        </Link>

        {/* Card 2: Guided Tours */}
        <Link
          href="/admin/tours"
          className="bg-[#111318] hover:bg-[#15181E] border border-white/[0.08] hover:border-white/20 rounded-2xl p-4 sm:p-5 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-300 flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 group-hover:translate-x-0.5 transition-all" />
          </div>
          <div className="mt-3.5 space-y-0.5">
            <span className="text-2xl sm:text-3xl font-bold font-display text-white block">
              {totalTours}
            </span>
            <span className="text-xs font-medium text-zinc-300 block">
              Tour Circuits
            </span>
            <span className="text-[11px] text-zinc-500 block font-mono">
              {carTours} 4x4 • {bikeTours} Bikes
            </span>
          </div>
        </Link>

        {/* Card 3: Total Fleet Vehicles */}
        <Link
          href="/admin/vehicles"
          className="bg-[#111318] hover:bg-[#15181E] border border-white/[0.08] hover:border-white/20 rounded-2xl p-4 sm:p-5 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-300 flex items-center justify-center">
              <Car className="w-4 h-4" />
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 group-hover:translate-x-0.5 transition-all" />
          </div>
          <div className="mt-3.5 space-y-0.5">
            <span className="text-2xl sm:text-3xl font-bold font-display text-white block">
              {totalVehicles}
            </span>
            <span className="text-xs font-medium text-zinc-300 block">
              Fleet Units
            </span>
            <span className="text-[11px] text-zinc-500 block font-mono">
              {totalCars} 4x4 Cars • {totalBikes} Bikes
            </span>
          </div>
        </Link>

        {/* Card 4: Pending Enquiries & Leads */}
        <Link
          href="/admin/enquiries"
          className="bg-[#111318] hover:bg-[#15181E] border border-white/[0.08] hover:border-white/20 rounded-2xl p-4 sm:p-5 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-300 flex items-center justify-center">
              <MessageSquareText className="w-4 h-4" />
            </div>
            {pendingEnquiries > 0 ? (
              <span className="px-2 py-0.5 bg-blue-500/15 border border-blue-500/30 text-blue-400 text-[10px] font-mono rounded-md">
                {pendingEnquiries} New
              </span>
            ) : (
              <span className="text-[10px] text-zinc-500 font-mono">All Clear</span>
            )}
          </div>
          <div className="mt-3.5 space-y-0.5">
            <span className="text-2xl sm:text-3xl font-bold font-display text-white block">
              {enquiries.length}
            </span>
            <span className="text-xs font-medium text-zinc-300 block">
              Total Enquiries
            </span>
            <span className="text-[11px] text-zinc-500 block font-mono">
              {confirmedEnquiries} confirmed bookings
            </span>
          </div>
        </Link>

      </div>

      {/* ========================================================================= */}
      {/* ACTIVE BATCH DEPARTURE & PASSENGER MANIFEST MONITOR                       */}
      {/* ========================================================================= */}
      <div className="bg-[#111318] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-sm sm:text-base font-semibold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-zinc-400" />
              <span>Upcoming & In-Progress Group Batches</span>
            </h3>
            <p className="text-xs text-zinc-500">
              Live roll-call and convoy passenger attendance.
            </p>
          </div>

          <Link
            href="/admin/batches"
            className="inline-flex items-center gap-1 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
          >
            <span>Open Manifest Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Batches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {batches.slice(0, 3).map((b) => {
            const batchPax = passengers.filter((p) => p.batchId === b.id);
            const departedPax = batchPax.filter(
              (p) => p.tripStatus === "Boarded / Departed" || p.tripStatus === "On Tour"
            ).length;

            return (
              <div
                key={b.id}
                className="bg-[#0B0D10] border border-white/[0.06] rounded-xl p-4 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border ${getBatchStatusBadge(
                        b.status
                      )}`}
                    >
                      {b.status}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      {b.startDate}
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-white line-clamp-1">
                    {b.tourTitle}
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    Captain: {b.leadCaptainName} • {b.assignedVehicles.length} Units
                  </p>
                </div>

                <div className="pt-2 border-t border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Attendance</span>
                    <span className="font-mono text-zinc-300 text-xs">
                      <strong className="text-emerald-400">{departedPax} Departed</strong> / {batchPax.length} Booked
                    </span>
                  </div>

                  <Link
                    href={`/admin/batches`}
                    className="w-full py-1.5 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 hover:text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1 transition-colors border border-white/[0.06]"
                  >
                    <span>View Passenger Roster</span>
                    <ChevronRight className="w-3 h-3 text-zinc-500" />
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
      <div className="bg-[#111318] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-sm sm:text-base font-semibold text-white flex items-center gap-2">
              <MessageSquareText className="w-4 h-4 text-zinc-400" />
              <span>Recent Booking Enquiries</span>
            </h3>
            <p className="text-xs text-zinc-500">
              Latest incoming leads submitted via public quote forms.
            </p>
          </div>

          <Link
            href="/admin/enquiries"
            className="inline-flex items-center gap-1 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
          >
            <span>View All ({enquiries.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Enquiries Table */}
        <div className="border border-white/[0.06] rounded-xl overflow-hidden bg-[#0B0D10]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02] text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                  <th className="p-3.5">Guest</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Requested Item</th>
                  <th className="p-3.5">Submitted</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-3.5">
                      <div className="space-y-0.5">
                        <span className="font-medium text-zinc-100 text-xs block">
                          {enq.customerName}
                        </span>
                        <span className="text-[10px] text-zinc-500 block font-mono">
                          {enq.phone}
                        </span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className="text-[10px] font-mono uppercase text-zinc-400 px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
                        {enq.type}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-xs text-zinc-300 block truncate max-w-[200px]">
                        {enq.relatedItemName}
                      </span>
                    </td>

                    <td className="p-3.5 text-[11px] text-zinc-500 font-mono">
                      {enq.submittedDate}
                    </td>

                    <td className="p-3.5">
                      <select
                        value={enq.status}
                        onChange={(e) =>
                          updateEnquiryStatus(enq.id, e.target.value as EnquiryStatus)
                        }
                        className={`text-[10px] font-mono uppercase rounded-md px-2 py-1 border bg-[#111318] cursor-pointer focus:outline-none ${getStatusBadge(
                          enq.status
                        )}`}
                      >
                        <option value="New" className="bg-[#111318] text-blue-400">New</option>
                        <option value="Contacted" className="bg-[#111318] text-amber-400">Contacted</option>
                        <option value="Confirmed" className="bg-[#111318] text-emerald-400">Confirmed</option>
                        <option value="Cancelled" className="bg-[#111318] text-zinc-400">Cancelled</option>
                      </select>
                    </td>

                    <td className="p-3.5 text-right">
                      <Link
                        href="/admin/enquiries"
                        className="p-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white inline-flex items-center transition-colors"
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
