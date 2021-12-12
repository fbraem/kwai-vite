module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx,toml}',
    './theme/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    minHeight: {
      0: '0',
      '1/4': '25vh',
      '1/2': '50vh',
      '3/4': '75vh',
      full: '100vh'
    },
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
};
