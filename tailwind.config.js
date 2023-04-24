/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "secondary-light": "#FEF5AC",
        "secondary-gray": "#5F6F94",
        "mid-green": "#1c4b3d",
        "dark-green": "#1f342b",
        "light-green": "#14d7a4",
        "primary-dark": "#333333",
      },
    },
  },
  plugins: [],
};
