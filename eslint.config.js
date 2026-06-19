import js from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import solid from "eslint-plugin-solid/configs/typescript";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      ".cache/",
      ".lighthouseci/",
      ".nitro/",
      ".output/",
      "dist/",
      "node_modules/",
      "app.config.timestamp_*.js"
    ]
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,cjs,mjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2024
      }
    }
  },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      ...solid.plugins,
      "@typescript-eslint": tseslint.plugin,
      "jsx-a11y": jsxA11y
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        sourceType: "module"
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2024
      }
    },
    settings: {
      "jsx-a11y": {
        components: {
          A: "a"
        }
      }
    },
    rules: {
      ...solid.rules,
      ...jsxA11y.configs.recommended.rules,
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ]
    }
  }
];
