/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        CoolBlue: "#00a2ff",
      },
      fontFamily: {
        Quicksand: ["Quicksand", "sans-serif"],
      },
    },
  },
  plugins: [],
};
