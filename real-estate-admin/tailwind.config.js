/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          foreground: '#ffffff',
        },
        background: '#0b1020',
        surface: '#0f172a',
        muted: '#94a3b8',
      },
      boxShadow: {
        card: '0 8px 24px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}