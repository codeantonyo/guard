/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Bebas Neue', 'cursive'],
        heading: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        green: { primary: '#1DB954', bright: '#39e07a', dark: '#0d6b30' },
        dark: { primary: '#080808', secondary: '#0f0f0f', card: '#141414' },
      },
    },
  },
  plugins: [],
}
