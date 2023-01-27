/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  theme: {
    extend: {
      colors: {
        light: '#f7f7f7', // Background color of logo
        dark: '#1b1d22',
      },
      fontFamily: {
        sans: ['Barlow', 'sans-serif'],
      }
    }
  },
  plugins: [require('@tailwindcss/typography')],
};
