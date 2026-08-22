"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Eye, Sparkles, Filter, AlertCircle } from "lucide-react";

export interface ColumnDef<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
  hideOnMobile?: boolean;
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
  onFilterChange?: (filter: string) => void;
  onAddNew?: () => void;
  addNewLabel?: string;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  emptyTitle?: string;
  emptyMessage?: string;
  keyExtractor: (item: T) => string;
  // Optional mobile card custom renderer
  renderMobileCard?: (item: T, actions: { onEdit?: () => void; onDelete?: () => void; onView?: () => void }) => React.ReactNode;
}

export function DataTable<T>({
  title,
  subtitle,
  data,
  columns,
  searchPlaceholder = "Search...",
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
          if (Array.isArray(val)) return val.some((v) => typeof v === "string" && v.toLowerCase().includes(q));
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
    <div className="space-y-5 text-left">
      
      {/* Top Header & Search Bar Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#121418] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-lg">
        
        {/* Title & Subtitle */}
        <div className="space-y-0.5">
          <h2 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-white/60 font-medium">
              {subtitle}
            </p>
          )}
        </div>

        {/* Action Controls: Search + Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex items-center min-w-[220px] sm:min-w-[260px]">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              className="w-full bg-black/60 border border-white/15 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-brand-red transition-colors font-medium"
            />
          </div>

          {/* Add New Button */}
          {onAddNew && (
            <button
              type="button"
              onClick={onAddNew}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-brand-red hover:bg-brand-red-hover active:scale-95 text-white rounded-xl text-xs font-black font-display uppercase tracking-wider transition-all shadow-glow-red shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{addNewLabel}</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs (If provided) */}
      {filterOptions && filterOptions.length > 0 && onFilterChange && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onFilterChange(opt.value);
                setCurrentPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-display uppercase tracking-wider whitespace-nowrap transition-all border ${
                activeFilter === opt.value
                  ? "bg-brand-red text-white border-brand-red shadow-md"
                  : "bg-[#121418] text-white/70 border-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* Main Data Container: Table for Desktop / Stacked Cards for Mobile */}
      <div className="bg-[#121418] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        
        {filteredData.length === 0 ? (
          /* Empty State */
          <div className="py-16 px-4 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-white/40 flex items-center justify-center mx-auto">
              <AlertCircle className="w-7 h-7" />
            </div>
            <div className="space-y-1 max-w-sm mx-auto">
              <h3 className="text-base font-black font-display uppercase tracking-wide text-white">
                {emptyTitle}
              </h3>
              <p className="text-xs text-white/60 font-medium">
                {searchQuery ? `No matches found for "${searchQuery}".` : emptyMessage}
              </p>
            </div>
            {onAddNew && !searchQuery && (
              <button
                type="button"
                onClick={onAddNew}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-red text-white rounded-xl text-xs font-bold font-display uppercase tracking-wider shadow-md hover:scale-105 transition-transform"
              >
                <Plus className="w-4 h-4" />
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
                  <tr className="border-b border-white/10 bg-black/40 text-[10px] font-black font-display uppercase tracking-widest text-white/50">
                    {columns.map((col, idx) => (
                      <th key={idx} className={`p-4 ${col.className || ""}`}>
                        {col.header}
                      </th>
                    ))}
                    {(onEdit || onDelete || onView) && (
                      <th className="p-4 text-right">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {paginatedData.map((item) => {
                    const key = keyExtractor(item);
                    return (
                      <tr key={key} className="hover:bg-white/[0.02] transition-colors group">
                        {columns.map((col, idx) => (
                          <td key={idx} className={`p-4 text-xs font-medium text-white/90 ${col.className || ""}`}>
                            {col.cell ? col.cell(item) : col.accessorKey ? String(item[col.accessorKey] ?? "") : null}
                          </td>
                        ))}

                        {/* Actions Cell */}
                        {(onEdit || onDelete || onView) && (
                          <td className="p-4 text-right shrink-0">
                            <div className="flex items-center justify-end gap-1.5">
                              {onView && (
                                <button
                                  type="button"
                                  onClick={() => onView(item)}
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                                  title="View Details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                              )}
                              {onEdit && (
                                <button
                                  type="button"
                                  onClick={() => onEdit(item)}
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-blue-500/20 text-white/60 hover:text-blue-400 transition-colors"
                                  title="Edit Entry"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                              )}
                              {onDelete && (
                                <button
                                  type="button"
                                  onClick={() => onDelete(item)}
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors"
                                  title="Delete Entry"
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

            {/* Mobile Stacked Card View (< 768px, Perfect for 375px) */}
            <div className="md:hidden divide-y divide-white/10">
              {paginatedData.map((item) => {
                const key = keyExtractor(item);
                if (renderMobileCard) {
                  return (
                    <div key={key} className="p-4">
                      {renderMobileCard(item, {
                        onEdit: onEdit ? () => onEdit(item) : undefined,
                        onDelete: onDelete ? () => onDelete(item) : undefined,
                        onView: onView ? () => onView(item) : undefined,
                      })}
                    </div>
                  );
                }

                // Default Fallback Mobile Card
                return (
                  <div key={key} className="p-4 space-y-3">
                    <div className="space-y-2">
                      {columns.map((col, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs gap-2">
                          <span className="text-[10px] font-black font-display uppercase tracking-wider text-white/40">
                            {col.header}
                          </span>
                          <div className="text-right text-white font-medium">
                            {col.cell ? col.cell(item) : col.accessorKey ? String(item[col.accessorKey] ?? "") : null}
                          </div>
                        </div>
                      ))}
                    </div>

                    {(onEdit || onDelete || onView) && (
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                        {onView && (
                          <button
                            type="button"
                            onClick={() => onView(item)}
                            className="px-3 py-1.5 rounded-lg bg-white/5 text-xs font-bold font-display uppercase tracking-wider text-white flex items-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>
                        )}
                        {onEdit && (
                          <button
                            type="button"
                            onClick={() => onEdit(item)}
                            className="px-3 py-1.5 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-bold font-display uppercase tracking-wider flex items-center gap-1.5"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                        )}
                        {onDelete && (
                          <button
                            type="button"
                            onClick={() => onDelete(item)}
                            className="px-3 py-1.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold font-display uppercase tracking-wider flex items-center gap-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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
            <div className="p-3.5 sm:p-4 bg-black/40 border-t border-white/10 flex items-center justify-between gap-4 text-xs text-white/60">
              <span>
                Showing <strong>{paginatedData.length}</strong> of <strong>{filteredData.length}</strong> entries
              </span>

              {totalPages > 1 && (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-white"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="px-2 font-bold font-display text-white">
                    {currentPage} / {totalPages}
                  </span>

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-white"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </>
        )}

      </div>

    </div>
  );
}
