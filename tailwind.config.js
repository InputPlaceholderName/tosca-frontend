const colors = require('./src/theme/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    fontFamily: {
      sans: ['Montserrat'],
    },
    extend: {
      colors: {
        ...colors,
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
