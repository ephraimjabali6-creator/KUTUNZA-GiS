/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './content/**/*.{js,ts,jsx,tsx,json}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#121212',
          muted: '#4A4A4A',
          faint: '#6B6B6B',
        },
        paper: '#FFFFFF',
        mist: '#F4F4F2',
        line: '#E6E6E2',
        forest: {
          50: '#F1F6F3',
          100: '#DCE8E1',
          400: '#3D8B66',
          500: '#2D6A4F',
          600: '#245A42',
          700: '#1B4332',
          800: '#16382C',
          900: '#0F2A21',
        },
      },
      maxWidth: {
        site: '1180px',
      },
    },
  },
  plugins: [],
};
