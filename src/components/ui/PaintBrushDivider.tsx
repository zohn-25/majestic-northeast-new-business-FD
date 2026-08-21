import React from "react";
import { cn } from "@/lib/utils";

interface PaintBrushDividerProps {
  position?: "top" | "bottom";
  fillColor?: string;
  className?: string;
  variant?: "splatter1" | "splatter2" | "splatter3";
}

// Three distinct grunge/paint splatter edge paths — each one is unique and organic
const SPLATTER_PATHS = {
  splatter1:
    "M0,0 L0,48 C8,46 12,62 18,55 C22,50 28,72 35,58 C38,52 42,68 48,42 C50,36 55,58 62,48 C65,42 70,65 78,52 C82,46 85,68 92,55 C96,48 102,72 108,58 C112,52 118,42 125,62 C128,68 135,48 142,55 C145,50 150,72 158,42 C162,36 168,62 175,52 C178,48 182,68 188,55 C192,52 198,38 205,58 C210,65 215,45 222,55 C228,62 232,42 238,58 C242,65 248,48 255,55 C260,60 265,38 272,52 C278,58 282,42 288,55 C292,48 298,68 305,42 C310,36 315,62 322,52 L322,0 Z",
  splatter2:
    "M0,0 L0,52 C6,48 10,68 16,42 C20,36 26,62 32,55 C36,50 40,72 46,48 C50,42 56,65 62,52 C66,46 72,72 78,55 C82,48 86,62 92,42 C96,38 102,58 108,52 C112,48 116,68 122,55 C126,50 132,42 138,62 C142,68 146,48 152,55 C158,62 162,38 168,52 C172,58 178,42 184,62 C188,68 192,48 198,55 C202,48 208,72 214,42 C218,36 224,62 230,55 C234,50 240,68 246,48 C250,42 256,58 262,55 C266,52 272,72 278,42 C282,38 288,62 294,52 C298,48 304,68 310,55 C316,48 320,52 322,48 L322,0 Z",
  splatter3:
    "M0,0 L0,55 C5,48 8,72 14,42 C18,35 24,65 30,52 C34,46 38,70 44,48 C48,42 54,62 60,55 C64,50 68,72 74,42 C78,36 84,60 90,52 C94,46 98,68 104,55 C108,48 114,38 120,58 C124,65 128,45 134,55 C138,62 144,42 150,58 C154,65 158,48 164,55 C168,50 174,72 180,42 C184,36 188,62 194,52 C198,48 204,72 210,55 C214,48 218,65 224,42 C228,38 234,58 240,52 C244,46 250,68 256,48 C260,42 266,62 272,55 C276,52 282,42 288,62 C292,68 298,48 304,55 C310,42 316,62 322,52 L322,0 Z",
};

export function PaintBrushDivider({
  position = "bottom",
  fillColor = "#E61A24",
  className,
  variant = "splatter1",
}: PaintBrushDividerProps) {
  const path = SPLATTER_PATHS[variant];

  return (
    <div
      className={cn(
        "w-full overflow-hidden leading-none pointer-events-none relative z-20",
        position === "top" ? "-mb-px rotate-180" : "-mt-px",
        className
      )}
    >
      <svg
        viewBox="0 0 322 72"
        preserveAspectRatio="none"
        className="relative block w-full h-[28px] sm:h-[36px] lg:h-[48px]"
      >
        <path d={path} fill={fillColor} />
      </svg>
    </div>
  );
}
