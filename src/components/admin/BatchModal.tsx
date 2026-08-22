"use client";

import React, { useState, useEffect } from "react";
import { X, Save, Calendar, Compass, Users } from "lucide-react";
import { TourBatch, Tour, BatchStatus } from "@/lib/types";

interface BatchModalProps {
  isOpen: boolean;
  batch?: TourBatch | null;
  tours: Tour[];
  onClose: () => void;
  onSave: (batch: TourBatch) => void;
}

export function BatchModal({
  isOpen,
  batch,
  tours,
  onClose,
  onSave,
}: BatchModalProps) {
  const isEditing = Boolean(batch);

  const [formData, setFormData] = useState<Partial<TourBatch>>({
    tourId: tours[0]?.id || "",
    tourTitle: tours[0]?.title || "",
    startDate: "2026-09-10",
    endDate: "2026-09-17",
    totalSeats: 12,
    bookedSeats: 0,
    status: "Upcoming",
    tripFormat: tours[0]?.tripFormat || "car",
    leadCaptainName: "Rohan Sangma",
    leadCaptainPhone: "+91 94360 11223",
    leadVehicle: "Thar 4x4 #01 (Lead)",
    assignedVehicles: ["Thar 4x4 #01 (Lead)", "Thar 4x4 #02", "Scorpio-N 4x4 #03"],
    startLocation: "Guwahati Airport",
    endLocation: "Guwahati Airport",
  });

  const [assignedVehiclesInput, setAssignedVehiclesInput] = useState(
    "Thar 4x4 #01 (Lead), Thar 4x4 #02, Scorpio-N 4x4 #03"
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (batch) {
      setFormData(batch);
      setAssignedVehiclesInput(batch.assignedVehicles.join(", "));
    } else {
      const defaultTour = tours[0];
      setFormData({
        id: `batch-${Date.now().toString().slice(-4)}`,
        tourId: defaultTour?.id || "",
        tourTitle: defaultTour?.title || "",
        startDate: "2026-09-10",
        endDate: "2026-09-17",
        totalSeats: defaultTour?.totalSeats || 12,
        bookedSeats: 0,
        status: "Upcoming",
        tripFormat: defaultTour?.tripFormat || "car",
        leadCaptainName: "Rohan Sangma",
        leadCaptainPhone: "+91 94360 11223",
        leadVehicle: "Thar 4x4 #01 (Lead)",
        assignedVehicles: ["Thar 4x4 #01 (Lead)", "Thar 4x4 #02", "Scorpio-N 4x4 #03"],
        startLocation: defaultTour?.pickupDropPoints?.[0] || "Guwahati Airport",
        endLocation: defaultTour?.pickupDropPoints?.[1] || defaultTour?.pickupDropPoints?.[0] || "Guwahati Airport",
      });
      setAssignedVehiclesInput("Thar 4x4 #01 (Lead), Thar 4x4 #02, Scorpio-N 4x4 #03");
    }
    setErrors({});
  }, [batch, tours, isOpen]);

  const handleTourSelect = (tourId: string) => {
    const tour = tours.find((t) => t.id === tourId);
    if (tour) {
      setFormData((prev) => ({
        ...prev,
        tourId: tour.id,
        tourTitle: tour.title,
        tripFormat: tour.tripFormat,
        totalSeats: tour.totalSeats,
        startLocation: tour.pickupDropPoints?.[0] || "Guwahati Airport",
        endLocation: tour.pickupDropPoints?.[1] || tour.pickupDropPoints?.[0] || "Guwahati Airport",
      }));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.startDate?.trim()) newErrors.startDate = "Start date required.";
    if (!formData.endDate?.trim()) newErrors.endDate = "End date required.";
    if (!formData.leadCaptainName?.trim())
      newErrors.leadCaptainName = "Captain name required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const vehiclesList = assignedVehiclesInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const fullBatch: TourBatch = {
      id: formData.id || batch?.id || `batch-${Date.now()}`,
      tourId: formData.tourId || tours[0]?.id || "",
      tourTitle: formData.tourTitle || tours[0]?.title || "",
      startDate: formData.startDate || "2026-09-10",
      endDate: formData.endDate || "2026-09-17",
      totalSeats: Number(formData.totalSeats) || 12,
      bookedSeats: Number(formData.bookedSeats) || 0,
      status: (formData.status as BatchStatus) || "Upcoming",
      tripFormat: (formData.tripFormat as "car" | "bike") || "car",
      leadCaptainName: formData.leadCaptainName || "Rohan Sangma",
      leadCaptainPhone: formData.leadCaptainPhone || "+91 94360 11223",
      leadVehicle: formData.leadVehicle || "Thar 4x4 #01",
      assignedVehicles: vehiclesList.length ? vehiclesList : ["Thar 4x4 #01 (Lead)", "Thar 4x4 #02"],
      startLocation: formData.startLocation || "Guwahati Airport",
      endLocation: formData.endLocation || "Guwahati Airport",
    };

    onSave(fullBatch);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-[#111318] border border-slate-200 dark:border-white/[0.12] rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5 my-8 text-left transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 dark:border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-zinc-300 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                {isEditing ? "Edit Departure Batch" : "Schedule Departure Batch"}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                Configure departure dates, road captain, and convoy units.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-400 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Select Expedition Circuit */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
              Expedition Tour Circuit *
            </label>
            <select
              value={formData.tourId}
              onChange={(e) => handleTourSelect(e.target.value)}
              className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20 font-medium"
            >
              {tours.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title} ({t.durationDays}D/{t.durationNights}N • {t.tripFormat === "car" ? "4x4 SUV" : "Adv Bike"})
                </option>
              ))}
            </select>
          </div>

          {/* Dates Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Departure Start Date *
              </label>
              <input
                type="date"
                value={formData.startDate || ""}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20 font-mono"
              />
              {errors.startDate && <p className="text-[10px] text-red-500">{errors.startDate}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                End / Return Date *
              </label>
              <input
                type="date"
                value={formData.endDate || ""}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20 font-mono"
              />
              {errors.endDate && <p className="text-[10px] text-red-500">{errors.endDate}</p>}
            </div>
          </div>

          {/* Seat Capacity & Batch Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Total Seat Cap
              </label>
              <input
                type="number"
                value={formData.totalSeats || 12}
                onChange={(e) => setFormData({ ...formData, totalSeats: Number(e.target.value) })}
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Booked Count
              </label>
              <input
                type="number"
                value={formData.bookedSeats ?? 0}
                onChange={(e) => setFormData({ ...formData, bookedSeats: Number(e.target.value) })}
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Batch Status
              </label>
              <select
                value={formData.status || "Upcoming"}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as BatchStatus })}
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-2.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Filling Fast">Filling Fast</option>
                <option value="Sold Out">Sold Out</option>
                <option value="Departed / In Progress">Departed / In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Captain & Vehicle Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Lead Road Captain Name *
              </label>
              <input
                type="text"
                value={formData.leadCaptainName || ""}
                onChange={(e) => setFormData({ ...formData, leadCaptainName: e.target.value })}
                placeholder="e.g. Rohan Sangma"
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Captain Phone
              </label>
              <input
                type="text"
                value={formData.leadCaptainPhone || ""}
                onChange={(e) => setFormData({ ...formData, leadCaptainPhone: e.target.value })}
                placeholder="+91 94360 11223"
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-white/20 font-mono"
              />
            </div>
          </div>

          {/* Assigned Convoy Vehicles */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
              Assigned Convoy Fleet (Comma separated)
            </label>
            <input
              type="text"
              value={assignedVehiclesInput}
              onChange={(e) => setAssignedVehiclesInput(e.target.value)}
              placeholder="e.g. Thar 4x4 #01 (Lead), Thar 4x4 #02, Scorpio-N 4x4 #03"
              className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
            />
          </div>

          {/* Pickup & Drop Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Reporting / Pickup Point
              </label>
              <input
                type="text"
                value={formData.startLocation || ""}
                onChange={(e) => setFormData({ ...formData, startLocation: e.target.value })}
                placeholder="e.g. Guwahati Airport / Hotel Vivanta"
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                End / Drop Point
              </label>
              <input
                type="text"
                value={formData.endLocation || ""}
                onChange={(e) => setFormData({ ...formData, endLocation: e.target.value })}
                placeholder="e.g. Guwahati Airport"
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-700 dark:text-zinc-300 text-xs font-medium transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/10 dark:hover:bg-white/20 text-xs font-semibold transition-all border border-slate-700 dark:border-white/15 flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isEditing ? "Update Batch" : "Publish Departure"}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
