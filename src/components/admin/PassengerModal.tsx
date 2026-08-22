"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  User,
  Compass,
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
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                {isEditing ? `Edit Passenger: ${passenger?.name}` : "Add Traveller to Batch Manifest"}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                Configure destination tour circuit, departure dates, and convoy seat.
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
          
          {/* Destination Tour Circuit & Departure Date Selector */}
          <div className="p-3.5 bg-slate-50 dark:bg-[#0B0D10] rounded-xl border border-slate-200 dark:border-white/[0.08] space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
                <span>Tour Destination & Departure Batch *</span>
              </label>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-white/[0.04] text-slate-600 dark:text-zinc-400">
                {activeBatch.bookedSeats}/{activeBatch.totalSeats} Booked
              </span>
            </div>

            {/* Batch Select Dropdown */}
            <select
              value={targetBatchId}
              onChange={(e) => handleBatchChange(e.target.value)}
              className="w-full bg-white dark:bg-[#16181E] border border-slate-300 dark:border-white/[0.1] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/25 cursor-pointer font-medium"
            >
              {batches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.tourTitle} ── [Dep: {b.startDate} to {b.endDate}] ({b.status})
                </option>
              ))}
            </select>

            {/* Selected Batch Details Strip */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 dark:text-zinc-400 pt-0.5">
              <span>Pickup: <strong className="text-slate-800 dark:text-zinc-200">{activeBatch.startLocation}</strong></span>
              <span>Window: <strong className="text-slate-800 dark:text-zinc-200 font-mono">{activeBatch.startDate} → {activeBatch.endDate}</strong></span>
              <span>Captain: <strong className="text-slate-800 dark:text-zinc-200">{activeBatch.leadCaptainName}</strong></span>
            </div>
          </div>

          {/* Name & Age / Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Vikramaditya Roy"
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
              />
              {errors.name && <p className="text-[10px] text-red-500">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-500 dark:text-zinc-400">
                  Age
                </label>
                <input
                  type="number"
                  value={formData.age || ""}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-500 dark:text-zinc-400">
                  Gender
                </label>
                <select
                  value={formData.gender || "Male"}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as "Male" | "Female" | "Other" })}
                  className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-2.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
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
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Phone Number *
              </label>
              <input
                type="text"
                value={formData.phone || ""}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-white/20 font-mono"
              />
              {errors.phone && <p className="text-[10px] text-red-500">{errors.phone}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="traveller@email.com"
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-white/20 font-mono"
              />
              {errors.email && <p className="text-[10px] text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                Home City
              </label>
              <input
                type="text"
                value={formData.city || ""}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="e.g. Bangalore"
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
              Emergency Contact (Name & Phone)
            </label>
            <input
              type="text"
              value={formData.emergencyContact || ""}
              onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
              placeholder="e.g. Ramesh Roy (Father) - +91 98765 11002"
              className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
            />
          </div>

          {/* Vehicle Assignment & Seat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-[#0B0D10] rounded-xl border border-slate-200 dark:border-white/[0.08]">
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase text-slate-500 dark:text-zinc-400">
                Assigned 4x4 / Bike in Convoy
              </label>
              <select
                value={formData.assignedVehicle || activeBatch.assignedVehicles[0]}
                onChange={(e) => setFormData({ ...formData, assignedVehicle: e.target.value })}
                className="w-full bg-white dark:bg-[#16181E] border border-slate-300 dark:border-white/[0.1] rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/25 font-medium"
              >
                {activeBatch.assignedVehicles.map((veh) => (
                  <option key={veh} value={veh}>
                    {veh}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase text-slate-500 dark:text-zinc-400">
                Seat Position / Role
              </label>
              <input
                type="text"
                value={formData.seatNumber || ""}
                onChange={(e) => setFormData({ ...formData, seatNumber: e.target.value })}
                placeholder="e.g. Co-Driver (Front Right)"
                className="w-full bg-white dark:bg-[#16181E] border border-slate-300 dark:border-white/[0.1] rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/25 font-medium"
              />
            </div>
          </div>

          {/* Status Selectors: Trip Status, Payment Status, Permit Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-500 dark:text-zinc-400">
                Trip Attendance
              </label>
              <select
                value={formData.tripStatus || "Advance Paid (30%)"}
                onChange={(e) => setFormData({ ...formData, tripStatus: e.target.value as PassengerTripStatus })}
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
              >
                <option value="Applied / Pending">Applied / Pending</option>
                <option value="Advance Paid (30%)">Advance Paid (30%)</option>
                <option value="Fully Paid">Fully Paid</option>
                <option value="Boarded / Departed">Boarded / Departed</option>
                <option value="On Tour">On Tour (In-Transit)</option>
                <option value="Completed">Completed</option>
                <option value="No Show">No Show</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-500 dark:text-zinc-400">
                Payment Status
              </label>
              <select
                value={formData.paymentStatus || "Advance Paid"}
                onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value as PaymentStatus })}
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
              >
                <option value="Pending Advance">Pending Advance</option>
                <option value="Advance Paid">Advance Paid (30%)</option>
                <option value="Fully Paid">Fully Paid (100%)</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-500 dark:text-zinc-400">
                ILP Permit
              </label>
              <select
                value={formData.permitStatus || "Verified & Issued"}
                onChange={(e) => setFormData({ ...formData, permitStatus: e.target.value as PermitStatus })}
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
              >
                <option value="Verified & Issued">Verified & Issued</option>
                <option value="Documents Under Review">Under Review</option>
                <option value="Documents Pending">Docs Pending</option>
                <option value="Not Required">Not Required</option>
              </select>
            </div>
          </div>

          {/* Solo Traveller Toggle & Food */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
            <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 dark:bg-[#0B0D10] rounded-lg border border-slate-200 dark:border-white/[0.08]">
              <input
                type="checkbox"
                id="isSoloPax"
                checked={Boolean(formData.isSoloTraveller)}
                onChange={(e) => setFormData({ ...formData, isSoloTraveller: e.target.checked })}
                className="w-3.5 h-3.5 rounded accent-slate-700 cursor-pointer"
              />
              <label htmlFor="isSoloPax" className="text-xs text-slate-700 dark:text-zinc-300 cursor-pointer font-medium">
                Solo Traveller (Pair roommate/tent)
              </label>
            </div>

            <div className="space-y-1">
              <select
                value={formData.dietaryPreference || "Veg"}
                onChange={(e) => setFormData({ ...formData, dietaryPreference: e.target.value })}
                className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-2.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
              >
                <option value="Veg">Diet: Vegetarian</option>
                <option value="Non-Veg">Diet: Non-Vegetarian</option>
                <option value="Jain">Diet: Jain Food</option>
              </select>
            </div>
          </div>

          {/* Special Notes */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-500 dark:text-zinc-400">
              Special Instructions / Marshal Notes
            </label>
            <textarea
              rows={2}
              value={formData.notes || ""}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Pickup at GAU airport terminal 1."
              className="w-full bg-white dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-white/20"
            />
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
              <span>{isEditing ? "Update Roster Entry" : "Add to Manifest"}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
