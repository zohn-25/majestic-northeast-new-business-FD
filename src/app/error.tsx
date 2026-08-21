"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-brand-dark text-white flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-brand-card border border-white/10 rounded-3xl p-8 space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-brand-orange/20 text-brand-orange border border-brand-orange/40 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-display text-white">Something went wrong!</h2>
          <p className="text-xs text-gray-400 font-light leading-relaxed">
            {error.message || "An unexpected error occurred while loading this page."}
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-orange/30"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>

          <Link
            href="/"
            className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-brand-orange" />
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
