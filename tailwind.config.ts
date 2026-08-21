import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0B0C0E",
          "dark-card": "#131518",
          "dark-elevated": "#1A1D22",
          surface: "#14161A",
          border: "#262A30",
          "border-light": "rgba(255, 255, 255, 0.12)",
          red: "#E61A24",
          "red-hover": "#C4121B",
          "red-light": "#FF3842",
          "red-glow": "rgba(230, 26, 36, 0.25)",
          silver: "#F3F4F6",
          muted: "#8E95A0",
          accent: "#E61A24",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Outfit", "sans-serif"],
        body: ["var(--font-body)", "Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        "glow-red": "0 0 25px rgba(230, 26, 36, 0.35)",
        "card-dark": "0 10px 30px -10px rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [],
};
export default config;
