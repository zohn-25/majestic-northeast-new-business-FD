"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, KeyRound } from "lucide-react";
import { useData } from "@/context/DataContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginAdmin } = useData();
  const [email, setEmail] = useState("admin@majesticnortheast.com");
  const [password, setPassword] = useState("majestic2026");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Admin email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    loginAdmin();

    // Simulate swift login redirect
    setTimeout(() => {
      router.push("/admin");
    }, 350);
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] flex flex-col items-center justify-center p-4 sm:p-6 relative text-zinc-100 font-body">
      {/* Centered Login Card */}
      <div className="w-full max-w-md bg-[#111318] border border-white/[0.12] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/15 mb-2">
            <span className="text-sm font-black font-display text-white">M</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold font-display text-white">
            Operations Console
          </h1>
          <p className="text-xs text-zinc-400">
            Sign in to manage fleet inventory, group batches & bookings.
          </p>
        </div>

        {/* Demo Mode Notice Banner */}
        <div className="flex items-start gap-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl p-3 text-xs text-zinc-300 leading-relaxed">
          <KeyRound className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
          <span>
            <strong>Frontend Demo:</strong> Pre-filled credentials ready. Click <strong>Sign In</strong> to enter the console.
          </span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Email Field */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-zinc-300">
              Admin Email
            </label>
            <div className="relative flex items-center">
              <Mail className="w-3.5 h-3.5 text-zinc-500 absolute left-3 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="admin@majesticnortheast.com"
                className={`w-full bg-[#0B0D10] border ${
                  errors.email ? "border-red-500" : "border-white/[0.08] focus:border-white/25"
                } rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors font-mono`}
              />
            </div>
            {errors.email && <p className="text-[10px] text-red-400">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium text-zinc-300">
                Password
              </label>
              <span className="text-[10px] text-zinc-500 font-mono">Demo: majestic2026</span>
            </div>
            <div className="relative flex items-center">
              <Lock className="w-3.5 h-3.5 text-zinc-500 absolute left-3 pointer-events-none" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                placeholder="••••••••••••"
                className={`w-full bg-[#0B0D10] border ${
                  errors.password ? "border-red-500" : "border-white/[0.08] focus:border-white/25"
                } rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors font-mono`}
              />
            </div>
            {errors.password && <p className="text-[10px] text-red-400">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-white/10 hover:bg-white/20 active:scale-[0.99] text-white rounded-xl text-xs font-semibold transition-all border border-white/15 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="pt-2 text-center border-t border-white/[0.06]">
          <Link
            href="/"
            className="text-xs text-zinc-400 hover:text-white transition-colors"
          >
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
