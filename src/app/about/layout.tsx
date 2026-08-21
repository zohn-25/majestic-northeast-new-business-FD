import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Majestic Northeast Mobility & Shared Tours",
  description: "Learn about Majestic Northeast — Guwahati & Shillong based mobility operator delivering commercial yellow-board rentals, 24/7 roadside assistance, and transparent group expeditions.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
