/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      /* ── 컬러 팔레트 ── */
      colors: {
        cream:     { DEFAULT: '#FDF6EC', dark: '#FAF0E1' },
        chocolate: { DEFAULT: '#3C2415', light: '#6B4226' },
        caramel:   { DEFAULT: '#C8956C' },
        gold:      { DEFAULT: '#D4A847' },
        rose:      { DEFAULT: '#E8A0BF' },
        success:   { DEFAULT: '#7DB87D' },
        error:     { DEFAULT: '#D94F4F' },
        warning:   { DEFAULT: '#E8C547' },
        info:      { DEFAULT: '#6BA3C8' },
        neutral: {
          100: '#F5F0EB',
          200: '#E8DFD5',
          300: '#C4B8AC',
          400: '#9A8D82',
          500: '#6E6259',
        },
        /* ── 다크모드 전용 컬러 ── */
        dm: {
          bg:      '#1A1210',
          surface: '#2C1F17',
          card:    '#3A2A1E',
          border:  '#4A3828',
          muted:   '#8A7B6E',
        },
      },

      /* ── 폰트 ── */
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body:    ['"Noto Sans KR"', 'sans-serif'],
        accent:  ['"DM Sans"', 'sans-serif'],
      },

      /* ── 폰트 크기 (모바일 퍼스트) ── */
      fontSize: {
        'hero-mobile':  ['2.5rem',  { lineHeight: '1.2' }],
        'hero-desktop': ['3.5rem',  { lineHeight: '1.15' }],
        'heading-1':    ['2rem',    { lineHeight: '1.25' }],
        'heading-2':    ['1.5rem',  { lineHeight: '1.3' }],
        'heading-3':    ['1.25rem', { lineHeight: '1.4' }],
        'body-lg':      ['1.125rem',{ lineHeight: '1.6' }],
        'body':         ['1rem',    { lineHeight: '1.6' }],
        'caption':      ['0.875rem',{ lineHeight: '1.5' }],
        'small':        ['0.75rem', { lineHeight: '1.5' }],
      },

      /* ── 그림자 (따뜻한 톤) ── */
      boxShadow: {
        'warm-sm':   '0 1px 3px rgba(60, 36, 21, 0.08)',
        'warm-md':   '0 4px 12px rgba(60, 36, 21, 0.10)',
        'warm-lg':   '0 8px 24px rgba(60, 36, 21, 0.12)',
        'warm-xl':   '0 16px 48px rgba(60, 36, 21, 0.16)',
        'warm-hover':'0 8px 30px rgba(60, 36, 21, 0.15)',
      },

      /* ── 둥글기 ── */
      borderRadius: {
        'card':   '20px',
        'button': '9999px',
      },

      /* ── 트랜지션 ── */
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      /* ── 애니메이션 ── */
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in-up':     'fadeInUp 0.5s ease forwards',
        'fade-in':        'fadeIn 0.3s ease forwards',
        'slide-in-right': 'slideInRight 0.5s ease forwards',
      },

      /* ── 레이아웃 ── */
      maxWidth: {
        'content': '960px',
        'wide':    '1280px',
      },
    },
  },
  plugins: [],
}
