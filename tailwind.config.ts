import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#050816',
        gold: '#D4AF37',
        pearl: '#F5F5F4',
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      boxShadow: {
        glow: '0 20px 80px rgba(212, 175, 55, 0.18)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(212,175,55,0.24), transparent 45%), linear-gradient(180deg, rgba(5,8,22,0.9), rgba(41,57,77,0.98))',
      },
    },
  },
  plugins: [],
};

export default config;
