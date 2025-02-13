/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable dark mode based on class
  theme: {
    extend: {
      fontFamily: {
        sans: ['Vazirmatn', 'system-ui', 'sans-serif'],
      },
      colors: {
        'custom-orange': {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#f9d7ea',
          300: '#f6c6e1',
          400: '#f3b5d8',
          500: '#f0a4cf',
          600: '#ed93c6',
          700: '#ea82bd',
          800: '#e771b4',
          900: '#e460ab',
        },
      },
    },
  },
  plugins: [require('tailwindcss-dark-mode')()],
};
