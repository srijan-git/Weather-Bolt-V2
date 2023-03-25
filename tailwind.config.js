/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/views/**/*.hbs",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '468px',
      },
    },
  },
  plugins: [],
}