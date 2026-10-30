/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFCF8',
          100: '#FAF7EF',
          200: '#F4EFE1',
          300: '#EBE3CE',
        },
        ink: {
          500: '#6B6457',
          700: '#3D3830',
          900: '#1C1915',
        },
        bronze: {
          500: '#9A7B4F',
          700: '#7A5F38',
        },
      },
    },
  },
  plugins: [],
};
