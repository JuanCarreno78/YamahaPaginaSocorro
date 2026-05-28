/* ═══════════════════════════════════════════════════════════════
   data/contacto.js — Información real del concesionario.

   FUENTE DE VERDAD ÚNICA para toda la aplicación.
   Footer, Navbar, página de Contacto y cualquier componente
   que necesite datos del negocio importa desde aquí.

   Para actualizar un dato (teléfono, horario, etc.) basta con
   editar este archivo — se propaga automáticamente.
═══════════════════════════════════════════════════════════════ */

export const NEGOCIO = {
  /* ── Identidad ─────────────────────────────────────────── */
  nombre:       "Yamaha Motos del Socorro",
  nombreCorto:  "Motos del Socorro",
  slogan:       "Impulsamos tus sueños kilómetro a kilómetro.",

  /* ── Contacto directo ──────────────────────────────────── */
  telefono:      "+57 315 209 4701",
  telefonoHref:  "tel:+573152094701",

  // WhatsApp con mensaje de bienvenida pre-escrito
  whatsappHref:
    "https://wa.me/573152094701?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20motos%20Yamaha.",

  email:         "motosdelsocorro@gmail.com",
  emailHref:     "mailto:motosdelsocorro@gmail.com",

  /* ── Ubicación ─────────────────────────────────────────── */
  direccion:     "Carrera 15 #6-30, Barrio Universitario",
  ciudad:        "El Socorro, Santander",
  paisCodigo:    "CO",
  // Link directo a Google Maps con la dirección
  mapsHref:
    "https://maps.google.com/?q=Carrera+15+6-30+Barrio+Universitario+Socorro+Santander+Colombia",

  /* ── Horarios de atención ──────────────────────────────── */
  horarios: [
    { dias: "Lunes – Viernes", horas: "8:00 am – 6:00 pm", abierto: true  },
    { dias: "Sábado",          horas: "8:00 am – 12:00 pm", abierto: true  },
    { dias: "Domingo",         horas: "Cerrado",             abierto: false },
  ],

  /* ── Redes sociales ────────────────────────────────────── */
  redes: {
    facebook: {
      label:    "Facebook",
      usuario:  "yamahamotosdelsocorro",
      href:     "https://facebook.com/yamahamotosdelsocorro",
    },
    instagram: {
      label:    "Instagram",
      usuario:  "@yamahamotosdelsocorro",
      href:     "https://instagram.com/yamahamotosdelsocorro",
    },
    whatsapp: {
      label:    "WhatsApp",
      usuario:  "+57 315 209 4701",
      href:     "https://wa.me/573152094701?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20motos%20Yamaha.",
    },
  },
};

/* Año actual para copyright — evita hardcoding */
export const YEAR = new Date().getFullYear();
