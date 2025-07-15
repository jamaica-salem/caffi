/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FAFBFA',   // blue-100
          DEFAULT: '#122214', // blue-600
          dark: '#dfdfe0',    // blue-700
          darkest: '#8C908A', // blue-900
        },
        accent: '#226440',    // indigo-500
        background: '#F8FAFC', // slate-50
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
