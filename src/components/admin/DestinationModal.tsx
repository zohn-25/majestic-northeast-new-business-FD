"use client";

import React, { useState, useEffect } from "react";
import { X, Save, MapPin } from "lucide-react";
import { Destination } from "@/lib/types";

interface DestinationModalProps {
  isOpen: boolean;
  destination?: Destination | null;
  onClose: () => void;
  onSave: (destination: Destination) => void;
}

export function DestinationModal({ isOpen, destination, onClose, onSave }: DestinationModalProps) {
  const [formData, setFormData] = useState<Partial<Destination>>({
    name: "",
    stateName: "",
    tagline: "",
    coverImage: "",
    overview: "",
    bestTimeToVisit: "October to May",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (destination) {
      setFormData(destination);
    }
    setErrors({});
  }, [destination, isOpen]);

  if (!isOpen || !destination) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name?.trim()) newErrors.name = "State name is required.";
    if (!formData.tagline?.trim()) newErrors.tagline = "Tagline is required.";
    if (!formData.coverImage?.trim()) newErrors.coverImage = "Cover image is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...destination,
      name: formData.name || destination.name,
      stateName: formData.stateName || destination.stateName,
      tagline: formData.tagline || destination.tagline,
      coverImage: formData.coverImage || destination.coverImage,
      overview: formData.overview || destination.overview,
      bestTimeToVisit: formData.bestTimeToVisit || destination.bestTimeToVisit,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#121418] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.9)] space-y-6 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black font-display uppercase tracking-tight text-white">
                Edit Destination: {destination.name}
              </h3>
              <p className="text-[11px] text-white/50">
                Update tourism highlights, ILP info, and cover media.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
                State Name *
              </label>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-red font-medium"
              />
              {errors.name && <p className="text-[10px] text-red-400">{errors.name}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
                Best Season
              </label>
              <input
                type="text"
                value={formData.bestTimeToVisit || ""}
                onChange={(e) => setFormData({ ...formData, bestTimeToVisit: e.target.value })}
                placeholder="e.g. Oct to May"
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-red font-medium"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
              State Tagline *
            </label>
            <input
              type="text"
              value={formData.tagline || ""}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-red font-medium"
            />
            {errors.tagline && <p className="text-[10px] text-red-400">{errors.tagline}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
              Cover Image URL *
            </label>
            <input
              type="text"
              value={formData.coverImage || ""}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-red font-mono"
            />
            {errors.coverImage && <p className="text-[10px] text-red-400">{errors.coverImage}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold font-display uppercase tracking-wider text-white/80">
              State Overview & Guide
            </label>
            <textarea
              rows={3}
              value={formData.overview || ""}
              onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
              className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-red font-medium"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 text-white/80 text-xs font-bold font-display uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white text-xs font-black font-display uppercase tracking-widest flex items-center gap-1.5 shadow-glow-red"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
