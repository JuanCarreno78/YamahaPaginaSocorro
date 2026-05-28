/* ═══════════════════════════════════════════════════════════════
   data/banners.js — Banners del Home
   Agrega o quita banners editando este array.
   Las rutas apuntan a `${import.meta.env.BASE_URL}images/motos/{slug}/banner.{ext}`
═══════════════════════════════════════════════════════════════ */
export const BANNERS_HOME = [
  {
    src: `${import.meta.env.BASE_URL}images/motos/r15-v4/banner.png`,
    titulo:   "R15 V4",
    subtitulo:"Tecnología de pista en cada calle",
    slug:     "r15-v4",
  },
  {
    src: `${import.meta.env.BASE_URL}images/motos/mt-15-v2/banner.jpg`,
    titulo:   "MT-15 V2",
    subtitulo:"El maestro del torque domina la ciudad",
    slug:     "mt-15-v2",
  },
  {
    src: `${import.meta.env.BASE_URL}images/motos/nmax-155/banner.jpg`,
    titulo:   "NMAX 155",
    subtitulo:"La ciudad a tu ritmo, con tecnología premium",
    slug:     "nmax-155",
  },
  {
    src: `${import.meta.env.BASE_URL}images/motos/xtz250/banner.jpg`,
    titulo:   "XTZ 250",
    subtitulo:"Aventura sin límites en Santander",
    slug:     "xtz250",
  },
];
