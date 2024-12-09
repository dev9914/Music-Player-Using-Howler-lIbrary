/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-dark': '#0e0e0e',
        'second-primay': '#fd4e4e',
        'third-primary': '#220a0a',
        'fourth-primary': '#6b0000',
        'fifth-primary': '#480000',
        'sixth-primary': '#520000'
      },
      screens: {
        'max-sm': { 'max': '850px' }, // Custom breakpoint for max width of 739px
      },
    },
  },
  plugins: [],
}

