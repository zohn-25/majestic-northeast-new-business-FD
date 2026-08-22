"use client";

import React, { useState, useEffect } from "react";
import { X, Save, Car } from "lucide-react";
import { Vehicle, VehicleType, TransmissionType, FuelType } from "@/lib/types";

interface VehicleModalProps {
  isOpen: boolean;
  vehicle?: Vehicle | null;
  onClose: () => void;
  onSave: (vehicle: Vehicle) => void;
}

export function VehicleModal({
  isOpen,
  vehicle,
  onClose,
  onSave,
}: VehicleModalProps) {
  const isEditing = Boolean(vehicle);

  const [formData, setFormData] = useState<Partial<Vehicle>>({
    name: "",
    category: "car",
    type: "SUV",
    tagline: "",
    engineCC: "2184 cc",
    transmission: "Automatic",
    fuelType: "Diesel",
    seatingCapacity: 4,
    rentalPricePerDay: 4500,
    securityDeposit: 15000,
    minDurationDays: 3,
    totalUnits: 4,
    bookedUnits: 0,
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    ],
    inclusions: ["4x4 Low Ratio Gearbox", "All-Terrain AT Tyres", "GPS Tracker"],
    isFeatured: false,
  });

  const [imagesInput, setImagesInput] = useState("");
  const [inclusionsInput, setInclusionsInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (vehicle) {
      setFormData(vehicle);
      setImagesInput(vehicle.images.join("\n"));
      setInclusionsInput(vehicle.inclusions?.join(", ") || "");
    } else {
      setFormData({
        id: `veh-${Date.now().toString().slice(-4)}`,
        name: "",
        category: "car",
        type: "SUV",
        tagline: "",
        engineCC: "2184 cc",
        transmission: "Automatic",
        fuelType: "Diesel",
        seatingCapacity: 4,
        rentalPricePerDay: 4500,
        securityDeposit: 15000,
        minDurationDays: 3,
        totalUnits: 4,
        bookedUnits: 0,
        images: [
          "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
        ],
        inclusions: ["4x4 Low Ratio Gearbox", "All-Terrain AT Tyres", "GPS Tracker"],
        isFeatured: false,
      });
      setImagesInput("https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80");
      setInclusionsInput("4x4 Low Ratio Gearbox, All-Terrain AT Tyres, GPS Tracker");
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
    if (!formData.name?.trim()) newErrors.name = "Vehicle name is required.";
    if (!formData.tagline?.trim()) newErrors.tagline = "Tagline description is required.";
    if (!formData.rentalPricePerDay || Number(formData.rentalPricePerDay) <= 0)
      newErrors.rentalPricePerDay = "Valid price per day is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const imgList = imagesInput
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const incList = inclusionsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const fullVehicle: Vehicle = {
      id: formData.id || vehicle?.id || `veh-${Date.now()}`,
      name: formData.name || "",
      category: (formData.category as "car" | "bike") || "car",
      type: (formData.type as VehicleType) || "SUV",
      tagline: formData.tagline || "",
      engineCC: formData.engineCC || "2000 cc",
      transmission: (formData.transmission as TransmissionType) || "Manual",
      fuelType: (formData.fuelType as FuelType) || "Diesel",
      seatingCapacity: Number(formData.seatingCapacity) || 4,
      rentalPricePerDay: Number(formData.rentalPricePerDay) || 4500,
      securityDeposit: Number(formData.securityDeposit) || 15000,
      minDurationDays: Number(formData.minDurationDays) || 3,
      totalUnits: Number(formData.totalUnits) || 4,
      bookedUnits: Number(formData.bookedUnits) || 0,
      images: imgList.length ? imgList : ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80"],
      inclusions: incList.length ? incList : ["4x4 Low Ratio", "GPS Tracker"],
      exclusions: vehicle?.exclusions || ["Fuel during rental", "Toll/State entry permits"],
      pickupDropLocations: vehicle?.pickupDropLocations || ["Guwahati Airport", "Shillong"],
      requiredDocuments: vehicle?.requiredDocuments || ["Valid Driving License", "Aadhaar Card / Passport"],
      rentalRules: vehicle?.rentalRules || ["Speed limit 80km/h on highways", "No off-road night driving"],
      cancellationPolicyTiers: vehicle?.cancellationPolicyTiers || [
        { daysBefore: 7, refundPercent: 100, description: "Full refund up to 7 days before pickup" },
      ],
      isFeatured: Boolean(formData.isFeatured),
      mileageLimit: "Unlimited kms within Northeast",
    };

    onSave(fullVehicle);
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
              <Car className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                {isEditing ? `Edit Vehicle: ${vehicle?.name}` : "Add Fleet Vehicle"}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                Configure specs, rental pricing, and availability.
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
          
          {/* Name & Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Vehicle Name *
              </label>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Mahindra Thar LX 4x4 Hardtop"
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
              />
              {errors.name && <p className="text-[10px] text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Engine / Specs (CC)
              </label>
              <input
                type="text"
                value={formData.engineCC || ""}
                onChange={(e) => setFormData({ ...formData, engineCC: e.target.value })}
                placeholder="e.g. 2184 cc mHawk Diesel / 452 cc"
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-white/20 font-mono"
              />
            </div>
          </div>

          {/* Tagline */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
              Short Description / Tagline *
            </label>
            <textarea
              rows={2}
              value={formData.tagline || ""}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="e.g. The definitive overland conqueror. High ground clearance and tough chassis."
              className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
            />
            {errors.tagline && <p className="text-[10px] text-red-500">{errors.tagline}</p>}
          </div>

          {/* Category, Type & Seating */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Category
              </label>
              <select
                value={formData.category || "car"}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as "car" | "bike" })}
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-2.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
              >
                <option value="car">4x4 Car / SUV</option>
                <option value="bike">Adventure Motorcycle</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Vehicle Type
              </label>
              <select
                value={formData.type || "SUV"}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as VehicleType })}
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-2.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
              >
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Sedan">Sedan</option>
                <option value="Cruiser">Cruiser</option>
                <option value="Adventure">Adventure</option>
                <option value="Tempo Traveller">Tempo Traveller</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Seating Capacity
              </label>
              <input
                type="number"
                value={formData.seatingCapacity || 4}
                onChange={(e) => setFormData({ ...formData, seatingCapacity: Number(e.target.value) })}
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20 font-mono"
              />
            </div>
          </div>

          {/* Pricing & Security Deposit */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Price Per Day (₹) *
              </label>
              <input
                type="number"
                value={formData.rentalPricePerDay || 4500}
                onChange={(e) => setFormData({ ...formData, rentalPricePerDay: Number(e.target.value) })}
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20 font-mono"
              />
              {errors.rentalPricePerDay && <p className="text-[10px] text-red-500">{errors.rentalPricePerDay}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Security Deposit (₹)
              </label>
              <input
                type="number"
                value={formData.securityDeposit || 15000}
                onChange={(e) => setFormData({ ...formData, securityDeposit: Number(e.target.value) })}
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Min Rental Days
              </label>
              <input
                type="number"
                value={formData.minDurationDays || 3}
                onChange={(e) => setFormData({ ...formData, minDurationDays: Number(e.target.value) })}
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20 font-mono"
              />
            </div>
          </div>

          {/* Units Inventory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Total Fleet Count (Units)
              </label>
              <input
                type="number"
                value={formData.totalUnits ?? 4}
                onChange={(e) => setFormData({ ...formData, totalUnits: Number(e.target.value) })}
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Currently Booked Units
              </label>
              <input
                type="number"
                value={formData.bookedUnits ?? 0}
                onChange={(e) => setFormData({ ...formData, bookedUnits: Number(e.target.value) })}
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20 font-mono"
              />
            </div>
          </div>

          {/* Inclusions / Equipment */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
              Key Features & Inclusions (Comma separated)
            </label>
            <input
              type="text"
              value={inclusionsInput}
              onChange={(e) => setInclusionsInput(e.target.value)}
              placeholder="e.g. 4x4 Low Ratio, Snorkel Air Intake, GPS SOS Tracker"
              className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
            />
          </div>

          {/* Image URLs */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
              Image URLs (One per line)
            </label>
            <textarea
              rows={2}
              value={imagesInput}
              onChange={(e) => setImagesInput(e.target.value)}
              placeholder="https://..."
              className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-white/20 font-mono"
            />
          </div>

          {/* Featured Checkbox */}
          <div className="flex items-center gap-2.5 pt-1">
            <input
              type="checkbox"
              id="isFeaturedVeh"
              checked={Boolean(formData.isFeatured)}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="w-4 h-4 rounded accent-slate-700 cursor-pointer"
            />
            <label htmlFor="isFeaturedVeh" className="text-xs text-slate-700 dark:text-zinc-300 cursor-pointer font-medium">
              Feature on Homepage & Spotlight
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
              <span>{isEditing ? "Update Fleet Vehicle" : "Add to Fleet"}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
