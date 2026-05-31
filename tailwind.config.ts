import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        surfaceSoft: "var(--surface-soft)",
        border: "var(--border)",
        accentBlue: "var(--accent-blue)",
        accentCyan: "var(--accent-cyan)",
        accentPurple: "var(--accent-purple)",
        accentSoft: "var(--accent-soft)"
      },
      boxShadow: {
        panel: "var(--shadow-card)",
        glow: "var(--shadow-soft)"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(86,72,56,0.032) 1px, transparent 1px), linear-gradient(90deg, rgba(86,72,56,0.032) 1px, transparent 1px)"
      },
      fontFamily: {
        sans: [
          "\"Geist\"",
          "\"Inter\"",
          "\"PingFang SC\"",
          "\"Noto Sans SC\"",
          "system-ui",
          "sans-serif"
        ],
        display: [
          "\"Geist\"",
          "\"Inter\"",
          "\"PingFang SC\"",
          "\"Noto Sans SC\"",
          "system-ui",
          "sans-serif"
        ]
      },
      letterSpacing: {
        display: "0"
      }
    }
  },
  plugins: []
};

export default config;
