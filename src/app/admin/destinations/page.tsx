"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Edit, Sparkles, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useData } from "@/context/DataContext";
import { Destination } from "@/lib/types";
import { DataTable, ColumnDef } from "@/components/admin/DataTable";
import { DestinationModal } from "@/components/admin/DestinationModal";
import { useToast } from "@/components/admin/Toast";

export default function AdminDestinationsPage() {
  const { destinations, updateDestination } = useData();
  const { showToast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingDest, setEditingDest] = useState<Destination | null>(null);

  const columns: ColumnDef<Destination>[] = [
    {
      header: "State & Circuit",
      cell: (d) => (
        <div className="flex items-center gap-3 min-w-[220px]">
          <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
            <Image
              src={d.coverImage}
              alt={d.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="leading-tight">
            <span className="font-bold font-display text-white text-xs block">
              {d.name}
            </span>
            <span className="text-[10px] text-white/50 block line-clamp-1">
              {d.tagline}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Best Season",
      cell: (d) => (
        <span className="text-xs text-white/80 font-medium">
          {d.bestTimeToVisit}
        </span>
      ),
    },
    {
      header: "Key Places & Circuits",
      cell: (d) => (
        <span className="text-xs text-white/60">
          {d.popularPlaces?.length || 4} Featured Spots
        </span>
      ),
    },
    {
      header: "Public Link",
      cell: (d) => (
        <Link
          href={`/destinations/${d.slug}`}
          target="_blank"
          className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-red hover:underline"
        >
          <span>View Guide</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      ),
    },
  ];

  const handleEdit = (d: Destination) => {
    setEditingDest(d);
    setModalOpen(true);
  };

  const handleSave = (savedDest: Destination) => {
    updateDestination(savedDest.id, savedDest);
    showToast("Destination Updated", `${savedDest.name} travel guide updated.`, "success");
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <DataTable<Destination>
        title="Northeast Destinations & State Guides"
        subtitle="Manage information for the 8 Sister States, permit guides, and scenic hotspots."
        data={destinations}
        columns={columns}
        searchPlaceholder="Search destinations by state name, tagline..."
        searchFilterKeys={["name", "stateName", "tagline", "overview"]}
        onEdit={handleEdit}
        keyExtractor={(d) => d.id}
        emptyTitle="No destinations found"
      />

      <DestinationModal
        isOpen={modalOpen}
        destination={editingDest}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
