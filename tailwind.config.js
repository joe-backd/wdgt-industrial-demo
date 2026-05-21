/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'Montserrat', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        mint: {
          50: 'oklch(0.962 0.022 175)',
          100: 'oklch(0.93 0.03 173)',
          200: 'oklch(0.85 0.045 170)',
          500: '#269374',
          600: '#1f7a60',
        },
        navy: {
          500: 'oklch(0.42 0.022 250)',
          700: 'oklch(0.27 0.025 250)',
          900: 'oklch(0.18 0.018 248)',
        },
        ink: {
          DEFAULT: 'oklch(0.16 0.006 240)',
          soft: 'oklch(0.26 0.006 240)',
        },
        paper: {
          DEFAULT: 'oklch(0.985 0.003 250)',
        },
        forest: {
          900: '#143A2C',
          950: '#0F2C21',
          line: '#234638',
        },
        gold: {
          500: '#E5B964',
          600: '#D8A84F',
        },
        wdgt: {
          bg: '#FAF8F4',
          surface: '#FFFFFF',
          soft: '#F2EEE6',
          border: '#E5E1D8',
          border2: '#D8D3C7',
          text: '#1F1B16',
          text2: '#4A453E',
          text3: '#7A736A',
          accent: '#A8533A',
          accentbg: '#F7EDE7',
        },
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      transitionTimingFunction: {
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
