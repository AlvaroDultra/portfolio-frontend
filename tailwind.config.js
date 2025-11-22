/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': {
          900: '#0a0e27',
          800: '#0f1632',
          700: '#1a1f3a',
        }
      },
    },
  },
  plugins: [],
}