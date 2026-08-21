import React from "react";

export function VehicleCardSkeleton() {
  return (
    <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden animate-pulse">
      <div className="h-56 bg-white/5 w-full relative" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-white/5 rounded w-3/4" />
        <div className="h-4 bg-white/5 rounded w-1/2" />
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="h-10 bg-white/5 rounded-xl" />
          <div className="h-10 bg-white/5 rounded-xl" />
          <div className="h-10 bg-white/5 rounded-xl" />
        </div>
        <div className="pt-4 border-t border-brand-border flex items-center justify-between">
          <div className="h-6 bg-white/5 rounded w-1/3" />
          <div className="h-10 bg-white/5 rounded-xl w-28" />
        </div>
      </div>
    </div>
  );
}

export function TourCardSkeleton() {
  return (
    <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden animate-pulse">
      <div className="h-56 bg-white/5 w-full relative" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-white/5 rounded w-4/5" />
        <div className="h-4 bg-white/5 rounded w-2/3" />
        <div className="space-y-2 py-2">
          <div className="h-3 bg-white/5 rounded w-full" />
          <div className="h-3 bg-white/5 rounded w-5/6" />
        </div>
        <div className="pt-4 border-t border-brand-border flex items-center justify-between">
          <div className="h-6 bg-white/5 rounded w-1/3" />
          <div className="h-10 bg-white/5 rounded-xl w-32" />
        </div>
      </div>
    </div>
  );
}

export function DestinationCardSkeleton() {
  return (
    <div className="h-80 rounded-2xl bg-white/5 animate-pulse w-full overflow-hidden" />
  );
}
