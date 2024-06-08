/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#020817', // Your primary color
        secondary: '#ffffff', // Your secondary color
        error: '#d32f2f',
      },
    },
  },
  plugins: [],
}

