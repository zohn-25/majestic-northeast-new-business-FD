import React from "react";
import { cn } from "@/lib/utils";

interface RippedEdgeDividerProps {
  position?: "top" | "bottom";
  fillColor?: string;
  className?: string;
}

export function RippedEdgeDivider({
  position = "bottom",
  fillColor = "#F6F4E8",
  className,
}: RippedEdgeDividerProps) {
  // Ultra-realistic micro-torn paper edge path
  const tornEdgePath =
    "M0,25 L25,18 L50,28 L75,20 L100,29 L125,22 L150,30 L175,21 L200,27 L225,19 L250,28 L275,22 L300,31 L325,20 L350,26 L375,18 L400,28 L425,23 L450,30 L475,20 L500,27 L525,19 L550,29 L575,22 L600,26 L625,18 L650,28 L675,21 L700,30 L725,19 L750,27 L775,22 L800,29 L825,20 L850,26 L875,18 L900,28 L925,23 L950,30 L975,20 L1000,27 L1025,19 L1050,29 L1075,22 L1100,26 L1125,18 L1150,28 L1175,21 L1200,25 L1200,100 L0,100 Z";

  return (
    <div
      className={cn(
        "w-full overflow-hidden leading-none pointer-events-none relative z-20",
        position === "top" ? "-mb-1 rotate-180" : "-mt-1",
        className
      )}
    >
      <svg
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        className="relative block w-full h-8 sm:h-12 lg:h-14"
      >
        <path d={tornEdgePath} fill={fillColor} />
      </svg>
    </div>
  );
}
