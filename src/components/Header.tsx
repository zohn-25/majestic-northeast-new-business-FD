"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, Car, Bike, Phone, MessageCircle, Menu, X, MapPin, ChevronRight, ShieldCheck, Clock, Calendar, Sun, Moon, Sparkles } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { MiniOffroadCar } from "./ui/MiniOffroadCar";
import { PaintBrushDivider } from "./ui/PaintBrushDivider";

interface HeaderProps {
  onOpenEnquire?: (mode?: "rental" | "tour") => void;
}

export function Header({ onOpenEnquire }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsAppUrl = buildWhatsAppUrl("919876543210", "Hi Majestic Northeast! I want to check dates for upcoming 4x4 Car Trips and Bike Expeditions.");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-auto transition-colors duration-300">
      {/* 1. Top Utility Info Strip */}
      <div className="bg-[#07080A] text-white/80 border-b border-white/10 text-[11px] py-1.5 px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Contact Info & Hub Locations */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-white">
              <span className="text-[10px] font-bold font-display text-brand-red uppercase tracking-widest">CALL US:</span>
              <a href="tel:+919876543210" className="font-bold hover:text-brand-red transition-colors font-display tracking-wide">
                +91 98765 43210
              </a>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-white/60 font-medium">
              <MapPin className="w-3 h-3 text-brand-red" />
              <span>Depots in Guwahati Airport & Shillong</span>
            </div>
            <div className="hidden xl:flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-3 h-3" />
              <span>Certified Road Marshals & Backup Mechanic Van</span>
            </div>
          </div>

          {/* Right: Operating Hours, WhatsApp Link & Theme Toggle */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-white/60 font-medium">
              <Clock className="w-3 h-3 text-brand-red" />
              <span>All-Inclusive Fixed Departures</span>
            </div>
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition-colors font-display tracking-wide"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp Trip Desk</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div
        className={`bg-[#0B0C0E]/95 dark:bg-[#0B0C0E]/95 backdrop-blur-xl border-b border-white/10 dark:border-white/10 transition-all duration-300 relative ${
          scrolled ? "py-2.5 shadow-2xl" : "py-3 sm:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6 relative">
          {/* Brand Logo: Clean Oval Automotive Badge */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative h-11 w-28 sm:w-32 bg-brand-red rounded-full flex items-center justify-center shadow-lg shadow-brand-red/40 border-2 border-white group-hover:scale-105 transition-transform px-2">
              <div className="text-center leading-none">
                <span className="text-xs sm:text-sm font-bold font-display tracking-wide text-white block italic">
                  MAJESTIC
                </span>
                <span className="text-[7px] font-bold tracking-widest text-white/95 uppercase block font-body mt-0.5">
                  NORTHEAST
                </span>
              </div>
            </div>
          </Link>

          {/* Clean Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-3 text-xs font-bold uppercase tracking-wider text-white font-display">
            <Link
              href="/"
              className="px-3.5 py-2 rounded-lg hover:bg-white/10 hover:text-brand-red transition-all"
            >
              Home
            </Link>

            {/* Single Overall Car & Bike Expeditions Search Page */}
            <Link
              href="/tours"
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-brand-red border border-white/10 hover:border-brand-red text-white transition-all flex items-center gap-2 shadow-sm group"
            >
              <Compass className="w-3.5 h-3.5 text-brand-red group-hover:text-white transition-colors" />
              <span>Group Expeditions (4x4 & Bikes)</span>
              <span className="text-[9px] bg-brand-red group-hover:bg-white group-hover:text-brand-red text-white px-1.5 py-0.5 rounded font-black">
                Search
              </span>
            </Link>

            <Link
              href="/destinations"
              className="px-3.5 py-2 rounded-lg hover:bg-white/10 hover:text-brand-red transition-all"
            >
              Destinations
            </Link>

            <Link
              href="/about"
              className="px-3.5 py-2 rounded-lg hover:bg-white/10 hover:text-brand-red transition-all"
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className="px-3.5 py-2 rounded-lg hover:bg-white/10 hover:text-brand-red transition-all"
            >
              Contact
            </Link>

          </nav>

          {/* Right Action Controls: Theme Switcher & Book CTA */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Dark/Light Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark and light theme"
              className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-all hover:scale-105"
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-brand-red" />
              )}
            </button>

            {onOpenEnquire && (
              <button
                onClick={() => onOpenEnquire("tour")}
                className="px-5 py-2.5 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold font-display uppercase tracking-widest rounded-lg transition-all shadow-glow-red hover:scale-[1.02] flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Group Trip</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-lg bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Animated 4x4 Offroad Car Cruising Across Navbar Bottom Border From Right to Left */}
        <div className="absolute -bottom-[6px] pointer-events-auto z-30 animate-car-cruise hidden sm:block">
          <Link
            href="/rentals"
            title="Explore 4x4 Offroad Expeditions"
            className="inline-block cursor-pointer"
          >
            <MiniOffroadCar size={26} />
          </Link>
        </div>
      </div>


      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0C0E] border-b border-white/10 px-6 pt-4 pb-6 space-y-4 text-white shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider text-white/60 font-display">Theme Preference</span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/10 text-xs font-bold text-white uppercase font-display"
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-brand-red" />}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>

          <nav className="flex flex-col space-y-3 text-xs font-bold uppercase tracking-wider font-display">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5 hover:text-brand-red flex items-center justify-between">
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-white/30" />
            </Link>

            <Link href="/tours" onClick={() => setMobileMenuOpen(false)} className="py-2.5 border-b border-white/5 hover:text-brand-red flex items-center justify-between text-brand-red font-bold">
              <span className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-brand-red" />
                Group Expeditions (4x4 Cars & Bikes)
              </span>
              <ChevronRight className="w-4 h-4 text-white/30" />
            </Link>

            <Link href="/destinations" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5 hover:text-brand-red flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-red" />
                8 Sister States
              </span>
              <ChevronRight className="w-4 h-4 text-white/30" />
            </Link>

            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5 hover:text-brand-red flex items-center justify-between">
              <span>About Us</span>
              <ChevronRight className="w-4 h-4 text-white/30" />
            </Link>

            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5 hover:text-brand-red flex items-center justify-between">
              <span>Contact Us</span>
              <ChevronRight className="w-4 h-4 text-white/30" />
            </Link>
          </nav>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <a href="tel:+919876543210" className="py-3 rounded-lg bg-white/10 text-white text-xs font-bold font-display uppercase tracking-wider flex items-center justify-center gap-1.5">
              <Phone className="w-4 h-4 text-brand-red" />
              Call Now
            </a>
            <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="py-3 rounded-lg bg-emerald-600 text-white text-xs font-bold font-display uppercase tracking-wider flex items-center justify-center gap-1.5">
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
