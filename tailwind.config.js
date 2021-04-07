const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      blue: colors.blue,
      gray: colors.blueGray,
    },
    extend: {
      opacity: {
        100: "1",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
