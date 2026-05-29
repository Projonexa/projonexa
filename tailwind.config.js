/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#00C8FF',
          secondary: '#6C63FF',
          dark: '#0A0F1C',
          light: '#FFFFFF',
          accent: '#67E8F9',
          mid: '#3D8BFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 60px -12px rgba(0, 200, 255, 0.35)',
        card: '0 4px 24px -4px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
