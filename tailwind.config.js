/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      backgroundOpacity: 'rgba (16, 25, 47, 0.3)',
    },
    screens: {
      xs: { max: '400px' },
      mobile: { max: '575px' },
      tabletSM: { max: '768px' },
      tablet: { max: '991px' },
      desktop: '992px',
      lg: { max: '1230px' },
      xl: { max: '1325px' },
    },
  },
  plugins: [],
};
