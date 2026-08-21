import React from "react";
import { cn } from "@/lib/utils";

interface BadgeChipProps {
  children: React.ReactNode;
  variant?: "red" | "dark" | "outline" | "amber" | "emerald";
  size?: "sm" | "md";
  className?: string;
  icon?: React.ReactNode;
}

export function BadgeChip({
  children,
  variant = "red",
  size = "sm",
  className,
  icon,
}: BadgeChipProps) {
  const baseStyles = "inline-flex items-center gap-1.5 font-extrabold font-display uppercase tracking-widest transition-colors rounded-sm";
  
  const sizeStyles = {
    sm: "text-[10px] px-2.5 py-1",
    md: "text-xs px-3.5 py-1.5",
  };

  const variantStyles = {
    red: "bg-brand-red text-white shadow-sm shadow-brand-red/30",
    dark: "bg-black text-white border border-white/20",
    outline: "border border-brand-border text-brand-text-primary bg-white/70 backdrop-blur-sm",
    amber: "bg-amber-500 text-white",
    emerald: "bg-emerald-600 text-white",
  };

  return (
    <span
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
