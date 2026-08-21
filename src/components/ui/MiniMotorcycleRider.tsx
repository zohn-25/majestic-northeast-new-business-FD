"use client";

import React from "react";

interface MiniMotorcycleRiderProps {
  className?: string;
  size?: number;
}

export function MiniMotorcycleRider({ className = "", size = 30 }: MiniMotorcycleRiderProps) {
  return (
    <div className={`relative inline-flex items-end select-none group pointer-events-auto ${className}`}>
      {/* Golden Headlight Glow */}
      <div 
        className="absolute left-[82%] top-[40%] -translate-y-1/2 w-10 h-5 bg-gradient-to-r from-amber-400/90 via-amber-300/40 to-transparent blur-[2px] rounded-r-full pointer-events-none" 
      />

      <svg
        width={size * 1.55}
        height={size}
        viewBox="0 0 62 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_2px_10px_rgba(255,255,255,0.4)] transition-all duration-300 group-hover:scale-110"
      >
        {/* Rear Wheel (Spoked Adventure Tyre) - Bottom sits on y=38 */}
        <circle cx="12" cy="30" r="8" stroke="#FFFFFF" strokeWidth="2.8" />
        <circle cx="12" cy="30" r="4.5" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.8" />
        <circle cx="12" cy="30" r="2" fill="#FFFFFF" />

        {/* Front Wheel (Larger 21-inch Adventure Tyre) - Bottom sits on y=38 */}
        <circle cx="48" cy="29" r="9" stroke="#FFFFFF" strokeWidth="2.8" />
        <circle cx="48" cy="29" r="5.5" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.8" />
        <circle cx="48" cy="29" r="2" fill="#FFFFFF" />

        {/* Bike Frame & Swingarm (White Tubular Chassis) */}
        <path
          d="M12 30L24 26L32 29L48 29"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Upswept Adventure Exhaust */}
        <path
          d="M20 29L11 23"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Engine & Skid Plate */}
        <rect x="22" y="25" width="9" height="7" rx="2" fill="#FFFFFF" opacity="0.9" />

        {/* Fuel Tank (Himalayan 450 sculpted tank) */}
        <path
          d="M26 21C26 17 30 15 36 16C39 17 41 20 38 23L26 23Z"
          fill="#FFFFFF"
        />

        {/* Windscreen */}
        <path
          d="M40 18L44 10L47 12L43 20Z"
          fill="#FFFFFF"
          opacity="0.8"
        />

        {/* Adventure LED Headlight (Glows Amber / Yellow) */}
        <circle cx="45" cy="19" r="2.2" fill="#FBBF24" />

        {/* Adventure Rider Body & Riding Gear */}
        {/* Boots / Foot on Pegs */}
        <path
          d="M26 20L28 27L24 29"
          stroke="#FFFFFF"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Torso & Riding Jacket (Forward Attack Posture) */}
        <path
          d="M23 18L29 12L36 14L32 20Z"
          fill="#FFFFFF"
        />

        {/* Arms & Handlebars */}
        <path
          d="M29 14L38 16L41 18"
          stroke="#FFFFFF"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* Adventure Helmet & Peak Visor */}
        <circle cx="31" cy="8" r="4.8" fill="#FFFFFF" />
        {/* Helmet Visor Notch */}
        <path d="M33 7L36 9L34 10Z" fill="#18181B" />

        {/* Rear Luggage Tail Bag / Top Box */}
        <rect x="13" y="16" width="7" height="6" rx="1.5" fill="#FFFFFF" opacity="0.95" />

        {/* Speed Trail Dust */}
        <circle cx="3" cy="31" r="1.2" fill="#FFFFFF" opacity="0.6" />
        <circle cx="6" cy="33" r="0.8" fill="#FFFFFF" opacity="0.4" />
      </svg>
    </div>
  );
}
