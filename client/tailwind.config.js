module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '1/3': '30%'
      },
      minWidth: {
        '1/2': '50%'
      }
    },
  },
  variants: {
    extend: {
      
    },
  },
  plugins: [],
}
