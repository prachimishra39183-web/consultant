
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Marcellus', 'serif'],
        accent: ['Rajdhani', 'sans-serif'],
      },

      colors: {
        emerald: {
          50: '#E8F5EE',
          100: '#C7E5D4',
          200: '#91C9AE',
          300: '#56A987',
          400: '#258866',
          500: '#0A5944',
          600: '#084936',
          700: '#063D32',
          800: '#032F25',
          900: '#02231B',
          950: '#011710',
        },

        ivory: {
          50: '#FFFDF5',
          100: '#FFF8E9',
          200: '#F8EAC8',
          300: '#F2D995',
        },

        ink: {
          500: '#D5D0BD',
          700: '#F3EAD7',
          900: '#FFF8E9',
        },

        bronze: {
          500: '#D7AD50',
          700: '#A97925',
        },

        gold: {
          50: '#FFF9E8',
          100: '#FFF0BF',
          200: '#FFE8AC',
          300: '#F2D58B',
          400: '#E6C16B',
          500: '#D7AD50',
          600: '#C49438',
          700: '#A97925',
          800: '#80591D',
          900: '#5C3D12',
        },
      },
    },
  },

  plugins: [],
};
