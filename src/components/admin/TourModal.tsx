"use client";

import React, { useState, useEffect } from "react";
import { X, Save, Compass, AlertCircle, Plus, Trash2 } from "lucide-react";
import { SharedTour } from "@/lib/types";

interface TourModalProps {
  isOpen: boolean;
  tour?: SharedTour | null;
  onClose: () => void;
  onSave: (tour: SharedTour) => void;
}

export function TourModal({ isOpen, tour, onClose, onSave }: TourModalProps) {
  const isEditing = Boolean(tour);

  const [formData, setFormData] = useState<Partial<SharedTour>>({
    title: "",
    slug: "",
    destinationId: "meghalaya",
    destinationName: "Meghalaya",
    tripFormat: "car",
    vehicleProvided: "Mahindra Thar 4x4",
    route: "Guwahati -> Shillong -> Cherrapunji -> Dawki -> Guwahati",
    durationDays: 5,
    durationNights: 4,
    startDates: ["2026-09-15", "2026-10-01", "2026-10-15"],
    pricePerPerson: 17999,
    totalSeats: 12,
    seatsBooked: 4,
    heroImage: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    gallery: [],
    shortHighlights: ["4x4 Off-Road Khasi Trail", "Living Root Bridge Trek", "Crystal Umngot Boating"],
    inclusions: ["All 3-Star Stays", "Breakfast & Dinner", "Inner Line Permits", "Mechanic Truck"],
    exclusions: ["Personal expenses", "Airfare to Guwahati"],
    pickupDropPoints: ["Guwahati Airport (GAU)"],
    accommodationDetails: "Handpicked mountain resorts & riverside glamping",
    importantNotes: ["Carry valid Govt ID for ILP verification"],
    isFeatured: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (tour) {
      setFormData(tour);
    } else {
      setFormData({
        id: `t-custom-${Date.now().toString().slice(-4)}`,
        title: "",
        slug: "",
        destinationId: "meghalaya",
        destinationName: "Meghalaya",
        tripFormat: "car",
        vehicleProvided: "Mahindra Thar 4x4",
        route: "",
        durationDays: 6,
        durationNights: 5,
        startDates: ["2026-09-20"],
        pricePerPerson: 19500,
        totalSeats: 12,
        seatsBooked: 0,
        heroImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
        gallery: [],
        shortHighlights: ["Off-road Mountain Trail", "Guided Convoy Escort"],
        inclusions: ["Boutique stays", "Backup truck", "Trip Captain"],
        exclusions: ["Personal laundry", "Airfare"],
        pickupDropPoints: ["Guwahati Airport (GAU)"],
        accommodationDetails: "Deluxe stays & tea estate bungalows",
        importantNotes: ["Original Driving license required for self-drive drivers"],
        isFeatured: false,
        itinerary: [
          { day: 1, title: "Arrival in Guwahati & Convoy Rollout", description: "Vehicle briefing and check-in." },
          { day: 2, title: "Scenic Mountain Drive", description: "Scenic trails and waterfalls." },
        ],
        cancellationPolicy: [
          { daysBefore: 15, refundPercent: 100, description: "Full refund 15+ days before" },
        ],
        faqs: [],
      });
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
    if (!formData.title?.trim()) newErrors.title = "Expedition title is required.";
    if (!formData.route?.trim()) newErrors.route = "Circuit route is required.";
    if (!formData.pricePerPerson || formData.pricePerPerson <= 0) {
      newErrors.pricePerPerson = "Enter a valid price per person.";
    }
    if (!formData.heroImage?.trim()) {
      newErrors.heroImage = "Hero cover image URL is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const fullTour: SharedTour = {
      id: formData.id || tour?.id || `t-${Date.now()}`,
      title: formData.title || "",
      slug: formData.slug || formData.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || `tour-${Date.now()}`,
      destinationId: formData.destinationId || "meghalaya",
      destinationName: formData.destinationName || "Meghalaya",
      tripFormat: formData.tripFormat || "car",
      vehicleProvided: formData.vehicleProvided || "Mahindra Thar 4x4",
      route: formData.route || "",
      durationDays: Number(formData.durationDays) || 5,
      durationNights: Number(formData.durationNights) || 4,
      startDates: formData.startDates || ["2026-09-15"],
      pricePerPerson: Number(formData.pricePerPerson) || 18000,
      totalSeats: Number(formData.totalSeats) || 12,
      seatsBooked: Number(formData.seatsBooked) || 0,
      heroImage: formData.heroImage || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
      gallery: formData.gallery || [],
      shortHighlights: formData.shortHighlights || [],
      itinerary: formData.itinerary || [],
      inclusions: formData.inclusions || [],
      exclusions: formData.exclusions || [],
      pickupDropPoints: formData.pickupDropPoints || ["Guwahati Airport"],
      accommodationDetails: formData.accommodationDetails || "Boutique stays",
      importantNotes: formData.importantNotes || [],
      cancellationPolicy: formData.cancellationPolicy || [],
      faqs: formData.faqs || [],
      isFeatured: Boolean(formData.isFeatured),
    };

    onSave(fullTour);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#111318] border border-white/[0.12] rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] text-zinc-300 flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-white">
                {isEditing ? `Edit Tour: ${tour?.title}` : "Create Tour Package"}
              </h3>
              <p className="text-[11px] text-zinc-400">
                Set expedition route, vehicle type, and pricing.
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
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          {/* Title */}
          <div className="space-y-1">
            <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
              Expedition Title *
            </label>
            <input
              type="text"
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. 7D Tawang & Sela Pass 4x4 Thar Convoy Expedition"
              className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-red font-medium"
            />
            {errors.title && <p className="text-[10px] text-red-400 font-bold">{errors.title}</p>}
          </div>

          {/* Route */}
          <div className="space-y-1">
            <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
              Circuit Route *
            </label>
            <input
              type="text"
              value={formData.route || ""}
              onChange={(e) => setFormData({ ...formData, route: e.target.value })}
              placeholder="e.g. Guwahati -> Bhalukpong -> Dirang -> Tawang -> Bomdila -> Guwahati"
              className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-red font-medium"
            />
            {errors.route && <p className="text-[10px] text-red-400 font-bold">{errors.route}</p>}
          </div>

          {/* Format & Destination State */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block text-[10px] font-black font-display uppercase tracking-wider text-white/70">
                Format
              </label>
              <select
                value={formData.tripFormat || "car"}
                onChange={(e) => setFormData({ ...formData, tripFormat: e.target.value as "car" | "bike" })}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
              >
                <option value="car">🚗 4x4 SUV Convoy</option>
                <option value="bike">🏍️ Motorcycle Tour</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black font-display uppercase tracking-wider text-white/70">
                Destination State
              </label>
              <select
                value={formData.destinationName || "Meghalaya"}
                onChange={(e) => setFormData({ ...formData, destinationName: e.target.value })}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
              >
                <option value="Meghalaya">Meghalaya</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Assam">Assam</option>
                <option value="Nagaland">Nagaland</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black font-display uppercase tracking-wider text-white/70">
                Vehicle Model
              </label>
              <input
                type="text"
                value={formData.vehicleProvided || ""}
                onChange={(e) => setFormData({ ...formData, vehicleProvided: e.target.value })}
                placeholder="e.g. Mahindra Thar 4x4"
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>

          {/* Pricing & Duration */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="space-y-1">
              <label className="block text-[10px] font-black font-display uppercase tracking-wider text-white/70">
                Price / Person (₹) *
              </label>
              <input
                type="number"
                value={formData.pricePerPerson || ""}
                onChange={(e) => setFormData({ ...formData, pricePerPerson: Number(e.target.value) })}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
              />
              {errors.pricePerPerson && <p className="text-[9px] text-red-400">{errors.pricePerPerson}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black font-display uppercase tracking-wider text-white/70">
                Duration (Days)
              </label>
              <input
                type="number"
                value={formData.durationDays || ""}
                onChange={(e) => setFormData({ ...formData, durationDays: Number(e.target.value) })}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black font-display uppercase tracking-wider text-white/70">
                Total Seats
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
                value={formData.seatsBooked || ""}
                onChange={(e) => setFormData({ ...formData, seatsBooked: Number(e.target.value) })}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>

          {/* Hero Image */}
          <div className="space-y-1">
            <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
              Hero Cover Photo URL *
            </label>
            <input
              type="text"
              value={formData.heroImage || ""}
              onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-red font-mono"
            />
            {errors.heroImage && <p className="text-[10px] text-red-400">{errors.heroImage}</p>}
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-white/10">
            <input
              type="checkbox"
              id="isFeaturedTour"
              checked={Boolean(formData.isFeatured)}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="w-4 h-4 rounded accent-brand-red cursor-pointer"
            />
            <label htmlFor="isFeaturedTour" className="text-xs font-bold font-display text-white cursor-pointer">
              Pin as Bestseller / Featured Tour on Homepage
            </label>
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
              <span>{isEditing ? "Update Tour" : "Publish Tour"}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
