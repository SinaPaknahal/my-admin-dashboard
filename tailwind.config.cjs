/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Shabnam: ["Shabnam", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: '#16a34a', // سبز اصلی
          light: '#22c55e',
          dark: '#15803d',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
