/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f3f9',
          100: '#e1e8f2',
          200: '#c7d5e7',
          300: '#9dbbd6',
          400: '#6d9ac1',
          500: '#4b7fac',
          600: '#39658e',
          700: '#2f5174',
          800: '#2a4561',
          900: '#0F172A', // Deep Navy
        },
        saffron: {
          50: '#fff9eb',
          100: '#ffefc6',
          200: '#ffde88',
          300: '#ffc94a',
          400: '#ffab11',
          500: '#F59E0B', // Saffron
          600: '#d97606',
          700: '#b45209',
          800: '#92400e',
          900: '#78350f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
