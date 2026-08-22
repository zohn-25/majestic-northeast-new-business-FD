"use client";

import React from "react";
import {
  X,
  MessageSquareText,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Users,
  MessageCircle,
  CheckCircle2,
  Clock,
  Car,
  Compass,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { Enquiry, EnquiryStatus } from "@/lib/types";
import { buildWhatsAppUrl } from "@/lib/utils";

interface EnquiryDetailModalProps {
  isOpen: boolean;
  enquiry: Enquiry | null;
  onClose: () => void;
  onStatusChange: (id: string, status: EnquiryStatus) => void;
  onDelete: (enquiry: Enquiry) => void;
}

export function EnquiryDetailModal({
  isOpen,
  enquiry,
  onClose,
  onStatusChange,
  onDelete,
}: EnquiryDetailModalProps) {
  if (!isOpen || !enquiry) return null;

  const rawPhone = enquiry.phone.replace(/[^0-9]/g, "");
  const whatsAppMessage = `Hi ${enquiry.customerName}! Thank you for enquiring with Majestic Northeast for ${enquiry.relatedItemName}. We are ready to assist you with dates and booking.`;
  const whatsAppUrl = buildWhatsAppUrl(rawPhone || "919876543210", whatsAppMessage);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#121418] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.9)] space-y-6 my-8 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 animate-scaleUp text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`text-[9px] font-black font-display uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                  enquiry.type === "tour"
                    ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                    : "bg-blue-500/15 text-blue-400 border-blue-500/30"
                }`}
              >
                {enquiry.type === "tour" ? "Expedition Tour Lead" : "Vehicle Rental Lead"}
              </span>
              <span className="text-[10px] text-white/40 font-mono">
                #{enquiry.id} • {enquiry.submittedDate}
              </span>
            </div>

            <h3 className="text-xl font-black font-display text-white">
              {enquiry.customerName}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Interested Item Banner */}
        <div className="bg-black/50 border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-black font-display uppercase tracking-widest text-brand-red block">
            REQUESTED SERVICE / VEHICLE
          </span>
          <p className="text-sm font-black font-display text-white">
            {enquiry.relatedItemName}
          </p>
        </div>

        {/* Guest Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Phone */}
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-3 space-y-1">
            <span className="text-[10px] font-bold font-display uppercase tracking-wider text-white/40 block">
              Phone Number
            </span>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">{enquiry.phone}</span>
              <a
                href={`tel:${enquiry.phone}`}
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
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white truncate max-w-[170px]">{enquiry.email}</span>
              <a
                href={`mailto:${enquiry.email}`}
                className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1"
              >
                <Mail className="w-3 h-3" />
                <span>Mail</span>
              </a>
            </div>
          </div>

          {/* Dates / Batch */}
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-3 space-y-1">
            <span className="text-[10px] font-bold font-display uppercase tracking-wider text-white/40 block">
              {enquiry.type === "tour" ? "Preferred Batch" : "Rental Duration"}
            </span>
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-red shrink-0" />
              <span>
                {enquiry.preferredBatch ||
                  (enquiry.startDate && enquiry.endDate
                    ? `${enquiry.startDate} to ${enquiry.endDate}`
                    : "Flexible Dates")}
              </span>
            </span>
          </div>

          {/* Travellers & Location */}
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-3 space-y-1">
            <span className="text-[10px] font-bold font-display uppercase tracking-wider text-white/40 block">
              Travellers & Pickup
            </span>
            <span className="text-xs font-bold text-white flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
              <span>
                {enquiry.numberOfTravellers ? `${enquiry.numberOfTravellers} Pax` : "Group"} • {enquiry.pickupLocation || "Guwahati"}
              </span>
            </span>
          </div>
        </div>

        {/* Customer Message */}
        {enquiry.message && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-black font-display uppercase tracking-wider text-white/50 block">
              Client Message / Special Request
            </span>
            <div className="bg-black/60 border border-white/10 rounded-xl p-3.5 text-xs text-white/80 leading-relaxed italic">
              &ldquo;{enquiry.message}&rdquo;
            </div>
          </div>
        )}

        {/* Lead Status Control */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-black font-display uppercase tracking-wider text-white/50 block">
            Update Lead Status
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(["New", "Contacted", "Confirmed", "Cancelled"] as EnquiryStatus[]).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => onStatusChange(enquiry.id, st)}
                className={`py-2 px-3 rounded-xl text-xs font-bold font-display uppercase tracking-wider border transition-all ${
                  enquiry.status === st
                    ? st === "Confirmed"
                      ? "bg-emerald-600 text-white border-emerald-500 shadow-md"
                      : st === "Contacted"
                      ? "bg-amber-600 text-white border-amber-500 shadow-md"
                      : st === "New"
                      ? "bg-brand-red text-white border-brand-red shadow-md"
                      : "bg-gray-700 text-white border-gray-600 shadow-md"
                    : "bg-white/5 text-white/60 border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Direct Action Buttons: WhatsApp + Call + Delete */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={() => onDelete(enquiry)}
            className="px-3.5 py-2.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-400 text-xs font-bold font-display uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Lead</span>
          </button>

          <div className="flex items-center gap-2.5">
            <a
              href={`tel:${enquiry.phone}`}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold font-display uppercase tracking-wider transition-all flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>Call Client</span>
            </a>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-black font-display uppercase tracking-widest transition-all shadow-md shadow-emerald-900/40 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
