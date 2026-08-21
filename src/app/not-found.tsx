import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Compass, ArrowLeft, Car, MapPin } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-brand-dark text-gray-100 flex flex-col justify-between pt-24">
      <Header />

      <div className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-brand-card border border-white/10 rounded-3xl p-8 sm:p-12 space-y-6 shadow-2xl my-12">
          <div className="w-16 h-16 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange flex items-center justify-center mx-auto">
            <Compass className="w-9 h-9 animate-spin" style={{ animationDuration: "12s" }} />
          </div>

          <div className="space-y-2">
            <span className="text-4xl font-extrabold font-display text-brand-orange block">404</span>
            <h1 className="text-2xl font-bold font-display text-white">OFF THE MAP</h1>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              The page or mountain trail you are looking for does not exist or has been relocated.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/"
              className="w-full py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-orange/30"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Homepage
            </Link>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/rentals"
                className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-semibold flex items-center justify-center gap-1.5"
              >
                <Car className="w-3.5 h-3.5 text-brand-orange" />
                Rentals
              </Link>

              <Link
                href="/tours"
                className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-semibold flex items-center justify-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5 text-brand-orange" />
                Tours
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
