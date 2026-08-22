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
} from "lucide-react";
import { useData } from "@/context/DataContext";
import { ToastProvider } from "@/components/admin/Toast";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

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
      <div className="min-h-screen bg-[#0B0D10] flex flex-col items-center justify-center text-white space-y-3">
        <div className="w-7 h-7 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        <span className="text-xs font-mono text-zinc-400">
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
      <div className="min-h-screen bg-[#0B0D10] text-zinc-100 flex font-body antialiased selection:bg-white/20 selection:text-white">
        
        {/* ========================================================================= */}
        {/* 1. DESKTOP SIDEBAR (Minimalist Graphite Linear / Vercel style)             */}
        {/* ========================================================================= */}
        <aside className="hidden lg:flex w-64 bg-[#111318] border-r border-white/[0.08] flex-col justify-between shrink-0 fixed inset-y-0 left-0 z-30">
          
          {/* Top: Brand Badge & Navigation */}
          <div className="flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 p-4 space-y-6">
            
            {/* Brand Header */}
            <div className="flex items-center gap-3 px-2 pt-1 pb-3 border-b border-white/[0.08]">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                <span className="text-xs font-black font-display text-white">M</span>
              </div>
              <div className="leading-tight">
                <span className="text-xs font-bold font-display uppercase tracking-wider text-white block">
                  Majestic Console
                </span>
                <span className="text-[10px] text-zinc-400 font-mono block">
                  v2.0 • Admin Panel
                </span>
              </div>
            </div>

            {/* Nav Links */}
            <div className="space-y-1 flex-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 px-3 block mb-2">
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
                        ? "bg-white/[0.08] text-white border-l-2 border-brand-red font-semibold pl-2.5"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 ${
                          active ? "text-white" : "text-zinc-500"
                        } transition-colors`}
                      />
                      <span>{item.name}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          item.badgeHighlight
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : active
                            ? "bg-white/15 text-white"
                            : "bg-white/[0.05] text-zinc-400"
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
            <div className="pt-3 border-t border-white/[0.08]">
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-xs font-medium text-zinc-300 hover:text-white transition-all"
              >
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                  <span>View Public Website</span>
                </div>
              </Link>
            </div>

            {/* User Profile & Logout Bottom Card */}
            <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 text-zinc-300 font-bold flex items-center justify-center text-xs shrink-0">
                  AD
                </div>
                <div className="leading-tight truncate">
                  <span className="text-xs font-medium text-zinc-200 block truncate">
                    Operations Lead
                  </span>
                  <span className="text-[10px] text-zinc-500 block truncate font-mono">
                    admin@majestic.com
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                title="Log Out"
                aria-label="Log Out of Console"
                className="w-7 h-7 rounded-lg bg-white/[0.03] hover:bg-red-500/15 hover:text-red-400 border border-white/[0.08] flex items-center justify-center text-zinc-400 transition-colors shrink-0"
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          >
            <div
              className="w-72 max-w-[85vw] bg-[#111318] border-r border-white/15 h-full p-4 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-5">
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center font-bold text-white text-xs">
                      M
                    </div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Admin Console
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

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
                            ? "bg-white/[0.08] text-white border-l-2 border-brand-red pl-2.5 font-semibold"
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-zinc-400">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Drawer Bottom Logout */}
              <div className="pt-4 border-t border-white/[0.08] space-y-2">
                <Link
                  href="/"
                  target="_blank"
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-zinc-300"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Public Website</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-2 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2"
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
        <div className="flex-1 flex flex-col min-w-0 lg:pl-64 pb-16 lg:pb-6">
          
          {/* Top Minimalist Header Bar */}
          <header className="sticky top-0 z-20 h-14 bg-[#0B0D10]/95 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            
            {/* Left: Mobile Hamburger & Title */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(true)}
                aria-label="Open Navigation Menu"
                className="lg:hidden w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-zinc-300 flex items-center justify-center hover:bg-white/10"
              >
                <Menu className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500 hidden sm:inline font-mono">
                  Console
                </span>
                <ChevronRight className="w-3 h-3 text-zinc-600 hidden sm:inline" />
                <h2 className="text-xs sm:text-sm font-semibold text-zinc-100 capitalize truncate">
                  {pathname === "/admin"
                    ? "Operations Overview"
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
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-zinc-300 hover:text-white transition-all"
              >
                <ExternalLink className="w-3 h-3 text-zinc-400" />
                <span>Live Site</span>
              </Link>

              {/* Notification Bell */}
              <Link
                href="/admin/enquiries"
                className="relative w-8 h-8 rounded-md bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                title={`${pendingEnquiriesCount} New Leads`}
              >
                <Bell className="w-3.5 h-3.5" />
                {pendingEnquiriesCount > 0 && (
                  <span className="absolute 1.5 -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400" />
                )}
              </Link>

              {/* Minimal Avatar */}
              <div className="flex items-center gap-2 pl-2 border-l border-white/[0.08]">
                <div className="w-6 h-6 rounded-md bg-white/10 border border-white/15 text-zinc-300 font-medium text-xs flex items-center justify-center">
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
          className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#111318]/95 backdrop-blur-xl border-t border-white/[0.08] px-3 py-1.5 flex items-center justify-around"
        >
          <Link
            href="/admin"
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-md text-[10px] font-medium transition-colors ${
              pathname === "/admin" ? "text-white font-semibold" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview</span>
          </Link>

          <Link
            href="/admin/vehicles"
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-md text-[10px] font-medium transition-colors ${
              pathname.startsWith("/admin/vehicles") ? "text-white font-semibold" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Vehicles</span>
          </Link>

          <Link
            href="/admin/tours"
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-md text-[10px] font-medium transition-colors ${
              pathname.startsWith("/admin/tours") ? "text-white font-semibold" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Tours</span>
          </Link>

          <Link
            href="/admin/batches"
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-md text-[10px] font-medium transition-colors relative ${
              pathname.startsWith("/admin/batches") ? "text-white font-semibold" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <div className="relative">
              <Users className="w-4 h-4" />
              {inProgressBatchesCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400" />
              )}
            </div>
            <span>Manifest</span>
          </Link>

          <Link
            href="/admin/enquiries"
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-md text-[10px] font-medium transition-colors relative ${
              pathname.startsWith("/admin/enquiries") ? "text-white font-semibold" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <div className="relative">
              <MessageSquareText className="w-4 h-4" />
              {pendingEnquiriesCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-1.5 h-1.5 rounded-full bg-blue-400" />
              )}
            </div>
            <span>Leads</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-md text-[10px] font-medium text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <Menu className="w-4 h-4" />
            <span>More</span>
          </button>
        </nav>

      </div>
    </ToastProvider>
  );
}
