/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#feb700",
          light: "#fff8dc",
          dark: "#b8860b",
          muted: "#d4930f",
        },
        burgundy: "#a73a00",
        // dark sections → espresso brown
        dark: {
          DEFAULT: "#2C1610",
          100: "#1C0E08",
          200: "#251108",
          300: "#2C1610",
          400: "#3D2016",
          500: "#5A3020",
        },
        // warm amber palette
        uber: {
          gray1: "#f4e8bd",
          gray2: "#e8d9b0",
          gray3: "#c9b48a",
          gray4: "#7a5030",
          gray5: "#1a0a00",
          border: "#e8d9b0",
        },
      },
      fontFamily: {
        tajawal: ["Tajawal", "sans-serif"],
        noto:    ["Noto Naskh Arabic", "serif"],
      },
      animation: {
        scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        "fade-up": "fadeUp 0.5s ease-out forwards",
      },
      keyframes: {
        scroll: {
          to: { transform: "translate(calc(-50% - 0.5rem))" },
        },
        fadeUp: {
          from: { opacity: 0, transform: "translateY(24px)" },
          to:   { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
