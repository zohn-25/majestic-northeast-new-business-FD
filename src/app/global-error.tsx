"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0B0D10] text-white min-h-screen flex items-center justify-center p-6 text-center font-sans">
        <div className="max-w-md w-full bg-[#171C26] border border-white/10 rounded-3xl p-8 space-y-6 shadow-2xl">
          <h2 className="text-2xl font-bold">Something went wrong!</h2>
          <p className="text-xs text-gray-400">
            {error.message || "A global application error occurred."}
          </p>
          <button
            onClick={() => reset()}
            className="w-full py-3 rounded-xl bg-[#F9572A] text-white text-xs font-bold uppercase tracking-wider"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
