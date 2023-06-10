/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        default: ['"Zen Maru Gothic"', "sans-serif"],
      },
      colors: {
        main: "#434343",
        background: "#FBFBFB",
        black: "#1C1C1C",
        sea: "#45A3CC",
      },
      letterSpacing: {
        0.2: ".2rem",
        0.4: ".4rem",
      },
    },
  },
  plugins: [],
};
