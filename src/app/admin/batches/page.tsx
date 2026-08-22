"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Users,
  Calendar,
  Compass,
  Car,
  Bike,
  Plus,
  Edit,
  Trash2,
  Phone,
  MessageCircle,
  ShieldCheck,
  CreditCard,
  FileCheck2,
  CheckCircle2,
  Clock,
  Printer,
  Flag,
  AlertTriangle,
  ChevronRight,
  Eye,
  Search,
  Filter,
} from "lucide-react";
import { useData } from "@/context/DataContext";
import { TourBatch, Passenger, BatchStatus, PassengerTripStatus } from "@/lib/types";
import { PassengerModal } from "@/components/admin/PassengerModal";
import { BatchModal } from "@/components/admin/BatchModal";
import { PassengerDetailDrawer } from "@/components/admin/PassengerDetailDrawer";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { useToast } from "@/components/admin/Toast";

export default function AdminBatchesManifestPage() {
  const {
    batches,
    passengers,
    tours,
    addBatch,
    updateBatch,
    updateBatchStatus,
    flagOffBatchConvoy,
    addPassenger,
    updatePassenger,
    deletePassenger,
    updatePassengerTripStatus,
  } = useData();

  const { showToast } = useToast();

  // Active Batch Selector
  const [selectedBatchId, setSelectedBatchId] = useState<string>(batches[0]?.id || "");
  const [batchFilterStatus, setBatchFilterStatus] = useState<string>("all");
  const [paxSearchQuery, setPaxSearchQuery] = useState("");
  const [paxFilterStatus, setPaxFilterStatus] = useState<string>("all");

  // Modals & Drawers
  const [passengerModalOpen, setPassengerModalOpen] = useState(false);
  const [editingPassenger, setEditingPassenger] = useState<Passenger | null>(null);

  const [batchModalOpen, setBatchModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<TourBatch | null>(null);

  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [selectedPassenger, setSelectedPassenger] = useState<Passenger | null>(null);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [passengerToDelete, setPassengerToDelete] = useState<Passenger | null>(null);

  const [flagOffConfirmOpen, setFlagOffConfirmOpen] = useState(false);

  // Selected Batch Object
  const selectedBatch = useMemo(() => {
    return batches.find((b) => b.id === selectedBatchId) || batches[0];
  }, [batches, selectedBatchId]);

  // Filtered Batches List for Selector
  const filteredBatches = useMemo(() => {
    if (batchFilterStatus === "all") return batches;
    if (batchFilterStatus === "in-progress")
      return batches.filter((b) => b.status === "Departed / In Progress");
    if (batchFilterStatus === "upcoming")
      return batches.filter(
        (b) =>
          b.status === "Upcoming" ||
          b.status === "Filling Fast" ||
          b.status === "Sold Out"
      );
    if (batchFilterStatus === "completed")
      return batches.filter((b) => b.status === "Completed");
    return batches;
  }, [batches, batchFilterStatus]);

  // Passengers in current selected batch
  const batchPassengers = useMemo(() => {
    if (!selectedBatch) return [];
    return passengers.filter((p) => p.batchId === selectedBatch.id);
  }, [passengers, selectedBatch]);

  // Search & Filtered Passengers in current batch
  const filteredPassengers = useMemo(() => {
    let list = [...batchPassengers];

    if (paxFilterStatus !== "all") {
      if (paxFilterStatus === "solo") {
        list = list.filter((p) => p.isSoloTraveller);
      } else {
        list = list.filter((p) => p.tripStatus === paxFilterStatus);
      }
    }

    if (paxSearchQuery.trim()) {
      const q = paxSearchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.phone.includes(q) ||
          p.email.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.assignedVehicle.toLowerCase().includes(q) ||
          p.seatNumber.toLowerCase().includes(q)
      );
    }

    return list;
  }, [batchPassengers, paxFilterStatus, paxSearchQuery]);

  // Stats for the active batch
  const departedCount = batchPassengers.filter(
    (p) => p.tripStatus === "Boarded / Departed" || p.tripStatus === "On Tour"
  ).length;
  const advancePaidCount = batchPassengers.filter(
    (p) => p.tripStatus === "Advance Paid (30%)" || p.tripStatus === "Fully Paid"
  ).length;
  const pendingCount = batchPassengers.filter(
    (p) => p.tripStatus === "Applied / Pending"
  ).length;
  const permitsIssuedCount = batchPassengers.filter(
    (p) => p.permitStatus === "Verified & Issued"
  ).length;

  // Handlers
  const handleFlagOffConvoy = () => {
    if (selectedBatch) {
      flagOffBatchConvoy(selectedBatch.id);
      showToast(
        "Convoy Flagged Off",
        `${selectedBatch.tourTitle} batch is now marked as departed on trail.`,
        "success"
      );
      setFlagOffConfirmOpen(false);
    }
  };

  const handlePrintManifest = () => {
    window.print();
  };

  const handleQuickBoard = (p: Passenger) => {
    updatePassengerTripStatus(p.id, "Boarded / Departed");
    showToast("Passenger Boarded", `${p.name} marked as Boarded / Departed.`, "success");
  };

  const handleSavePassenger = (savedPax: Passenger) => {
    if (editingPassenger) {
      updatePassenger(savedPax.id, savedPax);
      showToast("Passenger Updated", `${savedPax.name}'s record updated.`, "success");
    } else {
      addPassenger(savedPax);
      showToast("Passenger Added", `${savedPax.name} added to manifest roster.`, "success");
    }
    setPassengerModalOpen(false);
  };

  const handleSaveBatch = (savedBatch: TourBatch) => {
    if (editingBatch) {
      updateBatch(savedBatch.id, savedBatch);
      showToast("Batch Updated", `Departure batch updated.`, "success");
    } else {
      addBatch(savedBatch);
      setSelectedBatchId(savedBatch.id);
      showToast("Batch Scheduled", `New departure batch scheduled.`, "success");
    }
    setBatchModalOpen(false);
  };

  const handleDeletePassenger = (p: Passenger) => {
    setPassengerToDelete(p);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (passengerToDelete) {
      deletePassenger(passengerToDelete.id);
      showToast("Passenger Removed", `${passengerToDelete.name} removed from manifest.`, "info");
      setDeleteConfirmOpen(false);
      setDetailDrawerOpen(false);
      setPassengerToDelete(null);
    }
  };

  const getStatusBadge = (status: BatchStatus) => {
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

  const getPaxTripStatusBadge = (status: PassengerTripStatus) => {
    switch (status) {
      case "Boarded / Departed":
      case "On Tour":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "Fully Paid":
        return "bg-blue-500/15 text-blue-400 border-blue-500/30";
      case "Advance Paid (30%)":
        return "bg-amber-500/15 text-amber-400 border-amber-500/30";
      case "No Show":
      case "Cancelled":
        return "bg-rose-500/15 text-rose-400 border-rose-500/30";
      default:
        return "bg-purple-500/15 text-purple-300 border-purple-500/30";
    }
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111318] border border-white/[0.08] rounded-2xl p-5 sm:p-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
              Roster & Attendance Desk
            </span>
            <span className="text-[10px] bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 rounded text-zinc-300 font-mono">
              Live Manifest
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-zinc-400" />
            <span>Group Batches & Passenger Manifest</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Track stranger participant bookings, vehicle seat assignments, permit verification, and live trail departure attendance.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setEditingBatch(null);
              setBatchModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/[0.05] hover:bg-white/[0.09] active:scale-95 text-zinc-200 hover:text-white rounded-xl text-xs font-medium transition-all border border-white/[0.08]"
          >
            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
            <span>+ Schedule Batch</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setEditingPassenger(null);
              setPassengerModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/15 active:scale-95 text-white rounded-xl text-xs font-semibold transition-all border border-white/15 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Passenger</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. BATCH SELECTOR CAROUSEL                                                */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-400 font-mono uppercase tracking-wider">
            Select Active Batch ({batches.length})
          </span>
          <div className="flex items-center gap-1 text-[11px]">
            {["all", "in-progress", "upcoming", "completed"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setBatchFilterStatus(tab)}
                className={`px-2.5 py-1 rounded-md font-mono text-xs transition-all ${
                  batchFilterStatus === tab
                    ? "bg-white/15 text-white font-semibold"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tab === "in-progress" ? "Active" : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Batch Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {filteredBatches.map((b) => {
            const isSelected = b.id === selectedBatch?.id;
            const progressPercent = Math.min(
              100,
              Math.round((b.bookedSeats / b.totalSeats) * 100)
            );

            return (
              <div
                key={b.id}
                onClick={() => setSelectedBatchId(b.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-2.5 relative ${
                  isSelected
                    ? "bg-[#16191F] border-white/30 shadow-md ring-1 ring-white/10"
                    : "bg-[#111318] border-white/[0.08] hover:border-white/15"
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border ${getStatusBadge(
                      b.status
                    )}`}
                  >
                    {b.status}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {b.tripFormat === "car" ? "4x4" : "Moto"}
                  </span>
                </div>

                {/* Circuit Info */}
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-white line-clamp-1 leading-snug">
                    {b.tourTitle}
                  </h4>
                  <p className="text-[10px] text-zinc-400 font-mono">
                    {b.startDate} → {b.endDate}
                  </p>
                </div>

                {/* Seats Progress Bar */}
                <div className="space-y-1 pt-1 border-t border-white/[0.06]">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-zinc-500 font-mono">Capacity</span>
                    <span className="font-mono text-zinc-300 text-[10px]">
                      {b.bookedSeats}/{b.totalSeats}
                    </span>
                  </div>
                  <div className="h-1 w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-zinc-300 transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SELECTED BATCH COMMAND BAR                                             */}
      {/* ========================================================================= */}
      {selectedBatch && (
        <div className="bg-[#111318] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-5">
          
          {/* Header Row: Title, Dates, Captain & Action Buttons */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border ${getStatusBadge(
                    selectedBatch.status
                  )}`}
                >
                  {selectedBatch.status}
                </span>
                <span className="text-xs text-zinc-500 font-mono">
                  Batch ID: {selectedBatch.id}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                {selectedBatch.tourTitle}
              </h3>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
                <span>📍 Pickup: <strong className="text-zinc-200">{selectedBatch.startLocation}</strong></span>
                <span>📅 Window: <strong className="text-zinc-200">{selectedBatch.startDate} to {selectedBatch.endDate}</strong></span>
                <span>👨‍✈️ Captain: <strong className="text-zinc-200">{selectedBatch.leadCaptainName}</strong> ({selectedBatch.leadCaptainPhone})</span>
              </div>
            </div>

            {/* Quick Dispatch Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Flag Off Convoy */}
              {selectedBatch.status !== "Departed / In Progress" &&
                selectedBatch.status !== "Completed" && (
                  <button
                    type="button"
                    onClick={() => setFlagOffConfirmOpen(true)}
                    className="px-3.5 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 active:scale-95 text-emerald-400 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>Flag-Off Convoy</span>
                  </button>
                )}

              {/* Print Manifest Sheet */}
              <button
                type="button"
                onClick={handlePrintManifest}
                className="px-3 py-2 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white rounded-xl text-xs font-medium transition-all border border-white/[0.08] flex items-center gap-1.5"
                title="Print Manifest"
              >
                <Printer className="w-3.5 h-3.5 text-zinc-400" />
                <span>Print</span>
              </button>

              {/* Edit Batch */}
              <button
                type="button"
                onClick={() => {
                  setEditingBatch(selectedBatch);
                  setBatchModalOpen(true);
                }}
                className="px-3 py-2 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white rounded-xl text-xs font-medium transition-all border border-white/[0.08] flex items-center gap-1.5"
              >
                <Edit className="w-3.5 h-3.5 text-zinc-400" />
                <span>Edit Batch</span>
              </button>
            </div>
          </div>

          {/* 4 Dispatch Summary KPI Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Total Booked */}
            <div className="bg-[#0B0D10] border border-white/[0.06] rounded-xl p-3.5 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                Total Booked
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-white font-display">
                  {batchPassengers.length}
                </span>
                <span className="text-xs text-zinc-500">/ {selectedBatch.totalSeats} seats</span>
              </div>
            </div>

            {/* Boarded / Departed */}
            <div className="bg-[#0B0D10] border border-white/[0.06] rounded-xl p-3.5 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Departed</span>
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-emerald-400 font-display">
                  {departedCount}
                </span>
                <span className="text-xs text-zinc-500">on trail</span>
              </div>
            </div>

            {/* Pending Confirmation */}
            <div className="bg-[#0B0D10] border border-white/[0.06] rounded-xl p-3.5 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Advance Paid</span>
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-amber-400 font-display">
                  {advancePaidCount}
                </span>
                <span className="text-xs text-zinc-500">confirmed</span>
              </div>
            </div>

            {/* Permits Verified */}
            <div className="bg-[#0B0D10] border border-white/[0.06] rounded-xl p-3.5 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 block flex items-center gap-1">
                <FileCheck2 className="w-3 h-3" />
                <span>Permits Issued</span>
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-blue-400 font-display">
                  {permitsIssuedCount}
                </span>
                <span className="text-xs text-zinc-500">verified</span>
              </div>
            </div>
          </div>

          {/* Assigned Convoy Vehicles Pill Strip */}
          <div className="bg-[#0B0D10] border border-white/[0.06] rounded-xl p-3 space-y-2">
            <span className="text-[10px] font-mono uppercase text-zinc-400 block">
              Assigned Convoy Fleet ({selectedBatch.assignedVehicles.length} Units)
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {selectedBatch.assignedVehicles.map((veh, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] rounded-lg text-xs text-zinc-200 flex items-center gap-1.5 font-medium"
                >
                  <Car className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{veh}</span>
                </span>
              ))}
            </div>
          </div>

          {/* ======================================================================= */}
          {/* 3. PASSENGER MANIFEST TABLE                                            */}
          {/* ======================================================================= */}
          <div className="space-y-3 pt-2">
            
            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { label: `All (${batchPassengers.length})`, value: "all" },
                  { label: `Departed (${departedCount})`, value: "Boarded / Departed" },
                  { label: `Advance (${advancePaidCount})`, value: "Advance Paid (30%)" },
                  { label: `Pending (${pendingCount})`, value: "Applied / Pending" },
                  {
                    label: `Solo (${
                      batchPassengers.filter((p) => p.isSoloTraveller).length
                    })`,
                    value: "solo",
                  },
                ].map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setPaxFilterStatus(tab.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                      paxFilterStatus === tab.value
                        ? "bg-white/15 text-white border-white/20 font-semibold"
                        : "bg-white/[0.02] text-zinc-400 border-white/[0.06] hover:border-white/15 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Passenger Search Input */}
              <div className="relative min-w-[220px]">
                <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={paxSearchQuery}
                  onChange={(e) => setPaxSearchQuery(e.target.value)}
                  placeholder="Filter name, phone, city..."
                  className="w-full bg-[#0B0D10] border border-white/[0.08] rounded-xl pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-white/20"
                />
              </div>
            </div>

            {/* Manifest Table Container */}
            <div className="border border-white/[0.06] rounded-xl overflow-hidden bg-[#0B0D10]">
              {filteredPassengers.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] text-zinc-500 flex items-center justify-center mx-auto">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-medium text-zinc-300">
                    No travellers found in this view
                  </h4>
                </div>
              ) : (
                <>
                  {/* Desktop Table View (>= 768px) */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/[0.06] bg-white/[0.02] text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                          <th className="p-3.5">Traveller</th>
                          <th className="p-3.5">Assigned Vehicle</th>
                          <th className="p-3.5">ILP Permit</th>
                          <th className="p-3.5">Payment</th>
                          <th className="p-3.5">Attendance</th>
                          <th className="p-3.5 text-center">Boarding</th>
                          <th className="p-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.04]">
                        {filteredPassengers.map((p) => {
                          const isDeparted =
                            p.tripStatus === "Boarded / Departed" ||
                            p.tripStatus === "On Tour";

                          return (
                            <tr
                              key={p.id}
                              className="hover:bg-white/[0.02] transition-colors"
                            >
                              {/* Traveller Name & Solo Tag */}
                              <td className="p-3.5">
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-medium text-zinc-100 text-xs block">
                                      {p.name}
                                    </span>
                                    {p.isSoloTraveller && (
                                      <span className="text-[8px] font-mono uppercase px-1 py-0.2 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">
                                        Solo
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-zinc-500 block font-mono">
                                    {p.city} • {p.phone}
                                  </span>
                                </div>
                              </td>

                              {/* Assigned Vehicle & Seat */}
                              <td className="p-3.5">
                                <div className="space-y-0.5">
                                  <span className="text-xs text-zinc-300 block truncate max-w-[160px]">
                                    {p.assignedVehicle}
                                  </span>
                                  <span className="text-[10px] text-zinc-500 font-mono block">
                                    {p.seatNumber}
                                  </span>
                                </div>
                              </td>

                              {/* ILP Permit Status */}
                              <td className="p-3.5">
                                <span
                                  className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono uppercase border ${
                                    p.permitStatus === "Verified & Issued"
                                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                      : p.permitStatus === "Not Required"
                                      ? "bg-zinc-500/15 text-zinc-400 border-zinc-500/30"
                                      : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                                  }`}
                                >
                                  {p.permitStatus}
                                </span>
                              </td>

                              {/* Payment Status */}
                              <td className="p-3.5">
                                <span
                                  className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono uppercase border ${
                                    p.paymentStatus === "Fully Paid"
                                      ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
                                      : p.paymentStatus === "Advance Paid"
                                      ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                                      : "bg-rose-500/15 text-rose-400 border-rose-500/30"
                                  }`}
                                >
                                  {p.paymentStatus}
                                </span>
                              </td>

                              {/* Trip Attendance Dropdown */}
                              <td className="p-3.5">
                                <select
                                  value={p.tripStatus}
                                  onChange={(e) => {
                                    const newSt = e.target
                                      .value as PassengerTripStatus;
                                    updatePassengerTripStatus(p.id, newSt);
                                    showToast(
                                      "Status Updated",
                                      `${p.name} marked as ${newSt}`,
                                      "info"
                                    );
                                  }}
                                  className={`text-[10px] font-mono uppercase rounded-md px-2 py-1 border bg-[#111318] cursor-pointer focus:outline-none ${getPaxTripStatusBadge(
                                    p.tripStatus
                                  )}`}
                                >
                                  <option
                                    value="Applied / Pending"
                                    className="bg-[#111318] text-purple-300"
                                  >
                                    Applied / Pending
                                  </option>
                                  <option
                                    value="Advance Paid (30%)"
                                    className="bg-[#111318] text-amber-400"
                                  >
                                    Advance Paid (30%)
                                  </option>
                                  <option
                                    value="Fully Paid"
                                    className="bg-[#111318] text-blue-400"
                                  >
                                    Fully Paid
                                  </option>
                                  <option
                                    value="Boarded / Departed"
                                    className="bg-[#111318] text-emerald-400"
                                  >
                                    Boarded / Departed
                                  </option>
                                  <option
                                    value="On Tour"
                                    className="bg-[#111318] text-emerald-400"
                                  >
                                    On Tour (In-Transit)
                                  </option>
                                  <option
                                    value="Completed"
                                    className="bg-[#111318] text-zinc-400"
                                  >
                                    Completed
                                  </option>
                                  <option
                                    value="No Show"
                                    className="bg-[#111318] text-rose-400"
                                  >
                                    No Show
                                  </option>
                                  <option
                                    value="Cancelled"
                                    className="bg-[#111318] text-zinc-500"
                                  >
                                    Cancelled
                                  </option>
                                </select>
                              </td>

                              {/* 1-Click Quick Boarding Button */}
                              <td className="p-3.5 text-center">
                                {isDeparted ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                                    <CheckCircle2 className="w-3 h-3" />
                                    <span>Departed</span>
                                  </span>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => handleQuickBoard(p)}
                                    className="px-2.5 py-1 rounded-md bg-white/[0.06] hover:bg-emerald-600/20 hover:text-emerald-400 hover:border-emerald-500/30 border border-white/[0.08] text-zinc-300 text-[10px] font-mono uppercase transition-colors"
                                  >
                                    Board
                                  </button>
                                )}
                              </td>

                              {/* Actions */}
                              <td className="p-3.5 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedPassenger(p);
                                      setDetailDrawerOpen(true);
                                    }}
                                    className="p-1.5 rounded-md bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors"
                                    title="View Dossier"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingPassenger(p);
                                      setPassengerModalOpen(true);
                                    }}
                                    className="p-1.5 rounded-md bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors"
                                    title="Edit"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeletePassenger(p)}
                                    className="p-1.5 rounded-md bg-white/[0.03] hover:bg-red-500/15 hover:text-red-400 transition-colors text-zinc-400"
                                    title="Remove"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Stacked Card View */}
                  <div className="md:hidden divide-y divide-white/[0.06]">
                    {filteredPassengers.map((p) => {
                      const isDeparted =
                        p.tripStatus === "Boarded / Departed" ||
                        p.tripStatus === "On Tour";

                      return (
                        <div key={p.id} className="p-3.5 space-y-2.5">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h5 className="text-xs font-medium text-white">
                                  {p.name}
                                </h5>
                                {p.isSoloTraveller && (
                                  <span className="text-[8px] font-mono uppercase px-1 py-0.2 rounded bg-purple-500/15 text-purple-300">
                                    Solo
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-zinc-500 font-mono">
                                {p.city} • {p.phone}
                              </p>
                            </div>

                            <span
                              className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border ${getPaxTripStatusBadge(
                                p.tripStatus
                              )}`}
                            >
                              {p.tripStatus}
                            </span>
                          </div>

                          <div className="bg-white/[0.02] p-2 rounded-lg border border-white/[0.04] text-[11px] space-y-1">
                            <div className="flex justify-between">
                              <span className="text-zinc-500">Vehicle</span>
                              <span className="text-zinc-300 font-mono text-[10px] truncate max-w-[180px]">
                                {p.assignedVehicle}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-500">Seat</span>
                              <span className="text-zinc-300 font-mono text-[10px]">
                                {p.seatNumber}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/[0.04]">
                            {isDeparted ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Departed</span>
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleQuickBoard(p)}
                                className="px-2.5 py-1 bg-white/[0.06] text-zinc-200 text-[10px] font-mono uppercase rounded-md border border-white/[0.08]"
                              >
                                Mark Boarded
                              </button>
                            )}

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedPassenger(p);
                                  setDetailDrawerOpen(true);
                                }}
                                className="px-2 py-1 bg-white/[0.04] text-zinc-300 text-[10px] font-mono rounded-md"
                              >
                                Dossier
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingPassenger(p);
                                  setPassengerModalOpen(true);
                                }}
                                className="p-1 bg-white/[0.04] text-zinc-400 rounded-md"
                              >
                                <Edit className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeletePassenger(p)}
                                className="p-1 bg-red-500/10 text-red-400 rounded-md"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS & DRAWERS                                                          */}
      {/* ========================================================================= */}
      
      {/* Passenger Modal (Add/Edit) */}
      <PassengerModal
        isOpen={passengerModalOpen}
        passenger={editingPassenger}
        batches={batches}
        selectedBatchId={selectedBatch?.id}
        onClose={() => setPassengerModalOpen(false)}
        onSave={handleSavePassenger}
      />

      {/* Batch Modal (Schedule/Edit) */}
      <BatchModal
        isOpen={batchModalOpen}
        batch={editingBatch}
        tours={tours}
        onClose={() => setBatchModalOpen(false)}
        onSave={handleSaveBatch}
      />

      {/* Passenger Detail Dossier Drawer */}
      <PassengerDetailDrawer
        isOpen={detailDrawerOpen}
        passenger={selectedPassenger}
        onClose={() => setDetailDrawerOpen(false)}
        onStatusChange={(id, st) => {
          updatePassengerTripStatus(id, st);
          if (selectedPassenger) {
            setSelectedPassenger({ ...selectedPassenger, tripStatus: st });
          }
          showToast("Status Changed", `Passenger marked as ${st}`, "success");
        }}
        onEdit={(p) => {
          setDetailDrawerOpen(false);
          setEditingPassenger(p);
          setPassengerModalOpen(true);
        }}
        onDelete={handleDeletePassenger}
      />

      {/* Delete Passenger Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        title="Remove Passenger from Batch"
        message={`Are you sure you want to remove ${passengerToDelete?.name} from this departure batch manifest?`}
        confirmLabel="Remove Passenger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirmOpen(false)}
      />

      {/* Flag-Off Convoy Confirmation */}
      <ConfirmDialog
        isOpen={flagOffConfirmOpen}
        title="Flag-Off Expedition Convoy"
        message={`Are you ready to flag off the convoy for "${selectedBatch?.tourTitle}"? This will mark the batch as 'Departed / In Progress' and mark all confirmed passengers as 'Boarded / Departed' on the trail.`}
        confirmLabel="Flag-Off Now"
        isDestructive={false}
        onConfirm={handleFlagOffConvoy}
        onCancel={() => setFlagOffConfirmOpen(false)}
      />

    </div>
  );
}
