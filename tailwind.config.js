/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        aura: {
          50: '#f0f4ff',
          400: '#4f8ef7',
          500: '#3b6ef0',
          600: '#2a50d0',
        },
      },
      animation: {
        'pulse-once': 'pulseOnce 0.4s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'check-pop': 'checkPop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      keyframes: {
        pulseOnce: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
          '100%': { transform: 'scale(1)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        checkPop: {
          '0%': { transform: 'scale(0.8)' },
          '60%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
