module.exports = {
  purge: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx,toml}',
    './theme/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      '0': '0',
      '1/4': '25vh',
      '1/2': '50vh',
      '3/4': '75vh',
      'full': '100vh'
    },
    extend: {},
  },
  variants: {
    extend: {
      margin: [ 'hover' ],
      cursor: [ 'hover', 'focus' ],
      borderRadius: [ 'hover', 'focus' ]
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
