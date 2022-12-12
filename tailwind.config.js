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
        sphone: { max: "280px" },
      },
      fontFamily: {
        Quicksand: ["Quicksand", "sans-serif"],
        JetBrains: ["JetBrains mono", "monospace"],
      },
    },
  },
  plugins: [],
};
