"use client";

import React, { useState } from "react";
import { Settings, ShieldCheck, Key, Bell, Phone, Save, Sparkles, RefreshCw } from "lucide-react";
import { useToast } from "@/components/admin/Toast";

export default function AdminSettingsPage() {
  const { showToast } = useToast();
  const [supportPhone, setSupportPhone] = useState("+91 98765 43210");
  const [supportWhatsApp, setSupportWhatsApp] = useState("919876543210");
  const [leadEmail, setLeadEmail] = useState("bookings@majesticnortheast.com");
  const [enableWhatsAppAlerts, setEnableWhatsAppAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Settings Saved", "Operations contact details updated successfully.", "success");
  };

  return (
    <div className="space-y-6 text-left max-w-4xl">
      
      {/* Top Banner */}
      <div className="bg-[#121418] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-lg space-y-1">
        <h2 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-brand-red" />
          <span>Console & Operations Settings</span>
        </h2>
        <p className="text-xs text-white/60 font-medium">
          Configure emergency dispatch phone lines, WhatsApp routing, and admin notification preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Contact Dispatch Settings */}
        <div className="bg-[#121418] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-black font-display uppercase tracking-wider text-white flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Emergency Dispatch & Booking Desk</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
                Support Telephone Number
              </label>
              <input
                type="text"
                value={supportPhone}
                onChange={(e) => setSupportPhone(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-red font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
                Official WhatsApp Number (Country Code)
              </label>
              <input
                type="text"
                value={supportWhatsApp}
                onChange={(e) => setSupportWhatsApp(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-red font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
              Operations Lead Email
            </label>
            <input
              type="email"
              value={leadEmail}
              onChange={(e) => setLeadEmail(e.target.value)}
              className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-red font-mono"
            />
          </div>
        </div>

        {/* Lead Notification Preferences */}
        <div className="bg-[#121418] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-black font-display uppercase tracking-wider text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-400" />
            <span>Lead Notifications & Dispatch</span>
          </h3>

          <div className="flex items-center justify-between p-3.5 bg-black/40 rounded-xl border border-white/10">
            <div className="space-y-0.5">
              <span className="text-xs font-bold font-display text-white block">
                Instant WhatsApp Booking Alerts
              </span>
              <span className="text-[11px] text-white/50 block">
                Automatically generate wa.me deep links with customer enquiry specs.
              </span>
            </div>
            <input
              type="checkbox"
              checked={enableWhatsAppAlerts}
              onChange={(e) => setEnableWhatsAppAlerts(e.target.checked)}
              className="w-4 h-4 rounded accent-brand-red cursor-pointer"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-brand-red hover:bg-brand-red-hover active:scale-95 text-white rounded-xl text-xs font-black font-display uppercase tracking-widest transition-all shadow-glow-red flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>

      </form>
    </div>
  );
}
