const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./components", "index.html"],
  darkMode: false, // or 'media' or 'class'
  mode: "jit",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      blue: colors.blue,
      lightBlue: colors.lightBlue,
      gray: colors.trueGray,
      blueGray: colors.blueGray,
      yellow: colors.amber,
      green: colors.green,
      red: colors.red,
    },
    extend: {
      opacity: {
        100: "1",
      },
    },
    fontFamily: {
      base: ["Roboto", "Arial", "sans-serif"],
    },
  },
  variants: {
    extend: {
      borderStyle: ["hover"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
