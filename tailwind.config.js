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
      screens: {
        // Breakpoints predefinidos
        'sm': '640px',
        'md': '768px', 
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        // Breakpoints personalizados
        'tablet': '900px', // Dispositivos con un ancho de 900px o superior
        'desktop': '1200px', // Dispositivos con un ancho de 1200px o superior
        // Breakpoints para dispositivos móviles modernos
        'mobile': '360px', // Dispositivos móviles pequeños
        'phablet': '430px', // Dispositivos móviles medianos  
        'phone': '580px', // Dispositivos móviles grandes
      },
    },
  },
  plugins: [],
}
