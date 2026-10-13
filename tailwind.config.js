/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#D1CA25',
          'yellow-light': '#F6F4C5',
          blue: '#283991',
          'blue-dark': '#1C2866',
          'blue-light': '#E9ECF8',
          cyan: '#21ADE3',
          'cyan-light': '#E5F6FC',
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
