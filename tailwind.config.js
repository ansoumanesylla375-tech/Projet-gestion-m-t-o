/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backstage: {
          DEFAULT: "#12131A",
          soft: "#1C1E29",
          line: "#2A2D3A",
        },
        spotlight: {
          DEFAULT: "#4F46E5",
          light: "#6366F1",
          dark: "#3730A3",
        },
        ticket: {
          DEFAULT: "#F5A623",
          soft: "#FEF0D9",
        },
        canvas: "#F6F7FB",
        ink: {
          DEFAULT: "#12131A",
          muted: "#6B7280",
        },
        success: "#16A34A",
        danger: "#DC2626",
        line: "#E5E7EB",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(79,70,229,0.15), 0 8px 24px -8px rgba(79,70,229,0.35)",
        card: "0 1px 2px rgba(18,19,26,0.04), 0 8px 24px -12px rgba(18,19,26,0.12)",
      },
    },
  },
  plugins: [],
};
