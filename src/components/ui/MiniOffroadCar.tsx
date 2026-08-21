"use client";

import React from "react";

interface MiniOffroadCarProps {
  className?: string;
  size?: number;
}

export function MiniOffroadCar({ className = "", size = 32 }: MiniOffroadCarProps) {
  return (
    <div className={`relative inline-flex items-end select-none group pointer-events-auto animate-offroad-wobble ${className}`}>
      <svg
        width={size * 1.65}
        height={size}
        viewBox="0 0 76 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_2px_6px_rgba(255,255,255,0.35)] transition-transform duration-300"
      >
        {/* Fine, Small Under-Chassis Micro Mud Dash */}
        <g className="animate-mud-burst-1">
          <line x1="38" y1="41" x2="32" y2="41" stroke="#FFFFFF" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
          <circle cx="30" cy="41.2" r="0.6" fill="#FFFFFF" opacity="0.6" />
        </g>

        {/* Compact, Small-Scale Mud & Gravel Micro-Spray Behind Rear Wheel */}
        {/* Layer 1: Fine Speed Streaks */}
        <g className="animate-mud-burst-1">
          <line x1="17" y1="42" x2="8" y2="42" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" opacity="0.85" />
          <line x1="16" y1="39.5" x2="9" y2="38" stroke="#FFFFFF" strokeWidth="1.1" strokeLinecap="round" opacity="0.75" />
          <line x1="17" y1="36.5" x2="11" y2="34" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.65" />
          <line x1="18" y1="33.5" x2="13" y2="30" stroke="#FFFFFF" strokeWidth="0.9" strokeLinecap="round" opacity="0.55" />
        </g>

        {/* Layer 2: Small Fine Mud & Pebble Dots */}
        <g className="animate-mud-burst-2">
          <circle cx="6" cy="42" r="0.9" fill="#FFFFFF" opacity="0.9" />
          <circle cx="10" cy="36" r="0.8" fill="#FFFFFF" opacity="0.85" />
          <circle cx="7" cy="38" r="0.6" fill="#FFFFFF" opacity="0.75" />
          <circle cx="12" cy="32" r="0.7" fill="#FFFFFF" opacity="0.8" />
          <circle cx="9" cy="30" r="0.5" fill="#FFFFFF" opacity="0.65" />
          <circle cx="14" cy="27" r="0.6" fill="#FFFFFF" opacity="0.7" />
        </g>

        {/* Roof Rack & 4 Auxiliary Spotlights (Matches Reference Pic) */}
        {/* Roof Rails */}
        <path d="M26 13H54" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M29 13V15 M36 13V15 M44 13V15 M51 13V15" stroke="#FFFFFF" strokeWidth="1.4" />
        {/* 4 Spotlights on Roof Rack */}
        <rect x="28" y="9.5" width="4.5" height="3.5" rx="1" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="0.8" />
        <rect x="35" y="9.5" width="4.5" height="3.5" rx="1" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="0.8" />
        <rect x="42" y="9.5" width="4.5" height="3.5" rx="1" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="0.8" />
        <rect x="49" y="9.5" width="4.5" height="3.5" rx="1" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="0.8" />

        {/* Rear Mounted Spare Tyre with Rugged Tread Lugs */}
        <rect x="12" y="18" width="5.5" height="15" rx="2.5" fill="#FFFFFF" />
        <path d="M11 20H12.5 M11 23H12.5 M11 26H12.5 M11 29H12.5 M11 31H12.5" stroke="#18181B" strokeWidth="1" strokeLinecap="round" />

        {/* Main 4x4 Vehicle Body Silhouette */}
        <path
          d="M17 32V17C17 15.5 18.5 15 20 15H46C47.5 15 49 16.5 50.5 19L55.5 24H67C69 24 70 25 70 26.5V29C70 30 69 31 67 31.5L66 33H62C60 28 54 28 51 33H33C31 28 25 28 22 33H17Z"
          fill="#FFFFFF"
        />

        {/* Front Grill & Bullbar */}
        <path d="M67 26H70V30H67V26Z" fill="#FFFFFF" />
        <circle cx="68" cy="27" r="1.4" fill="#18181B" />

        {/* Windows (Cutouts into Dark Glass) */}
        {/* Rear Quarter Window */}
        <rect x="21" y="17.5" width="13" height="9" rx="1.5" fill="#18181B" />
        {/* Front Driver Window */}
        <path d="M37 17.5H45C46 17.5 47 18.5 48 20L50 26.5H37V17.5Z" fill="#18181B" />
        {/* Window Divider Bar */}
        <line x1="35.5" y1="17.5" x2="35.5" y2="26.5" stroke="#FFFFFF" strokeWidth="1.6" />

        {/* Door Line & Side Mirror */}
        <path d="M46.5 22.5H48V25H46.5Z" fill="#FFFFFF" />
        <line x1="36" y1="27" x2="53" y2="27" stroke="#18181B" strokeWidth="1" strokeLinecap="round" />

        {/* Front & Rear Wheel Arches (Fenders) */}
        <path d="M20 33C21.5 27 32.5 27 34 33" stroke="#18181B" strokeWidth="1.8" fill="none" />
        <path d="M49 33C50.5 27 61.5 27 63 33" stroke="#18181B" strokeWidth="1.8" fill="none" />

        {/* Rear Deep Knobby Offroad Monster Tyre */}
        <g transform="translate(27, 34)">
          {/* Outer Deep Tread Lugs */}
          <circle cx="0" cy="0" r="8.5" fill="#FFFFFF" />
          <circle cx="0" cy="0" r="8.5" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="3.2 2" />
          {/* Inner Rim */}
          <circle cx="0" cy="0" r="4.5" fill="#18181B" />
          <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
        </g>

        {/* Front Deep Knobby Offroad Monster Tyre */}
        <g transform="translate(56, 34)">
          {/* Outer Deep Tread Lugs */}
          <circle cx="0" cy="0" r="8.5" fill="#FFFFFF" />
          <circle cx="0" cy="0" r="8.5" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="3.2 2" />
          {/* Inner Rim */}
          <circle cx="0" cy="0" r="4.5" fill="#18181B" />
          <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
}
