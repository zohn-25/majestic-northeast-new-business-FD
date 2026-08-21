"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface OptionItem {
  value: string | number;
  label: string;
  subLabel?: string;
  badge?: string;
}

interface CustomSelectProps {
  options: OptionItem[];
  value: string | number;
  onChange: (value: any) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
  dropdownClassName?: string;
  disabled?: boolean;
}

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select Option",
  icon,
  className = "",
  dropdownClassName = "",
  disabled = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => String(opt.value) === String(value));

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Scroll active item into view when opening
  useEffect(() => {
    if (isOpen && listRef.current) {
      const activeEl = listRef.current.querySelector('[data-selected="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full text-left ${isOpen ? "z-[9999]" : "z-10"} ${className}`}
    >
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-semibold font-display tracking-wide transition-all ${
          isOpen
            ? "border-brand-red ring-2 ring-brand-red/30 bg-white dark:bg-[#1A1D22] text-gray-900 dark:text-white shadow-lg shadow-brand-red/20"
            : "border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-black/70 hover:border-brand-red text-gray-900 dark:text-white"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <div className="flex items-center gap-2 truncate flex-1">
          {icon && <span className="text-brand-red shrink-0">{icon}</span>}
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {selectedOption?.badge && (
            <span className="text-[9px] bg-brand-red/15 text-brand-red px-1.5 py-0.5 rounded font-bold uppercase">
              {selectedOption.badge}
            </span>
          )}
        </div>

        <ChevronDown
          className={`w-4 h-4 text-brand-red shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Floating Animated Custom Dropdown List with Direct Wheel Capture & Smooth Scroll */}
      {isOpen && (
        <div
          ref={listRef}
          onWheel={(e) => {
            // Stop page from hijacking wheel events when hovering inside dropdown
            e.stopPropagation();
          }}
          className={`custom-scrollbar absolute top-full left-0 right-0 mt-1.5 z-[99999] bg-[#181A1F] border-2 border-brand-red rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-1.5 space-y-1 max-h-[260px] overflow-y-scroll overscroll-contain animate-in fade-in zoom-in-95 duration-150 pointer-events-auto touch-pan-y ${dropdownClassName}`}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {options.map((option) => {
            const isSelected = String(option.value) === String(value);
            return (
              <div
                key={String(option.value)}
                data-selected={isSelected ? "true" : "false"}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`py-2.5 px-3 rounded-lg cursor-pointer flex items-center justify-between transition-all text-xs font-display tracking-wide ${
                  isSelected
                    ? "bg-brand-red text-white font-bold shadow-md shadow-brand-red/30"
                    : "hover:bg-white/10 text-white/90"
                }`}
              >
                <div className="flex flex-col truncate pr-2">
                  <div className="flex items-center gap-2 truncate">
                    <span className="truncate font-semibold">{option.label}</span>
                    {option.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold ${
                          isSelected
                            ? "bg-black/30 text-white"
                            : "bg-brand-red/15 text-brand-red"
                        }`}
                      >
                        {option.badge}
                      </span>
                    )}
                  </div>
                  {option.subLabel && (
                    <span
                      className={`text-[10px] truncate ${
                        isSelected ? "text-white/80" : "text-white/50 font-normal"
                      }`}
                    >
                      {option.subLabel}
                    </span>
                  )}
                </div>

                {isSelected && <Check className="w-3.5 h-3.5 shrink-0 text-white" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
