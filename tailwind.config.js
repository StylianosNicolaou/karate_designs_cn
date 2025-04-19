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
        xs: "0.675rem",        // ~10.8px
        sm: "0.775rem",        // ~12.4px
        base: "0.90rem",       // ~14.4px
        md: "1rem",            // ~16px
        lg: "1.125rem",        // ~18px
        xl: "1.25rem",         // ~20px
        "2xl": "1.5rem",       // ~24px
        "3xl": "1.875rem",     // ~30px
        "4xl": "2.25rem",      // ~36px
        "5xl": "2.75rem",      // ~44px
        "6xl": "3.25rem",      // ~52px
        "7xl": "4rem",         // ~64px
        "8xl": "5.5rem",       // ~88px
        "9xl": "7rem",         // ~112px
      },      
      maxWidth: {
        1600: "1600px",
      },
    },
  },
  plugins: [],
};
