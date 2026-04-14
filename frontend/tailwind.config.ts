import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        /* Backgrounds */
        'bg-page': '#F5F0E8',
        'bg-surface': '#FFFFFF',
        'bg-dark': '#1B3A2D',
        'bg-darker': '#0F2318',
        'bg-card-dark': '#243B2F',

        /* Greens */
        'green-primary': '#2D6A4F',
        'green-accent': '#40916C',
        'green-bright': '#52B788',
        'green-glow': '#74C69D',
        'green-pale': '#D8F3DC',

        /* Ambers & Alerts */
        'amber-land': '#B5621E',
        'amber-pale': '#FFF3E0',
        'red-alert': '#9B2226',

        /* Text */
        'text-dark': '#1B2F1A',
        'text-body': '#3D5A47',
        'text-muted': '#7A9E87',
        'text-pale': '#B8CFBE',
        'text-on-dark': '#F0EDE6',
        'text-on-dark-muted': '#8FAF99',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        card: '16px',
        lg: '20px',
        pill: '999px',
      },
      boxShadow: {
        'card-depth':
          '0 1px 0 rgba(255,255,255,0.8) inset, 0 8px 32px rgba(27,47,26,0.1)',
        'clay': '0 6px 0 rgba(27,47,26,0.25)',
        'clay-hover': '0 8px 0 rgba(27,47,26,0.25)',
        'parcel-glow': '0 0 20px rgba(82,183,136,0.4)',
      },
      backgroundImage: {
        'gradient-green':
          'linear-gradient(135deg, #2D6A4F, #52B788)',
        'gradient-green-bright':
          'linear-gradient(90deg, #2D6A4F, #52B788, #74C69D)',
        'gradient-dark':
          'linear-gradient(180deg, #1B3A2D 0%, #0F2318 100%)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.08)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
