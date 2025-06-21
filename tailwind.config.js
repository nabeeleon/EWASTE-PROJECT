/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          50: '#E8FFE8',
          100: '#BFFFBF',
          200: '#96FF96',
          300: '#6DFF6D',
          400: '#44FF44',
          500: '#39FF14',  // toxic
          600: '#2ECC10',
          700: '#22990C',
          800: '#176608',
          900: '#0B3304',
        },
        eco: {
          50: '#E6FFF2',
          100: '#B3FFE0',
          200: '#80FFCD',
          300: '#4DFFBB',
          400: '#1AFFA8',
          500: '#00FF88',  // eco
          600: '#00CC6D',
          700: '#009952',
          800: '#006637',
          900: '#00331B',
        },
        surface: {
          light: '#ffffff',
          dark: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-large': ['4.5rem', { lineHeight: '5rem', letterSpacing: '-0.02em' }],
        'display': ['3.75rem', { lineHeight: '4.25rem', letterSpacing: '-0.02em' }],
        'title-large': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.01em' }],
        'title': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.01em' }],
        'body-large': ['1.125rem', { lineHeight: '1.75rem' }],
        'body': ['1rem', { lineHeight: '1.5rem' }],
        'caption': ['0.875rem', { lineHeight: '1.25rem' }],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'wave': 'wave 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 20px rgba(14, 165, 233, 0.5)' },
          '50%': { textShadow: '0 0 40px rgba(14, 165, 233, 0.8)' },
        },
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-5deg)' },
          '75%': { transform: 'rotate(5deg)' },
        },
      },
      boxShadow: {
        'neon': '0 0 50px rgba(0, 255, 255, 0.5)',
        'toxic': '0 0 50px rgba(57, 255, 20, 0.5)',
        'eco': '0 0 50px rgba(0, 255, 136, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
} 