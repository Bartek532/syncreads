module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "../../apps/web/tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
  ],
  env: {
    browser: true,
    node: true,
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"],
        moduleDirectory: ["node_modules", "./"],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
    react: {
      pragma: "React",
      version: "detect",
    },
  },
  rules: {
    "@typescript-eslint/consistent-type-imports": "warn",
    "import/order": [
      "error",
      {
        alphabetize: {
          caseInsensitive: true,
          order: "asc",
        },
        groups: [
          ["builtin", "external"],
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        "newlines-between": "always",
        warnOnUnassignedImports: true,
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "enum",
        format: ["UPPER_CASE"],
      },
      {
        selector: "enumMember",
        format: ["UPPER_CASE"],
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    curly: "error",
  },
};
