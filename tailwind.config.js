/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";
import daisyui from "daisyui";
import forms from "@tailwindcss/forms";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      xs: "405px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
    },
  },
  darkMode: "class",
  plugins: [nextui(), daisyui, forms],
};
