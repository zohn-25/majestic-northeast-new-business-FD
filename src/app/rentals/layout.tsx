import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car & Bike Rentals in Guwahati, Shillong & Meghalaya — Majestic Northeast",
  description: "Rent 4x4 Mahindra Thar, Royal Enfield Himalayan 450, Toyota Fortuner, Jimny & Force Traveller for self-drive road trips across Northeast India. Commercial permits & 24/7 support.",
  keywords: [
    "Car rental Guwahati",
    "Bike rental Guwahati",
    "Thar 4x4 rental Shillong",
    "Himalayan 450 bike rental",
    "Self drive car Guwahati airport",
    "Self drive car Shillong",
  ],
};

export default function RentalsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
