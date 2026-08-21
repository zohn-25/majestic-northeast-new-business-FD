import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  tag?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  tag,
  title,
  subtitle,
  centered = true,
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-3 mb-12 md:mb-16", centered && "text-center mx-auto max-w-4xl", className)}>
      {tag && (
        <div className="inline-block">
          <span className="brush-badge text-[11px] font-black font-display tracking-widest uppercase">
            {tag}
          </span>
        </div>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight leading-[0.95]",
          dark ? "text-white" : "text-gray-900 dark:text-white"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl mx-auto font-normal",
            dark ? "text-white/80" : "text-gray-600 dark:text-white/80"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
