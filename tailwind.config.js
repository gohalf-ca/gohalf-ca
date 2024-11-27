/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx}",
  ],
  theme: {
    extend: {
      width:{
        '20w': '450px'
      },
      height:{
        '20h': '50px'
      }

    },
  },
  plugins: [],
}

