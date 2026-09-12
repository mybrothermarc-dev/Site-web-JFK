/** @type {import('tailwindcss').Config} */

/*
 * Palette « Kingdom » — tirée directement du logo Jesus Family Kingdom :
 *   bleu (le mot « Jesus »), vert frais (la scène : croix, famille, arbres),
 *   or (la couronne + « KINGDOM »), avec le rouge des petits points en touche.
 *
 * Les échelles historiques (sky / leaf / sun / night) restent définies pour
 * compatibilité, mais pointent vers l'identité du logo :
 *   sun  → blue  (bleu, couleur primaire)
 *   sky  → teal  (bleu-vert, secondaire)
 *   leaf → green (vert, croissance / nature)
 *   night → ink  (bleu nuit profond, texte & fonds)
 */

const blue = {
  DEFAULT: '#1B9DD9',
  50: '#EAF6FC',
  100: '#C9EAF8',
  200: '#98D6F0',
  300: '#5FBEE6',
  400: '#2FA6DB',
  500: '#1B9DD9',
  600: '#12749F',
  700: '#0E5C7E',
  800: '#0B4560',
  900: '#0E3346',
};

const teal = {
  DEFAULT: '#1B929C',
  50: '#E7F6F7',
  100: '#C4E9EB',
  200: '#93D6DA',
  300: '#57BFC6',
  400: '#2CA9B3',
  500: '#1B929C',
  600: '#15757E',
  700: '#155E65',
  800: '#123F44',
  900: '#0E2D30',
};

const green = {
  DEFAULT: '#78B843',
  50: '#F0F7E7',
  100: '#DCEEC7',
  200: '#BFDF97',
  300: '#A2CE6E',
  400: '#8ABF4E',
  500: '#78B843',
  600: '#5F9A32',
  700: '#4A7A28',
  800: '#385C20',
  900: '#274016',
};

const gold = {
  DEFAULT: '#F4A623',
  50: '#FEF5E4',
  100: '#FBE7BC',
  200: '#F7CF79',
  300: '#F5B94A',
  400: '#F4A623',
  500: '#E0910F',
  600: '#B9750C',
  700: '#8F5A0C',
  800: '#613D0B',
  900: '#3F2807',
};

const coral = {
  DEFAULT: '#D9432F',
  50: '#FDECE9',
  100: '#FAD1CA',
  200: '#F3A79B',
  300: '#EB7C6B',
  400: '#E4573F',
  500: '#D9432F',
  600: '#B8331F',
  700: '#932618',
  800: '#6B1B12',
  900: '#45120C',
};

const ink = {
  DEFAULT: '#122F3A',
  50: '#EEF3F5',
  100: '#D6E0E5',
  200: '#AEC0C8',
  300: '#7E96A1',
  400: '#557080',
  500: '#3D5563',
  600: '#2C424E',
  700: '#1D3540',
  800: '#122F3A',
  900: '#0C2028',
};

const paper = {
  DEFAULT: '#F5F8FA',
  50: '#FBFDFE',
  100: '#F5F8FA',
  200: '#E9EFF3',
  300: '#DAE3E9',
};

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        blue,
        teal,
        green,
        gold,
        coral,
        ink,
        paper,
        // Tokens sémantiques conservés (utilisés dans le code) → nouvelle identité
        clay: blue,
        lake: teal,
        moss: green,
        // Alias de compatibilité avec l'ancienne nomenclature
        sun: blue,
        sky: teal,
        leaf: green,
        night: ink[800],
      },
      fontFamily: {
        display: ['"Petrona"', 'Georgia', 'serif'],
        body: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      maxWidth: {
        prose: '68ch',
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(18, 47, 58, 0.10), 0 8px 28px -8px rgba(18, 47, 58, 0.14)',
        lift: '0 4px 12px -4px rgba(18, 47, 58, 0.16), 0 16px 40px -12px rgba(18, 47, 58, 0.22)',
        inset: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.5)',
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        'rise-in': {
          '0%': { opacity: '0', transform: 'translateY(1.25rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'rise-in': 'rise-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 1.2s ease both',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
