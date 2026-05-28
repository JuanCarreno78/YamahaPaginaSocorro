import { NEGOCIO } from "../data/contacto";

/* ═══════════════════════════════════════════════════════════════
   Contacto.jsx — Página de información y contacto real
   Sin backend. Sin formulario funcional.
   Toda la información proviene de data/contacto.js
═══════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────────
   Íconos SVG inline
───────────────────────────────────────────────────────────── */
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="w-6 h-6" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="w-6 h-6" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const IconMapPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="w-6 h-6" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="w-6 h-6" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="w-5 h-5" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   Tarjeta de contacto — reutilizable
───────────────────────────────────────────────────────────── */
function ContactCard({ icon, titulo, children, accent = false }) {
  return (
    <div className={`
      flex flex-col gap-4 p-6
      bg-yamaha-surface border
      ${accent ? "border-yamaha-red/30" : "border-yamaha-border"}
      transition-colors duration-200 hover:border-yamaha-red/30
    `}>
      <div className="flex items-center gap-3">
        <span className="text-yamaha-red">{icon}</span>
        <h3 className="font-display font-semibold text-sm text-yamaha-white uppercase tracking-widest">
          {titulo}
        </h3>
      </div>
      <div className="pl-9">
        {children}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Página de Contacto
───────────────────────────────────────────────────────────── */
export default function Contacto() {
  const { redes, horarios } = NEGOCIO;

  return (
    <div className="bg-yamaha-black min-h-screen">

      {/* ── Header de página ───────────────────────────────── */}
      <div className="bg-yamaha-surface border-b border-yamaha-border">
        <div className="container-site py-12 lg:py-14">
          <p className="section-label mb-4">Estamos en El Socorro</p>
          <h1 className="section-title mb-4">
            Contáctanos y <span className="text-yamaha-red">visítanos</span>
          </h1>
          <span className="accent-line" />
          <p className="text-yamaha-silver mt-5 max-w-lg leading-relaxed">
            Tienes preguntas sobre nuestros modelos o disponibilidad,
            escríbenos por WhatsApp o llámanos directamente. Con gusto te asesoramos.
          </p>
        </div>
      </div>

      {/* ── CTA WhatsApp — acción principal ────────────────── */}
      <div className="border-b border-yamaha-border bg-yamaha-black">
        <div className="container-site py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6
            p-6 border border-yamaha-red/20 bg-yamaha-surface relative overflow-hidden">

            <div className="absolute top-0 left-0 bottom-0 w-1 bg-yamaha-red" aria-hidden="true" />

            <div className="pl-4">
              <p className="font-display font-bold text-xl text-yamaha-white mb-1">
                ¿Prefieres escribir ahora?
              </p>
              <p className="text-yamaha-silver text-sm">
                Respuesta rápida por WhatsApp · {NEGOCIO.telefono}
              </p>
            </div>

            <a
              href={NEGOCIO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-3 shrink-0
                bg-[#25D366] hover:bg-[#1ebe5d]
                text-white font-display font-semibold
                text-sm uppercase tracking-widest
                px-7 py-3.5
                transition-colors duration-200
              "
            >
              <IconWhatsApp />
              Abrir WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ── Grid de tarjetas de contacto ───────────────────── */}
      <div className="container-site py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">

          {/* Teléfono */}
          <ContactCard icon={<IconPhone />} titulo="Teléfono">
            <a
              href={NEGOCIO.telefonoHref}
              className="font-display font-bold text-2xl text-yamaha-white hover:text-yamaha-red transition-colors duration-200 block mb-1"
            >
              {NEGOCIO.telefono}
            </a>
            <p className="text-yamaha-silver text-sm">
              Llamadas y WhatsApp · Mismo número
            </p>
          </ContactCard>

          {/* Email */}
          <ContactCard icon={<IconMail />} titulo="Correo electrónico">
            <a
              href={NEGOCIO.emailHref}
              className="font-display font-bold text-xl text-yamaha-white hover:text-yamaha-red transition-colors duration-200 block mb-1 break-all"
            >
              {NEGOCIO.email}
            </a>
            <p className="text-yamaha-silver text-sm">
              Consultas, cotizaciones y servicio técnico
            </p>
          </ContactCard>

          {/* Dirección */}
          <ContactCard icon={<IconMapPin />} titulo="Nuestra ubicación" accent>
            <p className="font-display font-bold text-xl text-yamaha-white mb-1">
              {NEGOCIO.direccion}
            </p>
            <p className="text-yamaha-silver text-sm mb-3">
              {NEGOCIO.ciudad}
            </p>
            <a
              href={NEGOCIO.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2
                font-sans text-xs text-yamaha-red hover:text-yamaha-white
                uppercase tracking-wider transition-colors duration-200
              "
            >
              Ver en Google Maps →
            </a>
          </ContactCard>

          {/* Horarios */}
          <ContactCard icon={<IconClock />} titulo="Horario de atención">
            <div className="flex flex-col gap-2.5">
              {horarios.map(({ dias, horas, abierto }) => (
                <div
                  key={dias}
                  className={`flex items-center justify-between gap-4 pb-2.5 border-b border-yamaha-border last:border-0 last:pb-0 ${!abierto ? "opacity-40" : ""}`}
                >
                  <span className="text-sm text-yamaha-silver">{dias}</span>
                  <span className={`font-display font-semibold text-sm ${abierto ? "text-yamaha-white" : "text-yamaha-silver"}`}>
                    {horas}
                  </span>
                </div>
              ))}
            </div>
          </ContactCard>
        </div>

        {/* ── Redes sociales ───────────────────────────────── */}
        <div className="mt-8">
          <div className="border border-yamaha-border bg-yamaha-surface p-6">
            <p className="font-display font-semibold text-xs text-yamaha-white uppercase tracking-widest mb-5 flex items-center gap-3">
              <span className="accent-line" aria-hidden="true" />
              Síguenos en redes sociales
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

              {/* Facebook */}
              <a
                href={redes.facebook.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group flex items-center gap-4 p-4
                  border border-yamaha-border bg-yamaha-black
                  hover:border-[#1877F2]/40 hover:bg-[#1877F2]/5
                  transition-all duration-200
                "
                aria-label="Seguir en Facebook"
              >
                <span className="text-yamaha-silver group-hover:text-[#1877F2] transition-colors duration-200">
                  <IconFacebook />
                </span>
                <div>
                  <p className="font-display font-semibold text-sm text-yamaha-white group-hover:text-[#1877F2] transition-colors duration-200">
                    Facebook
                  </p>
                  <p className="font-sans text-xs text-yamaha-silver/60">
                    {redes.facebook.usuario}
                  </p>
                </div>
              </a>

              {/* Instagram */}
              <a
                href={redes.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group flex items-center gap-4 p-4
                  border border-yamaha-border bg-yamaha-black
                  hover:border-[#E1306C]/40 hover:bg-[#E1306C]/5
                  transition-all duration-200
                "
                aria-label="Seguir en Instagram"
              >
                <span className="text-yamaha-silver group-hover:text-[#E1306C] transition-colors duration-200">
                  <IconInstagram />
                </span>
                <div>
                  <p className="font-display font-semibold text-sm text-yamaha-white group-hover:text-[#E1306C] transition-colors duration-200">
                    Instagram
                  </p>
                  <p className="font-sans text-xs text-yamaha-silver/60">
                    {redes.instagram.usuario}
                  </p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={NEGOCIO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group flex items-center gap-4 p-4
                  border border-yamaha-border bg-yamaha-black
                  hover:border-[#25D366]/40 hover:bg-[#25D366]/5
                  transition-all duration-200
                "
                aria-label="Contactar por WhatsApp"
              >
                <span className="text-yamaha-silver group-hover:text-[#25D366] transition-colors duration-200">
                  <IconWhatsApp />
                </span>
                <div>
                  <p className="font-display font-semibold text-sm text-yamaha-white group-hover:text-[#25D366] transition-colors duration-200">
                    WhatsApp
                  </p>
                  <p className="font-sans text-xs text-yamaha-silver/60">
                    {redes.whatsapp.usuario}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* ── Nota sobre el concesionario ──────────────────── */}
        <div className="mt-8 p-6 border border-yamaha-border bg-yamaha-surface">
          <div className="flex items-start gap-4">
            <span className="accent-line mt-2 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-display font-semibold text-base text-yamaha-white mb-2">
                {NEGOCIO.nombre}
              </p>
              <p className="text-yamaha-silver text-sm leading-relaxed max-w-2xl">
                Somos concesionario autorizado Yamaha en Santander. Ofrecemos venta de
                motos nuevas, repuestos originales, servicio técnico especializado y
                lubricantes Yamalube. {NEGOCIO.slogan}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
