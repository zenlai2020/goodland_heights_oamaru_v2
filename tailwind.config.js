/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      /* 三档适配：手机 375 / 平板 800 / 电脑 1440 */
      tablet: '800px',
      desktop: '1440px',
    },
    extend: {
      colors: {
        primary: '#4987A4',
        background: '#F4F6F6',
        'background-alt': '#F5F4F4',
        'text-muted': '#C5C9C8',
      },
      fontFamily: {
        newyork: ['NewYork', 'Georgia', 'serif'],
        body: ['AlimamaFangYuan', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        tablet: '800px',
        desktop: '1440px',
      },
      backdropBlur: {
        nav: '64px',
      },
    },
  },
  plugins: [],
}
