"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Image as ImageIcon, Upload, Trash2, Filter, Sparkles, AlertCircle, Plus, Eye } from "lucide-react";
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
    { label: `Expedition Tours (${galleryImages.filter((g) => g.category === "tour").length})`, value: "tour" },
    { label: `Destinations (${galleryImages.filter((g) => g.category === "destination").length})`, value: "destination" },
    { label: `Uploaded Photos (${galleryImages.filter((g) => g.category === "uploaded" || g.isUploaded).length})`, value: "uploaded" },
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
        `"${file.name}" has been added to the media library locally.`,
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
    <div className="space-y-6 text-left">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121418] border border-white/10 rounded-2xl p-5 shadow-lg">
        <div className="space-y-0.5">
          <h2 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-brand-red" />
            <span>Expedition Photo Gallery & Media</span>
          </h2>
          <p className="text-xs text-white/60 font-medium">
            Manage high-resolution scenery, vehicle fleet shots, and mountain convoy photos.
          </p>
        </div>

        {/* Upload Action */}
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
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-red hover:bg-brand-red-hover active:scale-95 text-white rounded-xl text-xs font-black font-display uppercase tracking-wider transition-all shadow-glow-red"
          >
            <Upload className="w-4 h-4" />
            <span>Upload New Photo</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => setActiveCategory(cat.value)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-display uppercase tracking-wider whitespace-nowrap transition-all border ${
              activeCategory === cat.value
                ? "bg-brand-red text-white border-brand-red shadow-md"
                : "bg-[#121418] text-white/70 border-white/10 hover:border-white/20 hover:text-white"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filteredImages.length === 0 ? (
        <div className="bg-[#121418] border border-white/10 rounded-2xl p-16 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-white/40 flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-black font-display uppercase text-white">
              No images in this category
            </h3>
            <p className="text-xs text-white/60">
              Upload an image or select another category filter above.
            </p>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-red text-white rounded-xl text-xs font-bold font-display uppercase tracking-wider shadow-md"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Photo</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((img) => {
            const isBlob = img.url.startsWith("blob:");

            return (
              <div
                key={img.id}
                className="bg-[#121418] border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden shadow-lg group flex flex-col justify-between transition-all"
              >
                {/* Image Container with Fixed Aspect Ratio */}
                <div className="relative aspect-[16/11] w-full bg-black overflow-hidden">
                  {isBlob ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}

                  {/* Category Pill Tag */}
                  <div className="absolute top-2.5 left-2.5">
                    <span
                      className={`text-[9px] font-black font-display uppercase tracking-wider px-2 py-0.5 rounded-md border shadow-md backdrop-blur-md ${
                        img.category === "vehicle"
                          ? "bg-blue-600/80 text-white border-blue-400/40"
                          : img.category === "tour"
                          ? "bg-amber-600/80 text-white border-amber-400/40"
                          : img.category === "uploaded"
                          ? "bg-emerald-600/80 text-white border-emerald-400/40"
                          : "bg-purple-600/80 text-white border-purple-400/40"
                      }`}
                    >
                      {img.category}
                    </span>
                  </div>

                  {/* Actions Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                    <button
                      type="button"
                      onClick={() => setPreviewImage(img)}
                      className="p-2 rounded-xl bg-white/20 hover:bg-white text-white hover:text-black transition-colors"
                      title="View Full Size"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(img)}
                      className="p-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white transition-colors"
                      title="Delete Image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="p-3 space-y-0.5 border-t border-white/5 bg-black/20">
                  <span className="text-xs font-bold font-display text-white block truncate">
                    {img.entityName}
                  </span>
                  <span className="text-[10px] text-white/40 block truncate">
                    {img.alt}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Full Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#121418] border border-white/20 rounded-3xl overflow-hidden shadow-2xl space-y-3 p-4 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div>
                <h3 className="text-sm font-bold font-display text-white">{previewImage.entityName}</h3>
                <p className="text-[11px] text-white/50">{previewImage.alt}</p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="p-1.5 rounded-lg bg-white/10 text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-[16/10] w-full bg-black rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewImage.url} alt={previewImage.alt} className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        title="Delete Photo"
        message={`Are you sure you want to remove this photo (${imageToDelete?.entityName}) from the active media library?`}
        confirmLabel="Delete Photo"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirmOpen(false)}
      />
    </div>
  );
}
