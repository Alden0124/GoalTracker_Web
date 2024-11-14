/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "Noto Sans TC": ["Noto Sans TC", "sans-serif"],
      },
      colors: {
        background: {
          light: '#ffffff',
          dark: '#09090b',
        },
        foreground: {
          light: '#09090b',
          dark: '#ffffff',
        },
        border: {
          light: '#e5e7eb',
          dark: '#27272a',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
