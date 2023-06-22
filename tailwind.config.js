/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      display: ["Amatic SC", "serif"],
      sans: ["Karla", "sans-serif"],
    },
    screens: {
      xs: "410px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1800px",
    },
    extend: {
      colors: {
        brandBrown: "#776e77",
        brandLightBrown: "#d3cec6",
        brandGreen: "#557774",
        brandOrange: "#bc7229",
        brandLightOrange: "#D8912A",
        brandBlue: "rgb(110, 193, 228)",
        brandRed: "#B94E48",
        display: "#776e77",
        displaySecondary: "#d3cec6",
        displayGreen: "#557774",
        displayYellow: "#FFCC72",
        mainDark: "rgb(51, 51, 51)",
        orange: "#bc7229",
        orangeLight: "#d1964d",
        black: "rgb(51,51,51)",
        "black-rgba": "rgba(0, 0, 0, 0.3)",
        "bg-overlay-light": "rgba(237, 242, 247, 0.5)",
      },
      backgroundImage: {
        donate: "url('/images/fern.jpg')",
      },
      fontSize: {
        0: "0rem",
      },
      gridTemplateColumns: {
        "3flex1": "1fr auto auto",
        auto1fr: "auto 1fr",
      },
      scale: {
        80: "0.8",
        115: "1.15",
        175: "1.75",
      },
    },
  },
  plugins: [
    // require("@tailwindcss/line-clamp"),
    // require("@tailwindcss/aspect-ratio"),
    // require("@tailwindcss/typography"),
  ],
};
