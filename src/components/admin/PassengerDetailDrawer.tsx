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
  const whatsAppMessage = `Hi ${passenger.name}! This is the Majestic Northeast Expedition Team regarding your upcoming departure for "${passenger.tourTitle}". We are confirming your vehicle assignment (${passenger.assignedVehicle}).`;
  const whatsAppUrl = buildWhatsAppUrl(rawPhone || "919876543210", whatsAppMessage);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#111318] border border-white/[0.12] rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 text-left animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-white/[0.08]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border ${
                  passenger.tripStatus === "Boarded / Departed"
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    : passenger.tripStatus === "Fully Paid"
                    ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
                    : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                }`}
              >
                {passenger.tripStatus}
              </span>
              {passenger.isSoloTraveller && (
                <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  Solo Traveller
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white font-display">
              {passenger.name} {passenger.age ? `(${passenger.age}y, ${passenger.gender})` : ""}
            </h3>
            <p className="text-xs text-zinc-400 font-mono">{passenger.city} • Registered on {passenger.joinedAt}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Assigned Convoy Unit & Seat Banner */}
        <div className="bg-[#0B0D10] border border-white/[0.08] rounded-xl p-3.5 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
              Convoy Allocation
            </span>
            <p className="text-xs sm:text-sm font-semibold text-white font-mono">
              {passenger.assignedVehicle}
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-zinc-500 block font-mono">Position</span>
            <span className="text-xs font-mono text-zinc-200 bg-white/[0.06] px-2 py-0.5 rounded border border-white/[0.08]">
              {passenger.seatNumber}
            </span>
          </div>
        </div>

        {/* Contact & Verification Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Phone */}
          <div className="bg-[#0B0D10] border border-white/[0.06] rounded-xl p-3 space-y-1">
            <span className="text-[10px] font-mono uppercase text-zinc-500 block">
              Phone Number
            </span>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-200">{passenger.phone}</span>
              <a
                href={`tel:${passenger.phone}`}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 font-mono"
              >
                <Phone className="w-3 h-3" />
                <span>Call</span>
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="bg-[#0B0D10] border border-white/[0.06] rounded-xl p-3 space-y-1">
            <span className="text-[10px] font-mono uppercase text-zinc-500 block">
              Email Address
            </span>
            <span className="text-xs text-zinc-300 font-mono truncate block">{passenger.email}</span>
          </div>

          {/* Payment Status */}
          <div className="bg-[#0B0D10] border border-white/[0.06] rounded-xl p-3 space-y-1">
            <span className="text-[10px] font-mono uppercase text-zinc-500 block">
              Payment Status
            </span>
            <span className="text-xs text-zinc-200 flex items-center gap-1.5 font-mono">
              <CreditCard className="w-3.5 h-3.5 text-zinc-400" />
              <span>{passenger.paymentStatus}</span>
            </span>
          </div>

          {/* Permit Status */}
          <div className="bg-[#0B0D10] border border-white/[0.06] rounded-xl p-3 space-y-1">
            <span className="text-[10px] font-mono uppercase text-zinc-500 block">
              ILP Permit
            </span>
            <span className="text-xs text-zinc-200 flex items-center gap-1.5 font-mono">
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{passenger.permitStatus} ({passenger.idProofType})</span>
            </span>
          </div>
        </div>

        {/* Emergency Contact & Diet */}
        <div className="bg-[#0B0D10] border border-white/[0.06] rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-500 font-mono text-[10px]">Emergency Next-of-Kin</span>
            <span className="text-zinc-300 font-medium">{passenger.emergencyContact}</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-white/[0.04]">
            <span className="text-zinc-500 font-mono text-[10px]">Dietary Preference</span>
            <span className="text-zinc-300 font-medium">{passenger.dietaryPreference || "Vegetarian"}</span>
          </div>
          {passenger.notes && (
            <div className="pt-2 border-t border-white/[0.04] space-y-0.5">
              <span className="text-zinc-500 font-mono text-[10px]">Marshal Notes</span>
              <p className="text-xs text-zinc-400 italic">&ldquo;{passenger.notes}&rdquo;</p>
            </div>
          )}
        </div>

        {/* Attendance & Boarding Status Controls */}
        <div className="space-y-2 pt-0.5">
          <span className="text-[10px] font-mono uppercase text-zinc-400 block">
            Update Attendance Status
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
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
                className={`py-1.5 px-2 rounded-lg text-[10px] font-mono transition-all text-center border ${
                  passenger.tripStatus === st
                    ? "bg-white/15 text-white border-white/25 font-semibold shadow-sm"
                    : "bg-[#0B0D10] text-zinc-400 border-white/[0.06] hover:border-white/15 hover:text-white"
                }`}
              >
                {st === "Boarded / Departed" ? "Departed" : st}
              </button>
            ))}
          </div>
        </div>

        {/* Actions Row */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3.5 border-t border-white/[0.08]">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onEdit(passenger)}
              className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors border border-white/[0.06]"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </button>

            <button
              type="button"
              onClick={() => onDelete(passenger)}
              className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <a
              href={`tel:${passenger.phone}`}
              className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white text-xs font-medium flex items-center gap-1.5 border border-white/[0.06]"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 border border-emerald-500/30 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
