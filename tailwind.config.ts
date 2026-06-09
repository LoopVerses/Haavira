import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        surface: "#f5f5f5",
        border: "#e8e8e8",
        gold: "#C9A84C",
        crimson: "#8B0000",
        white: "#ffffff",
        muted: "#6b6b6b",
        foreground: "#111111",
      },
      fontFamily: {
        display: ["var(--font-display)", "Playfair Display", "serif"],
        sans: ["var(--font-sans)", "Inter", "DM Sans", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        editorial: "0.15em",
        wide: "0.25em",
      },
    },
  },
  plugins: [],
};

export default config;
