/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: "#f5f6f2",
        primary: "#f9f9f9",
        primaryLight: "#e3edfa",
        secondary: "#0259c9",
        tertiary: "#404040",
       
        gray: {
          10: "#EEEEEE",
          20: "#A2A2A2",
          30: "#7B7B7B",
          50: "#585858",
          90: "#141414",
        },
      },
      screens: {
        "xs": "400px",
        "3xl": "1680px",
        "4xl": "2200px",
      },
     
    },
  },
  plugins: [],

  
}