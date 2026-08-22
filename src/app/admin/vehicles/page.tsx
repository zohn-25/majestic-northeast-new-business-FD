"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Car, Bike, Plus, Edit, Trash2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { useData } from "@/context/DataContext";
import { Vehicle } from "@/lib/types";
import { DataTable, ColumnDef, FilterOption } from "@/components/admin/DataTable";
import { VehicleModal } from "@/components/admin/VehicleModal";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { useToast } from "@/components/admin/Toast";

export default function AdminVehiclesPage() {
  const { vehicles, addVehicle, updateVehicle, deleteVehicle } = useData();
  const { showToast } = useToast();

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);

  // Filter vehicles by category
  const filteredVehicles = React.useMemo(() => {
    if (activeCategory === "all") return vehicles;
    return vehicles.filter((v) => v.category === activeCategory);
  }, [vehicles, activeCategory]);

  const filterOptions: FilterOption[] = [
    { label: `All Fleet (${vehicles.length})`, value: "all" },
    { label: `4x4 Cars & SUVs (${vehicles.filter((v) => v.category === "car").length})`, value: "car" },
    { label: `Adv Motorcycles (${vehicles.filter((v) => v.category === "bike").length})`, value: "bike" },
  ];

  // Table column definitions
  const columns: ColumnDef<Vehicle>[] = [
    {
      header: "Vehicle Model",
      cell: (v) => (
        <div className="flex items-center gap-3 min-w-[200px]">
          <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
            <Image
              src={v.images[0] || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=300&q=80"}
              alt={v.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="leading-tight">
            <span className="font-bold font-display text-white text-xs block truncate">
              {v.name}
            </span>
            <span className="text-[10px] text-white/50 block font-mono">
              {v.engineCC || v.type}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      cell: (v) => (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-black font-display uppercase tracking-wider border ${
            v.category === "car"
              ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
              : "bg-amber-500/15 text-amber-400 border-amber-500/30"
          }`}
        >
          {v.category === "car" ? <Car className="w-3 h-3" /> : <Bike className="w-3 h-3" />}
          <span>{v.category === "car" ? "4x4 SUV" : "Adv Bike"}</span>
        </span>
      ),
    },
    {
      header: "Specs",
      cell: (v) => (
        <span className="text-xs text-white/70">
          {v.transmission} • {v.fuelType}
        </span>
      ),
    },
    {
      header: "Daily Rate",
      cell: (v) => (
        <div>
          <span className="text-xs font-black font-display text-white block">
            ₹{v.rentalPricePerDay.toLocaleString()}
          </span>
          <span className="text-[10px] text-white/40 block">/ day</span>
        </div>
      ),
    },
    {
      header: "Fleet Units",
      cell: (v) => {
        const available = v.totalUnits - v.bookedUnits;
        return (
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white block">
              {available} / {v.totalUnits} Units
            </span>
            <span
              className={`text-[9px] font-black uppercase tracking-wider block ${
                available > 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {available > 0 ? "Available" : "Fully Booked"}
            </span>
          </div>
        );
      },
    },
  ];

  const handleAddNew = () => {
    setEditingVehicle(null);
    setModalOpen(true);
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setModalOpen(true);
  };

  const handleDeleteClick = (vehicle: Vehicle) => {
    setVehicleToDelete(vehicle);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (vehicleToDelete) {
      deleteVehicle(vehicleToDelete.id);
      showToast("Vehicle Deleted", `${vehicleToDelete.name} has been removed from the fleet.`, "success");
      setDeleteConfirmOpen(false);
      setVehicleToDelete(null);
    }
  };

  const handleSaveVehicle = (savedVehicle: Vehicle) => {
    if (editingVehicle) {
      updateVehicle(savedVehicle.id, savedVehicle);
      showToast("Vehicle Updated", `${savedVehicle.name} specs have been updated.`, "success");
    } else {
      addVehicle(savedVehicle);
      showToast("Vehicle Added", `${savedVehicle.name} added to the rental fleet.`, "success");
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <DataTable<Vehicle>
        title="Fleet Vehicle Inventory"
        subtitle="Manage 4x4 SUVs, Thar rentals, and Royal Enfield Himalayan motorcycles."
        data={filteredVehicles}
        columns={columns}
        searchPlaceholder="Search vehicles by name, engine CC, transmission..."
        searchFilterKeys={["name", "tagline", "engineCC", "type", "transmission"]}
        filterOptions={filterOptions}
        activeFilter={activeCategory}
        onFilterChange={setActiveCategory}
        onAddNew={handleAddNew}
        addNewLabel="Add Vehicle"
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        keyExtractor={(v) => v.id}
        emptyTitle="No vehicles in inventory"
        emptyMessage="Add your first 4x4 Thar, Fortuner, or Himalayan bike to start dispatching."
        renderMobileCard={(v, actions) => (
          <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-white/10">
            <div className="flex items-start gap-3">
              <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-black shrink-0 border border-white/15">
                <Image src={v.images[0]} alt={v.name} fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold font-display text-white truncate">{v.name}</h4>
                <p className="text-[10px] text-white/50">{v.engineCC} • {v.transmission} • {v.fuelType}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-black text-brand-red">₹{v.rentalPricePerDay}/day</span>
                  <span className="text-[10px] text-emerald-400 font-bold">{v.totalUnits - v.bookedUnits} Units Left</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
              {actions.onEdit && (
                <button
                  type="button"
                  onClick={() => actions.onEdit?.(v)}
                  className="px-3 py-1.5 rounded-lg bg-blue-500/15 text-blue-400 text-xs font-bold font-display uppercase tracking-wider flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              )}
              {actions.onDelete && (
                <button
                  type="button"
                  onClick={() => actions.onDelete?.(v)}
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

      {/* Add / Edit Vehicle Modal */}
      <VehicleModal
        isOpen={modalOpen}
        vehicle={editingVehicle}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveVehicle}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        title="Delete Vehicle"
        message={`Are you sure you want to remove "${vehicleToDelete?.name}" from the active fleet? This action updates your local demo session state.`}
        confirmLabel="Delete Vehicle"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirmOpen(false)}
      />
    </div>
  );
}
