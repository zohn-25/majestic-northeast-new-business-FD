"use client";

import React, { useState, useEffect } from "react";
import { X, Save, Compass } from "lucide-react";
import { SharedTour } from "@/lib/types";

interface TourModalProps {
  isOpen: boolean;
  tour?: SharedTour | null;
  onClose: () => void;
  onSave: (tour: SharedTour) => void;
}

export function TourModal({
  isOpen,
  tour,
  onClose,
  onSave,
}: TourModalProps) {
  const isEditing = Boolean(tour);

  const [formData, setFormData] = useState<Partial<SharedTour>>({
    title: "",
    slug: "",
    destinationName: "Meghalaya",
    destinationId: "meghalaya",
    durationDays: 6,
    durationNights: 5,
    tripFormat: "car",
    vehicleProvided: "Mahindra Thar 4x4",
    pricePerPerson: 28500,
    route: "Guwahati -> Shillong -> Cherrapunji -> Dawki -> Kaziranga",
    heroImage:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    shortHighlights: ["Living Root Bridges", "Dawki River Boating", "Waterfalls"],
    totalSeats: 12,
    seatsBooked: 0,
    isFeatured: false,
  });

  const [highlightsInput, setHighlightsInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (tour) {
      setFormData(tour);
      setHighlightsInput(tour.shortHighlights?.join(", ") || "");
    } else {
      setFormData({
        id: `tour-${Date.now().toString().slice(-4)}`,
        title: "",
        slug: "",
        destinationName: "Meghalaya",
        destinationId: "meghalaya",
        durationDays: 6,
        durationNights: 5,
        tripFormat: "car",
        vehicleProvided: "Mahindra Thar 4x4",
        pricePerPerson: 28500,
        route: "Guwahati -> Shillong -> Cherrapunji -> Dawki -> Kaziranga",
        heroImage:
          "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
        shortHighlights: ["Living Root Bridges", "Dawki River Boating", "Waterfalls"],
        totalSeats: 12,
        seatsBooked: 0,
        isFeatured: false,
      });
      setHighlightsInput("Living Root Bridges, Dawki River Boating, Waterfalls");
    }
    setErrors({});
  }, [tour, isOpen]);

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
    if (!formData.title?.trim()) newErrors.title = "Tour title is required.";
    if (!formData.route?.trim()) newErrors.route = "Circuit route is required.";
    if (!formData.pricePerPerson || Number(formData.pricePerPerson) <= 0)
      newErrors.pricePerPerson = "Valid price per person is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const highList = highlightsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const fullTour: SharedTour = {
      id: formData.id || tour?.id || `tour-${Date.now()}`,
      title: formData.title || "",
      slug:
        formData.slug ||
        formData.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
        `tour-${Date.now()}`,
      destinationId: formData.destinationId || "meghalaya",
      destinationName: formData.destinationName || "Meghalaya",
      durationDays: Number(formData.durationDays) || 6,
      durationNights: Number(formData.durationNights) || 5,
      tripFormat: (formData.tripFormat as "car" | "bike") || "car",
      vehicleProvided: formData.vehicleProvided || "Mahindra Thar 4x4",
      pricePerPerson: Number(formData.pricePerPerson) || 28500,
      totalSeats: Number(formData.totalSeats) || 12,
      seatsBooked: Number(formData.seatsBooked) || 0,
      startDates: tour?.startDates || ["2026-09-15", "2026-10-05", "2026-10-20"],
      route: formData.route || "",
      heroImage:
        formData.heroImage ||
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
      gallery: tour?.gallery || [
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
      ],
      shortHighlights: highList.length ? highList : ["Living Root Bridges"],
      itinerary: tour?.itinerary || [
        { day: 1, title: "Arrival & Convoy Briefing", description: "Assemble at Guwahati hotel." },
      ],
      inclusions: tour?.inclusions || ["All Fuel & 4x4 Thar", "Hotel Stays", "Inner Line Permits"],
      exclusions: tour?.exclusions || ["Airfare to Guwahati", "Personal Snacks"],
      pickupDropPoints: tour?.pickupDropPoints || ["Guwahati Airport", "Guwahati Airport"],
      accommodationDetails: tour?.accommodationDetails || "Premium boutique resorts & heritage lodges",
      importantNotes: tour?.importantNotes || ["Carry original valid Govt photo ID", "Postpaid SIM works best in Northeast"],
      cancellationPolicy: tour?.cancellationPolicy || [
        { daysBefore: 15, refundPercent: 100, description: "Full refund up to 15 days before departure" },
      ],
      faqs: tour?.faqs || [
        { id: "faq-1", category: "tour", question: "Can I drive the Thar?", answer: "Yes, you can take turns driving with our captain." },
      ],
      isFeatured: Boolean(formData.isFeatured),
    };

    onSave(fullTour);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#111318] border border-slate-200 dark:border-white/[0.12] rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/5 text-left transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 dark:border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-zinc-300 flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                {isEditing ? `Edit Circuit: ${tour?.title}` : "Create Guided Expedition"}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                Configure convoy route, duration, vehicle type, and pricing.
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
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          {/* Title */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
              Expedition Title *
            </label>
            <input
              type="text"
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. 7D Tawang & Sela Pass 4x4 Thar Convoy Expedition"
              className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
            />
            {errors.title && <p className="text-[10px] text-red-500">{errors.title}</p>}
          </div>

          {/* Route */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
              Circuit Route *
            </label>
            <input
              type="text"
              value={formData.route || ""}
              onChange={(e) => setFormData({ ...formData, route: e.target.value })}
              placeholder="e.g. Guwahati -> Bhalukpong -> Dirang -> Tawang -> Bomdila -> Guwahati"
              className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-white/20 font-mono"
            />
            {errors.route && <p className="text-[10px] text-red-500">{errors.route}</p>}
          </div>

          {/* Format & Destination State */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Format
              </label>
              <select
                value={formData.tripFormat || "car"}
                onChange={(e) => setFormData({ ...formData, tripFormat: e.target.value as "car" | "bike" })}
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-2.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
              >
                <option value="car">4x4 SUV Convoy</option>
                <option value="bike">Motorcycle Tour</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Destination State
              </label>
              <select
                value={formData.destinationName || "Meghalaya"}
                onChange={(e) => setFormData({ ...formData, destinationName: e.target.value, destinationId: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "") })}
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-2.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
              >
                <option value="Meghalaya">Meghalaya</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Assam">Assam</option>
                <option value="Nagaland">Nagaland</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Vehicle Model
              </label>
              <input
                type="text"
                value={formData.vehicleProvided || ""}
                onChange={(e) => setFormData({ ...formData, vehicleProvided: e.target.value })}
                placeholder="e.g. Mahindra Thar 4x4"
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
              />
            </div>
          </div>

          {/* Pricing & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Price Per Person (₹) *
              </label>
              <input
                type="number"
                value={formData.pricePerPerson || 28500}
                onChange={(e) => setFormData({ ...formData, pricePerPerson: Number(e.target.value) })}
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20 font-mono"
              />
              {errors.pricePerPerson && <p className="text-[10px] text-red-500">{errors.pricePerPerson}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Duration Days
              </label>
              <input
                type="number"
                value={formData.durationDays || 6}
                onChange={(e) => setFormData({ ...formData, durationDays: Number(e.target.value) })}
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Duration Nights
              </label>
              <input
                type="number"
                value={formData.durationNights || 5}
                onChange={(e) => setFormData({ ...formData, durationNights: Number(e.target.value) })}
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20 font-mono"
              />
            </div>
          </div>

          {/* Max Seats */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
              Max Convoy Seats
            </label>
            <input
              type="number"
              value={formData.totalSeats || 12}
              onChange={(e) => setFormData({ ...formData, totalSeats: Number(e.target.value) })}
              className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20 font-mono"
            />
          </div>

          {/* Highlights */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
              Highlights (Comma separated)
            </label>
            <input
              type="text"
              value={highlightsInput}
              onChange={(e) => setHighlightsInput(e.target.value)}
              placeholder="e.g. Living Root Bridges, Dawki Clear Water Boating, Laitlum Canyons"
              className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
            />
          </div>

          {/* Hero Image URL */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
              Hero Cover Image URL
            </label>
            <input
              type="text"
              value={formData.heroImage || ""}
              onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-white/20 font-mono"
            />
          </div>

          {/* Featured Checkbox */}
          <div className="flex items-center gap-2.5 pt-1">
            <input
              type="checkbox"
              id="isFeaturedTour"
              checked={Boolean(formData.isFeatured)}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="w-4 h-4 rounded accent-slate-700 cursor-pointer"
            />
            <label htmlFor="isFeaturedTour" className="text-xs text-slate-700 dark:text-zinc-300 cursor-pointer font-medium">
              Feature on Homepage & Spotlight Expeditions
            </label>
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
              <span>{isEditing ? "Update Expedition Circuit" : "Publish Circuit"}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
