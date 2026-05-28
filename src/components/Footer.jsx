import { NavLink } from "react-router-dom";
import { NEGOCIO, YEAR } from "../data/contacto";

/* ─────────────────────────────────────────────────────────────
   Íconos SVG inline — sin dependencias externas
───────────────────────────────────────────────────────────── */

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

const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="w-4 h-4 shrink-0 text-yamaha-red mt-0.5" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="w-4 h-4 shrink-0 text-yamaha-red mt-0.5" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const IconMapPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="w-4 h-4 shrink-0 text-yamaha-red mt-0.5" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="w-4 h-4 shrink-0 text-yamaha-red mt-0.5" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   Sub-componentes internos
───────────────────────────────────────────────────────────── */

function FooterColTitle({ children }) {
  return (
    <div className="mb-4">
      <p className="font-display font-semibold text-xs text-yamaha-white uppercase tracking-[0.18em]">
        {children}
      </p>
      <span className="accent-line mt-2" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Footer
─────────────────────────────────────────────────────────────
   Columnas:
   Col 1 — Marca + slogan + redes sociales
   Col 2 — Navegación rápida
   Col 3 — Servicios
   Col 4 — Contacto + horario
───────────────────────────────────────────────────────────── */
export default function Footer() {
  const { redes, horarios } = NEGOCIO;

  const sociales = [
    { key: "facebook",  icon: <IconFacebook />,  color: "hover:text-[#1877F2]" },
    { key: "instagram", icon: <IconInstagram />, color: "hover:text-[#E1306C]" },
    { key: "whatsapp",  icon: <IconWhatsApp />,  color: "hover:text-[#25D366]" },
  ];

  return (
    <footer
      className="bg-yamaha-gray border-t border-yamaha-border"
      aria-label="Pie de página"
    >
      {/* ── Cuerpo principal ────────────────────────────────── */}
      <div className="container-site py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Col 1 — Marca */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            {/* Logo imagen real */}
            <NavLink to="/" className="flex items-center w-fit" aria-label="Inicio">
              <div className="bg-white rounded-xl px-3 py-2 flex items-center shadow-sm">
                <img
                  src="/images/icons/MotosDelSocorroLogoHD.png"
                  alt="Motos del Socorro"
                  className="h-8 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            </NavLink>

            {/* Slogan real del negocio */}
            <p className="text-yamaha-silver text-sm leading-relaxed max-w-[220px] italic">
              "{NEGOCIO.slogan}"
            </p>

            {/* Badge distribuidor */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-yamaha-red" aria-hidden="true" />
              <span className="text-yamaha-silver text-xs uppercase tracking-wider font-medium">
                Distribuidor Oficial Yamaha
              </span>
            </div>

            {/* Redes sociales */}
            <div className="flex items-center gap-3 mt-1">
              {sociales.map(({ key, icon, color }) => {
                const red = redes[key];
                return (
                  <a
                    key={key}
                    href={red.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Síguenos en ${red.label}`}
                    className={`
                      text-yamaha-silver/60 ${color}
                      transition-colors duration-200
                      p-1
                    `}
                  >
                    {icon}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2 — Navegación */}
          <div>
            <FooterColTitle>Navegación</FooterColTitle>
            <ul className="flex flex-col gap-2.5 list-none">
              {[
                { to: "/",         label: "Inicio"   },
                { to: "/catalogo", label: "Catálogo" },
                { to: "/contacto", label: "Contacto" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className="
                      group flex items-center gap-2
                      text-yamaha-silver hover:text-yamaha-red
                      text-sm transition-colors duration-200
                    "
                  >
                    <span
                      className="w-1 h-1 rounded-full bg-yamaha-border group-hover:bg-yamaha-red transition-colors duration-200"
                      aria-hidden="true"
                    />
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Servicios */}
          <div>
            <FooterColTitle>Servicios</FooterColTitle>
            <ul className="flex flex-col gap-2.5 list-none">
              {[
                "Venta de motos nuevas",
                "Repuestos originales",
                "Servicio técnico autorizado",
                "Lubricantes Yamalube",
                "Accesorios Yamaha",
              ].map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-yamaha-silver">
                  <span className="w-1 h-1 rounded-full bg-yamaha-border shrink-0 mt-1.5" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contacto real */}
          <div>
            <FooterColTitle>Contacto</FooterColTitle>
            <ul className="flex flex-col gap-3 list-none">

              {/* Teléfono / WhatsApp */}
              <li className="flex items-start gap-2.5">
                <IconPhone />
                <div>
                  <a
                    href={NEGOCIO.telefonoHref}
                    className="text-sm text-yamaha-silver hover:text-yamaha-white transition-colors duration-200 block"
                  >
                    {NEGOCIO.telefono}
                  </a>
                  <a
                    href={NEGOCIO.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#25D366]/80 hover:text-[#25D366] transition-colors duration-200"
                  >
                    WhatsApp disponible →
                  </a>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-start gap-2.5">
                <IconMail />
                <a
                  href={NEGOCIO.emailHref}
                  className="text-sm text-yamaha-silver hover:text-yamaha-white transition-colors duration-200 break-all"
                >
                  {NEGOCIO.email}
                </a>
              </li>

              {/* Dirección */}
              <li className="flex items-start gap-2.5">
                <IconMapPin />
                <a
                  href={NEGOCIO.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-yamaha-silver hover:text-yamaha-white transition-colors duration-200"
                >
                  {NEGOCIO.direccion}<br />
                  <span className="text-yamaha-silver/60">{NEGOCIO.ciudad}</span>
                </a>
              </li>

              {/* Horario */}
              <li className="flex items-start gap-2.5">
                <IconClock />
                <div className="flex flex-col gap-1">
                  {horarios.map(({ dias, horas, abierto }) => (
                    <p key={dias} className="text-xs text-yamaha-silver/70 leading-snug">
                      <span className={abierto ? "text-yamaha-silver" : "text-yamaha-silver/40"}>
                        {dias}:
                      </span>{" "}
                      <span className={abierto ? "text-yamaha-white/80" : "text-yamaha-silver/40"}>
                        {horas}
                      </span>
                    </p>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Barra inferior ─────────────────────────────────────── */}
      <div className="border-t border-yamaha-border">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-yamaha-silver/40 text-xs text-center sm:text-left">
            © {YEAR} {NEGOCIO.nombre} · Santander, Colombia · Todos los derechos reservados
          </p>
          <p className="text-yamaha-silver/25 text-xs">
            Yamaha Motor Co., Ltd. · Distribuidor autorizado
          </p>
        </div>
      </div>
    </footer>
  );
}
