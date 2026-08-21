import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  onReset?: () => void;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = "No matches found",
  message = "Try adjusting your filters or search terms to find available expeditions.",
  onReset,
  actionLabel = "Reset Filters",
  onAction,
}: EmptyStateProps) {
  const handleAction = onAction || onReset;

  return (
    <div className="card-dark border border-white/15 rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto my-8">
      <div className="w-14 h-14 rounded-full bg-brand-red/15 border border-brand-red/30 text-brand-red flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-black font-display text-white mb-2 uppercase">{title}</h3>
      <p className="text-white/70 text-xs sm:text-sm mb-6 leading-relaxed font-normal">{message}</p>
      {handleAction && (
        <button
          onClick={handleAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-brand-red hover:bg-brand-red-hover text-white text-xs font-black font-display uppercase tracking-wider transition-colors shadow-md"
        >
          <RefreshCw className="w-4 h-4" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
