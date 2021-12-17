// tailwind.config.js
const colors = require("tailwindcss/colors")
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.emerald,
        sky: colors.sky,
        teal: colors.teal,
        rose: colors.rose,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
}
