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
        dark: '#191724',
        light: '#fffaf3',
      }
    }
  },
  plugins: [require('@tailwindcss/typography')],
};
