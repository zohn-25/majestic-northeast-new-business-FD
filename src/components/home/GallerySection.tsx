"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SectionHeading } from "../ui/SectionHeading";
import { Maximize2, X } from "lucide-react";

const GALLERY_IMAGES = [
  {
    id: "g1",
    url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    caption: "Cherrapunji Waterfalls, Meghalaya",
    category: "Landscapes",
  },
  {
    id: "g2",
    url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    caption: "Thar 4x4 Convoy, Sela Pass Arunachal",
    category: "4x4 Trips",
  },
  {
    id: "g3",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    caption: "Dawki Crystal River, Umngot",
    category: "Landscapes",
  },
  {
    id: "g4",
    url: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
    caption: "Royal Enfield Himalayan 450 Ride",
    category: "Bike Trips",
  },
  {
    id: "g5",
    url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    caption: "Small Group Batch at Kaziranga",
    category: "4x4 Trips",
  },
  {
    id: "g6",
    url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    caption: "Snow Peaks of Gurudongmar, Sikkim",
    category: "Landscapes",
  },
];

const CATEGORIES = ["All", "4x4 Trips", "Bike Trips", "Landscapes"];

export function GallerySection() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const filtered = activeTab === "All"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeTab);

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#0B0C0E] border-t border-gray-200 dark:border-white/10 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          tag="Visual Showcase"
          title="EXPEDITIONS IN MOTION"
          subtitle="Explore candid moments from our 4x4 car convoys and motorcycle adventure tours across Northeast India."
        />

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all font-display ${
                activeTab === cat
                  ? "bg-brand-red text-white shadow-md shadow-brand-red/30"
                  : "bg-white dark:bg-white/5 text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/10 shadow-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedImg(img.url)}
              className="card-dark group relative h-72 rounded-2xl overflow-hidden cursor-pointer"
            >
              <Image
                src={img.url}
                alt={img.caption}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between font-display w-full">
                  {img.caption}
                  <Maximize2 className="w-4 h-4 text-brand-red shrink-0" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div
          onClick={() => setSelectedImg(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
        >
          <button
            onClick={() => setSelectedImg(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-brand-red transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-4xl w-full h-[80vh]">
            <Image
              src={selectedImg}
              alt="Gallery Lightbox"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
