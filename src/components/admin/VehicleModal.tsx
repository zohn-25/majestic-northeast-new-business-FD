"use client";

import React, { useState, useEffect } from "react";
import { X, Save, Car, AlertCircle, Plus, Trash2, Sparkles, Image as ImageIcon } from "lucide-react";
import { Vehicle, VehicleCategory, VehicleType, TransmissionType, FuelType } from "@/lib/types";

interface VehicleModalProps {
  isOpen: boolean;
  vehicle?: Vehicle | null;
  onClose: () => void;
  onSave: (vehicle: Vehicle) => void;
}

export function VehicleModal({ isOpen, vehicle, onClose, onSave }: VehicleModalProps) {
  const isEditing = Boolean(vehicle);

  const [formData, setFormData] = useState<Partial<Vehicle>>({
    name: "",
    category: "car",
    type: "SUV",
    tagline: "",
    images: [""],
    seatingCapacity: 4,
    transmission: "Automatic",
    fuelType: "Diesel",
    rentalPricePerDay: 4500,
    securityDeposit: 10000,
    minDurationDays: 2,
    pickupDropLocations: ["Guwahati Airport (GAU)", "Shillong City Center"],
    inclusions: ["24/7 Roadside Assistance", "Comprehensive Insurance", "Meghalaya & Assam State Permits"],
    exclusions: ["Fuel costs", "Border toll taxes", "Driver allowance"],
    requiredDocuments: ["Valid Driving License", "Aadhaar / Passport", "Security Deposit"],
    rentalRules: ["Max speed limit 80 km/h", "No riverbed offroading"],
    isFeatured: true,
    totalUnits: 5,
    bookedUnits: 0,
    mileageLimit: "Unlimited kms within Assam & Meghalaya",
    engineCC: "2184 cc",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (vehicle) {
      setFormData(vehicle);
    } else {
      setFormData({
        id: `v-custom-${Date.now().toString().slice(-4)}`,
        name: "",
        category: "car",
        type: "SUV",
        tagline: "",
        images: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80"],
        seatingCapacity: 4,
        transmission: "Automatic",
        fuelType: "Diesel",
        rentalPricePerDay: 4500,
        securityDeposit: 10000,
        minDurationDays: 2,
        pickupDropLocations: ["Guwahati Airport (GAU)", "Shillong City Center"],
        inclusions: ["24/7 Roadside Assistance", "Comprehensive Insurance"],
        exclusions: ["Fuel expenses", "Inter-state toll taxes"],
        requiredDocuments: ["Valid Driving License", "Govt Photo ID"],
        rentalRules: ["Max speed 80 km/h"],
        cancellationPolicyTiers: [
          { daysBefore: 7, refundPercent: 100, description: "Full refund 7+ days before" },
          { daysBefore: 3, refundPercent: 50, description: "50% refund 3-7 days prior" },
        ],
        isFeatured: false,
        totalUnits: 4,
        bookedUnits: 0,
        mileageLimit: "Unlimited kms within Northeast",
        engineCC: "2184 cc",
      });
    }
    setErrors({});
  }, [vehicle, isOpen]);

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
    if (!formData.name?.trim()) newErrors.name = "Vehicle model name is required.";
    if (!formData.tagline?.trim()) newErrors.tagline = "Tagline/Description is required.";
    if (!formData.rentalPricePerDay || formData.rentalPricePerDay <= 0) {
      newErrors.rentalPricePerDay = "Enter a valid daily rental price.";
    }
    if (!formData.securityDeposit || formData.securityDeposit < 0) {
      newErrors.securityDeposit = "Enter a valid security deposit amount.";
    }
    if (!formData.images?.[0]?.trim()) {
      newErrors.images = "At least one thumbnail image URL is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const fullVehicle: Vehicle = {
      id: formData.id || vehicle?.id || `v-${Date.now()}`,
      name: formData.name || "",
      category: formData.category || "car",
      type: formData.type || "SUV",
      tagline: formData.tagline || "",
      images: formData.images?.filter(Boolean) || [
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
      ],
      seatingCapacity: Number(formData.seatingCapacity) || 4,
      transmission: formData.transmission || "Automatic",
      fuelType: formData.fuelType || "Diesel",
      rentalPricePerDay: Number(formData.rentalPricePerDay) || 4000,
      securityDeposit: Number(formData.securityDeposit) || 10000,
      minDurationDays: Number(formData.minDurationDays) || 1,
      pickupDropLocations: formData.pickupDropLocations || ["Guwahati Airport"],
      inclusions: formData.inclusions || [],
      exclusions: formData.exclusions || [],
      requiredDocuments: formData.requiredDocuments || [],
      rentalRules: formData.rentalRules || [],
      cancellationPolicyTiers: formData.cancellationPolicyTiers || [
        { daysBefore: 7, refundPercent: 100, description: "Full refund" },
      ],
      isFeatured: Boolean(formData.isFeatured),
      totalUnits: Number(formData.totalUnits) || 3,
      bookedUnits: Number(formData.bookedUnits) || 0,
      mileageLimit: formData.mileageLimit || "Unlimited kms",
      engineCC: formData.engineCC || "2000 cc",
    };

    onSave(fullVehicle);
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
              <Car className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-white">
                {isEditing ? `Edit Vehicle: ${vehicle?.name}` : "Add Fleet Vehicle"}
              </h3>
              <p className="text-[11px] text-zinc-400">
                Configure specs, rental pricing, and availability.
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
          
          {/* Name & Tagline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
                Vehicle Name *
              </label>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Mahindra Thar LX 4x4 Hardtop"
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-red font-medium"
              />
              {errors.name && <p className="text-[10px] text-red-400 font-bold">{errors.name}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
                Engine / Specs (CC)
              </label>
              <input
                type="text"
                value={formData.engineCC || ""}
                onChange={(e) => setFormData({ ...formData, engineCC: e.target.value })}
                placeholder="e.g. 2184 cc mHawk Diesel / 452 cc"
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-red font-medium"
              />
            </div>
          </div>

          {/* Tagline */}
          <div className="space-y-1">
            <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
              Short Description / Tagline *
            </label>
            <textarea
              rows={2}
              value={formData.tagline || ""}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="e.g. The ultimate 4x4 conqueror for Meghalaya waterfalls & Arunachal snow passes."
              className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-red font-medium"
            />
            {errors.tagline && <p className="text-[10px] text-red-400 font-bold">{errors.tagline}</p>}
          </div>

          {/* Category, Type, Transmission, Fuel */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="space-y-1">
              <label className="block text-[10px] font-black font-display uppercase tracking-wider text-white/70">
                Category
              </label>
              <select
                value={formData.category || "car"}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as VehicleCategory })}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
              >
                <option value="car">4x4 Car / SUV</option>
                <option value="bike">Adv Motorcycle</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black font-display uppercase tracking-wider text-white/70">
                Body Type
              </label>
              <select
                value={formData.type || "SUV"}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as VehicleType })}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
              >
                <option value="SUV">SUV</option>
                <option value="Adventure">Adventure Bike</option>
                <option value="Cruiser">Cruiser Bike</option>
                <option value="Tempo Traveller">Tempo Traveller</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black font-display uppercase tracking-wider text-white/70">
                Transmission
              </label>
              <select
                value={formData.transmission || "Automatic"}
                onChange={(e) => setFormData({ ...formData, transmission: e.target.value as TransmissionType })}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black font-display uppercase tracking-wider text-white/70">
                Fuel Type
              </label>
              <select
                value={formData.fuelType || "Diesel"}
                onChange={(e) => setFormData({ ...formData, fuelType: e.target.value as FuelType })}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
              >
                <option value="Diesel">Diesel</option>
                <option value="Petrol">Petrol</option>
                <option value="EV">Electric</option>
              </select>
            </div>
          </div>

          {/* Pricing & Units */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="space-y-1">
              <label className="block text-[10px] font-black font-display uppercase tracking-wider text-white/70">
                Daily Rate (₹) *
              </label>
              <input
                type="number"
                value={formData.rentalPricePerDay || ""}
                onChange={(e) => setFormData({ ...formData, rentalPricePerDay: Number(e.target.value) })}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
              />
              {errors.rentalPricePerDay && <p className="text-[9px] text-red-400">{errors.rentalPricePerDay}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black font-display uppercase tracking-wider text-white/70">
                Deposit (₹) *
              </label>
              <input
                type="number"
                value={formData.securityDeposit || ""}
                onChange={(e) => setFormData({ ...formData, securityDeposit: Number(e.target.value) })}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black font-display uppercase tracking-wider text-white/70">
                Total Fleet Units
              </label>
              <input
                type="number"
                value={formData.totalUnits || ""}
                onChange={(e) => setFormData({ ...formData, totalUnits: Number(e.target.value) })}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black font-display uppercase tracking-wider text-white/70">
                Seating Capacity
              </label>
              <input
                type="number"
                value={formData.seatingCapacity || ""}
                onChange={(e) => setFormData({ ...formData, seatingCapacity: Number(e.target.value) })}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>

          {/* Primary Image URL */}
          <div className="space-y-1">
            <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
              Primary Photo URL *
            </label>
            <input
              type="text"
              value={formData.images?.[0] || ""}
              onChange={(e) => setFormData({ ...formData, images: [e.target.value, ...(formData.images?.slice(1) || [])] })}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-red font-mono"
            />
            {errors.images && <p className="text-[10px] text-red-400">{errors.images}</p>}
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-white/10">
            <input
              type="checkbox"
              id="isFeaturedVehicle"
              checked={Boolean(formData.isFeatured)}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="w-4 h-4 rounded accent-brand-red cursor-pointer"
            />
            <label htmlFor="isFeaturedVehicle" className="text-xs font-bold font-display text-white cursor-pointer">
              Pin as Featured Fleet Item on Homepage & Search
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
              <span>{isEditing ? "Update Vehicle" : "Add Vehicle to Fleet"}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
