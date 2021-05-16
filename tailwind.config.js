// tailwind.config.js
const colors = require("tailwindcss/colors")
module.exports = {
  purge: {
    content: ["./app/**/*.{js,ts,jsx,tsx}"],
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
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
  ],
}
