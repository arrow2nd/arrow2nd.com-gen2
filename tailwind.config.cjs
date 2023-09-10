/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        default: ['"Zen Maru Gothic"', "sans-serif"]
      },
      colors: {
        main: "#434343",
        sub: "#595959",
        background: "#FBFBFB",
        sea: "#45A3CC"
      }
    }
  },
  plugins: []
};
