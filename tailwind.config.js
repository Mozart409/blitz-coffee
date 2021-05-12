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
        rosa: colors.rosa,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
}
