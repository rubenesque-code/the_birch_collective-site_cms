/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
/** @typedef  {import("prettier").Config} PrettierConfig*/

/** @type { PrettierConfig | SortImportsConfig } */
const config = {
  arrowParens: "always",
  printWidth: 80,
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],

  importOrder: [
    "^(react/(.*)$)|^(react$)|^(react-native(.*)$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^~/components/(.*)$",
    "",
    "^[./*]",
    "",
    "^~/utils/(.*)$",
    "^~/styles/(.*)$",
    "^~/(.*)$",
  ],

  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
};

module.exports = config;
