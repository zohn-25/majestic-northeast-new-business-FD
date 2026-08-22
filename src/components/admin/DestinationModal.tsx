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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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
        className="w-full max-w-xl bg-[#111318] border border-white/[0.12] rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5 my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] text-zinc-300 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-white">
                Edit Destination: {destination.name}
              </h3>
              <p className="text-[11px] text-zinc-400">
                Update highlights, best season, and cover image.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-zinc-300">
                State Name *
              </label>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#0B0D10] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white/20"
              />
              {errors.name && <p className="text-[10px] text-red-400">{errors.name}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-zinc-300">
                Best Season
              </label>
              <input
                type="text"
                value={formData.bestTimeToVisit || ""}
                onChange={(e) => setFormData({ ...formData, bestTimeToVisit: e.target.value })}
                placeholder="e.g. Oct to May"
                className="w-full bg-[#0B0D10] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white/20"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-zinc-300">
              State Tagline *
            </label>
            <input
              type="text"
              value={formData.tagline || ""}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full bg-[#0B0D10] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white/20"
            />
            {errors.tagline && <p className="text-[10px] text-red-400">{errors.tagline}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-zinc-300">
              Cover Image URL *
            </label>
            <input
              type="url"
              value={formData.coverImage || ""}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              className="w-full bg-[#0B0D10] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white/20 font-mono"
            />
            {errors.coverImage && <p className="text-[10px] text-red-400">{errors.coverImage}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-zinc-300">
              Overview Description *
            </label>
            <textarea
              rows={3}
              value={formData.overview || ""}
              onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
              className="w-full bg-[#0B0D10] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white/20"
            />
            {errors.overview && <p className="text-[10px] text-red-400">{errors.overview}</p>}
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 text-xs font-medium transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/15 flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Update Destination</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
