import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shared Group Tours in Meghalaya, Tawang, Sikkim & Nagaland — Majestic Northeast",
  description: "Fixed-date small group expeditions across Meghalaya root bridges, Tawang Monastery, Sikkim Silk Route, Ziro Valley & Hornbill Festival with stays, transfers & ILP permits.",
  keywords: [
    "Meghalaya shared tour",
    "Tawang group tour package",
    "Sikkim silk route tour",
    "Hornbill festival tour",
    "Northeast India small group tours",
  ],
};

export default function ToursLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
