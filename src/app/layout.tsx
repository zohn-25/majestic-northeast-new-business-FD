import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const outfit = Outfit({
  weight: ["500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Majestic Northeast — 4x4 Car & Bike Group Expeditions",
  description: "Join guided 4x4 SUV convoys (Mahindra Thar / Fortuner) and Royal Enfield Himalayan motorcycle expeditions across Meghalaya, Tawang, Sikkim & Nagaland.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${outfit.variable} ${plusJakartaSans.variable}`}>
      <body className={`${plusJakartaSans.className} bg-[#0B0C0E] dark:bg-[#0B0C0E] text-[#111827] dark:text-[#F3F4F6] font-body antialiased min-h-screen flex flex-col selection:bg-brand-red selection:text-white transition-colors duration-300`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
