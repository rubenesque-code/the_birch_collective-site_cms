// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      display: ["Amatic SC", "serif"],
      sans: ["Karla", "sans-serif"],
      mono: ["IBM Plex Mono", "monospace"],
      serif: ["Open Sans", "sans-serify"],
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
      spacing: {
        xxxs: ".1rem",
        xxs: ".25rem",
        xs: ".5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "6rem",
        "2.5xl": "7.5rem",
        "3xl": "9rem",
      },
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
        ["my-success"]: "hsl(154 61% 92%)",
        ["my-success-content"]: "hsl(160 83.8% 33.9%)",
        ["my-alert"]: "hsl(0 84% 91.1%)",
        ["my-alert-content"]: "hsl(0 84% 63.1%)",
        ["my-error"]: "hsl(28 94.4% 92.9%)",
        ["my-error-content"]: "hsl(16 100% 56.1%)",
        "green-active": "#4ade80",
        overlayLight: "rgba(237, 242, 247, 0.2)",
        overlayMid: "rgba(237, 242, 247, 0.6)",
        overlayDark: "rgba(0, 0, 0, 0.65)",
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
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar"),
    require("tailwind-scrollbar-hide"),
    plugin(function ({ addComponents }) {
      addComponents({
        ".my-btn": {
          "@apply rounded-md border py-xxs px-[0.75rem] text-sm capitalize transition-colors duration-75 ease-in-out":
            {},
        },
        ".my-btn-neutral": {
          "@apply border-gray-200 hover:bg-gray-100 border text-gray-500 hover:text-gray-600":
            {},
        },
        ".my-btn-create": {
          "@apply bg-blue-400 text-white hover:bg-blue-500": {},
        },
        ".my-btn-action": {
          "@apply bg-blue-500 text-white hover:bg-blue-600": {},
        },
      });
    }),
  ],
};
