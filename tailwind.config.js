/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blush: {
          DEFAULT: '#F6C9D0',
          light: '#FBE5E8',
          dark: '#EDA5AF',
        },
        peach: {
          DEFAULT: '#FAD8C5',
          light: '#FCE9DD',
          dark: '#F2B996',
        },
        sage: {
          DEFAULT: '#C8D8C4',
          light: '#E1EBDE',
          dark: '#A6BFA0',
        },
        ivory: '#FFF9F6',
        beige: {
          DEFAULT: '#EADFCF',
          dark: '#DCCBAE',
        },
        gold: {
          DEFAULT: '#D9B66F',
          light: '#E9D3A2',
          dark: '#B8944C',
        },
        brown: {
          DEFAULT: '#4E3F3A',
          light: '#7A6660',
          soft: '#9C8B85',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2.5rem',
        '5xl': '3rem',
      },
      boxShadow: {
        soft: '0 20px 60px -15px rgba(78, 63, 58, 0.18)',
        card: '0 10px 40px -12px rgba(78, 63, 58, 0.15)',
        glow: '0 0 40px rgba(217, 182, 111, 0.35)',
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(3deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-24px) translateX(10px)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        blob: {
          '0%, 100%': { borderRadius: '42% 58% 65% 35% / 45% 40% 60% 55%', transform: 'scale(1)' },
          '50%': { borderRadius: '58% 42% 35% 65% / 55% 65% 35% 45%', transform: 'scale(1.05)' },
        },
        drift: {
          '0%': { transform: 'translate(0,0) rotate(0deg)' },
          '100%': { transform: 'translate(6px,-10px) rotate(6deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        floatY: 'floatY 6s ease-in-out infinite',
        floatSlow: 'floatSlow 9s ease-in-out infinite',
        spinSlow: 'spinSlow 18s linear infinite',
        blob: 'blob 12s ease-in-out infinite',
        drift: 'drift 4s ease-in-out infinite alternate',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}
