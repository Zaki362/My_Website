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
        stroke: "var(--stroke)",
        accent: "var(--accent)",
        accentSoft: "var(--accent-soft)"
      },
      boxShadow: {
        panel: "0 20px 60px rgba(5, 10, 25, 0.45)",
        glow: "0 0 0 1px rgba(131, 206, 255, 0.1), 0 16px 45px rgba(59, 130, 246, 0.18)"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)"
      },
      fontFamily: {
        sans: [
          "\"PingFang SC\"",
          "\"Hiragino Sans GB\"",
          "\"Noto Sans SC\"",
          "\"Microsoft YaHei\"",
          "system-ui",
          "sans-serif"
        ],
        display: [
          "\"Avenir Next\"",
          "\"SF Pro Display\"",
          "\"PingFang SC\"",
          "\"Noto Sans SC\"",
          "system-ui",
          "sans-serif"
        ]
      },
      letterSpacing: {
        display: "-0.04em"
      }
    }
  },
  plugins: []
};

export default config;
