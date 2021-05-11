// tailwind.config.js
const colors = require("tailwindcss/colors")
module.exports = {
  mode: "jit",
  purge: {
    content: ["./app/**/*.{js,ts,jsx,tsx}"],
    mode: "all",
    preserveHtmlElements: false,
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.emerald,
        fuchsia: colors.fuchsia,
        emerald: colors.emerald,
        rose: colors.rose,
        pink: colors.pink,
        amber: colors.amber,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
