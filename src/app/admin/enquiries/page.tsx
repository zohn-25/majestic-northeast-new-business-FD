"use client";

import React, { useState } from "react";
import { MessageSquareText, Phone, Mail, MessageCircle, Calendar, Trash2, Eye, ExternalLink, CheckCircle2 } from "lucide-react";
import { useData } from "@/context/DataContext";
import { Enquiry, EnquiryStatus } from "@/lib/types";
import { DataTable, ColumnDef, FilterOption } from "@/components/admin/DataTable";
import { EnquiryDetailModal } from "@/components/admin/EnquiryDetailModal";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { useToast } from "@/components/admin/Toast";
import { buildWhatsAppUrl } from "@/lib/utils";

export default function AdminEnquiriesPage() {
  const { enquiries, updateEnquiryStatus, deleteEnquiry } = useData();
  const { showToast } = useToast();

  const [activeStatusFilter, setActiveStatusFilter] = useState<string>("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [enquiryToDelete, setEnquiryToDelete] = useState<Enquiry | null>(null);

  const filteredEnquiries = React.useMemo(() => {
    if (activeStatusFilter === "all") return enquiries;
    return enquiries.filter((e) => e.status === activeStatusFilter);
  }, [enquiries, activeStatusFilter]);

  const filterOptions: FilterOption[] = [
    { label: `All Leads (${enquiries.length})`, value: "all" },
    { label: `New (${enquiries.filter((e) => e.status === "New").length})`, value: "New" },
    { label: `Contacted (${enquiries.filter((e) => e.status === "Contacted").length})`, value: "Contacted" },
    { label: `Confirmed (${enquiries.filter((e) => e.status === "Confirmed").length})`, value: "Confirmed" },
    { label: `Cancelled (${enquiries.filter((e) => e.status === "Cancelled").length})`, value: "Cancelled" },
  ];

  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case "New":
        return "bg-brand-red/20 text-brand-red border-brand-red/40";
      case "Contacted":
        return "bg-amber-500/20 text-amber-400 border-amber-500/40";
      case "Confirmed":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";
      case "Cancelled":
        return "bg-gray-500/20 text-gray-400 border-gray-500/40";
    }
  };

  const columns: ColumnDef<Enquiry>[] = [
    {
      header: "Guest Name & Contact",
      cell: (e) => (
        <div className="space-y-0.5 min-w-[180px]">
          <span className="font-bold font-display text-white text-xs block">
            {e.customerName}
          </span>
          <div className="flex items-center gap-2 text-[10px] text-white/50">
            <span>{e.phone}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Type",
      cell: (e) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-black font-display uppercase tracking-wider border ${e.type === "tour"
              ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
              : "bg-blue-500/15 text-blue-400 border-blue-500/30"
            }`}
        >
          {e.type === "tour" ? "Tour Package" : "Vehicle Rental"}
        </span>
      ),
    },
    {
      header: "Requested Circuit / Vehicle",
      cell: (e) => (
        <div className="min-w-[200px]">
          <span className="text-xs font-bold text-white/90 block truncate">
            {e.relatedItemName}
          </span>
          <span className="text-[10px] text-white/40 block">
            📅 {e.preferredBatch || (e.startDate ? `${e.startDate} to ${e.endDate}` : "Flexible")}
          </span>
        </div>
      ),
    },
    {
      header: "Date",
      cell: (e) => (
        <span className="text-[11px] text-white/60 font-mono">
          {e.submittedDate}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (e) => (
        <select
          value={e.status}
          onChange={(event) => {
            const newSt = event.target.value as EnquiryStatus;
            updateEnquiryStatus(e.id, newSt);
            showToast("Status Updated", `Lead #${e.id} marked as ${newSt}.`, "info");
          }}
          onClick={(event) => event.stopPropagation()}
          className={`text-[10px] font-black font-display uppercase tracking-wider rounded-lg px-2.5 py-1 border bg-black/60 cursor-pointer focus:outline-none ${getStatusBadge(
            e.status
          )}`}
        >
          <option value="New" className="bg-[#121418] text-white">New</option>
          <option value="Contacted" className="bg-[#121418] text-amber-400">Contacted</option>
          <option value="Confirmed" className="bg-[#121418] text-emerald-400">Confirmed</option>
          <option value="Cancelled" className="bg-[#121418] text-gray-400">Cancelled</option>
        </select>
      ),
    },
  ];

  const handleView = (e: Enquiry) => {
    setSelectedEnquiry(e);
    setDetailModalOpen(true);
  };

  const handleDeleteClick = (e: Enquiry) => {
    setEnquiryToDelete(e);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (enquiryToDelete) {
      deleteEnquiry(enquiryToDelete.id);
      showToast("Enquiry Removed", `Lead from ${enquiryToDelete.customerName} has been deleted.`, "success");
      setDeleteConfirmOpen(false);
      setDetailModalOpen(false);
      setEnquiryToDelete(null);
    }
  };

  const handleStatusChangeFromModal = (id: string, status: EnquiryStatus) => {
    updateEnquiryStatus(id, status);
    if (selectedEnquiry) {
      setSelectedEnquiry({ ...selectedEnquiry, status });
    }
    showToast("Status Changed", `Lead marked as ${status}.`, "success");
  };

  return (
    <div className="space-y-6">
      <DataTable<Enquiry>
        title="Guest Enquiries & Booking Leads"
        subtitle="Manage client booking requests, follow-ups, telephone calls, and WhatsApp dispatches."
        data={filteredEnquiries}
        columns={columns}
        searchPlaceholder="Search leads by guest name, phone, email, vehicle, circuit..."
        searchFilterKeys={["customerName", "phone", "email", "relatedItemName", "message"]}
        filterOptions={filterOptions}
        activeFilter={activeStatusFilter}
        onFilterChange={setActiveStatusFilter}
        onView={handleView}
        onDelete={handleDeleteClick}
        keyExtractor={(e) => e.id}
        emptyTitle="No enquiries found"
        emptyMessage="Guest booking requests submitted from the live website will appear here."
        renderMobileCard={(e, actions) => (
          <div
            onClick={() => handleView(e)}
            className="space-y-2.5 bg-black/40 p-4 rounded-xl border border-white/10 cursor-pointer active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black font-display text-white">{e.customerName}</span>
              <span
                className={`text-[9px] font-black font-display uppercase tracking-wider px-2 py-0.5 rounded-md border ${e.type === "tour"
                    ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                    : "bg-blue-500/15 text-blue-400 border-blue-500/30"
                  }`}
              >
                {e.type === "tour" ? "Tour" : "Rental"}
              </span>
            </div>

            <p className="text-xs text-white/80 font-bold truncate">{e.relatedItemName}</p>

            <div className="flex items-center justify-between text-[10px] text-white/50 pt-1">
              <span>{e.phone}</span>
              <span>{e.submittedDate}</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10" onClick={(ev) => ev.stopPropagation()}>
              <select
                value={e.status}
                onChange={(event) => {
                  updateEnquiryStatus(e.id, event.target.value as EnquiryStatus);
                  showToast("Status Updated", `Lead status changed to ${event.target.value}`, "info");
                }}
                className={`text-[10px] font-black font-display uppercase rounded-md px-2 py-1 border bg-black/60 ${getStatusBadge(
                  e.status
                )}`}
              >
                <option value="New" className="bg-[#121418] text-white">New</option>
                <option value="Contacted" className="bg-[#121418] text-amber-400">Contacted</option>
                <option value="Confirmed" className="bg-[#121418] text-emerald-400">Confirmed</option>
                <option value="Cancelled" className="bg-[#121418] text-gray-400">Cancelled</option>
              </select>

              <button
                type="button"
                onClick={() => handleView(e)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold font-display uppercase tracking-wider rounded-lg"
              >
                View Details
              </button>
            </div>
          </div>
        )}
      />

      {/* Enquiry Detail Modal */}
      <EnquiryDetailModal
        isOpen={detailModalOpen}
        enquiry={selectedEnquiry}
        onClose={() => setDetailModalOpen(false)}
        onStatusChange={handleStatusChangeFromModal}
        onDelete={handleDeleteClick}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        title="Delete Lead Record"
        message={`Are you sure you want to remove the enquiry from "${enquiryToDelete?.customerName}"?`}
        confirmLabel="Delete Lead"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirmOpen(false)}
      />
    </div>
  );
}
