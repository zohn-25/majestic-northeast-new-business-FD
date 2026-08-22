"use client";

import React from "react";
import {
  X,
  Phone,
  MessageCircle,
  Trash2,
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-[#111318] border border-slate-200 dark:border-white/[0.12] rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/5 animate-scaleUp text-left transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-3.5 border-b border-slate-200 dark:border-white/[0.08]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border ${
                  enquiry.type === "tour"
                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30"
                    : "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30"
                }`}
              >
                {enquiry.type === "tour" ? "Tour Booking" : "Rental Lead"}
              </span>
              <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono">
                #{enquiry.id} • {enquiry.submittedDate}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
              {enquiry.customerName}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-400 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Interested Item Banner */}
        <div className="bg-slate-50 dark:bg-[#0B0D10] border border-slate-200 dark:border-white/[0.08] rounded-xl p-3.5 space-y-0.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
            Requested Service
          </span>
          <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white font-mono">
            {enquiry.relatedItemName}
          </p>
        </div>

        {/* Direct Action Contacts */}
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat WhatsApp</span>
          </a>

          <a
            href={`tel:${enquiry.phone}`}
            className="w-full py-2 bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-zinc-200 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
            <span>Call Customer</span>
          </a>
        </div>

        {/* Lead Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-50 dark:bg-white/[0.02] p-3 rounded-xl border border-slate-200 dark:border-white/[0.04]">
            <span className="text-[10px] text-slate-500 dark:text-zinc-500 font-mono uppercase block">Phone</span>
            <span className="text-slate-800 dark:text-zinc-200 font-mono text-xs block truncate mt-0.5">{enquiry.phone}</span>
          </div>

          <div className="bg-slate-50 dark:bg-white/[0.02] p-3 rounded-xl border border-slate-200 dark:border-white/[0.04]">
            <span className="text-[10px] text-slate-500 dark:text-zinc-500 font-mono uppercase block">Email</span>
            <span className="text-slate-800 dark:text-zinc-200 text-xs block truncate mt-0.5">{enquiry.email}</span>
          </div>

          {enquiry.numberOfTravellers && (
            <div className="bg-slate-50 dark:bg-white/[0.02] p-3 rounded-xl border border-slate-200 dark:border-white/[0.04]">
              <span className="text-[10px] text-slate-500 dark:text-zinc-500 font-mono uppercase block">Group Size</span>
              <span className="text-slate-800 dark:text-zinc-200 font-mono text-xs block mt-0.5">{enquiry.numberOfTravellers} Travellers</span>
            </div>
          )}

          {(enquiry.preferredBatch || enquiry.startDate) && (
            <div className="bg-slate-50 dark:bg-white/[0.02] p-3 rounded-xl border border-slate-200 dark:border-white/[0.04]">
              <span className="text-[10px] text-slate-500 dark:text-zinc-500 font-mono uppercase block">Travel Dates</span>
              <span className="text-slate-800 dark:text-zinc-200 font-mono text-xs block mt-0.5">
                {enquiry.preferredBatch || (enquiry.startDate ? `${enquiry.startDate} → ${enquiry.endDate}` : "Flexible")}
              </span>
            </div>
          )}

          {enquiry.pickupLocation && (
            <div className="bg-slate-50 dark:bg-white/[0.02] p-3 rounded-xl border border-slate-200 dark:border-white/[0.04]">
              <span className="text-[10px] text-slate-500 dark:text-zinc-500 font-mono uppercase block">Pickup / Drop</span>
              <span className="text-slate-800 dark:text-zinc-200 text-xs block mt-0.5">{enquiry.pickupLocation}</span>
            </div>
          )}

          <div className="bg-slate-50 dark:bg-white/[0.02] p-3 rounded-xl border border-slate-200 dark:border-white/[0.04]">
            <span className="text-[10px] text-slate-500 dark:text-zinc-500 font-mono uppercase block">Lead Status</span>
            <span className="text-slate-800 dark:text-zinc-200 font-mono text-xs block mt-0.5">{enquiry.status}</span>
          </div>
        </div>

        {/* Customer Message */}
        {enquiry.message && (
          <div className="bg-slate-50 dark:bg-white/[0.02] p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.04] space-y-1 text-xs">
            <span className="text-[10px] text-slate-500 dark:text-zinc-500 font-mono uppercase block">
              Customer Message / Requirement
            </span>
            <p className="text-slate-700 dark:text-zinc-300 leading-relaxed italic">
              &quot;{enquiry.message}&quot;
            </p>
          </div>
        )}

        {/* Status Change Selector */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/[0.08]">
          <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-zinc-400 block">
            Update Lead Status
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(["New", "Contacted", "Confirmed", "Cancelled"] as EnquiryStatus[]).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => onStatusChange(enquiry.id, st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                  enquiry.status === st
                    ? "bg-slate-900 text-white dark:bg-white/15 dark:text-white border-slate-900 dark:border-white/20 font-semibold"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900 dark:bg-white/[0.02] dark:text-zinc-400 dark:border-white/[0.06] dark:hover:border-white/15 dark:hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/[0.08]">
          <button
            type="button"
            onClick={() => onDelete(enquiry)}
            className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Lead</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/10 dark:hover:bg-white/20 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
