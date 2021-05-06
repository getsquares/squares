const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    content: [
      "./components/**/*.js",
      "./field/**/*.js",
      "./methods/**/*.js",
      "index.html",
    ],
    options: {
      safelist: [/^grid-cols/],
    },
  },
  darkMode: false, // or 'media' or 'class'
  mode: "jit",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      blue: colors.blue,
      navy: {
        50: "#F4F8FD",
        100: "#E6F0FB",
        200: "#D1E2F7",
        300: "#AFCDEF",
        400: "#7AA4D9",
        500: "#507BC0",
        600: "#365CAA",
        700: "#284796",
        800: "#1E3475",
        900: "#16285A",
      },
      lightBlue: colors.lightBlue,
      gray: colors.trueGray,
      blueGray: colors.blueGray,
      yellow: colors.yellow,
      green: colors.green,
      red: colors.red,
      grayExtra: "#EDEDED",
    },
    extend: {
      opacity: {
        100: "1",
      },
      margin: {
        "2px": "2px",
      },
      boxShadow: {
        y: "0 -1px 0px 0px #e5e5e5, 0 1px 0px 0px #e5e5e5",
        navy:
          "0 -1px 0px 0px #afcdef, 0 1px 0px 0px #afcdef, -1px -1px 0 0px #afcdef",
      },
      fontSize: {
        13: "0.813rem",
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
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("tailwind-scrollbar"),
  ],
};
