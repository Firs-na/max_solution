import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#00234b", soft: "#1a3560" },
        sun: { DEFAULT: "#ffb454", deep: "#7a4b00" },
        surface: "#f8f9ff",
        chip: "#d6e4ff",
        ink: "#3d4452",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
