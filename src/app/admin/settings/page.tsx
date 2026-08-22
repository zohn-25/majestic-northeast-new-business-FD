"use client";

import React, { useState } from "react";
import { Settings, ShieldCheck, Key, Bell, Phone, Save, RefreshCw } from "lucide-react";
import { useToast } from "@/components/admin/Toast";

export default function AdminSettingsPage() {
  const { showToast } = useToast();
  const [supportPhone, setSupportPhone] = useState("+91 98765 43210");
  const [supportWhatsApp, setSupportWhatsApp] = useState("919876543210");
  const [leadEmail, setLeadEmail] = useState("bookings@majesticnortheast.com");
  const [enableWhatsAppAlerts, setEnableWhatsAppAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Settings Saved", "Operations contact details updated.", "success");
  };

  return (
    <div className="space-y-5 text-left max-w-4xl">
      
      {/* Top Banner */}
      <div className="bg-[#111318] border border-white/[0.08] rounded-2xl p-4 sm:p-5 space-y-0.5">
        <h2 className="text-lg sm:text-xl font-bold font-display tracking-tight text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-zinc-400" />
          <span>Console & Operations Settings</span>
        </h2>
        <p className="text-xs text-zinc-400">
          Configure emergency dispatch phone lines, WhatsApp routing, and admin notification preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        
        {/* Contact Dispatch Settings */}
        <div className="bg-[#111318] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-zinc-400" />
            <span>Emergency Dispatch & Booking Desk</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-zinc-300">
                Support Telephone Number
              </label>
              <input
                type="text"
                value={supportPhone}
                onChange={(e) => setSupportPhone(e.target.value)}
                className="w-full bg-[#0B0D10] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white/20 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-zinc-300">
                Official WhatsApp Number (With Country Code)
              </label>
              <input
                type="text"
                value={supportWhatsApp}
                onChange={(e) => setSupportWhatsApp(e.target.value)}
                className="w-full bg-[#0B0D10] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white/20 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-zinc-300">
              Operations Lead Email
            </label>
            <input
              type="email"
              value={leadEmail}
              onChange={(e) => setLeadEmail(e.target.value)}
              className="w-full bg-[#0B0D10] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white/20 font-mono"
            />
          </div>
        </div>

        {/* Notifications & System Info */}
        <div className="bg-[#111318] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 flex items-center gap-2">
            <Bell className="w-3.5 h-3.5 text-zinc-400" />
            <span>Notification & State Preferences</span>
          </h3>

          <div className="flex items-center justify-between p-3.5 bg-[#0B0D10] rounded-xl border border-white/[0.06]">
            <div className="space-y-0.5">
              <span className="text-xs font-medium text-white block">
                Instant WhatsApp Booking Notifications
              </span>
              <span className="text-[11px] text-zinc-400 block">
                Generate pre-filled wa.me links for direct customer chat.
              </span>
            </div>
            <input
              type="checkbox"
              checked={enableWhatsAppAlerts}
              onChange={(e) => setEnableWhatsAppAlerts(e.target.checked)}
              className="w-4 h-4 rounded accent-zinc-400 cursor-pointer"
            />
          </div>

          <div className="p-3.5 bg-[#0B0D10] rounded-xl border border-white/[0.06] flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-medium text-white block">
                In-Memory Demo Environment
              </span>
              <span className="text-[11px] text-zinc-400 block">
                Changes persist across client navigations during this session.
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/[0.06] text-zinc-300">
              Demo Active
            </span>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/15 active:scale-95 text-white rounded-xl text-xs font-semibold transition-all border border-white/15 shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </button>
        </div>

      </form>
    </div>
  );
}
