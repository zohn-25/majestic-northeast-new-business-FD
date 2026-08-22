"use client";

import React, { useState, useEffect } from "react";
import { Vehicle, SharedTour, SharedTourEnquiryPayload } from "@/lib/types";
import { useData } from "@/context/DataContext";
import { X, CheckCircle2, Send, Car, Bike, Calendar, MapPin, User, Phone, Mail, ShieldCheck } from "lucide-react";
import { formatINR } from "@/lib/utils";
import { CustomSelect, OptionItem } from "@/components/ui/CustomSelect";

type TripMode = "car" | "bike";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "rental" | "tour" | "car" | "bike";
  preselectedTour?: SharedTour | null;
  preselectedVehicle?: Vehicle | null;
}

export function EnquiryModal({
  isOpen,
  onClose,
  initialMode = "car",
  preselectedTour = null,
  preselectedVehicle = null,
}: EnquiryModalProps) {
  const { tours, addEnquiry } = useData();
  const [tripType, setTripType] = useState<TripMode>(
    preselectedTour ? preselectedTour.tripFormat : initialMode === "bike" ? "bike" : "car"
  );
  const [submitted, setSubmitted] = useState(false);

  const carTours = tours.filter((t) => t.tripFormat === "car");
  const bikeTours = tours.filter((t) => t.tripFormat === "bike");

  const activeTours = tripType === "car" ? carTours : bikeTours;

  const [tourForm, setTourForm] = useState<SharedTourEnquiryPayload>({
    fullName: "",
    phoneNumber: "",
    email: "",
    tourId: preselectedTour ? preselectedTour.id : activeTours[0]?.id || tours[0]?.id || "t-1",
    preferredDate: preselectedTour ? preselectedTour.startDates[0] : activeTours[0]?.startDates[0] || "",
    numberOfTravellers: 2,
    pickupLocation: "Guwahati Airport (GAU)",
    message: "",
  });

  useEffect(() => {
    if (preselectedTour) {
      setTripType(preselectedTour.tripFormat);
      setTourForm((prev) => ({
        ...prev,
        tourId: preselectedTour.id,
        preferredDate: preselectedTour.startDates[0] || "",
      }));
    } else {
      const list = tripType === "car" ? carTours : bikeTours;
      if (list[0]) {
        setTourForm((prev) => ({
          ...prev,
          tourId: list[0].id,
          preferredDate: list[0].startDates[0] || "",
        }));
      }
    }
    setSubmitted(false);
  }, [isOpen, preselectedTour, tripType]);

  const selectedTourObj = tours.find((t) => t.id === tourForm.tourId) || activeTours[0];

  const tourOptions: OptionItem[] = activeTours.map((t) => ({
    value: t.id,
    label: t.title,
    subLabel: `${formatINR(t.pricePerPerson)}/person • ${t.durationDays}D/${t.durationNights}N`,
  }));

  const dateOptions: OptionItem[] = (selectedTourObj?.startDates || []).map((d) => ({
    value: d,
    label: `Batch: ${d}`,
    subLabel: "Guaranteed Departure",
  }));

  const travellerOptions: OptionItem[] = [
    { value: 1, label: "1 Solo Adventurer" },
    { value: 2, label: "2 Travellers" },
    { value: 3, label: "3 Travellers" },
    { value: 4, label: "4+ Group" },
  ];

  const handleTripTypeChange = (type: TripMode) => {
    setTripType(type);
    const list = type === "car" ? carTours : bikeTours;
    if (list[0]) {
      setTourForm((prev) => ({
        ...prev,
        tourId: list[0].id,
        preferredDate: list[0].startDates[0] || "",
      }));
    }
  };

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedTourObj = tours.find((t) => t.id === tourForm.tourId);
    addEnquiry({
      type: "tour",
      customerName: tourForm.fullName || "Guest Adventurer",
      phone: tourForm.phoneNumber || "+91 98765 43210",
      email: tourForm.email || "guest@traveler.com",
      relatedItemName: selectedTourObj?.title || "Expedition Circuit",
      relatedItemId: tourForm.tourId,
      status: "New",
      message: tourForm.message,
      preferredBatch: tourForm.preferredDate,
      numberOfTravellers: tourForm.numberOfTravellers,
      pickupLocation: tourForm.pickupLocation,
    });
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#131518] text-white border-t sm:border border-white/15 rounded-t-3xl sm:rounded-2xl max-w-xl w-full p-5 sm:p-8 shadow-2xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom sm:zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle */}
        <div className="sm:hidden w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-4" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-brand-red flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-display text-white uppercase">Expedition Enquiry Received!</h3>
            <p className="text-xs text-white/70 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong>{tourForm.fullName}</strong>. Our mountain expedition lead will connect with you on WhatsApp / Phone within 30 minutes with the seat confirmation and ILP documentation checklist.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold font-display uppercase tracking-wider rounded-xl shadow-glow-red"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-red font-display block">
                Official Expedition Booking Desk
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white uppercase tracking-tight mt-0.5">
                Reserve Your Group Spot
              </h2>
            </div>

            {/* 2 Trip Type Tabs */}
            <div className="flex p-1 bg-black/60 border border-white/10 rounded-xl">
              <button
                type="button"
                onClick={() => handleTripTypeChange("car")}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 font-display ${
                  tripType === "car"
                    ? "bg-brand-red text-white shadow-md shadow-brand-red/30"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Car className="w-4 h-4" />
                4x4 Car Convoy
              </button>
              <button
                type="button"
                onClick={() => handleTripTypeChange("bike")}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 font-display ${
                  tripType === "bike"
                    ? "bg-brand-red text-white shadow-md shadow-brand-red/30"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Bike className="w-4 h-4" />
                Bike Expedition
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleTourSubmit} className="space-y-4 text-xs">
              {/* Select Expedition Tour Custom Dropdown */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/90 mb-1.5 font-display">
                  Select {tripType === "car" ? "4x4 Car Trip" : "Motorcycle Expedition"} Itinerary *
                </label>
                <CustomSelect
                  options={tourOptions}
                  value={tourForm.tourId}
                  onChange={(id) => {
                    const found = tours.find((t) => t.id === id);
                    setTourForm((prev) => ({
                      ...prev,
                      tourId: id,
                      preferredDate: found ? found.startDates[0] : "",
                    }));
                  }}
                  icon={tripType === "car" ? <Car className="w-3.5 h-3.5" /> : <Bike className="w-3.5 h-3.5" />}
                />
              </div>

              {/* Date & Batch Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-white/90 mb-1.5 font-display flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-brand-red" />
                    Preferred Batch Date *
                  </label>
                  <CustomSelect
                    options={dateOptions}
                    value={tourForm.preferredDate}
                    onChange={(d) => setTourForm({ ...tourForm, preferredDate: d })}
                    icon={<Calendar className="w-3.5 h-3.5" />}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-white/90 mb-1.5 font-display">
                    {tripType === "car" ? "Travellers Count *" : "Riders Count *"}
                  </label>
                  <CustomSelect
                    options={travellerOptions}
                    value={tourForm.numberOfTravellers}
                    onChange={(n) => setTourForm({ ...tourForm, numberOfTravellers: Number(n) })}
                  />
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-white/90 mb-1.5 font-display">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={tourForm.fullName}
                    onChange={(e) => setTourForm({ ...tourForm, fullName: e.target.value })}
                    className="w-full bg-black/80 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-white/90 mb-1.5 font-display">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={tourForm.phoneNumber}
                    onChange={(e) => setTourForm({ ...tourForm, phoneNumber: e.target.value })}
                    className="w-full bg-black/80 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/90 mb-1.5 font-display">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.name@example.com"
                  value={tourForm.email}
                  onChange={(e) => setTourForm({ ...tourForm, email: e.target.value })}
                  className="w-full bg-black/80 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-red"
                />
              </div>

              {/* Inclusion Note */}
              <div className="p-3.5 bg-black/50 rounded-xl border border-white/10 text-[11px] text-white/70 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold font-display uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>All-Inclusive Package Features</span>
                </div>
                <p>
                  Includes {tripType === "car" ? "Mahindra Thar 4x4 / Fortuner vehicle" : "Royal Enfield Himalayan 450 bike"} + Luggage Backup Van + Road Marshal + Stays + Meals + Inner Line Permits (ILP).
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold font-display uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all shadow-glow-red hover:scale-[1.01]"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Expedition Enquiry
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
