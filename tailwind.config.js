/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        surface: '#111111',
        'surface-2': '#1A1A1A',
        border: '#2A2A2A',
        purple: {
          DEFAULT: '#7C3AED',
          light: '#9D5FF5',
          dark: '#5B21B6',
          glow: 'rgba(124, 58, 237, 0.3)',
        },
        cyan: {
          DEFAULT: '#06B6D4',
          light: '#22D3EE',
          dark: '#0891B2',
          glow: 'rgba(6, 182, 212, 0.3)',
        },
        text: {
          primary: '#F8F8F8',
          secondary: '#A1A1AA',
          muted: '#52525B',
        },
        amber: {
          glow: 'rgba(245, 158, 11, 0.3)',
        },
        coral: {
          DEFAULT: '#F43F5E',
          glow: 'rgba(244, 63, 94, 0.3)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 9vw, 8rem)', { lineHeight: '1', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.8rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'draw-line': 'draw-line 1.5s ease-out forwards',
        'orbit': 'orbit 8s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)' },
          '50%': { opacity: '0.7', boxShadow: '0 0 40px rgba(124, 58, 237, 0.8)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'draw-line': {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(60px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(60px) rotate(-360deg)' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
        'purple-glow': 'radial-gradient(circle at center, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
        'cyan-glow': 'radial-gradient(circle at center, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'purple-sm': '0 0 15px rgba(124, 58, 237, 0.3)',
        'purple-md': '0 0 30px rgba(124, 58, 237, 0.4)',
        'purple-lg': '0 0 60px rgba(124, 58, 237, 0.5)',
        'cyan-sm': '0 0 15px rgba(6, 182, 212, 0.3)',
        'cyan-md': '0 0 30px rgba(6, 182, 212, 0.4)',
        'glow-amber': '0 0 30px rgba(245, 158, 11, 0.4)',
        'glow-coral': '0 0 30px rgba(244, 63, 94, 0.4)',
      },
    },
  },
  plugins: [],
};
