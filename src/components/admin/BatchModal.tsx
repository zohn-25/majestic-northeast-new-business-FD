"use client";

import React, { useState, useEffect } from "react";
import { X, Save, Calendar, Compass, Users, Phone, Car, Plus, Trash2 } from "lucide-react";
import { TourBatch, BatchStatus, SharedTour } from "@/lib/types";

interface BatchModalProps {
  isOpen: boolean;
  batch?: TourBatch | null;
  tours: SharedTour[];
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
    tripFormat: tours[0]?.tripFormat || "car",
    startDate: "",
    endDate: "",
    totalSeats: 12,
    bookedSeats: 0,
    status: "Upcoming",
    leadCaptainName: "Dorjee Tsering",
    leadCaptainPhone: "+91 94360 11223",
    leadVehicle: "Lead Thar 4x4 #01",
    assignedVehicles: ["Thar 4x4 #01 (Lead)", "Thar 4x4 #02", "Thar 4x4 #03"],
    startLocation: "Guwahati Airport (GAU)",
    endLocation: "Guwahati Airport (GAU)",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (batch) {
      setFormData(batch);
    } else {
      const defaultTour = tours[0];
      setFormData({
        id: `batch-${Date.now().toString().slice(-4)}`,
        tourId: defaultTour?.id || "",
        tourTitle: defaultTour?.title || "",
        tripFormat: defaultTour?.tripFormat || "car",
        startDate: "2026-09-25",
        endDate: "2026-10-01",
        totalSeats: 12,
        bookedSeats: 0,
        status: "Upcoming",
        leadCaptainName: "Dorjee Tsering",
        leadCaptainPhone: "+91 94360 11223",
        leadVehicle: "Lead Thar 4x4 #01",
        assignedVehicles: ["Thar 4x4 #01 (Lead)", "Thar 4x4 #02", "Thar 4x4 #03"],
        startLocation: "Guwahati Airport (GAU)",
        endLocation: "Guwahati Airport (GAU)",
      });
    }
    setErrors({});
  }, [batch, tours, isOpen]);

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

  const handleTourSelect = (tourId: string) => {
    const selected = tours.find((t) => t.id === tourId);
    if (selected) {
      setFormData({
        ...formData,
        tourId: selected.id,
        tourTitle: selected.title,
        tripFormat: selected.tripFormat,
        totalSeats: selected.totalSeats,
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.startDate) newErrors.startDate = "Start departure date is required.";
    if (!formData.endDate) newErrors.endDate = "End date is required.";
    if (!formData.totalSeats || formData.totalSeats <= 0) {
      newErrors.totalSeats = "Seat capacity must be greater than 0.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const fullBatch: TourBatch = {
      id: formData.id || batch?.id || `batch-${Date.now()}`,
      tourId: formData.tourId || tours[0]?.id || "tour-1",
      tourTitle: formData.tourTitle || tours[0]?.title || "Group Expedition",
      tripFormat: formData.tripFormat || "car",
      startDate: formData.startDate || "2026-09-25",
      endDate: formData.endDate || "2026-10-01",
      totalSeats: Number(formData.totalSeats) || 12,
      bookedSeats: Number(formData.bookedSeats) || 0,
      status: (formData.status as BatchStatus) || "Upcoming",
      leadCaptainName: formData.leadCaptainName || "Dorjee Tsering",
      leadCaptainPhone: formData.leadCaptainPhone || "+91 94360 11223",
      leadVehicle: formData.leadVehicle || "Thar 4x4 #01",
      assignedVehicles: formData.assignedVehicles?.length
        ? formData.assignedVehicles
        : ["Thar 4x4 #01 (Lead)", "Thar 4x4 #02"],
      startLocation: formData.startLocation || "Guwahati Airport",
      endLocation: formData.endLocation || "Guwahati Airport",
    };

    onSave(fullBatch);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#111318] border border-white/[0.12] rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5 my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] text-zinc-300 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-white">
                {isEditing ? "Edit Departure Batch" : "Schedule Departure Batch"}
              </h3>
              <p className="text-[11px] text-zinc-400">
                Configure departure dates, road captain, and convoy units.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Select Expedition Circuit */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-zinc-300">
              Expedition Tour Circuit *
            </label>
            <select
              value={formData.tourId}
              onChange={(e) => handleTourSelect(e.target.value)}
              className="w-full bg-[#0B0D10] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white/20 font-medium"
            >
              {tours.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title} ({t.tripFormat === "car" ? "4x4 Convoy" : "Motorcycle"})
                </option>
              ))}
            </select>
          </div>

          {/* Departure & Return Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-zinc-300">
                Departure Date *
              </label>
              <input
                type="date"
                value={formData.startDate || ""}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full bg-[#0B0D10] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-white/20"
              />
              {errors.startDate && <p className="text-[10px] text-red-400">{errors.startDate}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-zinc-300">
                Return Date *
              </label>
              <input
                type="date"
                value={formData.endDate || ""}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full bg-[#0B0D10] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-white/20"
              />
              {errors.endDate && <p className="text-[10px] text-red-400">{errors.endDate}</p>}
            </div>
          </div>

          {/* Seats & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-zinc-400">
                Total Seats
              </label>
              <input
                type="number"
                value={formData.totalSeats || ""}
                onChange={(e) => setFormData({ ...formData, totalSeats: Number(e.target.value) })}
                className="w-full bg-[#0B0D10] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white/20"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-zinc-400">
                Seats Booked
              </label>
              <input
                type="number"
                value={formData.bookedSeats || 0}
                onChange={(e) => setFormData({ ...formData, bookedSeats: Number(e.target.value) })}
                className="w-full bg-[#0B0D10] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white/20"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-zinc-400">
                Batch Status
              </label>
              <select
                value={formData.status || "Upcoming"}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as BatchStatus })}
                className="w-full bg-[#0B0D10] border border-white/[0.08] rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-white/20"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Filling Fast">Filling Fast</option>
                <option value="Sold Out">Sold Out</option>
                <option value="Departed / In Progress">Departed / In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Road Captain & Lead Vehicle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-zinc-300">
                Lead Road Captain Name
              </label>
              <input
                type="text"
                value={formData.leadCaptainName || ""}
                onChange={(e) => setFormData({ ...formData, leadCaptainName: e.target.value })}
                placeholder="e.g. Dorjee Tsering"
                className="w-full bg-[#0B0D10] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white/20"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-zinc-300">
                Captain Phone / Radio
              </label>
              <input
                type="text"
                value={formData.leadCaptainPhone || ""}
                onChange={(e) => setFormData({ ...formData, leadCaptainPhone: e.target.value })}
                placeholder="+91 94360 11223"
                className="w-full bg-[#0B0D10] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-white/20"
              />
            </div>
          </div>

          {/* Pickup & Drop Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-zinc-300">
                Pickup Point
              </label>
              <input
                type="text"
                value={formData.startLocation || ""}
                onChange={(e) => setFormData({ ...formData, startLocation: e.target.value })}
                placeholder="e.g. Guwahati Airport (GAU)"
                className="w-full bg-[#0B0D10] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white/20"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-zinc-300">
                Drop Point
              </label>
              <input
                type="text"
                value={formData.endLocation || ""}
                onChange={(e) => setFormData({ ...formData, endLocation: e.target.value })}
                placeholder="e.g. Guwahati Airport (GAU)"
                className="w-full bg-[#0B0D10] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white/20"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 text-xs font-medium transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/15 flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isEditing ? "Update Batch" : "Publish Batch"}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
