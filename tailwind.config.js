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
      fontSize: {
        base: "0.90rem", // Default is 1rem (16px), make it slightly smaller
        sm: "0.875rem",  // Optional: you can adjust other sizes too
      },
      maxWidth: {
        1600: "1600px",
      },
    },
  },
  plugins: [],
};
