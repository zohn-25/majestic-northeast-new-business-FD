"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (title: string, message?: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    (title: string, message?: string, type: ToastType = "success") => {
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newToast: ToastMessage = { id, title, message, type };

      setToasts((prev) => [...prev, newToast]);

      // Auto dismiss after 3.5s
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Pinned Toast Container */}
      <div className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => {
          const isSuccess = toast.type === "success";
          const isError = toast.type === "error";

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start justify-between gap-3 p-4 rounded-2xl border shadow-[0_15px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-slideInRight ${
                isSuccess
                  ? "bg-[#0E1B14]/95 border-emerald-500/40 text-white"
                  : isError
                  ? "bg-[#220D0E]/95 border-red-500/40 text-white"
                  : "bg-[#121418]/95 border-white/20 text-white"
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    isSuccess
                      ? "bg-emerald-500/20 text-emerald-400"
                      : isError
                      ? "bg-red-500/20 text-red-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {isSuccess ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isError ? (
                    <AlertCircle className="w-4 h-4" />
                  ) : (
                    <Info className="w-4 h-4" />
                  )}
                </div>

                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-xs font-black font-display uppercase tracking-wide">
                    {toast.title}
                  </h4>
                  {toast.message && (
                    <p className="text-[11px] text-white/70 leading-tight">
                      {toast.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-white/40 hover:text-white transition-colors shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
