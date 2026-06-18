/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
        md: "24px",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        rust: "#B76856",
        gold: "#C3903F",
        teal: "#638488",
        sand: "#B5A896",
        olive: "#5D6849",
        cream: "#F7F4EF",
        charcoal: "#232323",
        "header-bg": "#DAD4CB",
        
        border: "hsl(var(--border))",
        background: "#F7F4EF",
        foreground: "#232323",
        primary: {
          DEFAULT: "#B76856",
          foreground: "#F7F4EF",
        },
        muted: {
          DEFAULT: "#B5A896",
          foreground: "#638488",
        },
      },
      fontFamily: {
        mundial: ["Mundial", "system-ui", "sans-serif"],
        "roboto-serif": ['"Roboto Serif"', "serif"],
      },
    },
  },
  plugins: [],
};
