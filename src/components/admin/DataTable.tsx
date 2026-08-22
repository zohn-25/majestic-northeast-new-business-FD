"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Filter,
  AlertCircle,
  MoreVertical,
} from "lucide-react";

export interface ColumnDef<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

export interface FilterOption {
  label: string;
  value: string;
}

interface DataTableProps<T> {
  title: string;
  subtitle?: string;
  data: T[];
  columns: ColumnDef<T>[];
  searchPlaceholder?: string;
  searchFilterKeys?: (keyof T)[];
  filterOptions?: FilterOption[];
  activeFilter?: string;
  onFilterChange?: (val: string) => void;
  onAddNew?: () => void;
  addNewLabel?: string;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  emptyTitle?: string;
  emptyMessage?: string;
  keyExtractor: (item: T) => string;
  renderMobileCard?: (
    item: T,
    actions: {
      onEdit?: (item: T) => void;
      onDelete?: (item: T) => void;
      onView?: (item: T) => void;
    }
  ) => React.ReactNode;
}

export function DataTable<T extends Record<string, any>>({
  title,
  subtitle,
  data,
  columns,
  searchPlaceholder = "Search records...",
  searchFilterKeys,
  filterOptions,
  activeFilter,
  onFilterChange,
  onAddNew,
  addNewLabel = "Add New",
  onEdit,
  onDelete,
  onView,
  emptyTitle = "No records found",
  emptyMessage = "There are currently no entries to display.",
  keyExtractor,
  renderMobileCard,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter & Search computation
  const filteredData = useMemo(() => {
    let result = [...data];

    // Search query filter
    if (searchQuery.trim() && searchFilterKeys?.length) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((item) =>
        searchFilterKeys.some((k) => {
          const val = item[k];
          if (typeof val === "string") return val.toLowerCase().includes(q);
          if (typeof val === "number") return val.toString().includes(q);
          if (Array.isArray(val))
            return val.some(
              (v: unknown) => typeof v === "string" && v.toLowerCase().includes(q)
            );
          return false;
        })
      );
    }

    return result;
  }, [data, searchQuery, searchFilterKeys]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  return (
    <div className="space-y-4 text-left">
      {/* Top Header & Search Bar Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#111318] border border-white/[0.08] rounded-2xl p-4 sm:p-5">
        {/* Title & Subtitle */}
        <div className="space-y-0.5">
          <h2 className="text-lg sm:text-xl font-bold font-display tracking-tight text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-zinc-400 font-medium">{subtitle}</p>
          )}
        </div>

        {/* Action Controls: Search + Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
          {/* Search Input */}
          <div className="relative flex items-center min-w-[220px] sm:min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              className="w-full bg-[#0B0D10] border border-white/[0.08] rounded-xl pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>

          {/* Add New Button */}
          {onAddNew && (
            <button
              type="button"
              onClick={onAddNew}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-white/10 hover:bg-white/15 active:scale-95 text-white rounded-xl text-xs font-semibold transition-all border border-white/15 shrink-0 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{addNewLabel}</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs (If provided) */}
      {filterOptions && filterOptions.length > 0 && onFilterChange && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onFilterChange(opt.value);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                activeFilter === opt.value
                  ? "bg-white/15 text-white border-white/20 font-semibold"
                  : "bg-white/[0.02] text-zinc-400 border-white/[0.06] hover:border-white/15 hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* Main Data Container: Table for Desktop / Stacked Cards for Mobile */}
      <div className="bg-[#111318] border border-white/[0.08] rounded-2xl overflow-hidden">
        {filteredData.length === 0 ? (
          /* Empty State */
          <div className="py-14 px-4 text-center space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] text-zinc-500 flex items-center justify-center mx-auto">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="space-y-1 max-w-sm mx-auto">
              <h3 className="text-sm font-semibold text-white">
                {emptyTitle}
              </h3>
              <p className="text-xs text-zinc-400">
                {searchQuery
                  ? `No matches found for "${searchQuery}".`
                  : emptyMessage}
              </p>
            </div>
            {onAddNew && !searchQuery && (
              <button
                type="button"
                onClick={onAddNew}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-medium border border-white/15 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{addNewLabel}</span>
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table View (>= 768px) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02] text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    {columns.map((col, idx) => (
                      <th
                        key={idx}
                        className={`p-3.5 ${col.className || ""}`}
                      >
                        {col.header}
                      </th>
                    ))}
                    {(onEdit || onDelete || onView) && (
                      <th className="p-3.5 text-right">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {paginatedData.map((item) => {
                    const id = keyExtractor(item);
                    return (
                      <tr
                        key={id}
                        className="hover:bg-white/[0.02] transition-colors group"
                      >
                        {columns.map((col, cIdx) => (
                          <td
                            key={cIdx}
                            className={`p-3.5 text-xs text-zinc-200 ${
                              col.className || ""
                            }`}
                          >
                            {col.cell
                              ? col.cell(item)
                              : col.accessorKey
                              ? String(item[col.accessorKey] ?? "")
                              : null}
                          </td>
                        ))}

                        {/* Actions column */}
                        {(onEdit || onDelete || onView) && (
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-1">
                              {onView && (
                                <button
                                  type="button"
                                  onClick={() => onView(item)}
                                  className="p-1.5 rounded-md bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors"
                                  title="View Record"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                              )}
                              {onEdit && (
                                <button
                                  type="button"
                                  onClick={() => onEdit(item)}
                                  className="p-1.5 rounded-md bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors"
                                  title="Edit Record"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                              )}
                              {onDelete && (
                                <button
                                  type="button"
                                  onClick={() => onDelete(item)}
                                  className="p-1.5 rounded-md bg-white/[0.03] hover:bg-red-500/15 hover:text-red-400 text-zinc-400 transition-colors"
                                  title="Delete Record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Card View (< 768px, Perfect for 375px+ phones) */}
            <div className="md:hidden divide-y divide-white/[0.06]">
              {paginatedData.map((item) => {
                const id = keyExtractor(item);
                return (
                  <div key={id} className="p-3.5 space-y-3">
                    {renderMobileCard ? (
                      renderMobileCard(item, { onEdit, onDelete, onView })
                    ) : (
                      <div className="space-y-1.5">
                        {columns.map((col, cIdx) => (
                          <div
                            key={cIdx}
                            className="flex items-center justify-between text-xs"
                          >
                            <span className="text-zinc-500 font-mono text-[11px]">
                              {col.header}
                            </span>
                            <div className="text-right text-zinc-200">
                              {col.cell
                                ? col.cell(item)
                                : col.accessorKey
                                ? String(item[col.accessorKey] ?? "")
                                : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Mobile Card Action Buttons */}
                    {(onEdit || onDelete || onView) && (
                      <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-white/[0.04]">
                        {onView && (
                          <button
                            type="button"
                            onClick={() => onView(item)}
                            className="px-2.5 py-1 rounded-md bg-white/[0.04] text-zinc-300 text-xs font-medium"
                          >
                            View
                          </button>
                        )}
                        {onEdit && (
                          <button
                            type="button"
                            onClick={() => onEdit(item)}
                            className="px-2.5 py-1 rounded-md bg-white/[0.04] text-zinc-300 text-xs font-medium flex items-center gap-1"
                          >
                            <Edit className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                        )}
                        {onDelete && (
                          <button
                            type="button"
                            onClick={() => onDelete(item)}
                            className="px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 text-xs font-medium flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-3.5 border-t border-white/[0.06] bg-white/[0.01] flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-mono">
                  Showing {(currentPage - 1) * itemsPerPage + 1}–
                  {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
                  {filteredData.length} records
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((p) => Math.max(1, p - 1))
                    }
                    className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-30 disabled:pointer-events-none text-zinc-400 hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>

                  <span className="px-2 text-xs font-mono text-zinc-400">
                    {currentPage} / {totalPages}
                  </span>

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-30 disabled:pointer-events-none text-zinc-400 hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
