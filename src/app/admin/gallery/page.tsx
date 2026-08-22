"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Image as ImageIcon, Upload, Trash2, Eye } from "lucide-react";
import { useData, GalleryItem } from "@/context/DataContext";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { useToast } from "@/components/admin/Toast";

export default function AdminGalleryPage() {
  const { galleryImages, addGalleryImage, deleteGalleryImage } = useData();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<GalleryItem | null>(null);
  const [previewImage, setPreviewImage] = useState<GalleryItem | null>(null);

  const filteredImages = React.useMemo(() => {
    if (activeCategory === "all") return galleryImages;
    return galleryImages.filter((img) => img.category === activeCategory);
  }, [galleryImages, activeCategory]);

  const categories = [
    { label: `All Photos (${galleryImages.length})`, value: "all" },
    { label: `Fleet Vehicles (${galleryImages.filter((g) => g.category === "vehicle").length})`, value: "vehicle" },
    { label: `Expeditions (${galleryImages.filter((g) => g.category === "tour").length})`, value: "tour" },
    { label: `Destinations (${galleryImages.filter((g) => g.category === "destination").length})`, value: "destination" },
    { label: `Custom Uploads (${galleryImages.filter((g) => g.category === "uploaded" || g.isUploaded).length})`, value: "uploaded" },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      addGalleryImage({
        url: localUrl,
        alt: `${file.name.replace(/\.[^/.]+$/, "")} - Custom Upload`,
        category: "uploaded",
        entityName: "Custom Upload",
      });

      showToast(
        "Photo Uploaded",
        `"${file.name}" added to media library.`,
        "success"
      );

      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDeleteClick = (img: GalleryItem) => {
    setImageToDelete(img);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (imageToDelete) {
      deleteGalleryImage(imageToDelete.id);
      showToast("Photo Removed", `Image has been removed from media library.`, "success");
      setDeleteConfirmOpen(false);
      setImageToDelete(null);
    }
  };

  return (
    <div className="space-y-5 text-left">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#111318] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-xs transition-colors">
        <div className="space-y-0.5">
          <h2 className="text-lg sm:text-xl font-bold font-display tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-slate-500 dark:text-zinc-400" />
            <span>Photo Gallery & Media Assets</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Preview media collected from fleet vehicles, tour packages, destinations, and uploads.
          </p>
        </div>

        {/* Upload Button */}
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/10 dark:hover:bg-white/15 active:scale-95 rounded-xl text-xs font-semibold transition-all border border-slate-700 dark:border-white/15 shrink-0 shadow-xs"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Photo</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => setActiveCategory(cat.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
              activeCategory === cat.value
                ? "bg-slate-900 text-white border-slate-900 dark:bg-white/15 dark:text-white dark:border-white/20 font-semibold shadow-xs"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 dark:bg-white/[0.02] dark:text-zinc-400 dark:border-white/[0.06] dark:hover:border-white/15 dark:hover:text-white"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((img) => (
          <div
            key={img.id}
            className="group relative bg-white dark:bg-[#111318] border border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xs"
          >
            {/* Image Box */}
            <div className="relative h-44 w-full bg-slate-100 dark:bg-black overflow-hidden">
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Hover overlay actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewImage(img)}
                  className="w-8 h-8 rounded-lg bg-black/80 text-white flex items-center justify-center hover:bg-brand-red transition-colors"
                  title="View Full Preview"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteClick(img)}
                  className="w-8 h-8 rounded-lg bg-black/80 text-red-400 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
                  title="Delete Image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Meta Footer */}
            <div className="p-3 space-y-0.5 border-t border-slate-100 dark:border-white/[0.06]">
              <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200 block truncate">
                {img.entityName || img.alt}
              </span>
              <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono uppercase block">
                {img.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white dark:bg-[#111318] border border-slate-200 dark:border-white/15 rounded-2xl overflow-hidden shadow-2xl space-y-3 p-4 animate-scaleUp text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-96 w-full rounded-xl overflow-hidden bg-black">
              <Image
                src={previewImage.url}
                alt={previewImage.alt}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex items-center justify-between px-1">
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {previewImage.entityName || previewImage.alt}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
                  Category: {previewImage.category}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-700 dark:text-zinc-300 text-xs font-medium"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        title="Delete Photo"
        message={`Are you sure you want to remove "${imageToDelete?.entityName || "this image"}" from your media library?`}
        confirmLabel="Delete Photo"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirmOpen(false)}
      />
    </div>
  );
}
