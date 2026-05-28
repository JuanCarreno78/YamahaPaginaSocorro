/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // ─── Paleta de marca ────────────────────────────────────
      colors: {
        yamaha: {
          red:        "#E60012",  // Rojo corporativo
          "red-dark": "#B8000E",  // Rojo hover/activo
          black:      "#0A0A0A",  // Fondo principal (casi negro puro)
          surface:    "#141414",  // Fondo de cards / secciones elevadas
          border:     "#242424",  // Líneas divisorias sutiles
          gray:       "#1E1E1E",  // Secciones alternas
          silver:     "#A0A0A0",  // Texto secundario
          "silver-light": "#D0D0D0", // Texto sobre fondo oscuro
          white:      "#F0F0F0",  // Texto principal sobre negro
        },
      },

      // ─── Tipografía ─────────────────────────────────────────
      fontFamily: {
        sans:    ["'Barlow'", "system-ui", "sans-serif"],
        display: ["'Barlow Condensed'", "sans-serif"],
      },

      // ─── Espaciado extra ────────────────────────────────────
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },

      // ─── Altura del Navbar — valor único, fácil de cambiar ──
      height: {
        navbar: "64px",
      },

      // ─── Transiciones uniformes ─────────────────────────────
      transitionDuration: {
        DEFAULT: "200ms",
      },

      // ─── Breakpoints ────────────────────────────────────────
      screens: {
        xs:    "375px",
        sm:    "640px",
        md:    "768px",
        lg:    "1024px",
        xl:    "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
