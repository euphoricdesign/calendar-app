/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 2px 10px rgba(0, 0, 0, 0.1)',
        // Puedes añadir más sombras personalizadas aquí
      },
    },
  },
  plugins: [],
}
