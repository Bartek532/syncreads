/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@rssmarkable/config/ui/tailwind")],
  content: [
    "src/app/**/*.{ts,tsx}",
    "src/components/**/*.{ts,tsx}",
    "src/config/**/*.{ts,tsx}",
  ],
  plugins: [require("tailwindcss-animate")],
};
