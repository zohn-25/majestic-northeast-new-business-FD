import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AvailabilityStatusInfo } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * SHARED UTILITY FUNCTION for computing availability status from booked vs total counts.
 * Never hardcodes labels separately from their numerical source.
 */
export function getAvailabilityStatus(booked: number, total: number): AvailabilityStatusInfo {
  const remaining = Math.max(0, total - booked);
  const percentBooked = (booked / total) * 100;

  if (remaining === 0) {
    return {
      status: "Fully Booked",
      seatsRemaining: 0,
      badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
      label: "Fully Booked",
    };
  }

  if (remaining <= 3 || percentBooked >= 85) {
    return {
      status: "Few Seats Left",
      seatsRemaining: remaining,
      badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30 animate-pulse-slow",
      label: `Only ${remaining} ${remaining === 1 ? "seat" : "seats"} left!`,
    };
  }

  if (percentBooked >= 50) {
    return {
      status: "Filling Fast",
      seatsRemaining: remaining,
      badgeColor: "bg-brand-orange/20 text-brand-orange-light border-brand-orange/40",
      label: `Filling Fast (${remaining} left)`,
    };
  }

  return {
    status: "Available Today",
    seatsRemaining: remaining,
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    label: `${remaining} Available`,
  };
}

/**
 * Format currency to Indian Rupees format (₹1,500)
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Build WhatsApp click-to-chat URL with pre-populated message string
 */
export function buildWhatsAppUrl(phone: string = "919876543210", text: string): string {
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodedText}`;
}
