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
        umak: {
          blue: '#1E3A8A', // Official UMak Blue
          'blue-dark': '#172554',
          'blue-light': '#3B82F6',
          yellow: '#FACC15', // Official Yellow
          'yellow-light': '#FEF08A',
        },
      },
    },
  },
  plugins: [],
};
