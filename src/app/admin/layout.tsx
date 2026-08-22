"use client";

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
  Users,
  Sun,
  Moon,
} from "lucide-react";
import { useData } from "@/context/DataContext";
import { useTheme } from "@/context/ThemeContext";
import { ToastProvider } from "@/components/admin/Toast";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const { theme, toggleTheme } = useTheme();

  // In-memory data counts & auth from DataContext
  const {
    vehicles,
    tours,
    destinations,
    enquiries,
    galleryImages,
    batches,
    isAdminLoggedIn,
    logoutAdmin,
  } = useData();

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
    return <ToastProvider>{children}</ToastProvider>;
  }

  if (isCheckingAuth || !isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B0D10] flex flex-col items-center justify-center text-slate-900 dark:text-white space-y-3">
        <div className="w-7 h-7 border-2 border-slate-300 dark:border-white/20 border-t-brand-red rounded-full animate-spin" />
        <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
          Authenticating Admin...
        </span>
      </div>
    );
  }

  const pendingEnquiriesCount = enquiries.filter((e) => e.status === "New").length;
  const inProgressBatchesCount = batches.filter((b) => b.status === "Departed / In Progress").length;

  const navItems = [
    {
      name: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
      badge: null,
      exact: true,
    },
    {
      name: "Vehicles Fleet",
      href: "/admin/vehicles",
      icon: Car,
      badge: `${vehicles.length}`,
      exact: false,
    },
    {
      name: "Guided Tours",
      href: "/admin/tours",
      icon: Compass,
      badge: `${tours.length}`,
      exact: false,
    },
    {
      name: "Passenger Manifest",
      href: "/admin/batches",
      icon: Users,
      badge: inProgressBatchesCount > 0 ? `${inProgressBatchesCount} Active` : `${batches.length}`,
      badgeHighlight: inProgressBatchesCount > 0,
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
      badge: pendingEnquiriesCount > 0 ? `${pendingEnquiriesCount}` : `${enquiries.length}`,
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
      name: "Console Settings",
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
    <ToastProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B0D10] text-slate-900 dark:text-zinc-100 flex font-body antialiased selection:bg-brand-red/20 selection:text-brand-red">
        
        {/* ========================================================================= */}
        {/* 1. DESKTOP SIDEBAR (Adaptive Light / Dark Minimalist style)               */}
        {/* ========================================================================= */}
        <aside className="hidden lg:flex w-64 bg-white dark:bg-[#111318] border-r border-slate-200 dark:border-white/[0.08] flex-col justify-between shrink-0 fixed inset-y-0 left-0 z-30 transition-colors">
          
          {/* Top: Brand Badge & Navigation */}
          <div className="flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/5 p-4 space-y-6">
            
            {/* Brand Header */}
            <div className="flex items-center justify-between px-2 pt-1 pb-3 border-b border-slate-200 dark:border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-red/10 dark:bg-white/10 border border-brand-red/20 dark:border-white/15 flex items-center justify-center shrink-0">
                  <span className="text-xs font-black font-display text-brand-red dark:text-white">M</span>
                </div>
                <div className="leading-tight">
                  <span className="text-xs font-bold font-display uppercase tracking-wider text-slate-900 dark:text-white block">
                    Majestic Console
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono block">
                    v2.0 • Admin Panel
                  </span>
                </div>
              </div>

              {/* Sidebar Theme Button */}
              <button
                type="button"
                onClick={toggleTheme}
                title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-600 dark:text-zinc-300 flex items-center justify-center transition-colors border border-slate-200 dark:border-white/[0.08]"
              >
                {theme === "dark" ? (
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-slate-700" />
                )}
              </button>
            </div>

            {/* Nav Links */}
            <div className="space-y-1 flex-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-zinc-500 px-3 block mb-2">
                Navigation
              </span>
              {navItems.map((item) => {
                const active = isRouteActive(item.href, item.exact);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      active
                        ? "bg-slate-100 dark:bg-white/[0.08] text-slate-900 dark:text-white border-l-2 border-brand-red font-semibold pl-2.5 shadow-sm"
                        : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 ${
                          active ? "text-brand-red dark:text-white" : "text-slate-400 dark:text-zinc-500"
                        } transition-colors`}
                      />
                      <span>{item.name}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          item.badgeHighlight
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                            : active
                            ? "bg-slate-200 dark:bg-white/15 text-slate-800 dark:text-white"
                            : "bg-slate-100 dark:bg-white/[0.05] text-slate-500 dark:text-zinc-400"
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
            <div className="pt-3 border-t border-slate-200 dark:border-white/[0.08]">
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-slate-200 dark:border-white/[0.08] text-xs font-medium text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-all"
              >
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-400" />
                  <span>View Public Website</span>
                </div>
              </Link>
            </div>

            {/* User Profile & Logout Bottom Card */}
            <div className="pt-2 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/15 text-slate-700 dark:text-zinc-300 font-bold flex items-center justify-center text-xs shrink-0">
                  AD
                </div>
                <div className="leading-tight truncate">
                  <span className="text-xs font-medium text-slate-800 dark:text-zinc-200 block truncate">
                    Operations Lead
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-zinc-500 block truncate font-mono">
                    admin@majestic.com
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                title="Log Out"
                aria-label="Log Out of Console"
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-white/[0.03] hover:bg-red-500/10 hover:text-red-500 dark:hover:bg-red-500/15 dark:hover:text-red-400 border border-slate-200 dark:border-white/[0.08] flex items-center justify-center text-slate-500 dark:text-zinc-400 transition-colors shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </aside>

        {/* ========================================================================= */}
        {/* 2. MOBILE DRAWER OVERLAY (Viewport < 1024px)                              */}
        {/* ========================================================================= */}
        {mobileDrawerOpen && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 lg:hidden transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          >
            <div
              className="w-72 max-w-[85vw] bg-white dark:bg-[#111318] border-r border-slate-200 dark:border-white/15 h-full p-4 flex flex-col justify-between shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-5">
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-brand-red text-white flex items-center justify-center font-bold text-xs">
                      M
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Admin Console
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="w-7 h-7 rounded-md bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile Theme Toggle Button */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] text-xs font-medium text-slate-700 dark:text-zinc-200"
                >
                  <span className="flex items-center gap-2">
                    {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
                    <span>Theme Mode</span>
                  </span>
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-zinc-400">
                    {theme === "dark" ? "Dark (Switch to Light)" : "Light (Switch to Dark)"}
                  </span>
                </button>

                {/* Mobile Nav Links */}
                <div className="space-y-1">
                  {navItems.map((item) => {
                    const active = isRouteActive(item.href, item.exact);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileDrawerOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          active
                            ? "bg-slate-100 dark:bg-white/[0.08] text-slate-900 dark:text-white border-l-2 border-brand-red pl-2.5 font-semibold"
                            : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/[0.05] text-slate-600 dark:text-zinc-400">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Drawer Bottom Logout */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08] space-y-2">
                <Link
                  href="/"
                  target="_blank"
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-xs font-medium text-slate-700 dark:text-zinc-300"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Public Website</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-2 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out Console</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. MAIN WORKSPACE CONTAINER                                               */}
        {/* ========================================================================= */}
        <div className="flex-1 flex flex-col min-w-0 lg:pl-64 pb-16 lg:pb-6 transition-colors">
          
          {/* Top Minimalist Header Bar */}
          <header className="sticky top-0 z-20 h-14 bg-white/95 dark:bg-[#0B0D10]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/[0.08] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 transition-colors shadow-xs">
            
            {/* Left: Mobile Hamburger & Breadcrumb */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(true)}
                aria-label="Open Navigation Menu"
                className="lg:hidden w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-white/10"
              >
                <Menu className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 dark:text-zinc-500 hidden sm:inline font-mono">
                  Console
                </span>
                <ChevronRight className="w-3 h-3 text-slate-300 dark:text-zinc-600 hidden sm:inline" />
                <h2 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-zinc-100 capitalize truncate">
                  {pathname === "/admin"
                    ? "Operations Overview"
                    : pathname.replace("/admin/", "").replace("-", " ")}
                </h2>
              </div>
            </div>

            {/* Right: Quick Links, Theme Toggle & Profile Pill */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* THEME TOGGLE BUTTON WITH VISIBLE LABEL / ICON */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle Dark and Light theme"
                title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08] text-xs font-medium text-slate-700 dark:text-zinc-200 transition-all shadow-xs"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline text-[11px] font-mono font-semibold">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-slate-700" />
                    <span className="hidden sm:inline text-[11px] font-mono font-semibold">Dark Mode</span>
                  </>
                )}
              </button>

              {/* Quick Live Link */}
              <Link
                href="/"
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08] text-xs text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-xs"
              >
                <ExternalLink className="w-3 h-3 text-slate-400 dark:text-zinc-400" />
                <span>Live Site</span>
              </Link>

              {/* Notification Bell */}
              <Link
                href="/admin/enquiries"
                className="relative w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/[0.03] hover:bg-slate-200 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                title={`${pendingEnquiriesCount} New Leads`}
              >
                <Bell className="w-3.5 h-3.5" />
                {pendingEnquiriesCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500" />
                )}
              </Link>

              {/* Minimal Avatar */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-white/[0.08]">
                <div className="w-7 h-7 rounded-lg bg-slate-900 text-white dark:bg-white/10 dark:text-zinc-200 border border-slate-700 dark:border-white/15 font-semibold text-xs flex items-center justify-center shadow-xs">
                  A
                </div>
              </div>
            </div>
          </header>

          {/* Dynamic Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>

        {/* ========================================================================= */}
        {/* 4. MOBILE BOTTOM TAB BAR (375px Thumb Reach)                              */}
        {/* ========================================================================= */}
        <nav
          aria-label="Mobile Admin Bottom Bar"
          className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-[#111318]/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/[0.08] px-3 py-1.5 flex items-center justify-around shadow-lg"
        >
          <Link
            href="/admin"
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-md text-[10px] font-medium transition-colors ${
              pathname === "/admin" ? "text-brand-red dark:text-white font-semibold" : "text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-zinc-300"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview</span>
          </Link>

          <Link
            href="/admin/vehicles"
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-md text-[10px] font-medium transition-colors ${
              pathname.startsWith("/admin/vehicles") ? "text-brand-red dark:text-white font-semibold" : "text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-zinc-300"
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Fleet</span>
          </Link>

          <Link
            href="/admin/batches"
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-md text-[10px] font-medium transition-colors ${
              pathname.startsWith("/admin/batches") ? "text-brand-red dark:text-white font-semibold" : "text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-zinc-300"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Manifest</span>
          </Link>

          <Link
            href="/admin/tours"
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-md text-[10px] font-medium transition-colors ${
              pathname.startsWith("/admin/tours") ? "text-brand-red dark:text-white font-semibold" : "text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-zinc-300"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Tours</span>
          </Link>

          <Link
            href="/admin/enquiries"
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-md text-[10px] font-medium transition-colors ${
              pathname.startsWith("/admin/enquiries") ? "text-brand-red dark:text-white font-semibold" : "text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-zinc-300"
            }`}
          >
            <MessageSquareText className="w-4 h-4" />
            <span>Leads</span>
          </Link>
        </nav>

      </div>
    </ToastProvider>
  );
}
