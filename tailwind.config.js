/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./client/index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: '#FAF6F0',
        ink: '#1A1208',
        brown: '#5C3D1E',
        amber: '#C8873F',
        'amber-light': '#E8A857',
        sage: '#6B8C6B',
        terracotta: '#C1614A',
        muted: '#9A8B7A',
        border: '#E2D8CC',
        'card-bg': '#FFFEFB',
        'warm-white': '#FFFDF9',
      },
    },
  },
  plugins: [],
}