"use client";

import React, { useEffect } from "react";
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  CreditCard,
  Car,
  Bike,
  CheckCircle2,
  Clock,
  Trash2,
  Edit,
  MessageCircle,
  AlertTriangle,
  Flag,
  FileCheck2,
} from "lucide-react";
import { Passenger, PassengerTripStatus, PaymentStatus, PermitStatus } from "@/lib/types";
import { buildWhatsAppUrl } from "@/lib/utils";

interface PassengerDetailDrawerProps {
  isOpen: boolean;
  passenger: Passenger | null;
  onClose: () => void;
  onStatusChange: (id: string, status: PassengerTripStatus) => void;
  onEdit: (passenger: Passenger) => void;
  onDelete: (passenger: Passenger) => void;
}

export function PassengerDetailDrawer({
  isOpen,
  passenger,
  onClose,
  onStatusChange,
  onEdit,
  onDelete,
}: PassengerDetailDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !passenger) return null;

  const rawPhone = passenger.phone.replace(/[^0-9]/g, "");
  const whatsAppMessage = `Hi ${passenger.name}! This is the Majestic Northeast Expedition Team regarding your upcoming group departure for "${passenger.tourTitle}". We are confirming your convoy roll-call and vehicle assignment (${passenger.assignedVehicle}).`;
  const whatsAppUrl = buildWhatsAppUrl(rawPhone || "919876543210", whatsAppMessage);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#121418] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.9)] space-y-6 my-8 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 text-left animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`text-[9px] font-black font-display uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${
                  passenger.tripStatus === "Boarded / Departed"
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                    : passenger.tripStatus === "Fully Paid"
                    ? "bg-blue-500/20 text-blue-400 border-blue-500/40"
                    : "bg-amber-500/20 text-amber-400 border-amber-500/40"
                }`}
              >
                {passenger.tripStatus}
              </span>
              {passenger.isSoloTraveller && (
                <span className="text-[9px] font-black font-display uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Solo Stranger Booking
                </span>
              )}
            </div>

            <h3 className="text-xl font-black font-display text-white">
              {passenger.name} {passenger.age ? `(${passenger.age}y, ${passenger.gender})` : ""}
            </h3>
            <p className="text-xs text-white/50">{passenger.city} • Registered on {passenger.joinedAt}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Assigned Convoy Unit & Seat Banner */}
        <div className="bg-black/50 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-[10px] font-black font-display uppercase tracking-widest text-brand-red block">
              CONVOY VEHICLE & SEAT ALLOCATION
            </span>
            <p className="text-sm font-black font-display text-white">
              {passenger.assignedVehicle}
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-white/50 block">Position</span>
            <span className="text-xs font-black font-display text-white bg-white/10 px-2.5 py-1 rounded-lg border border-white/15">
              {passenger.seatNumber}
            </span>
          </div>
        </div>

        {/* Contact & Verification Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Phone */}
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-3 space-y-1">
            <span className="text-[10px] font-bold font-display uppercase tracking-wider text-white/40 block">
              Phone Number
            </span>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white font-mono">{passenger.phone}</span>
              <a
                href={`tel:${passenger.phone}`}
                className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>Call</span>
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-3 space-y-1">
            <span className="text-[10px] font-bold font-display uppercase tracking-wider text-white/40 block">
              Email Address
            </span>
            <span className="text-xs font-bold text-white truncate block">{passenger.email}</span>
          </div>

          {/* Payment Status */}
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-3 space-y-1">
            <span className="text-[10px] font-bold font-display uppercase tracking-wider text-white/40 block">
              Payment Status
            </span>
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-brand-red" />
              <span>{passenger.paymentStatus}</span>
            </span>
          </div>

          {/* Permit Status */}
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-3 space-y-1">
            <span className="text-[10px] font-bold font-display uppercase tracking-wider text-white/40 block">
              ILP / Border Permit
            </span>
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{passenger.permitStatus} ({passenger.idProofType})</span>
            </span>
          </div>
        </div>

        {/* Emergency Contact & Diet */}
        <div className="bg-black/30 border border-white/10 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/50 font-bold uppercase tracking-wider text-[10px]">Emergency Next-of-Kin</span>
            <span className="text-white font-bold">{passenger.emergencyContact}</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
            <span className="text-white/50 font-bold uppercase tracking-wider text-[10px]">Dietary Preference</span>
            <span className="text-white font-bold">{passenger.dietaryPreference || "Vegetarian"}</span>
          </div>
          {passenger.notes && (
            <div className="pt-2 border-t border-white/5 space-y-0.5">
              <span className="text-white/50 font-bold uppercase tracking-wider text-[10px]">Marshal Notes</span>
              <p className="text-xs text-white/80 italic">&ldquo;{passenger.notes}&rdquo;</p>
            </div>
          )}
        </div>

        {/* Attendance & Boarding Status Controls */}
        <div className="space-y-2 pt-1">
          <span className="text-[10px] font-black font-display uppercase tracking-wider text-white/50 block">
            Update Departure & Boarding Status
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              "Applied / Pending",
              "Advance Paid (30%)",
              "Fully Paid",
              "Boarded / Departed",
              "On Tour",
              "Completed",
              "No Show",
              "Cancelled",
            ].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => onStatusChange(passenger.id, st as PassengerTripStatus)}
                className={`py-2 px-2.5 rounded-xl text-[11px] font-bold font-display uppercase tracking-wider border transition-all text-center ${
                  passenger.tripStatus === st
                    ? st === "Boarded / Departed" || st === "On Tour"
                      ? "bg-emerald-600 text-white border-emerald-500 shadow-md"
                      : st === "Fully Paid"
                      ? "bg-blue-600 text-white border-blue-500 shadow-md"
                      : st === "No Show" || st === "Cancelled"
                      ? "bg-red-600 text-white border-red-500 shadow-md"
                      : "bg-brand-red text-white border-brand-red shadow-md"
                    : "bg-white/5 text-white/60 border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                {st === "Boarded / Departed" ? "Boarded (Chala gaya)" : st}
              </button>
            ))}
          </div>
        </div>

        {/* Actions Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onEdit(passenger)}
              className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold font-display uppercase tracking-wider flex items-center gap-1.5"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </button>

            <button
              type="button"
              onClick={() => onDelete(passenger)}
              className="px-3.5 py-2.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-400 text-xs font-bold font-display uppercase tracking-wider flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${passenger.phone}`}
              className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold font-display uppercase tracking-wider flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black font-display uppercase tracking-wider flex items-center gap-1.5 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
