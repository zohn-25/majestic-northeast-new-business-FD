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
  CheckCircle2,
  Trash2,
  Edit,
  MessageCircle,
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-[#111318] border border-slate-200 dark:border-white/[0.12] rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/5 text-left animate-scaleUp transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-slate-200 dark:border-white/[0.08]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border ${
                  passenger.tripStatus === "Boarded / Departed"
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                    : passenger.tripStatus === "Fully Paid"
                    ? "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30"
                    : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30"
                }`}
              >
                {passenger.tripStatus}
              </span>
              {passenger.isSoloTraveller && (
                <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30">
                  Solo Traveller
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
              {passenger.name} {passenger.age ? `(${passenger.age}y, ${passenger.gender})` : ""}
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono">{passenger.city} • Registered on {passenger.joinedAt}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-400 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Action Bar: WhatsApp & Phone */}
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={`tel:${passenger.phone}`}
            className="w-full py-2 bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-zinc-200 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
            <span>Call {passenger.phone}</span>
          </a>
        </div>

        {/* Expedition & Vehicle Box */}
        <div className="bg-slate-50 dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-xl p-3.5 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
            Assigned Convoy Details
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <Car className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
              <span className="text-slate-800 dark:text-zinc-200 font-medium">{passenger.assignedVehicle}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500 dark:text-zinc-500 font-mono text-[10px]">Seat:</span>
              <span className="text-slate-800 dark:text-zinc-200 font-medium">{passenger.seatNumber}</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-zinc-400 pt-1 border-t border-slate-200 dark:border-white/[0.06]">
            Circuit: <strong className="text-slate-800 dark:text-zinc-300 font-sans">{passenger.tourTitle}</strong>
          </p>
        </div>

        {/* Contact & Verification Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="space-y-1 bg-slate-50 dark:bg-white/[0.02] p-3 rounded-xl border border-slate-200 dark:border-white/[0.04]">
            <span className="text-[10px] text-slate-500 dark:text-zinc-500 font-mono uppercase block">Contact & Identity</span>
            <div className="space-y-0.5 text-slate-800 dark:text-zinc-300">
              <p>Email: {passenger.email}</p>
              <p>ID Proof: {passenger.idProofType}</p>
              <p>Emergency: {passenger.emergencyContact}</p>
            </div>
          </div>

          <div className="space-y-1 bg-slate-50 dark:bg-white/[0.02] p-3 rounded-xl border border-slate-200 dark:border-white/[0.04]">
            <span className="text-[10px] text-slate-500 dark:text-zinc-500 font-mono uppercase block">Permits & Payments</span>
            <div className="space-y-1 text-slate-800 dark:text-zinc-300">
              <div className="flex items-center justify-between">
                <span>ILP Permit:</span>
                <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">{passenger.permitStatus}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Payment:</span>
                <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400">{passenger.paymentStatus}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Diet:</span>
                <span className="font-mono text-[10px]">{passenger.dietaryPreference}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {passenger.notes && (
          <div className="bg-slate-50 dark:bg-white/[0.02] p-3 rounded-xl border border-slate-200 dark:border-white/[0.04] space-y-1 text-xs">
            <span className="text-[10px] text-slate-500 dark:text-zinc-500 font-mono uppercase block">Marshal Notes</span>
            <p className="text-slate-700 dark:text-zinc-300 italic">{passenger.notes}</p>
          </div>
        )}

        {/* Attendance Status Quick Change */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/[0.08]">
          <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-zinc-400 block">
            Update Attendance / Convoy Status
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
                className={`px-2 py-1.5 rounded-lg text-[10px] font-mono uppercase transition-all border ${
                  passenger.tripStatus === st
                    ? "bg-slate-900 text-white dark:bg-white/15 dark:text-white border-slate-900 dark:border-white/20 font-semibold"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900 dark:bg-white/[0.02] dark:text-zinc-400 dark:border-white/[0.06] dark:hover:border-white/15 dark:hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Actions: Edit, Delete, Close */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/[0.08]">
          <button
            type="button"
            onClick={() => onDelete(passenger)}
            className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onEdit(passenger)}
              className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-700 dark:text-zinc-300 text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/10 dark:hover:bg-white/20 text-xs font-semibold transition-colors"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
