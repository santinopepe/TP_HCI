/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
  './index.html',
  './src/**/*.{vue,js,ts,jsx,tsx}',
],
theme: {
  extend: {
    height:{
      30: '7.5rem',
      32: '8rem',
      34: '8.5rem',
      40: '10rem',

    },
    colors: {
      'simsim-green-light': '#d3e4cd',
      'simsim-green-dark': '#2e4b3f',
      'simsim-green-darker': '#3a5c4b',
      'simsim-sidebar': '#166534',
      'simsim-sidebar-dark': '#14532d',
      'simsim-sidebar-hover': '#15803d',
      'simsim-saldo': '#c6e8c9',
    },
  },
},
plugins: [],
}

