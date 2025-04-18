/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e63946", // Red tone
        charcoal: "#1d1d1d", // Dark background
        gold: "#bfa76f",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        caudex: ["Caudex", "sans-serif"],
      },
      maxWidth: {
        1600: "1600px",
      },
      aspectRatio: {
        "4/5": "4 / 5",
      },
    },
  },
  plugins: [],
};
