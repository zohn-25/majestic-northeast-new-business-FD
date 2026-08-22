"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  User,
  Phone,
  Mail,
  ShieldCheck,
  Car,
  Bike,
  AlertCircle,
  Sparkles,
  MapPin,
  Compass,
  Calendar,
} from "lucide-react";
import { Passenger, TourBatch, PermitStatus, PaymentStatus, PassengerTripStatus } from "@/lib/types";

interface PassengerModalProps {
  isOpen: boolean;
  passenger?: Passenger | null;
  batches: TourBatch[];
  selectedBatchId?: string;
  onClose: () => void;
  onSave: (passenger: Passenger) => void;
}

export function PassengerModal({
  isOpen,
  passenger,
  batches,
  selectedBatchId,
  onClose,
  onSave,
}: PassengerModalProps) {
  const isEditing = Boolean(passenger);

  // Active target batch for this passenger
  const [targetBatchId, setTargetBatchId] = useState<string>(
    passenger?.batchId || selectedBatchId || batches[0]?.id || ""
  );

  const activeBatch = batches.find((b) => b.id === targetBatchId) || batches[0];

  const [formData, setFormData] = useState<Partial<Passenger>>({
    name: "",
    age: 28,
    gender: "Male",
    phone: "",
    email: "",
    city: "Mumbai",
    emergencyContact: "",
    idProofType: "Aadhaar Card",
    permitStatus: "Verified & Issued",
    paymentStatus: "Advance Paid",
    tripStatus: "Advance Paid (30%)",
    assignedVehicle: activeBatch?.assignedVehicles[0] || "Thar 4x4 #01 (Lead)",
    seatNumber: "Co-Driver (Front Right)",
    isSoloTraveller: true,
    dietaryPreference: "Veg",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (passenger) {
      setFormData(passenger);
      setTargetBatchId(passenger.batchId);
    } else {
      const defaultBatch = batches.find((b) => b.id === selectedBatchId) || batches[0];
      setTargetBatchId(defaultBatch?.id || "");
      setFormData({
        id: `pax-${Date.now().toString().slice(-4)}`,
        batchId: defaultBatch?.id,
        tourId: defaultBatch?.tourId,
        tourTitle: defaultBatch?.tourTitle,
        name: "",
        age: 28,
        gender: "Male",
        phone: "",
        email: "",
        city: "Mumbai",
        emergencyContact: "",
        idProofType: "Aadhaar Card",
        permitStatus: "Verified & Issued",
        paymentStatus: "Advance Paid",
        tripStatus: "Advance Paid (30%)",
        assignedVehicle: defaultBatch?.assignedVehicles[0] || "Thar 4x4 #01 (Lead)",
        seatNumber: "Co-Driver (Front Right)",
        isSoloTraveller: true,
        dietaryPreference: "Veg",
        notes: "",
        joinedAt: new Date().toISOString().split("T")[0],
      });
    }
    setErrors({});
  }, [passenger, selectedBatchId, batches, isOpen]);

  // When target batch changes, update assigned vehicles if not in current batch
  const handleBatchChange = (newBatchId: string) => {
    setTargetBatchId(newBatchId);
    const selected = batches.find((b) => b.id === newBatchId);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        batchId: selected.id,
        tourId: selected.tourId,
        tourTitle: selected.tourTitle,
        assignedVehicle: selected.assignedVehicles[0] || "Thar 4x4 #01",
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

  if (!isOpen || !activeBatch) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name?.trim()) newErrors.name = "Full name is required.";
    if (!formData.phone?.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.email?.trim()) newErrors.email = "Email address is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const fullPassenger: Passenger = {
      id: formData.id || passenger?.id || `pax-${Date.now()}`,
      batchId: activeBatch.id,
      tourId: activeBatch.tourId,
      tourTitle: activeBatch.tourTitle,
      name: formData.name || "",
      age: Number(formData.age) || 28,
      gender: formData.gender || "Male",
      phone: formData.phone || "",
      email: formData.email || "",
      city: formData.city || "India",
      emergencyContact: formData.emergencyContact || "Not Provided",
      idProofType: formData.idProofType || "Aadhaar Card",
      permitStatus: (formData.permitStatus as PermitStatus) || "Verified & Issued",
      paymentStatus: (formData.paymentStatus as PaymentStatus) || "Advance Paid",
      tripStatus: (formData.tripStatus as PassengerTripStatus) || "Advance Paid (30%)",
      assignedVehicle: formData.assignedVehicle || activeBatch.assignedVehicles[0] || "Thar 4x4 #01",
      seatNumber: formData.seatNumber || "Co-Driver (Front Right)",
      isSoloTraveller: Boolean(formData.isSoloTraveller),
      dietaryPreference: formData.dietaryPreference || "Veg",
      notes: formData.notes || "",
      joinedAt: formData.joinedAt || new Date().toISOString().split("T")[0],
    };

    onSave(fullPassenger);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#121418] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.9)] space-y-6 my-8 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-red/15 border border-brand-red/30 text-brand-red flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black font-display uppercase tracking-tight text-white">
                {isEditing ? `Edit Passenger: ${passenger?.name}` : "Add Traveller to Batch Manifest"}
              </h3>
              <p className="text-[11px] text-white/50">
                Assign destination tour circuit, departure date, and convoy seat.
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
          
          {/* ========================================================================= */}
          {/* 🎯 DESTINATION TOUR CIRCUIT & BATCH DEPARTURE DATE SELECTOR              */}
          {/* ========================================================================= */}
          <div className="p-4 bg-black/60 rounded-2xl border-2 border-brand-red/40 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black font-display uppercase tracking-wider text-brand-red flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                <span>Select Tour Destination & Departure Batch *</span>
              </label>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-white/70 font-mono">
                {activeBatch.bookedSeats}/{activeBatch.totalSeats} Booked
              </span>
            </div>

            {/* Batch Select Dropdown */}
            <select
              value={targetBatchId}
              onChange={(e) => handleBatchChange(e.target.value)}
              className="w-full bg-[#16191F] border border-white/20 rounded-xl px-3.5 py-3 text-xs text-white font-bold focus:outline-none focus:border-brand-red shadow-inner cursor-pointer"
            >
              {batches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.tourTitle} ── [Dep: {b.startDate} to {b.endDate}] ({b.status} • {b.tripFormat === "car" ? "4x4 Convoy" : "Motorcycle"})
                </option>
              ))}
            </select>

            {/* Selected Batch Details Strip */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-white/70 pt-1">
              <span>📍 Route: <strong className="text-white">{activeBatch.startLocation}</strong></span>
              <span>📅 Window: <strong className="text-brand-red">{activeBatch.startDate} → {activeBatch.endDate}</strong></span>
              <span>👨‍✈️ Captain: <strong className="text-white">{activeBatch.leadCaptainName}</strong></span>
            </div>
          </div>

          {/* Name & Age / Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Vikramaditya Roy"
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-red font-medium"
              />
              {errors.name && <p className="text-[10px] text-red-400 font-bold">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="block text-[10px] font-black font-display uppercase tracking-wider text-white/70">
                  Age
                </label>
                <input
                  type="number"
                  value={formData.age || ""}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-black font-display uppercase tracking-wider text-white/70">
                  Gender
                </label>
                <select
                  value={formData.gender || "Male"}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as "Male" | "Female" | "Other" })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-2.5 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
                Phone Number *
              </label>
              <input
                type="text"
                value={formData.phone || ""}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-red font-mono"
              />
              {errors.phone && <p className="text-[10px] text-red-400 font-bold">{errors.phone}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="traveller@email.com"
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-red font-mono"
              />
              {errors.email && <p className="text-[10px] text-red-400 font-bold">{errors.email}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
                Home City
              </label>
              <input
                type="text"
                value={formData.city || ""}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="e.g. Bangalore"
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-red font-medium"
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-1">
            <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
              Emergency Contact (Name & Phone)
            </label>
            <input
              type="text"
              value={formData.emergencyContact || ""}
              onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
              placeholder="e.g. Ramesh Roy (Father) - +91 98765 11002"
              className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-red font-medium"
            />
          </div>

          {/* Vehicle Assignment & Seat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-black/40 rounded-2xl border border-white/10">
            <div className="space-y-1">
              <label className="block text-[10px] font-black font-display uppercase tracking-wider text-brand-red">
                Assigned 4x4 / Bike in Convoy
              </label>
              <select
                value={formData.assignedVehicle || activeBatch.assignedVehicles[0]}
                onChange={(e) => setFormData({ ...formData, assignedVehicle: e.target.value })}
                className="w-full bg-[#121418] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
              >
                {activeBatch.assignedVehicles.map((veh) => (
                  <option key={veh} value={veh}>
                    {veh}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black font-display uppercase tracking-wider text-brand-red">
                Seat Position / Role
              </label>
              <input
                type="text"
                value={formData.seatNumber || ""}
                onChange={(e) => setFormData({ ...formData, seatNumber: e.target.value })}
                placeholder="e.g. Co-Driver (Front Right) / Rider 02"
                className="w-full bg-[#121418] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>

          {/* Status Selectors: Trip Status, Payment Status, Permit Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block text-[10px] font-black font-display uppercase tracking-wider text-white/70">
                Trip Attendance / Status
              </label>
              <select
                value={formData.tripStatus || "Advance Paid (30%)"}
                onChange={(e) => setFormData({ ...formData, tripStatus: e.target.value as PassengerTripStatus })}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
              >
                <option value="Applied / Pending">Applied / Pending</option>
                <option value="Advance Paid (30%)">Advance Paid (30%)</option>
                <option value="Fully Paid">Fully Paid</option>
                <option value="Boarded / Departed">Boarded / Departed (Chala gaya)</option>
                <option value="On Tour">On Tour (In-Transit)</option>
                <option value="Completed">Completed</option>
                <option value="No Show">No Show</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black font-display uppercase tracking-wider text-white/70">
                Payment Status
              </label>
              <select
                value={formData.paymentStatus || "Advance Paid"}
                onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value as PaymentStatus })}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
              >
                <option value="Pending Advance">Pending Advance</option>
                <option value="Advance Paid">Advance Paid (30%)</option>
                <option value="Fully Paid">Fully Paid (100%)</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black font-display uppercase tracking-wider text-white/70">
                ILP / Border Permit
              </label>
              <select
                value={formData.permitStatus || "Verified & Issued"}
                onChange={(e) => setFormData({ ...formData, permitStatus: e.target.value as PermitStatus })}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
              >
                <option value="Verified & Issued">Verified & Issued</option>
                <option value="Documents Under Review">Under Review</option>
                <option value="Documents Pending">Docs Pending</option>
                <option value="Not Required">Not Required</option>
              </select>
            </div>
          </div>

          {/* Solo Traveller Toggle & Food */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-white/10">
              <input
                type="checkbox"
                id="isSoloPax"
                checked={Boolean(formData.isSoloTraveller)}
                onChange={(e) => setFormData({ ...formData, isSoloTraveller: e.target.checked })}
                className="w-4 h-4 rounded accent-brand-red cursor-pointer"
              />
              <label htmlFor="isSoloPax" className="text-xs font-bold font-display text-white cursor-pointer">
                Solo Stranger Traveller (Pair with roommate/tent)
              </label>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black font-display uppercase tracking-wider text-white/70">
                Dietary Preference
              </label>
              <select
                value={formData.dietaryPreference || "Veg"}
                onChange={(e) => setFormData({ ...formData, dietaryPreference: e.target.value })}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-red"
              >
                <option value="Veg">Vegetarian</option>
                <option value="Non-Veg">Non-Vegetarian</option>
                <option value="Jain">Jain (No Onion / Garlic)</option>
              </select>
            </div>
          </div>

          {/* Special Notes */}
          <div className="space-y-1">
            <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
              Special Instructions / Marshal Notes
            </label>
            <textarea
              rows={2}
              value={formData.notes || ""}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Certified mountain driver, has camera drone, requested pickup at GAU airport terminal 1."
              className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-red font-medium"
            />
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
              <span>{isEditing ? "Update Roster Entry" : "Add to Manifest"}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
