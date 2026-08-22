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
  Sparkles,
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
import { buildWhatsAppUrl } from "@/lib/utils";

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
    if (batchFilterStatus === "in-progress") return batches.filter((b) => b.status === "Departed / In Progress");
    if (batchFilterStatus === "upcoming") return batches.filter((b) => b.status === "Upcoming" || b.status === "Filling Fast" || b.status === "Sold Out");
    if (batchFilterStatus === "completed") return batches.filter((b) => b.status === "Completed");
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
  const pendingCount = batchPassengers.filter((p) => p.tripStatus === "Applied / Pending").length;
  const permitsIssuedCount = batchPassengers.filter((p) => p.permitStatus === "Verified & Issued").length;

  // Handlers
  const handleFlagOffConvoy = () => {
    if (selectedBatch) {
      flagOffBatchConvoy(selectedBatch.id);
      showToast(
        "Convoy Flagged Off! 🚀",
        `${selectedBatch.tourTitle} batch is now ON THE TRAIL. All confirmed travellers marked as Boarded & Departed.`,
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
    showToast("Passenger Boarded", `${p.name} marked as Boarded / Departed on convoy.`, "success");
  };

  const handleSavePassenger = (savedPax: Passenger) => {
    if (editingPassenger) {
      updatePassenger(savedPax.id, savedPax);
      showToast("Passenger Updated", `${savedPax.name}'s roster record updated.`, "success");
    } else {
      addPassenger(savedPax);
      showToast("Passenger Added", `${savedPax.name} added to ${selectedBatch?.tourTitle} batch.`, "success");
    }
    setPassengerModalOpen(false);
  };

  const handleSaveBatch = (savedBatch: TourBatch) => {
    if (editingBatch) {
      updateBatch(savedBatch.id, savedBatch);
      showToast("Batch Updated", `Batch departure specs updated.`, "success");
    } else {
      addBatch(savedBatch);
      setSelectedBatchId(savedBatch.id);
      showToast("Batch Scheduled", `New departure batch scheduled for ${savedBatch.startDate}.`, "success");
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
      showToast("Passenger Removed", `${passengerToDelete.name} has been removed from batch manifest.`, "info");
      setDeleteConfirmOpen(false);
      setDetailDrawerOpen(false);
      setPassengerToDelete(null);
    }
  };

  const getStatusBadge = (status: BatchStatus) => {
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

  const getPaxTripStatusBadge = (status: PassengerTripStatus) => {
    switch (status) {
      case "Boarded / Departed":
      case "On Tour":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";
      case "Fully Paid":
        return "bg-blue-500/20 text-blue-400 border-blue-500/40";
      case "Advance Paid (30%)":
        return "bg-amber-500/20 text-amber-400 border-amber-500/40";
      case "No Show":
      case "Cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/40";
      default:
        return "bg-purple-500/20 text-purple-300 border-purple-500/40";
    }
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Top Banner & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121418] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-red font-display">
              DISPATCH & ROSTER DESK
            </span>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-white/70 font-mono">
              Live Manifest
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-white flex items-center gap-2.5">
            <Users className="w-6 h-6 text-brand-red" />
            <span>Group Expeditions & Passenger Manifest</span>
          </h2>
          <p className="text-xs text-white/60 font-medium">
            Track stranger participant bookings, solo traveller pairings, vehicle allocations, and live trail departure attendance.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              setEditingBatch(null);
              setBatchModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/15 active:scale-95 text-white rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-all border border-white/10"
          >
            <Calendar className="w-4 h-4 text-brand-red" />
            <span>+ Schedule Batch</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setEditingPassenger(null);
              setPassengerModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-brand-red hover:bg-brand-red-hover active:scale-95 text-white rounded-xl text-xs font-black font-display uppercase tracking-wider transition-all shadow-glow-red"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Passenger</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. BATCH SELECTOR CAROUSEL / PILLS (Choose which departure to inspect)    */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black font-display uppercase tracking-wider text-white/70">
            Select Active Departure Batch ({batches.length})
          </span>
          <div className="flex items-center gap-1 text-[11px]">
            {["all", "in-progress", "upcoming", "completed"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setBatchFilterStatus(tab)}
                className={`px-2.5 py-1 rounded-lg font-bold font-display uppercase tracking-wider transition-all ${
                  batchFilterStatus === tab
                    ? "bg-brand-red text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {tab === "in-progress" ? "On Trail (Active)" : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Batch Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {filteredBatches.map((b) => {
            const isSelected = b.id === selectedBatch?.id;
            const progressPercent = Math.min(100, Math.round((b.bookedSeats / b.totalSeats) * 100));

            return (
              <div
                key={b.id}
                onClick={() => setSelectedBatchId(b.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 relative overflow-hidden ${
                  isSelected
                    ? "bg-brand-red/10 border-brand-red shadow-lg shadow-brand-red/10"
                    : "bg-[#121418] border-white/10 hover:border-white/20"
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[9px] font-black font-display uppercase tracking-wider px-2 py-0.5 rounded-md border ${getStatusBadge(
                      b.status
                    )}`}
                  >
                    {b.status}
                  </span>
                  <span className="text-[10px] text-white/50 font-mono">
                    {b.tripFormat === "car" ? "🚗 4x4 Thar" : "🏍️ Moto"}
                  </span>
                </div>

                {/* Circuit Info */}
                <div className="space-y-1">
                  <h4 className="text-xs font-bold font-display text-white line-clamp-2 leading-snug">
                    {b.tourTitle}
                  </h4>
                  <p className="text-[11px] text-brand-red font-mono font-bold">
                    📅 {b.startDate} → {b.endDate}
                  </p>
                </div>

                {/* Seats Progress Bar */}
                <div className="space-y-1.5 pt-1 border-t border-white/5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-white/60">Roster Seats</span>
                    <span className="font-bold text-white">
                      {b.bookedSeats} / {b.totalSeats} Booked
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        progressPercent >= 100
                          ? "bg-red-500"
                          : progressPercent >= 70
                          ? "bg-amber-400"
                          : "bg-emerald-400"
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute top-0 right-0 w-2 h-2 bg-brand-red rounded-bl-lg" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SELECTED BATCH COMMAND & DISPATCH DASHBOARD                             */}
      {/* ========================================================================= */}
      {selectedBatch && (
        <div className="bg-[#121418] border border-white/15 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6">
          
          {/* Header Row: Title, Dates, Captain & Action Buttons */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-white/10">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[9px] font-black font-display uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${getStatusBadge(
                    selectedBatch.status
                  )}`}
                >
                  {selectedBatch.status}
                </span>
                <span className="text-xs text-white/50">
                  Departure Batch: {selectedBatch.id}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black font-display text-white">
                {selectedBatch.tourTitle}
              </h3>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/70">
                <span>📍 Rollout: <strong>{selectedBatch.startLocation}</strong></span>
                <span>📅 Dates: <strong>{selectedBatch.startDate} to {selectedBatch.endDate}</strong></span>
                <span>👨‍✈️ Road Captain: <strong>{selectedBatch.leadCaptainName}</strong> ({selectedBatch.leadCaptainPhone})</span>
              </div>
            </div>

            {/* Quick Dispatch Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Flag Off Convoy */}
              {selectedBatch.status !== "Departed / In Progress" && selectedBatch.status !== "Completed" && (
                <button
                  type="button"
                  onClick={() => setFlagOffConfirmOpen(true)}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-xl text-xs font-black font-display uppercase tracking-wider transition-all shadow-md shadow-emerald-950/50 flex items-center gap-2"
                >
                  <Flag className="w-4 h-4" />
                  <span>Flag-Off Convoy (Departed)</span>
                </button>
              )}

              {/* Print Manifest Sheet */}
              <button
                type="button"
                onClick={handlePrintManifest}
                className="px-3.5 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-all border border-white/10 flex items-center gap-1.5"
                title="Print Emergency Passenger Manifest"
              >
                <Printer className="w-4 h-4" />
                <span>Print Roster</span>
              </button>

              {/* Edit Batch */}
              <button
                type="button"
                onClick={() => {
                  setEditingBatch(selectedBatch);
                  setBatchModalOpen(true);
                }}
                className="px-3.5 py-2.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-all border border-white/10 flex items-center gap-1.5"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Batch</span>
              </button>
            </div>
          </div>

          {/* 4 Dispatch Summary KPI Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {/* Total Booked */}
            <div className="bg-black/50 border border-white/10 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">
                Total Travellers Booked
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black font-display text-white">
                  {batchPassengers.length}
                </span>
                <span className="text-xs text-white/40">/ {selectedBatch.totalSeats} seats</span>
              </div>
            </div>

            {/* Boarded / Departed */}
            <div className="bg-black/50 border border-white/10 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Boarded & Departed</span>
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black font-display text-emerald-400">
                  {departedCount}
                </span>
                <span className="text-xs text-white/40">on the trail</span>
              </div>
            </div>

            {/* Pending Confirmation */}
            <div className="bg-black/50 border border-white/10 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Advance / Confirmed</span>
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black font-display text-amber-400">
                  {advancePaidCount}
                </span>
                <span className="text-xs text-white/40">awaiting flag-off</span>
              </div>
            </div>

            {/* Permits Verified */}
            <div className="bg-black/50 border border-white/10 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block flex items-center gap-1">
                <FileCheck2 className="w-3 h-3" />
                <span>ILP Permits Verified</span>
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black font-display text-blue-400">
                  {permitsIssuedCount}
                </span>
                <span className="text-xs text-white/40">ready for border</span>
              </div>
            </div>
          </div>

          {/* Convoy Vehicle Fleet Allocations Pill Strip */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-black font-display uppercase tracking-widest text-brand-red block">
              ASSIGNED CONVOY VEHICLE FLEET ({selectedBatch.assignedVehicles.length} UNITS)
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {selectedBatch.assignedVehicles.map((veh, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white flex items-center gap-1.5"
                >
                  <Car className="w-3.5 h-3.5 text-brand-red" />
                  <span>{veh}</span>
                </span>
              ))}
            </div>
          </div>

          {/* ======================================================================= */}
          {/* 3. PASSENGER MANIFEST & ATTENDANCE ROSTER TABLE                        */}
          {/* ======================================================================= */}
          <div className="space-y-4 pt-2">
            
            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { label: `All (${batchPassengers.length})`, value: "all" },
                  { label: `Boarded / Departed (${departedCount})`, value: "Boarded / Departed" },
                  { label: `Advance Paid (${batchPassengers.filter((p) => p.tripStatus === "Advance Paid (30%)").length})`, value: "Advance Paid (30%)" },
                  { label: `Fully Paid (${batchPassengers.filter((p) => p.tripStatus === "Fully Paid").length})`, value: "Fully Paid" },
                  { label: `Pending (${pendingCount})`, value: "Applied / Pending" },
                  { label: `Solo Strangers (${batchPassengers.filter((p) => p.isSoloTraveller).length})`, value: "solo" },
                ].map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setPaxFilterStatus(tab.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold font-display uppercase tracking-wider whitespace-nowrap transition-all border ${
                      paxFilterStatus === tab.value
                        ? "bg-brand-red text-white border-brand-red shadow-md"
                        : "bg-black/60 text-white/70 border-white/10 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Passenger Search Input */}
              <div className="relative min-w-[220px]">
                <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={paxSearchQuery}
                  onChange={(e) => setPaxSearchQuery(e.target.value)}
                  placeholder="Search passenger name, city, phone..."
                  className="w-full bg-black/60 border border-white/15 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-brand-red font-medium"
                />
              </div>
            </div>

            {/* Manifest Table Container */}
            <div className="border border-white/10 rounded-2xl overflow-hidden shadow-xl bg-black/40">
              {filteredPassengers.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-white/40 flex items-center justify-center mx-auto">
                    <Users className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold font-display uppercase text-white">
                    No passengers found in this filter
                  </h4>
                  <p className="text-xs text-white/50">
                    Add new travellers or switch the filter tab above.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingPassenger(null);
                      setPassengerModalOpen(true);
                    }}
                    className="px-4 py-2 bg-brand-red text-white rounded-xl text-xs font-bold font-display uppercase tracking-wider"
                  >
                    + Add First Traveller
                  </button>
                </div>
              ) : (
                <>
                  {/* Desktop Table View (>= 768px) */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 bg-black/60 text-[10px] font-black font-display uppercase tracking-widest text-white/50">
                          <th className="p-4">Traveller & Origin</th>
                          <th className="p-4">Assigned Convoy Vehicle</th>
                          <th className="p-4">ILP Permit</th>
                          <th className="p-4">Payment</th>
                          <th className="p-4">Attendance / Trip Status</th>
                          <th className="p-4 text-center">Boarding Action</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredPassengers.map((p) => {
                          const isDeparted = p.tripStatus === "Boarded / Departed" || p.tripStatus === "On Tour";

                          return (
                            <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                              
                              {/* Traveller Name & Solo Tag */}
                              <td className="p-4">
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-bold font-display text-white text-xs block">
                                      {p.name}
                                    </span>
                                    {p.isSoloTraveller && (
                                      <span className="text-[8px] font-black uppercase px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                        Solo
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-white/50 block font-mono">
                                    {p.city} • {p.phone}
                                  </span>
                                </div>
                              </td>

                              {/* Assigned Vehicle & Seat */}
                              <td className="p-4">
                                <div className="space-y-0.5">
                                  <span className="text-xs font-bold text-white/90 block truncate max-w-[170px]">
                                    {p.assignedVehicle}
                                  </span>
                                  <span className="text-[10px] text-brand-red font-mono block">
                                    {p.seatNumber}
                                  </span>
                                </div>
                              </td>

                              {/* ILP Permit Status */}
                              <td className="p-4">
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black font-display uppercase tracking-wider border ${
                                    p.permitStatus === "Verified & Issued"
                                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                      : p.permitStatus === "Not Required"
                                      ? "bg-gray-500/15 text-gray-400 border-gray-500/30"
                                      : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                                  }`}
                                >
                                  {p.permitStatus}
                                </span>
                              </td>

                              {/* Payment Status */}
                              <td className="p-4">
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black font-display uppercase tracking-wider border ${
                                    p.paymentStatus === "Fully Paid"
                                      ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
                                      : p.paymentStatus === "Advance Paid"
                                      ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                                      : "bg-red-500/15 text-red-400 border-red-500/30"
                                  }`}
                                >
                                  {p.paymentStatus}
                                </span>
                              </td>

                              {/* Trip Attendance Dropdown */}
                              <td className="p-4">
                                <select
                                  value={p.tripStatus}
                                  onChange={(e) => {
                                    const newSt = e.target.value as PassengerTripStatus;
                                    updatePassengerTripStatus(p.id, newSt);
                                    showToast("Status Updated", `${p.name} marked as ${newSt}`, "info");
                                  }}
                                  className={`text-[10px] font-black font-display uppercase tracking-wider rounded-lg px-2.5 py-1 border bg-black/80 cursor-pointer focus:outline-none ${getPaxTripStatusBadge(
                                    p.tripStatus
                                  )}`}
                                >
                                  <option value="Applied / Pending" className="bg-[#121418] text-purple-300">Applied / Pending</option>
                                  <option value="Advance Paid (30%)" className="bg-[#121418] text-amber-400">Advance Paid (30%)</option>
                                  <option value="Fully Paid" className="bg-[#121418] text-blue-400">Fully Paid</option>
                                  <option value="Boarded / Departed" className="bg-[#121418] text-emerald-400">Boarded / Departed</option>
                                  <option value="On Tour" className="bg-[#121418] text-emerald-400">On Tour (In-Transit)</option>
                                  <option value="Completed" className="bg-[#121418] text-gray-400">Completed</option>
                                  <option value="No Show" className="bg-[#121418] text-red-400">No Show</option>
                                  <option value="Cancelled" className="bg-[#121418] text-red-400">Cancelled</option>
                                </select>
                              </td>

                              {/* 1-Click Quick Boarding Button */}
                              <td className="p-4 text-center">
                                {isDeparted ? (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 text-[10px] font-black uppercase font-display border border-emerald-500/30">
                                    <CheckCircle2 className="w-3 h-3" />
                                    <span>Chala Gaya</span>
                                  </span>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => handleQuickBoard(p)}
                                    className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black font-display uppercase tracking-wider shadow-sm transition-transform active:scale-95"
                                  >
                                    Mark Boarded
                                  </button>
                                )}
                              </td>

                              {/* Actions */}
                              <td className="p-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedPassenger(p);
                                      setDetailDrawerOpen(true);
                                    }}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
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
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-blue-500/20 text-white/60 hover:text-blue-400 transition-colors"
                                    title="Edit Passenger"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeletePassenger(p)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors"
                                    title="Delete Passenger"
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

                  {/* Mobile Stacked Card View (< 768px, Perfect for 375px Phones) */}
                  <div className="md:hidden divide-y divide-white/10">
                    {filteredPassengers.map((p) => {
                      const isDeparted = p.tripStatus === "Boarded / Departed" || p.tripStatus === "On Tour";

                      return (
                        <div key={p.id} className="p-4 space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h5 className="text-xs font-black font-display text-white">{p.name}</h5>
                                {p.isSoloTraveller && (
                                  <span className="text-[8px] font-black uppercase px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300">
                                    Solo
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-white/50">{p.city} • {p.phone}</p>
                            </div>

                            <span
                              className={`text-[9px] font-black font-display uppercase tracking-wider px-2 py-0.5 rounded border ${getPaxTripStatusBadge(
                                p.tripStatus
                              )}`}
                            >
                              {p.tripStatus}
                            </span>
                          </div>

                          <div className="bg-white/[0.02] p-2.5 rounded-xl border border-white/5 text-[11px] space-y-1">
                            <div className="flex justify-between">
                              <span className="text-white/40">Vehicle</span>
                              <span className="text-white font-bold truncate max-w-[180px]">{p.assignedVehicle}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/40">Seat Position</span>
                              <span className="text-brand-red font-bold">{p.seatNumber}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/40">Permit Status</span>
                              <span className="text-emerald-400 font-bold">{p.permitStatus}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
                            {isDeparted ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Boarded (Chala gaya)</span>
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleQuickBoard(p)}
                                className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-bold font-display uppercase rounded-lg"
                              >
                                Mark Boarded
                              </button>
                            )}

                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedPassenger(p);
                                  setDetailDrawerOpen(true);
                                }}
                                className="px-2.5 py-1 bg-white/10 text-white text-[10px] font-bold font-display uppercase rounded-lg"
                              >
                                Dossier
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingPassenger(p);
                                  setPassengerModalOpen(true);
                                }}
                                className="p-1 bg-blue-500/15 text-blue-400 rounded-lg"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeletePassenger(p)}
                                className="p-1 bg-red-500/15 text-red-400 rounded-lg"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
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
