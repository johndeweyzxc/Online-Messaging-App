/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        CoolBlue: "#00a2ff",
      },
      screens: {
        tablet: { max: "820px" },
        phone: { max: "420px" },
      },
      fontFamily: {
        Quicksand: ["Quicksand", "sans-serif"],
      },
    },
  },
  plugins: [],
};
