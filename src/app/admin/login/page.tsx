"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldAlert, ArrowRight, Compass, ShieldCheck, Sparkles, KeyRound } from "lucide-react";
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
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#090A0C] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden text-white font-body selection:bg-brand-red selection:text-white">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Centered Login Card */}
      <div className="relative z-10 w-full max-w-md bg-[#121418]/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          {/* Logo Pill */}
          <div className="inline-flex items-center justify-center h-12 px-5 bg-brand-red rounded-full shadow-lg shadow-brand-red/30 border-2 border-white/80 mb-2">
            <span className="text-sm font-black font-display tracking-wider text-white italic">
              MAJESTIC
            </span>
            <span className="text-[9px] font-bold tracking-widest text-white/90 uppercase ml-1.5 font-body">
              NORTHEAST
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white">
            Expedition Console
          </h1>
          <p className="text-xs text-white/60 font-medium">
            Fleet Operations, Guided Tours & Lead Desk
          </p>
        </div>

        {/* Demo Mode Notice Banner */}
        <div className="flex items-start gap-2.5 bg-brand-red/10 border border-brand-red/20 rounded-xl p-3 text-[11px] text-white/80 leading-relaxed">
          <KeyRound className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
          <span>
            <strong>Frontend Demo Mode:</strong> Pre-filled credentials ready. Click <strong>Log In</strong> to access the management dashboard.
          </span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
              Admin Email
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-white/40 absolute left-3.5 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="admin@majesticnortheast.com"
                className={`w-full bg-black/60 border ${
                  errors.email ? "border-red-500 focus:ring-red-500" : "border-white/15 focus:border-brand-red"
                } rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none transition-colors font-medium`}
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-red-400 font-medium flex items-center gap-1 pt-0.5">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1.5 text-left">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
                Security Key / Password
              </label>
              <span className="text-[10px] text-white/40 font-mono">Demo: any key</span>
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-white/40 absolute left-3.5 pointer-events-none" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                placeholder="••••••••"
                className={`w-full bg-black/60 border ${
                  errors.password ? "border-red-500 focus:ring-red-500" : "border-white/15 focus:border-brand-red"
                } rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none transition-colors font-medium`}
              />
            </div>
            {errors.password && (
              <p className="text-[11px] text-red-400 font-medium flex items-center gap-1 pt-0.5">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.password}</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-brand-red hover:bg-brand-red-hover active:scale-[0.98] text-white rounded-xl text-xs font-black font-display uppercase tracking-widest transition-all shadow-glow-red flex items-center justify-center gap-2 mt-2 disabled:opacity-75 cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Authenticating Console...</span>
              </div>
            ) : (
              <>
                <span>Enter Admin Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Return to live site link */}
        <div className="pt-2 text-center border-t border-white/10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-brand-red transition-colors font-bold font-display uppercase tracking-wider"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>← Back to Public Website</span>
          </Link>
        </div>
      </div>

      {/* Footer copyright note */}
      <div className="relative z-10 mt-6 text-center text-[11px] text-white/40">
        Majestic Northeast Tours & Adventures • Admin Operations System v1.0
      </div>
    </div>
  );
}
