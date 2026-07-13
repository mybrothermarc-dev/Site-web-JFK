/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Palette inspirée du logo Jesus Family Kingdom
        sky: {
          DEFAULT: '#3AA6D8',
          50: '#EAF6FC',
          100: '#D3ECF8',
          200: '#A7D9F1',
          300: '#7BC6EA',
          400: '#5FB3E0',
          500: '#3AA6D8',
          600: '#2B85B3',
          700: '#22698E',
          800: '#1B5470',
          900: '#153F53',
        },
        leaf: {
          DEFAULT: '#3E9B4F',
          50: '#EFF9F0',
          100: '#DCF1DF',
          200: '#B3E1BA',
          300: '#8AD095',
          400: '#61C070',
          500: '#3E9B4F',
          600: '#31813F',
          700: '#286832',
          800: '#1F5027',
          900: '#173B1D',
        },
        sun: {
          DEFAULT: '#F5A623',
          50: '#FEF6E9',
          100: '#FDEBD0',
          200: '#FBD79E',
          300: '#F9C36C',
          400: '#F7B348',
          500: '#F5A623',
          600: '#D4880F',
          700: '#A4690C',
          800: '#754B09',
          900: '#4D3106',
        },
        night: '#173B1D',
      },
      fontFamily: {
        display: ['"Poppins"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};
