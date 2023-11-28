/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@rssmarkable/eslint-preset/server.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
