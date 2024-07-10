/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#16181e",
        secondary: "#21242d",
        mixedblue: "#00b9ae",
        whitee: "#f9f9f9",
        "icon-color": "#40564f",
      },
    },
  },
  plugins: [require("daisyui")],
};
