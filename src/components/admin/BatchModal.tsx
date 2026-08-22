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
        className="w-full max-w-xl bg-[#121418] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.9)] space-y-6 my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black font-display uppercase tracking-tight text-white">
                {isEditing ? "Edit Departure Batch" : "Schedule New Group Batch"}
              </h3>
              <p className="text-[11px] text-white/50">
                Configure departure dates, road captain, and convoy vehicles.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Select Expedition Circuit */}
          <div className="space-y-1">
            <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
              Expedition Tour Circuit *
            </label>
            <select
              value={formData.tourId}
              onChange={(e) => handleTourSelect(e.target.value)}
              className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
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
              <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
                Departure Date *
              </label>
              <input
                type="date"
                value={formData.startDate || ""}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-brand-red"
              />
              {errors.startDate && <p className="text-[10px] text-red-400">{errors.startDate}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
                Return Date *
              </label>
              <input
                type="date"
                value={formData.endDate || ""}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-brand-red"
              />
              {errors.endDate && <p className="text-[10px] text-red-400">{errors.endDate}</p>}
            </div>
          </div>

          {/* Seats & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block text-[10px] font-black font-display uppercase tracking-wider text-white/70">
                Total Seat Limit
              </label>
              <input
                type="number"
                value={formData.totalSeats || ""}
                onChange={(e) => setFormData({ ...formData, totalSeats: Number(e.target.value) })}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black font-display uppercase tracking-wider text-white/70">
                Seats Booked
              </label>
              <input
                type="number"
                value={formData.bookedSeats || 0}
                onChange={(e) => setFormData({ ...formData, bookedSeats: Number(e.target.value) })}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black font-display uppercase tracking-wider text-white/70">
                Batch Status
              </label>
              <select
                value={formData.status || "Upcoming"}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as BatchStatus })}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-2.5 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
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
              <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
                Lead Road Captain Name
              </label>
              <input
                type="text"
                value={formData.leadCaptainName || ""}
                onChange={(e) => setFormData({ ...formData, leadCaptainName: e.target.value })}
                placeholder="e.g. Dorjee Tsering"
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-red font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
                Captain Phone / Radio
              </label>
              <input
                type="text"
                value={formData.leadCaptainPhone || ""}
                onChange={(e) => setFormData({ ...formData, leadCaptainPhone: e.target.value })}
                placeholder="+91 94360 11223"
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>

          {/* Pickup & Drop Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
                Convoy Rollout Pickup Point
              </label>
              <input
                type="text"
                value={formData.startLocation || ""}
                onChange={(e) => setFormData({ ...formData, startLocation: e.target.value })}
                placeholder="e.g. Guwahati Airport (GAU)"
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-red font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
                Trip Completion Drop Point
              </label>
              <input
                type="text"
                value={formData.endLocation || ""}
                onChange={(e) => setFormData({ ...formData, endLocation: e.target.value })}
                placeholder="e.g. Guwahati Airport (GAU)"
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-red font-medium"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 text-xs font-bold font-display uppercase tracking-wider transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white text-xs font-black font-display uppercase tracking-widest transition-all shadow-glow-red flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? "Update Batch" : "Publish Departure Batch"}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
