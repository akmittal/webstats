// tailwind.config.js
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  // ...
  // rest of the config
  plugins: [require('@tailwindcss/ui')],
}