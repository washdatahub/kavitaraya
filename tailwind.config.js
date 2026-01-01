/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        'black': '#0a0a0a',
        'charcoal': '#1a1a1a',
        'cream': '#f5f5f0',
        'gray-light': '#e8e8e8',
        'gray-medium': '#8a8a8a',
        'gray-dark': '#4a4a4a',
      },
    },
  },
  plugins: [],
}

