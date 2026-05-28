import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { NEGOCIO } from "../data/contacto";

const NAV_LINKS = [
  { to: "/",         label: "Inicio",   end: true  },
  { to: "/catalogo", label: "Catálogo", end: false },
  { to: "/contacto", label: "Contacto", end: false },
];

function navLinkClass({ isActive }) {
  const base = "font-sans font-medium text-sm uppercase tracking-wider transition-colors duration-200";
  return isActive
    ? `${base} text-yamaha-red`
    : `${base} text-yamaha-silver hover:text-yamaha-white`;
}

/* ─── Ícono hamburger / X ────────────────────────────────── */
function HamburgerIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth={2} strokeLinecap="round"
         className="w-6 h-6 transition-all duration-200" aria-hidden="true">
      {open ? (
        <><line x1="4" y1="4" x2="20" y2="20" /><line x1="20" y1="4" x2="4" y2="20" /></>
      ) : (
        <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
      )}
    </svg>
  );
}

/* ─── Ícono WhatsApp ─────────────────────────────────────── */
function WhatsAppIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ─── Toggle claro/oscuro ────────────────────────────────── */
function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("tema") !== "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.removeAttribute("data-theme");
      localStorage.setItem("tema", "dark");
    } else {
      root.setAttribute("data-theme", "light");
      localStorage.setItem("tema", "light");
    }
  }, [isDark]);

  /* Aplica preferencia guardada al montar */
  useEffect(() => {
    const saved = localStorage.getItem("tema");
    if (saved === "light") {
      setIsDark(false);
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  return (
    <button
      onClick={() => setIsDark((p) => !p)}
      className="flex items-center justify-center w-8 h-8
                 text-yamaha-silver hover:text-yamaha-white
                 transition-colors duration-200
                 focus-visible:outline-none focus-visible:ring-1
                 focus-visible:ring-yamaha-red"
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Modo claro" : "Modo oscuro"}
    >
      {isDark ? (
        /* Sol — cambiar a claro */
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth={2} strokeLinecap="round"
             className="w-5 h-5" aria-hidden="true">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        /* Luna — cambiar a oscuro */
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth={2} strokeLinecap="round"
             className="w-5 h-5" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  );
}

/* ─── Logo ───────────────────────────────────────────────── */
function Logo() {
  return (
    <NavLink
      to="/"
      className="shrink-0 focus-visible:outline-none"
      aria-label="Motos del Socorro — Ir al inicio"
    >
      <div className="bg-white rounded-xl px-3 py-1.5 flex items-center
                      shadow-sm hover:shadow-md transition-shadow duration-200">
        <img
          src={`${import.meta.env.BASE_URL}images/icons/MotosDelSocorroLogoHD.png`}
          alt="Motos del Socorro"
          className="h-8 sm:h-9 w-auto object-contain"
          loading="eager"
        />
      </div>
    </NavLink>
  );
}

/* ─── Navbar principal ───────────────────────────────────── */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled,  setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className={[
        "fixed top-0 left-0 right-0 z-50 h-navbar",
        "bg-yamaha-black/96 backdrop-blur-sm transition-all duration-200",
        scrolled
          ? "border-b border-yamaha-border shadow-[0_2px_24px_rgba(0,0,0,0.7)]"
          : "border-b border-transparent",
      ].join(" ")}>
        <nav className="container-site h-full flex items-center justify-between gap-4"
             aria-label="Navegación principal">

          <Logo />

          {/* Links desktop */}
          <ul className="hidden md:flex items-center gap-8 list-none" role="list">
            {NAV_LINKS.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink to={to} end={end} className={navLinkClass}>{label}</NavLink>
              </li>
            ))}
          </ul>

          {/* Acciones desktop */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            <a href={NEGOCIO.whatsappHref} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-[#25D366] hover:text-[#1ebe5d]
                          transition-colors duration-200"
               aria-label="Contactar por WhatsApp">
              <WhatsAppIcon />
              <span className="hidden lg:inline font-sans text-xs text-yamaha-silver
                               hover:text-yamaha-white transition-colors duration-200">
                315 209 4701
              </span>
            </a>

            <span className="w-px h-4 bg-yamaha-border" aria-hidden="true" />
            <NavLink to="/contacto" className="btn-primary py-2 px-5">Cotizar</NavLink>
          </div>

          {/* Hamburger mobile */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="flex items-center justify-center w-10 h-10
                         text-yamaha-silver hover:text-yamaha-white
                         transition-colors duration-200 focus-visible:outline-none
                         focus-visible:ring-1 focus-visible:ring-yamaha-red"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </nav>
      </header>

      {/* Overlay mobile */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
             onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}

      {/* Drawer mobile */}
      <div id="mobile-menu" role="dialog" aria-label="Menú de navegación"
           aria-modal="true"
           className={[
             "fixed top-navbar left-0 right-0 z-40 md:hidden",
             "bg-yamaha-surface border-b border-yamaha-border",
             "transition-all duration-300 ease-in-out overflow-hidden",
             menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none",
           ].join(" ")}>
        <nav className="container-site py-6 flex flex-col gap-1">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) => [
                "block py-3.5 px-2 font-display font-semibold text-sm",
                "uppercase tracking-widest border-b border-yamaha-border",
                "transition-colors duration-200",
                isActive
                  ? "text-yamaha-red"
                  : "text-yamaha-silver-light hover:text-yamaha-white",
              ].join(" ")}>
              {label}
            </NavLink>
          ))}

          <a href={NEGOCIO.whatsappHref} target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-3 py-3.5 px-2 border-b border-yamaha-border
                        font-display font-semibold text-sm uppercase tracking-widest
                        text-[#25D366] transition-colors duration-200">
            <WhatsAppIcon className="w-5 h-5" />
            WhatsApp · 315 209 4701
          </a>

          <div className="pt-4">
            <NavLink to="/contacto" className="btn-primary w-full justify-center">
              Cotizar ahora
            </NavLink>
          </div>
        </nav>
      </div>
    </>
  );
}
