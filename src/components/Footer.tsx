import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, ShieldCheck, Compass, Car, Bike, Truck, Wrench } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/utils";

export function Footer() {
  const whatsAppUrl = buildWhatsAppUrl("919876543210", "Hi Majestic Northeast team! I'd like to get in touch regarding upcoming group trips.");

  return (
    <footer className="bg-black text-white text-xs pt-16 pb-24 lg:pb-12 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-14 border-b border-white/10 text-left">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-brand-red text-white flex items-center justify-center font-display font-black text-xl italic shadow-glow-red">
                MN
              </div>
              <div>
                <span className="text-xl font-black font-display tracking-tight text-white block uppercase">
                  MAJESTIC NORTHEAST
                </span>
                <span className="text-[10px] font-bold text-brand-red uppercase tracking-widest block font-body">
                  4x4 Car & Bike Group Expeditions
                </span>
              </div>
            </Link>

            <p className="text-white/70 text-xs leading-relaxed max-w-sm font-normal">
              Northeast India&apos;s leading guided 4x4 car convoy and motorcycle adventure expedition provider. Headquartered in Guwahati with operational depots across Meghalaya, Arunachal Pradesh, and Sikkim.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-black font-display uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp Us
              </a>

              <a
                href="tel:+919876543210"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded text-xs font-black font-display uppercase tracking-wider flex items-center gap-1.5 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-brand-red" />
                Call Desk
              </a>
            </div>
          </div>

          {/* 4x4 Car Trips */}
          <div className="space-y-4">
            <h4 className="text-xs font-black font-display uppercase tracking-widest text-white">
              4x4 Car Trips
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70 font-semibold font-display">
              <li>
                <Link href="/rentals" className="hover:text-brand-red transition-colors flex items-center gap-1.5">
                  <Car className="w-3 h-3 text-brand-red" /> 7D Tawang 4x4 Thar Convoy
                </Link>
              </li>
              <li>
                <Link href="/rentals" className="hover:text-brand-red transition-colors flex items-center gap-1.5">
                  <Car className="w-3 h-3 text-brand-red" /> 5D Meghalaya Off-Road Circuit
                </Link>
              </li>
              <li>
                <Link href="/rentals" className="hover:text-brand-red transition-colors flex items-center gap-1.5">
                  <Car className="w-3 h-3 text-brand-red" /> 6D Kaziranga Rhino 4x4 Trail
                </Link>
              </li>
              <li>
                <Link href="/rentals" className="hover:text-brand-red transition-colors flex items-center gap-1.5">
                  <Car className="w-3 h-3 text-brand-red" /> 6D North Sikkim 17,800ft 4x4
                </Link>
              </li>
            </ul>
          </div>

          {/* Bike Expeditions */}
          <div className="space-y-4">
            <h4 className="text-xs font-black font-display uppercase tracking-widest text-white">
              Bike Expeditions
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70 font-semibold font-display">
              <li>
                <Link href="/tours" className="hover:text-brand-red transition-colors flex items-center gap-1.5">
                  <Bike className="w-3 h-3 text-brand-red" /> 7D Tawang Himalayan Ride
                </Link>
              </li>
              <li>
                <Link href="/tours" className="hover:text-brand-red transition-colors flex items-center gap-1.5">
                  <Bike className="w-3 h-3 text-brand-red" /> 6D Silk Route Zuluk 32-Loops
                </Link>
              </li>
              <li>
                <Link href="/tours" className="hover:text-brand-red transition-colors flex items-center gap-1.5">
                  <Bike className="w-3 h-3 text-brand-red" /> 5D Meghalaya Cloud Riders
                </Link>
              </li>
              <li>
                <Link href="/tours" className="hover:text-brand-red transition-colors flex items-center gap-1.5">
                  <Bike className="w-3 h-3 text-brand-red" /> 8D Nagaland Hornbill & Dzukou
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Hub */}
          <div className="space-y-4">
            <h4 className="text-xs font-black font-display uppercase tracking-widest text-white">
              Expedition Hubs
            </h4>
            <ul className="space-y-3 text-xs text-white/70 font-normal">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0 mt-0.5" />
                <span>GS Road, Dispur, Guwahati, Assam 781006</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-red shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-red shrink-0" />
                <span>booking@majesticnortheast.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/50">
          <p>© {new Date().getFullYear()} Majestic Northeast Adventures Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold font-display uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              All-Inclusive Group Expeditions With Backup Crew
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
