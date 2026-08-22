"use client";

/*
  =============================================================================
  MAJESTIC NORTHEAST — ADMIN OPERATIONS CONSOLE (DEMO MODE)
  =============================================================================
  NOTE: This is a frontend-only demo admin console. All operations (add, edit,
  delete, status change) update local in-memory React Context state during the
  session. No real backend, database, or persistent auth API is attached yet.
  =============================================================================
*/

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  Compass,
  MapPin,
  MessageSquareText,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Bell,
  Sparkles,
  ChevronRight,
  User,
} from "lucide-react";
import { useData } from "@/context/DataContext";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // In-memory data counts & auth from DataContext
  const { vehicles, tours, destinations, enquiries, galleryImages, isAdminLoggedIn, logoutAdmin } = useData();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsCheckingAuth(false);
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (!isCheckingAuth && !isAdminLoggedIn && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [isCheckingAuth, isAdminLoggedIn, pathname, router]);

  // If user is on login page, don't show the dashboard shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isCheckingAuth || !isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#090A0C] flex flex-col items-center justify-center text-white space-y-3">
        <div className="w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-bold font-display uppercase tracking-widest text-white/60">
          Checking Admin Credentials...
        </span>
      </div>
    );
  }

  const pendingEnquiriesCount = enquiries.filter((e) => e.status === "New").length;

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      badge: null,
      exact: true,
    },
    {
      name: "Vehicles",
      href: "/admin/vehicles",
      icon: Car,
      badge: `${vehicles.length}`,
      exact: false,
    },
    {
      name: "Tours & Convoys",
      href: "/admin/tours",
      icon: Compass,
      badge: `${tours.length}`,
      exact: false,
    },
    {
      name: "Destinations",
      href: "/admin/destinations",
      icon: MapPin,
      badge: `${destinations.length}`,
      exact: false,
    },
    {
      name: "Enquiries & Leads",
      href: "/admin/enquiries",
      icon: MessageSquareText,
      badge: pendingEnquiriesCount > 0 ? `${pendingEnquiriesCount} New` : `${enquiries.length}`,
      badgeHighlight: pendingEnquiriesCount > 0,
      exact: false,
    },
    {
      name: "Photo Gallery",
      href: "/admin/gallery",
      icon: ImageIcon,
      badge: `${galleryImages.length}`,
      exact: false,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      badge: null,
      exact: false,
    },
  ];

  const handleLogout = () => {
    logoutAdmin();
    router.push("/admin/login");
  };

  const isRouteActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#090A0C] text-white flex font-body antialiased selection:bg-brand-red selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. DESKTOP SIDEBAR (Visible on Viewport >= 1024px)                        */}
      {/* ========================================================================= */}
      <aside className="hidden lg:flex w-64 xl:w-72 bg-[#101216] border-r border-white/10 flex-col justify-between shrink-0 fixed inset-y-0 left-0 z-30">
        
        {/* Top: Brand Badge & Navigation */}
        <div className="flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 p-5 space-y-6">
          
          {/* Brand Emblem */}
          <div className="flex items-center gap-3 pt-1 pb-2 border-b border-white/10">
            <div className="h-10 px-3.5 bg-brand-red rounded-full flex items-center justify-center shadow-lg shadow-brand-red/40 border-2 border-white/80 shrink-0">
              <span className="text-xs font-black font-display tracking-wider text-white italic">
                MAJESTIC
              </span>
            </div>
            <div className="leading-tight">
              <span className="text-xs font-black font-display uppercase tracking-wide text-white block">
                Admin Console
              </span>
              <span className="text-[10px] text-brand-red font-bold uppercase tracking-widest block font-display">
                Demo Operations
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-1.5 flex-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 font-display px-3 block mb-2">
              Operations Menu
            </span>
            {navItems.map((item) => {
              const active = isRouteActive(item.href, item.exact);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-all group ${
                    active
                      ? "bg-brand-red text-white shadow-lg shadow-brand-red/30 scale-[1.01]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        active ? "text-white" : "text-white/50 group-hover:text-brand-red"
                      } transition-colors`}
                    />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-black tracking-normal ${
                        item.badgeHighlight
                          ? "bg-emerald-500 text-white animate-pulse"
                          : active
                          ? "bg-black/30 text-white"
                          : "bg-white/10 text-white/70"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Live Website Quick Action */}
          <div className="pt-3 border-t border-white/10">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold font-display uppercase tracking-wider text-white transition-all group"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-red" />
                <span>View Public Site</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-white" />
            </Link>
          </div>

          {/* User Profile & Logout Bottom Card */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-brand-red/20 border border-brand-red/40 text-brand-red font-black font-display flex items-center justify-center text-xs shrink-0">
                AD
              </div>
              <div className="leading-tight truncate">
                <span className="text-xs font-bold font-display text-white block truncate">
                  Expedition Admin
                </span>
                <span className="text-[10px] text-white/50 block truncate">
                  Lead Dispatcher
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              title="Log Out"
              aria-label="Log Out of Console"
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 border border-white/10 flex items-center justify-center text-white/60 transition-colors shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MOBILE DRAWER OVERLAY (Viewport < 1024px)                              */}
      {/* ========================================================================= */}
      {mobileDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden transition-opacity"
          onClick={() => setMobileDrawerOpen(false)}
        >
          <div
            className="w-72 max-w-[85vw] bg-[#101216] border-r border-white/15 h-full p-5 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="h-9 px-3 bg-brand-red rounded-full flex items-center justify-center">
                  <span className="text-xs font-black font-display text-white italic">
                    MAJESTIC
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <div className="space-y-1.5">
                {navItems.map((item) => {
                  const active = isRouteActive(item.href, item.exact);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-all ${
                        active
                          ? "bg-brand-red text-white"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                            item.badgeHighlight
                              ? "bg-emerald-500 text-white"
                              : "bg-white/10 text-white/80"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile Drawer Bottom Logout */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <Link
                href="/"
                target="_blank"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold font-display text-white uppercase tracking-wider"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Live Site</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full py-2.5 bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-600 hover:text-white rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out Console</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MAIN WORKSPACE CONTAINER                                               */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 xl:pl-72 pb-16 lg:pb-6">
        
        {/* Top Operations Header Bar */}
        <header className="sticky top-0 z-20 h-16 bg-[#090A0C]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Left: Mobile Hamburger & Title */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              aria-label="Open Navigation Menu"
              className="lg:hidden w-9 h-9 rounded-xl bg-white/10 border border-white/15 text-white flex items-center justify-center hover:bg-white/20 active:scale-95"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-black font-display uppercase tracking-wider text-brand-red hidden sm:inline">
                Admin Panel
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-white/30 hidden sm:inline" />
              <h2 className="text-sm sm:text-base font-black font-display uppercase tracking-tight text-white truncate">
                {pathname === "/admin"
                  ? "Dashboard Overview"
                  : pathname.replace("/admin/", "").replace("-", " ")}
              </h2>
            </div>
          </div>

          {/* Right: Quick Links & Profile Pill */}
          <div className="flex items-center gap-2.5">
            {/* Quick Live Link */}
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-bold font-display uppercase tracking-wider text-white/90 hover:text-white transition-all"
            >
              <ExternalLink className="w-3 h-3 text-brand-red" />
              <span>Live Site</span>
            </Link>

            {/* Notification Bell with Pending count */}
            <Link
              href="/admin/enquiries"
              className="relative w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              title={`${pendingEnquiriesCount} New Enquiries`}
            >
              <Bell className="w-4 h-4" />
              {pendingEnquiriesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-red text-white text-[9px] font-black flex items-center justify-center animate-pulse">
                  {pendingEnquiriesCount}
                </span>
              )}
            </Link>

            {/* Profile Avatar Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-brand-red text-white font-bold font-display text-xs flex items-center justify-center border border-white/20">
                A
              </div>
              <span className="text-xs font-bold font-display text-white/90 hidden md:inline">
                Admin
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 4. MOBILE BOTTOM TAB BAR (Super Easy 375px Thumb Reach)                   */}
      {/* ========================================================================= */}
      <nav
        aria-label="Mobile Admin Bottom Bar"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#101216]/95 backdrop-blur-2xl border-t border-white/10 px-3 py-1.5 flex items-center justify-around"
      >
        <Link
          href="/admin"
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-[10px] font-bold font-display uppercase tracking-wider transition-colors ${
            pathname === "/admin" ? "text-brand-red" : "text-white/60 hover:text-white"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Overview</span>
        </Link>

        <Link
          href="/admin/vehicles"
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-[10px] font-bold font-display uppercase tracking-wider transition-colors ${
            pathname.startsWith("/admin/vehicles") ? "text-brand-red" : "text-white/60 hover:text-white"
          }`}
        >
          <Car className="w-4 h-4" />
          <span>Vehicles</span>
        </Link>

        <Link
          href="/admin/tours"
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-[10px] font-bold font-display uppercase tracking-wider transition-colors ${
            pathname.startsWith("/admin/tours") ? "text-brand-red" : "text-white/60 hover:text-white"
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Tours</span>
        </Link>

        <Link
          href="/admin/enquiries"
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-[10px] font-bold font-display uppercase tracking-wider transition-colors relative ${
            pathname.startsWith("/admin/enquiries") ? "text-brand-red" : "text-white/60 hover:text-white"
          }`}
        >
          <div className="relative">
            <MessageSquareText className="w-4 h-4" />
            {pendingEnquiriesCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-brand-red" />
            )}
          </div>
          <span>Leads</span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-[10px] font-bold font-display uppercase tracking-wider text-white/60 hover:text-white transition-colors"
        >
          <Menu className="w-4 h-4" />
          <span>More</span>
        </button>
      </nav>

    </div>
  );
}
