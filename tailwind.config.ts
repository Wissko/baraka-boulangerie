import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FAF7F2",
          warm: "#F5F0E8",
        },
        gold: {
          DEFAULT: "#C9A96E",
          dark: "#B8943A",
          light: "#DFC08A",
        },
        ink: {
          DEFAULT: "#1A1410",
          soft: "#3D2F22",
        },
        brown: {
          DEFAULT: "#8B6F47",
          light: "#A8875E",
        },
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        playfair: ["var(--font-playfair)", "serif"],
        dm: ["var(--font-dm-sans)", "sans-serif"],
        dancing: ["var(--font-dancing)", "cursive"],
      },
      letterSpacing: {
        widest: "0.25em",
        "ultra-wide": "0.35em",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
  plugins: [],
};
export default config;
