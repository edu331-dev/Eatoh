import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content:  ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans:    ["DM Sans", "system-ui", "sans-serif"],
      },
      colors: {
        cream:      "#FAF6F0",
        ink:        "#1A1208",
        brown:      "#5C3D1E",
        amber:      "#C8873F",
        sage:       "#6B8C6B",
        terracotta: "#C1614A",
        muted:      "#9A8B7A",
      },
      borderRadius: { "4xl": "2rem" },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config;