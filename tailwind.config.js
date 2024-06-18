/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        custom: [
          "0 15px 10px rgba(0, 0, 0, 0.5)",
          "0 1px 4px rgba(0, 0, 0, 0.3)",
          "0 0 40px rgba(0, 0, 0, 0.1)",
        ],
      },
    },
  },
  plugins: [],
};
