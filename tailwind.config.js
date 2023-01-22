/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "pleasant-blue": "#05a8f4",
        second: "#e1e6ec",
        third: "#4D98FF",
      },
    },
  },
  plugins: [],
};
