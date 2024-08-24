/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xmd: "1228px",
        "2xmd": "1217px",
      },
      colors: {
        "primary-color": "#fb923c",
        "primary-strong": "#f97316",
        "primary-light": "#fed7aa",
        "lighter-dark": "#333",
        body_dark: "#1f2024",
        "more-light": "#e3dede",
        "darker-light": "#acacac",
        good: "#22c55e",
        bad: "#ef4444",
      },
      boxShadow: {
        primary: "0px 0px 0px 1px #00000024",
        secondary: "0px 5px 10px 0px #00000024",
      },
      spacing: {
        very: "35rem",
      },
      fontSize: {
        xxs: "0.65rem",
        "3xs": "0.55rem",
      },
      borderWidth: {
        1: "1px",
      },
      outlineWidth: {
        1: "1px",
      },
      zIndex: {
        5: "5",
        6: "6",
      },
    },
  },
  plugins: [],
};
