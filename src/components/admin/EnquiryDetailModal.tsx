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
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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
        className="w-full max-w-xl bg-[#111318] border border-white/[0.12] rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 animate-scaleUp text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-3.5 border-b border-white/[0.08]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border ${
                  enquiry.type === "tour"
                    ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                    : "bg-blue-500/15 text-blue-400 border-blue-500/30"
                }`}
              >
                {enquiry.type === "tour" ? "Tour Booking" : "Rental Lead"}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">
                #{enquiry.id} • {enquiry.submittedDate}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white font-display">
              {enquiry.customerName}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Interested Item Banner */}
        <div className="bg-[#0B0D10] border border-white/[0.08] rounded-xl p-3.5 space-y-0.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
            Requested Service
          </span>
          <p className="text-xs sm:text-sm font-semibold text-white font-mono">
            {enquiry.relatedItemName}
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Phone */}
          <div className="bg-[#0B0D10] border border-white/[0.06] rounded-xl p-3 space-y-1">
            <span className="text-[10px] font-mono uppercase text-zinc-500 block">
              Phone Number
            </span>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-200">{enquiry.phone}</span>
              <a
                href={`tel:${enquiry.phone}`}
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
            <span className="text-xs text-zinc-300 font-mono truncate block">{enquiry.email}</span>
          </div>

          {/* Dates */}
          <div className="bg-[#0B0D10] border border-white/[0.06] rounded-xl p-3 space-y-1">
            <span className="text-[10px] font-mono uppercase text-zinc-500 block">
              Requested Dates
            </span>
            <span className="text-xs text-zinc-200 flex items-center gap-1.5 font-mono">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span>{enquiry.startDate} → {enquiry.endDate}</span>
            </span>
          </div>

          {/* Guests Count */}
          <div className="bg-[#0B0D10] border border-white/[0.06] rounded-xl p-3 space-y-1">
            <span className="text-[10px] font-mono uppercase text-zinc-500 block">
              Party Size
            </span>
            <span className="text-xs text-zinc-200 flex items-center gap-1.5 font-mono">
              <Users className="w-3.5 h-3.5 text-zinc-400" />
              <span>{enquiry.numberOfTravellers ? `${enquiry.numberOfTravellers} Persons` : "1–4 Persons"}</span>
            </span>
          </div>
        </div>

        {/* Message / Special Request */}
        {enquiry.message && (
          <div className="bg-[#0B0D10] border border-white/[0.06] rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] font-mono uppercase text-zinc-500 block">
              Customer Message
            </span>
            <p className="text-xs text-zinc-300 italic leading-relaxed">
              &ldquo;{enquiry.message}&rdquo;
            </p>
          </div>
        )}

        {/* Lead Status Control */}
        <div className="space-y-2 pt-0.5">
          <span className="text-[10px] font-mono uppercase text-zinc-400 block">
            Update Lead Status
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {(["New", "Contacted", "Confirmed", "Cancelled"] as EnquiryStatus[]).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => onStatusChange(enquiry.id, st)}
                className={`py-1.5 px-2 rounded-lg text-xs font-mono transition-all text-center border ${
                  enquiry.status === st
                    ? "bg-white/15 text-white border-white/25 font-semibold shadow-sm"
                    : "bg-[#0B0D10] text-zinc-400 border-white/[0.06] hover:border-white/15 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Actions Row */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3.5 border-t border-white/[0.08]">
          <button
            type="button"
            onClick={() => onDelete(enquiry)}
            className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Lead</span>
          </button>

          <div className="flex items-center gap-1.5">
            <a
              href={`tel:${enquiry.phone}`}
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
