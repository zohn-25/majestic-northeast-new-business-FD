import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Guwahati Office Location — Majestic Northeast",
  description: "Get in touch with Majestic Northeast team via Phone (+91 98765 43210), 24/7 WhatsApp, or visit our Dispur Guwahati office.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
