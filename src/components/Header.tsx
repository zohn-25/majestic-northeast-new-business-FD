"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageCircle, Menu, X, MapPin, ChevronRight, ShieldCheck, Clock, Calendar, Sun, Moon } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { MiniOffroadCar } from "./ui/MiniOffroadCar";
import { EnquiryModal } from "./EnquiryModal";

interface HeaderProps {
  onOpenEnquire?: (mode?: "rental" | "tour") => void;
}

export function Header({ onOpenEnquire }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [internalModalOpen, setInternalModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsAppUrl = buildWhatsAppUrl(
    "919876543210",
    "Hi Majestic Northeast! I want to check dates for upcoming 4x4 Car Trips and Bike Expeditions."
  );

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  const handleBookClick = () => {
    if (onOpenEnquire) {
      onOpenEnquire("tour");
    } else {
      setInternalModalOpen(true);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Group Expeditions", href: "/tours" },
    { name: "Destinations", href: "/destinations" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 lg:gap-6 relative">
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

            {/* Clean Desktop Navigation Links - Single Horizontal Line with Text Color Change */}
            <nav className="hidden lg:flex items-center gap-2 xl:gap-4 text-xs font-bold uppercase tracking-wider font-display">
              {navLinks.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors duration-200 ${
                      active
                        ? "text-brand-red font-black"
                        : "text-white/80 hover:text-brand-red"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Controls: Theme Switcher & Book CTA */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Quick Call Icon (Mobile Only) */}
              <a
                href="tel:+919876543210"
                aria-label="Call Trip Desk"
                className="sm:hidden w-9 h-9 rounded-lg bg-white/10 border border-white/15 text-brand-red flex items-center justify-center"
              >
                <Phone className="w-4 h-4" />
              </a>

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

              {/* Book Group Trip Button - Always Present Across All Pages */}
              <button
                type="button"
                onClick={handleBookClick}
                className="hidden sm:flex px-5 py-2.5 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold font-display uppercase tracking-widest rounded-lg transition-all shadow-glow-red hover:scale-[1.02] items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Group Trip</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
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
          <div className="lg:hidden bg-[#0B0C0E] border-b border-white/10 px-5 pt-4 pb-6 space-y-4 text-white shadow-2xl animate-in slide-in-from-top duration-200">
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

            <nav className="flex flex-col space-y-1 text-xs font-bold uppercase tracking-wider font-display">
              {navLinks.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2.5 px-3 rounded-lg flex items-center justify-between transition-colors ${
                      active
                        ? "text-brand-red font-black bg-brand-red/10"
                        : "text-white/80 hover:text-brand-red hover:bg-white/5"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className={`w-4 h-4 ${active ? "text-brand-red" : "text-white/30"}`} />
                  </Link>
                );
              })}
            </nav>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleBookClick();
                }}
                className="w-full py-3 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold font-display uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-glow-red"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Group Trip</span>
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href="tel:+919876543210"
                  className="py-2.5 rounded-lg bg-white/10 text-white text-xs font-bold font-display uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-4 h-4 text-brand-red" />
                  Call Now
                </a>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 rounded-lg bg-emerald-600 text-white text-xs font-bold font-display uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Fallback Built-in Enquiry Modal for Pages without Custom Handlers */}
      <EnquiryModal
        isOpen={internalModalOpen}
        onClose={() => setInternalModalOpen(false)}
        initialMode="tour"
      />
    </>
  );
}
