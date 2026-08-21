"use client";

import React, { useState } from "react";
import { Car, Bike, Compass, Calendar, MapPin, Search, Users } from "lucide-react";
import { DESTINATIONS_DATA } from "@/lib/data";
import { CustomSelect, OptionItem } from "@/components/ui/CustomSelect";

interface SearchWidgetProps {
  onSearchRental?: (params: { category: string; pickup: string; startDate: string }) => void;
  onSearchTour?: (params: { stateId: string; date: string; travellers: number }) => void;
}

export function SearchWidget({ onSearchRental, onSearchTour }: SearchWidgetProps) {
  const [tab, setTab] = useState<"car-trip" | "bike-trip">("car-trip");

  // Car trip state
  const [carState, setCarState] = useState("all");
  const [carMonth, setCarMonth] = useState("any");
  const [carTravellers, setCarTravellers] = useState(2);

  // Bike trip state
  const [bikeState, setBikeState] = useState("all");
  const [bikeMonth, setBikeMonth] = useState("any");
  const [bikeRiders, setBikeRiders] = useState(1);

  const destinationOptions: OptionItem[] = [
    {
      value: "all",
      label: "All Northeast Circuits",
      subLabel: "Tawang, Meghalaya, Sikkim, Kaziranga, Nagaland",
      badge: "Full Access",
    },
    ...DESTINATIONS_DATA.map((dest) => ({
      value: dest.id,
      label: dest.name,
      subLabel: `${dest.stateName} Circuit`,
    })),
  ];

  const monthOptions: OptionItem[] = [
    { value: "any", label: "Any Month (All Batches)", subLabel: "Flexible departure dates", badge: "Active" },
    { value: "2026-09", label: "September 2026", subLabel: "Autumn Season • Passes Open" },
    { value: "2026-10", label: "October 2026", subLabel: "Peak Clear Skies • Tawang & Sikkim" },
    { value: "2026-11", label: "November 2026", subLabel: "Winter Rides & Hornbill Festival" },
    { value: "2026-12", label: "December 2026", subLabel: "Snow Crossing & Year-End Convoys" },
    { value: "2027-03", label: "March 2027", subLabel: "Spring High-Altitude Thaw" },
    { value: "2027-04", label: "April 2027", subLabel: "Rhododendron Bloom Season" },
    { value: "2027-05", label: "May 2027", subLabel: "Summer High Pass Crossings" },
  ];

  const groupSizeOptions: OptionItem[] = [
    { value: 1, label: "1 Solo Adventurer", subLabel: "Single Rider / Driver Slot" },
    { value: 2, label: "2 Travellers / Couple", subLabel: "Shared Vehicle Room / Stays" },
    { value: 3, label: "3 Travellers", subLabel: "Triple Occupancy / SUV Slot" },
    { value: 4, label: "4+ Group / Convoy", subLabel: "Full 4x4 Vehicle Allocation" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === "car-trip") {
      onSearchTour?.({
        stateId: carState,
        date: carMonth === "any" ? "" : carMonth,
        travellers: carTravellers,
      });
    } else {
      onSearchTour?.({
        stateId: bikeState,
        date: bikeMonth === "any" ? "" : bikeMonth,
        travellers: bikeRiders,
      });
    }
  };

  return (
    <div className="w-full bg-[#131518]/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl p-5 sm:p-6 text-left text-white relative z-30 overflow-visible">
      {/* 2 Group Trip Tabs */}
      <div className="flex p-1 bg-black/60 border border-white/10 rounded-xl mb-5">
        <button
          onClick={() => setTab("car-trip")}
          className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 font-display ${
            tab === "car-trip"
              ? "bg-brand-red text-white shadow-md shadow-brand-red/30"
              : "text-white/60 hover:text-white"
          }`}
        >
          <Car className="w-4 h-4" />
          4x4 Car Trips
        </button>
        <button
          onClick={() => setTab("bike-trip")}
          className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 font-display ${
            tab === "bike-trip"
              ? "bg-brand-red text-white shadow-md shadow-brand-red/30"
              : "text-white/60 hover:text-white"
          }`}
        >
          <Bike className="w-4 h-4" />
          Bike Expeditions
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Destination Circuit Custom Dropdown */}
        <div>
          <label className="block text-[11px] font-bold font-display text-white/90 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-red" />
            {tab === "car-trip" ? "4x4 Expedition Circuit" : "Motorcycle Ride Circuit"}
          </label>
          <CustomSelect
            options={destinationOptions}
            value={tab === "car-trip" ? carState : bikeState}
            onChange={(val) => (tab === "car-trip" ? setCarState(val) : setBikeState(val))}
            icon={<MapPin className="w-3.5 h-3.5" />}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Target Month Custom Dropdown */}
          <div>
            <label className="block text-[11px] font-bold font-display text-white/90 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-red" />
              Target Month
            </label>
            <CustomSelect
              options={monthOptions}
              value={tab === "car-trip" ? carMonth : bikeMonth}
              onChange={(val) => (tab === "car-trip" ? setCarMonth(val) : setBikeMonth(val))}
              icon={<Calendar className="w-3.5 h-3.5" />}
            />
          </div>

          {/* Travellers / Riders Custom Dropdown */}
          <div>
            <label className="block text-[11px] font-bold font-display text-white/90 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-brand-red" />
              {tab === "car-trip" ? "Group Size" : "Riders Count"}
            </label>
            <CustomSelect
              options={groupSizeOptions}
              value={tab === "car-trip" ? carTravellers : bikeRiders}
              onChange={(val) =>
                tab === "car-trip"
                  ? setCarTravellers(Number(val))
                  : setBikeRiders(Number(val))
              }
              icon={<Users className="w-3.5 h-3.5" />}
            />
          </div>
        </div>

        {/* Feature Badges under form */}
        <div className="text-[11px] text-white/60 flex items-center justify-between pt-1 font-semibold">
          <span>{tab === "car-trip" ? "🚙 Thar 4x4 / Fortuner Fleet" : "🏍️ RE Himalayan 450 Provided"}</span>
          <span className="text-emerald-400">✓ Backup Mechanic Truck</span>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold font-display uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all shadow-glow-red hover:scale-[1.01]"
        >
          <Search className="w-4 h-4" />
          {tab === "car-trip" ? "Find 4x4 Car Departures" : "Find Bike Expeditions"}
        </button>
      </form>
    </div>
  );
}
