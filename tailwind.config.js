/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#3F56CA',
          'blue-dark': '#2B3C8E',
          'blue-light': '#EEF2FC',
          yellow: '#D1CA25',
          'yellow-light': '#FDFCE8',
          cyan: '#21ADE3',
          'cyan-light': '#EBF7FC',
          red: '#EC202B',
          'red-light': '#FDE8E9',
          white: '#FFFFFF',
          black: '#000000',
        },
      },
    },
  },
  plugins: [],
};
