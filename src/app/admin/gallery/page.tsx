"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Image as ImageIcon, Upload, Trash2, Filter, AlertCircle, Plus, Eye } from "lucide-react";
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111318] border border-white/[0.08] rounded-2xl p-4 sm:p-5">
        <div className="space-y-0.5">
          <h2 className="text-lg sm:text-xl font-bold font-display tracking-tight text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-zinc-400" />
            <span>Photo Gallery & Media Assets</span>
          </h2>
          <p className="text-xs text-zinc-400">
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
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/10 hover:bg-white/15 active:scale-95 text-white rounded-xl text-xs font-semibold transition-all border border-white/15 shrink-0 shadow-sm"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Photo</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => setActiveCategory(cat.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
              activeCategory === cat.value
                ? "bg-white/15 text-white border-white/20 font-semibold"
                : "bg-white/[0.02] text-zinc-400 border-white/[0.06] hover:border-white/15 hover:text-white"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="bg-[#111318] border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-xl">
        {filteredImages.length === 0 ? (
          <div className="py-14 text-center space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] text-zinc-500 flex items-center justify-center mx-auto">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-white">
              No photos found in this category
            </h3>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-1.5 bg-white/10 text-white rounded-xl text-xs font-medium border border-white/15"
            >
              Upload Photo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
            {filteredImages.map((img) => (
              <div
                key={img.id}
                className="group relative aspect-video sm:aspect-square bg-black/40 rounded-xl overflow-hidden border border-white/[0.08] hover:border-white/25 transition-all shadow-md flex flex-col justify-end"
              >
                <Image
                  src={img.url}
                  alt={img.alt || "Gallery Item"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2.5 flex flex-col justify-between">
                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => setPreviewImage(img)}
                      className="w-7 h-7 rounded-lg bg-black/60 hover:bg-black text-white/80 hover:text-white flex items-center justify-center transition-colors"
                      title="Preview Full Screen"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(img)}
                      className="w-7 h-7 rounded-lg bg-red-600/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                      title="Delete Image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="leading-tight">
                    <span className="text-[11px] font-medium text-white truncate block">
                      {img.entityName}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400 uppercase">
                      {img.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#111318] border border-white/15 rounded-2xl overflow-hidden shadow-2xl p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black">
              <Image
                src={previewImage.url}
                alt={previewImage.alt}
                fill
                className="object-contain"
              />
            </div>
            <div className="p-3 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-semibold text-white">
                  {previewImage.entityName}
                </h4>
                <p className="text-[10px] text-zinc-400 font-mono">
                  Category: {previewImage.category}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        title="Remove Photo"
        message={`Are you sure you want to remove this photo (${imageToDelete?.entityName}) from the gallery?`}
        confirmLabel="Remove Photo"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirmOpen(false)}
      />

    </div>
  );
}
