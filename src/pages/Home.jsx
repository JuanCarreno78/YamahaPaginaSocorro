import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MotoCard from "../components/MotoCard";
import { getMotosDestacadas, CATEGORIAS, contarPorCategoria, motos } from "../data/motos";
import { NEGOCIO } from "../data/contacto";
import { BANNERS_HOME } from "../data/banners";

/* ─────────────────────────────────────────────────────────────
   1. HERO — banners locales rotativos (data/banners.js)
   Cambia de banner cada 5 s. Sin librerías externas.
───────────────────────────────────────────────────────────── */
function HeroSection() {
  const [idx, setIdx]       = useState(0);
  const [loaded, setLoaded] = useState({});
  const banner = BANNERS_HOME[idx];

  /* Rotación automática cada 5 segundos */
  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % BANNERS_HOME.length),
      5000
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="relative min-h-[90vh] flex flex-col justify-center
                 overflow-hidden bg-yamaha-black"
      aria-label="Portada principal"
    >
      {/* Banners apilados — solo el activo es visible */}
      {BANNERS_HOME.map((b, i) => (
        <img
          key={b.src}
          src={b.src}
          alt=""
          role="presentation"
          className={`absolute inset-0 w-full h-full object-cover object-center
                      transition-opacity duration-700
                      ${i === idx ? "opacity-100" : "opacity-0"}`}
          loading={i === 0 ? "eager" : "lazy"}
          onLoad={() => setLoaded((p) => ({ ...p, [i]: true }))}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      ))}

      {/* Overlay izquierdo — legibilidad del texto */}
      <div
        className="absolute inset-0 bg-gradient-to-r
                   from-black/90 via-black/70 to-black/20"
        aria-hidden="true"
      />
      {/* Overlay inferior — franja de stats */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40
                   bg-gradient-to-t from-black to-transparent"
        aria-hidden="true"
      />
      <div className="absolute inset-0 dot-grid opacity-20" aria-hidden="true" />

      {/* ── Contenido ─────────────────────────────────────── */}
      <div className="container-site relative z-10 py-20 md:py-28">
        <div className="max-w-[640px]">
          <div className="flex items-center gap-3 mb-6">
            <span className="accent-line" aria-hidden="true" />
            <p className="section-label">
              Concesionario Oficial · El Socorro, Santander
            </p>
          </div>

          <h1 className="font-display font-bold uppercase mb-8">
            <span className="block text-[clamp(2.8rem,8vw,5.5rem)]
                             leading-none drop-shadow-lg"
                  style={{ color: "#FFFFFF" }}>
              Estrena tu
            </span>
            <span className="block text-[clamp(2.8rem,8vw,5.5rem)]
                             text-yamaha-red leading-none drop-shadow-lg">
              Yamaha hoy
            </span>
            <span className="block text-[clamp(1.8rem,4.5vw,3.2rem)]
                             leading-none mt-2 drop-shadow-lg"
                  style={{ color: "rgba(255,255,255,0.65)" }}>
              en El Socorro
            </span>
          </h1>

          <p className="text-white text-lg leading-relaxed
                        max-w-[460px] mb-10 drop-shadow-lg font-medium">
            {NEGOCIO.slogan} Encuentra tu moto Yamaha ideal con atención
            personalizada en Santander.
          </p>

          <div className="flex flex-col xs:flex-row gap-4">
            <Link to="/catalogo" className="btn-primary">
              Ver catálogo
            </Link>
            <a
              href={NEGOCIO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              WhatsApp directo
            </a>
          </div>

          {/* Indicadores de banner */}
          <div className="flex items-center gap-2 mt-8" aria-label="Banners">
            {BANNERS_HOME.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Ver banner ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-300
                            ${i === idx ? "w-8 bg-yamaha-red" : "w-2 bg-white/30 hover:bg-white/60"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Strip de stats */}
      <div className="relative z-10 border-t border-yamaha-border/60 mt-auto">
        <div className="container-site">
          <div className="grid grid-cols-3 divide-x divide-yamaha-border/60">
            {[
              { cifra: `${motos.length}+`,  texto: "Modelos disponibles" },
              { cifra: "Oficial",            texto: "Distribuidor Yamaha" },
              { cifra: "El Socorro",         texto: "Santander, Colombia" },
            ].map(({ cifra, texto }) => (
              <div key={texto} className="py-5 px-4 sm:px-6 text-center">
                <p className="font-display font-bold text-lg sm:text-2xl
                               text-yamaha-white leading-none drop-shadow">
                  {cifra}
                </p>
                <p className="font-sans text-[10px] sm:text-xs text-yamaha-silver
                               uppercase tracking-wider mt-1">
                  {texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Línea decorativa roja inferior */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px
                   bg-gradient-to-r from-transparent via-yamaha-red/50 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   2. MOTOS DESTACADAS
───────────────────────────────────────────────────────────── */
function MotosDestacadas() {
  const destacadas = getMotosDestacadas();
  return (
    <section className="py-20 lg:py-28 bg-yamaha-black"
             aria-labelledby="destacadas-titulo">
      <div className="container-site">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between
                        gap-6 mb-14">
          <div>
            <p className="section-label mb-4">Lo mejor del lineup</p>
            <h2 id="destacadas-titulo" className="section-title">
              Modelos <span className="text-yamaha-red">destacados</span>
            </h2>
          </div>
          <Link
            to="/catalogo"
            className="group flex items-center gap-2 shrink-0 self-start sm:self-auto
                       font-display font-semibold text-xs uppercase tracking-widest
                       text-yamaha-silver hover:text-yamaha-white transition-colors
                       border-b border-yamaha-border hover:border-yamaha-silver pb-1"
          >
            Ver catálogo completo
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor"
              strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
              className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
              aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {destacadas.map((moto) => <MotoCard key={moto.id} moto={moto} />)}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   3. CATEGORÍAS
───────────────────────────────────────────────────────────── */
const CATEGORIA_ICONS = {
  "deportiva":       "M13 10V3L4 14h7v7l9-11h-7z",
  "naked":           "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  "automatica":      "M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15",
  "semi-automatica": "M4 6h16M4 10h16M4 14h8M4 18h4",
  "doble-proposito": "M3 20l6-9 3.5 5L16 9l5 11H3z",
};

function CategoriasSection() {
  return (
    <section className="py-20 lg:py-28 bg-yamaha-surface"
             aria-labelledby="categorias-titulo">
      <div className="container-site">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between
                        gap-4 mb-12">
          <div>
            <p className="section-label mb-4">Encuentra tu estilo</p>
            <h2 id="categorias-titulo" className="section-title">
              Por <span className="text-yamaha-red">categoría</span>
            </h2>
          </div>
          <p className="text-yamaha-silver text-sm max-w-[280px] leading-relaxed">
            Motos para la ciudad y para las carreteras de Santander.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {CATEGORIAS.map(({ slug, label }) => {
            const count = contarPorCategoria(slug);
            return (
              <Link
                key={slug}
                to="/catalogo"
                className="group relative flex flex-col items-center justify-center
                           text-center p-6 py-8 gap-4 overflow-hidden
                           bg-yamaha-black border border-yamaha-border
                           hover:border-yamaha-red/40
                           hover:bg-gradient-to-b hover:from-yamaha-red/5 hover:to-yamaha-black
                           transition-all duration-300"
                aria-label={`Ver motos ${label}`}
              >
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2
                                border-yamaha-border group-hover:border-yamaha-red/50
                                transition-colors duration-300" aria-hidden="true" />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
                     className="w-8 h-8 text-yamaha-red" aria-hidden="true">
                  <path d={CATEGORIA_ICONS[slug] ?? CATEGORIA_ICONS["naked"]} />
                </svg>
                <div>
                  <p className="font-display font-bold text-sm uppercase tracking-wide
                                leading-tight text-yamaha-white group-hover:text-yamaha-red
                                transition-colors duration-200 mb-1">
                    {label}
                  </p>
                  <p className="font-sans text-[11px] text-yamaha-silver">
                    {count} {count === 1 ? "modelo" : "modelos"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   4. CTA CONTACTO
───────────────────────────────────────────────────────────── */
function CTAContacto() {
  return (
    <section className="py-20 lg:py-28 bg-yamaha-black"
             aria-labelledby="cta-titulo">
      <div className="container-site">
        <div className="relative overflow-hidden bg-yamaha-surface
                        border border-yamaha-border hover:border-yamaha-red/20
                        transition-colors duration-300">
          <div className="absolute top-0 left-0 bottom-0 w-1 bg-yamaha-red"
               aria-hidden="true" />
          <div className="absolute right-0 top-0 bottom-0 flex items-center
                          overflow-hidden pointer-events-none select-none"
               aria-hidden="true">
            <span className="font-display font-bold text-[clamp(4rem,12vw,9rem)]
                             text-yamaha-white/[0.025] uppercase leading-none pr-8">
              SOCORRO
            </span>
          </div>
          <div className="absolute inset-0 dot-grid opacity-20" aria-hidden="true" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start
                          lg:items-center justify-between gap-10 p-8 sm:p-12 lg:p-14">
            <div className="max-w-md">
              <p className="section-label mb-4">¿Listo para rodar?</p>
              <h2 id="cta-titulo"
                  className="font-display font-bold uppercase leading-none mb-4">
                <span className="block text-[clamp(1.8rem,4.5vw,3rem)] text-yamaha-white">
                  Visítanos en El Socorro
                </span>
                <span className="block text-[clamp(1.8rem,4.5vw,3rem)] text-yamaha-red">
                  o escríbenos ahora
                </span>
              </h2>
              <p className="text-yamaha-silver text-sm leading-relaxed">
                {NEGOCIO.direccion}, {NEGOCIO.ciudad}.<br />
                <span className="text-yamaha-silver/60">
                  Lun–Vie: 8:00 am – 6:00 pm · Sáb: 8:00 am – 12:00 pm
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0 w-full sm:w-auto">
              <a href={NEGOCIO.whatsappHref} target="_blank" rel="noopener noreferrer"
                 className="btn-primary">
                Escribir por WhatsApp
              </a>
              <Link to="/contacto" className="btn-secondary">
                Ver información de contacto
              </Link>
              <p className="text-center font-sans text-xs text-yamaha-silver/50 mt-1">
                {NEGOCIO.telefono}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <MotosDestacadas />
      <CategoriasSection />
      <CTAContacto />
    </>
  );
}
