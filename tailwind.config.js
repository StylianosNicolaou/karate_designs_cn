/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Foundations – 70% neutral */
        charcoal: "#0E0E12", // Primary background (Charcoal Black)
        "bg-elevated": "#16161D", // Cards, sections, modals (Soft Graphite)
        "bg-subtle": "#1B1826", // Muted Violet Black
        /* Primary brand – 20% violet */
        primary: "#5A35E6", // Electric Brand Violet
        /* Secondary accent – 8% magenta (hover, micro) */
        magenta: "#FF2E9A", // Neon Magenta
        /* Energy – 2% coral (high attention only) */
        coral: "#FF5A3C", // Coral Red
        gold: "#FF5A3C", // Alias for energy (replaces old gold for badges/CTAs)
        /* Text system (use text-foreground, text-secondary, text-muted) */
        foreground: "#F2F2F7", // Soft White – body/headings
        secondary: "#A1A1B3", // Cool Gray – descriptions
        muted: "#6B6B80", // Slate Gray – captions
        /* Violet scale */
        violet: {
          50: "#F2EEFF",
          100: "#D8CCFF",
          500: "#5A35E6",
          600: "#4A29C5",
          700: "#3C20A6",
          900: "#1E124D",
        },
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #5A35E6 0%, #FF2E9A 100%)",
        "gradient-hero":
          "linear-gradient(135deg, #5A35E6 0%, #FF2E9A 50%, #FF5A3C 100%)",
        "gradient-glow":
          "radial-gradient(circle, rgba(90, 53, 230, 0.4) 0%, transparent 70%)",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        caudex: ["Caudex", "sans-serif"],
      },
      fontSize: {
        xs: "0.675rem", // ~10.8px
        sm: "0.775rem", // ~12.4px
        base: "0.90rem", // ~14.4px
        md: "1rem", // ~16px
        lg: "1.125rem", // ~18px
        xl: "1.25rem", // ~20px
        "2xl": "1.5rem", // ~24px
        "3xl": "1.875rem", // ~30px
        "4xl": "2.25rem", // ~36px
        "5xl": "2.75rem", // ~44px
        "6xl": "3.25rem", // ~52px
        "7xl": "4rem", // ~64px
        "8xl": "5.5rem", // ~88px
        "9xl": "7rem", // ~112px
      },
      maxWidth: {
        1600: "1600px",
      },
    },
  },
  plugins: [],
};
