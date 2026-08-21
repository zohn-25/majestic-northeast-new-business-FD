import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Northeast India State Travel Guides — All 8 Sister States — Majestic Northeast",
  description: "Comprehensive travel guides, best times to visit, Inner Line Permit (ILP) rules, and road trip circuits for Meghalaya, Assam, Arunachal Pradesh, Nagaland, Sikkim, Mizoram, Tripura & Manipur.",
  keywords: [
    "Meghalaya travel guide",
    "Arunachal Pradesh ILP permit",
    "Assam Kaziranga safari",
    "Sikkim travel guide",
    "Nagaland Hornbill festival guide",
  ],
};

export default function DestinationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
