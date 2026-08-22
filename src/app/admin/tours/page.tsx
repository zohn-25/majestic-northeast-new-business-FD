"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, Car, Bike, Plus, Edit, Trash2, Calendar, Users, MapPin, Sparkles } from "lucide-react";
import { useData } from "@/context/DataContext";
import { SharedTour } from "@/lib/types";
import { DataTable, ColumnDef, FilterOption } from "@/components/admin/DataTable";
import { TourModal } from "@/components/admin/TourModal";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { useToast } from "@/components/admin/Toast";

export default function AdminToursPage() {
  const { tours, addTour, updateTour, deleteTour } = useData();
  const { showToast } = useToast();

  const [activeFormat, setActiveFormat] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<SharedTour | null>(null);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [tourToDelete, setTourToDelete] = useState<SharedTour | null>(null);

  const filteredTours = React.useMemo(() => {
    if (activeFormat === "all") return tours;
    return tours.filter((t) => t.tripFormat === activeFormat);
  }, [tours, activeFormat]);

  const filterOptions: FilterOption[] = [
    { label: `All Circuits (${tours.length})`, value: "all" },
    { label: `4x4 Thar Convoys (${tours.filter((t) => t.tripFormat === "car").length})`, value: "car" },
    { label: `Motorcycle Rides (${tours.filter((t) => t.tripFormat === "bike").length})`, value: "bike" },
  ];

  const columns: ColumnDef<SharedTour>[] = [
    {
      header: "Tour Package",
      cell: (t) => (
        <div className="flex items-center gap-3 min-w-[240px]">
          <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
            <Image
              src={t.heroImage || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=300&q=80"}
              alt={t.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="leading-tight">
            <span className="font-bold font-display text-white text-xs block line-clamp-1">
              {t.title}
            </span>
            <span className="text-[10px] text-white/50 block">
              📍 {t.destinationName} • {t.durationDays}D / {t.durationNights}N
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Format",
      cell: (t) => (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-black font-display uppercase tracking-wider border ${t.tripFormat === "car"
              ? "bg-red-500/15 text-brand-red border-brand-red/30"
              : "bg-amber-500/15 text-amber-400 border-amber-500/30"
            }`}
        >
          {t.tripFormat === "car" ? <Car className="w-3 h-3" /> : <Bike className="w-3 h-3" />}
          <span>{t.tripFormat === "car" ? "4x4 Convoy" : "Bike Tour"}</span>
        </span>
      ),
    },
    {
      header: "Vehicle Used",
      cell: (t) => (
        <span className="text-xs text-white/80 font-medium">
          {t.vehicleProvided}
        </span>
      ),
    },
    {
      header: "Price / Person",
      cell: (t) => (
        <div>
          <span className="text-xs font-black font-display text-white block">
            ₹{t.pricePerPerson.toLocaleString()}
          </span>
          <span className="text-[10px] text-white/40 block">/ guest</span>
        </div>
      ),
    },
    {
      header: "Seat Capacity",
      cell: (t) => {
        const remaining = t.totalSeats - t.seatsBooked;
        return (
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white block">
              {remaining} / {t.totalSeats} Available
            </span>
            <span
              className={`text-[9px] font-black uppercase tracking-wider block ${remaining <= 3 ? "text-amber-400" : "text-emerald-400"
                }`}
            >
              {remaining <= 3 ? "Few Seats Left" : "Filling Fast"}
            </span>
          </div>
        );
      },
    },
    {
      header: "Manifest & Batches",
      cell: (t) => (
        <Link
          href="/admin/batches"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold font-display uppercase tracking-wider transition-colors"
        >
          <Users className="w-3 h-3" />
          <span>Roster</span>
        </Link>
      ),
    },
  ];

  const handleAddNew = () => {
    setEditingTour(null);
    setModalOpen(true);
  };

  const handleEdit = (tour: SharedTour) => {
    setEditingTour(tour);
    setModalOpen(true);
  };

  const handleDeleteClick = (tour: SharedTour) => {
    setTourToDelete(tour);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (tourToDelete) {
      deleteTour(tourToDelete.id);
      showToast("Tour Deleted", `${tourToDelete.title} has been removed.`, "success");
      setDeleteConfirmOpen(false);
      setTourToDelete(null);
    }
  };

  const handleSaveTour = (savedTour: SharedTour) => {
    if (editingTour) {
      updateTour(savedTour.id, savedTour);
      showToast("Tour Updated", `${savedTour.title} itinerary updated.`, "success");
    } else {
      addTour(savedTour);
      showToast("Tour Published", `${savedTour.title} added to live catalog.`, "success");
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <DataTable<SharedTour>
        title="Guided Tour Packages & Convoys"
        subtitle="Manage all-inclusive 4x4 SUV road trips and Royal Enfield motorcycle expeditions."
        data={filteredTours}
        columns={columns}
        searchPlaceholder="Search tours by route, title, vehicle, destination..."
        searchFilterKeys={["title", "route", "destinationName", "vehicleProvided"]}
        filterOptions={filterOptions}
        activeFilter={activeFormat}
        onFilterChange={setActiveFormat}
        onAddNew={handleAddNew}
        addNewLabel="Create Tour"
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        keyExtractor={(t) => t.id}
        emptyTitle="No tour packages found"
        emptyMessage="Create your first 4x4 convoy or motorcycle mountain circuit to start taking bookings."
        renderMobileCard={(t, actions) => (
          <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-white/10">
            <div className="flex items-start gap-3">
              <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-black shrink-0 border border-white/15">
                <Image src={t.heroImage} alt={t.title} fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold font-display text-white line-clamp-1">{t.title}</h4>
                <p className="text-[10px] text-white/50">📍 {t.destinationName} • {t.durationDays}D/{t.durationNights}N</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-black text-brand-red">₹{t.pricePerPerson}/guest</span>
                  <span className="text-[10px] text-emerald-400 font-bold">{t.totalSeats - t.seatsBooked} Seats Left</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
              {actions.onEdit && (
                <button
                  type="button"
                  onClick={() => actions.onEdit?.(t)}
                  className="px-3 py-1.5 rounded-lg bg-blue-500/15 text-blue-400 text-xs font-bold font-display uppercase tracking-wider flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              )}
              {actions.onDelete && (
                <button
                  type="button"
                  onClick={() => actions.onDelete?.(t)}
                  className="px-3 py-1.5 rounded-lg bg-red-500/15 text-red-400 text-xs font-bold font-display uppercase tracking-wider flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              )}
            </div>
          </div>
        )}
      />

      {/* Tour Add / Edit Modal */}
      <TourModal
        isOpen={modalOpen}
        tour={editingTour}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveTour}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        title="Delete Tour Package"
        message={`Are you sure you want to remove "${tourToDelete?.title}"? This will immediately remove it from the public departures list in this demo session.`}
        confirmLabel="Delete Tour"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirmOpen(false)}
      />
    </div>
  );
}
