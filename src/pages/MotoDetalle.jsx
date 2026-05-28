import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { getMotoBySlug, getMotosByCategoria, CATEGORIAS, formatCOP } from "../data/motos";
import CotizadorSimulado from "../components/CotizadorSimulado";
import MotoCard from "../components/MotoCard";

/* ═══════════════════════════════════════════════════════════════
   MotoDetalle — Corrección catálogo + nuevo orden superior:
   BannerPrincipal → FranjaTecnologias → BloquNombrePrecio
   El resto de secciones continúa igual.
═══════════════════════════════════════════════════════════════ */

const getCategoriaLabel = (s) => CATEGORIAS.find((c) => c.slug === s)?.label ?? s;

/* ─── Iconos porQueElegir ──────────────────────────────────── */
const PQICONS = {
  eco:     <path d="M12 22V12M5 12C5 8.13 8.13 5 12 5s7 3.13 7 7c0 2.5-1.5 5-4 6.5M9 9s1 3 3 3 3-3 3-3"/>,
  shield:  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
  zap:     <path d="M13 10V3L4 14h7v7l9-11h-7z"/>,
  city:    <path d="M3 21h18M3 7v14M21 7v14M6 7h4M14 7h4M6 11h4M14 11h4M6 15h4M14 15h4M9 21V3l5 3 5-3v18"/>,
  road:    <path d="M3 20l6-9 3.5 5L16 9l5 11H3z"/>,
  star:    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>,
  clock:   <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
  tool:    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>,
  users:   <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></>,
  connect: <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01"/>,
};

/* ─── Mapa de tecnologías ─────────────────────────────────── */
const TECMAP = {
  "blue-core": {
    color:"#3B9EDB", label:"Blue Core",
    beneficio:"Motor de alta eficiencia que optimiza la combustión y reduce el consumo hasta un 50%.",
    path:<><path d="M12 22V12"/><path d="M5 12C5 8.13 8.13 5 12 5s7 3.13 7 7c0 2.5-1.5 5-4 6.5"/><path d="M9 9s1 3 3 3 3-3 3-3"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></>,
  },
  fi:{
    color:"#E6A817", label:"Fuel Injection",
    beneficio:"Inyección electrónica para arranque instantáneo, respuesta precisa y menor emisión de gases.",
    path:<><path d="M12 2C12 2 6 9 6 14a6 6 0 0012 0c0-5-6-12-6-12z"/><path d="M9 17h6M12 14v3"/></>,
  },
  abs:{
    color:"#E60012", label:"ABS",
    beneficio:"Sistema antibloqueo de frenos que evita deslizamientos en emergencias. Mayor control en cualquier superficie.",
    path:<><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/></>,
  },
  vva:{
    color:"#9B59B6", label:"VVA",
    beneficio:"Variable Valve Actuation: más torque en bajas rpm y más potencia en altas. Lo mejor de ambos mundos.",
    path:<><path d="M7 16V8M7 8l-3 3M7 8l3 3"/><path d="M17 8v8M17 16l-3-3M17 16l3-3"/><path d="M11 12h2"/></>,
  },
  "full-led":{
    color:"#F0C30F", label:"Full LED",
    beneficio:"Iluminación LED completa en farol, trasero e indicadores. Mayor visibilidad y menor consumo eléctrico.",
    path:<><path d="M9 21h6M12 3a6 6 0 014.9 9.4L15 15H9l-1.9-2.6A6 6 0 0112 3z"/><path d="M10 15v2a2 2 0 004 0v-2"/></>,
  },
  "y-connect":{
    color:"#1DB9C3", label:"Y-Connect",
    beneficio:"Conectividad Bluetooth con la app Yamaha. Notificaciones, consumo y bitácora desde tu celular.",
    path:<><path d="M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11"/></>,
  },
  "smart-key":{
    color:"#27AE60", label:"Smart Key",
    beneficio:"Llave inteligente de proximidad. Desbloquea y arranca sin introducir llave. Seguridad antirrobo activa.",
    path:<><circle cx="7.5" cy="15.5" r="3.5"/><path d="M11 12l8-8M15 4l2 2M17 8l2-2M19 5l1-1"/></>,
  },
};

/* ═══════════════════════════════════════════════════════════════
   NUEVO BLOQUE 1 — BANNER PRINCIPAL
   Imagen de fondo ancha y alta. Ocupa toda la parte superior.
   Intenta cargar banner.jpg → fallback a principal.jpg → placeholder
═══════════════════════════════════════════════════════════════ */
function BannerPrincipal({ moto }) {
  const { nombre, categoria, banner, imagen } = moto;
  const [src, setSrc]         = useState(banner);
  const [fallback, setFallback] = useState(false);
  useEffect(() => {
    setSrc(banner);
    setFallback(false);
  }, [banner, imagen]);

  const handleError = () => {
    if (src === banner && banner !== imagen) {
      setSrc(imagen);          // intenta principal.jpg
    } else {
      setFallback(true);       // muestra placeholder
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-yamaha-black"
      style={{ minHeight: "clamp(400px, 78vh, 900px)" }}
      aria-label={`Banner ${nombre}`}
    >
      {/* Imagen de fondo */}
      {!fallback ? (
        <img
          src={src}
          alt={`Yamaha ${nombre}`}
          className="absolute inset-0 w-full h-full object-contain md:object-cover object-center bg-yamaha-black"
          loading="eager"
          onError={handleError}
        />
      ) : (
        /* Placeholder premium cuando no hay imagen */
        <div className="absolute inset-0 bg-gradient-to-br from-yamaha-black to-yamaha-gray/30">
          <div className="absolute inset-0 dot-grid opacity-25" aria-hidden="true"/>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            <svg viewBox="0 0 200 120" fill="none" stroke="currentColor"
                 strokeWidth="1" strokeLinecap="round"
                 className="w-56 h-36 sm:w-72 sm:h-48 text-yamaha-red/15"
                 aria-hidden="true">
              <ellipse cx="44" cy="94" rx="24" ry="24"/>
              <ellipse cx="156" cy="94" rx="24" ry="24"/>
              <path d="M68 94h64M68 94l22-48h36l22 26M90 46h-28l-16 20"/>
              <path d="M126 72l14-38h20M146 50l10-12 16 5"/>
              <path d="M126 72l10-5"/>
            </svg>
            <p className="font-display font-bold text-3xl sm:text-5xl text-yamaha-white/10
                          uppercase tracking-[0.2em] text-center px-8">
              {nombre}
            </p>
          </div>
        </div>
      )}

      {/* Gradiente oscuro inferior → transición suave al siguiente bloque */}
      <div className="absolute bottom-0 left-0 right-0 h-40
                      bg-gradient-to-t from-yamaha-black to-transparent"
           aria-hidden="true"/>

      {/* Gradiente lateral izquierdo para legibilidad del badge */}
      <div className="absolute top-0 left-0 bottom-0 w-48
                      bg-gradient-to-r from-yamaha-black/40 to-transparent"
           aria-hidden="true"/>

      {/* Categoría + breadcrumb */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10 flex flex-col gap-3">
        <span className="inline-block bg-yamaha-red text-white font-sans font-semibold
                         text-xs uppercase tracking-[0.15em] px-4 py-2">
          {getCategoriaLabel(categoria)}
        </span>
        <nav aria-label="Ubicación"
             className="hidden sm:flex items-center gap-2 text-xs text-white/50">
          <Link to="/"         className="hover:text-white/80 transition-colors">Inicio</Link>
          <span aria-hidden="true">/</span>
          <Link to="/catalogo" className="hover:text-white/80 transition-colors">Catálogo</Link>
          <span aria-hidden="true">/</span>
          <span className="text-white/70">{nombre}</span>
        </nav>
      </div>

      {/* Espaciador — da altura al section */}
      <div style={{ minHeight: "clamp(320px, 68vh, 900px)" }} />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NUEVO BLOQUE 2 — FRANJA DE TECNOLOGÍAS CON ICONOS OFICIALES
   Usa los archivos reales de /images/icons/.
   SVGs: se envuelven en contenedor blanco (funcionan en claro/oscuro).
   PNGs: mismo tratamiento.
═══════════════════════════════════════════════════════════════ */

/* Mapa slug → archivo de ícono oficial */
const ICON_FILES = {
  "blue-core": `${import.meta.env.BASE_URL}images/icons/blue-core.svg`,
  "fi": `${import.meta.env.BASE_URL}images/icons/fi.svg`,
  "abs": `${import.meta.env.BASE_URL}images/icons/abs.svg`,
  "smart-key": `${import.meta.env.BASE_URL}images/icons/smart-key.svg`,
  "y-connect": `${import.meta.env.BASE_URL}images/icons/y-connect.png`,
  "asc": `${import.meta.env.BASE_URL}images/icons/asc.svg`,
  "aho": `${import.meta.env.BASE_URL}images/icons/aho.svg`,
  "full-led": `${import.meta.env.BASE_URL}images/icons/aho.svg`,  // AHO ≈ Full LED (iluminación automática)
  "vva":        null,                       // sin ícono oficial → SVG inline
};

/* Labels para la franja */
const ICON_LABELS = {
  "blue-core":  "Blue Core",
  "fi":         "Fuel Injection",
  "abs":        "ABS",
  "smart-key":  "Smart Key",
  "y-connect":  "Y-Connect",
  "asc":        "ASC",
  "aho":        "Full LED",
  "full-led":   "Full LED",
  "vva":        "VVA",
};

/* Fallback SVG inline para tecnologías sin ícono oficial */
const VVA_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="#9B59B6"
       strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
       className="w-8 h-8" aria-hidden="true">
    <path d="M7 16V8M7 8l-3 3M7 8l3 3"/>
    <path d="M17 8v8M17 16l-3-3M17 16l3-3"/>
    <path d="M11 12h2"/>
  </svg>
);

function FranjaTecnologias({ tecnologias = [] }) {
  if (!tecnologias.length) return null;

  return (
    <div className="bg-yamaha-surface border-b border-yamaha-border">
      <div className="container-site py-8 lg:py-10">
        <p className="section-label mb-6 text-center sm:text-left">
          Tecnologías de serie
        </p>

        <div className="flex flex-wrap items-start justify-center sm:justify-start
                        gap-6 sm:gap-10 lg:gap-14">
          {tecnologias.map((slug) => {
            const iconFile = ICON_FILES[slug];
            const label    = ICON_LABELS[slug] ?? slug;

            return (
              <div key={slug}
                   className="flex flex-col items-center gap-3 text-center w-24 sm:w-28"
                   title={label}>

                {/*
                  Contenedor blanco uniforme para todos los íconos.
                  Soluciona fondos blancos de SVG/PNG en modo oscuro.
                  Padding y borde redondeado suave = aspecto limpio en claro y oscuro.
                */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl
                                flex items-center justify-center p-2
                                shadow-[0_2px_8px_rgba(0,0,0,0.15)]
                                hover:scale-105 transition-transform duration-200">
                  {iconFile ? (
                    <img
                      src={iconFile}
                      alt={label}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        /* Si el archivo no carga, oculta roto y muestra texto */
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    /* Fallback inline para VVA y otros sin archivo */
                    VVA_ICON
                  )}
                </div>

                <p className="font-display font-bold text-sm sm:text-base uppercase
                               tracking-widest leading-tight text-yamaha-white">
                  {label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NUEVO BLOQUE 3 — NOMBRE + PRECIO + CTAs
   Debajo de la franja de tecnologías.
═══════════════════════════════════════════════════════════════ */
function BloquNombrePrecio({ moto }) {
  const { nombre, tagline, precio, colores = [] } = moto;

  return (
    <section className="bg-yamaha-black py-12 lg:py-16">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-end">

          {/* Nombre y tagline */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="accent-line" aria-hidden="true"/>
              <p className="section-label">{tagline}</p>
            </div>

            <h1 className="font-display font-bold uppercase leading-none
                           text-[clamp(3.5rem,10vw,7rem)] text-yamaha-white mb-6">
              {nombre}
            </h1>

            {/* Swatches de color */}
            {colores.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="font-sans text-sm text-yamaha-silver">Colores:</span>
                <div className="flex items-center gap-2">
                  {colores.map((c) => (
                    <div key={c.hex} title={c.nombre}
                         className="w-6 h-6 rounded-full border-2 border-yamaha-border"
                         style={{ backgroundColor: c.hex }}/>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Precio y CTAs */}
          <div className="flex flex-col gap-6">
            {precio && (
              <div className="border-l-2 border-yamaha-red pl-6">
                <p className="font-sans text-sm text-yamaha-silver mb-1">
                  Precio referencial · {precio.nota}
                </p>
                <p className="font-display font-bold leading-none text-yamaha-white
                               text-[clamp(2rem,5vw,3.2rem)]">
                  Desde {formatCOP(precio.valor)}
                </p>
                <p className="font-sans text-sm text-yamaha-silver/60 mt-2">
                  Consulta disponibilidad y colores con nuestros asesores
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://wa.me/573152094701?text=Hola%2C%20quiero%20información%20sobre%20la%20Yamaha"
                 target="_blank" rel="noopener noreferrer"
                 className="btn-primary flex-1 justify-center py-5 text-base">
                Consultar disponibilidad
              </a>
              <Link to="/contacto"
                    className="btn-secondary flex-1 justify-center py-5 text-base">
                Contactar asesor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECCIONES EXISTENTES — Sin cambios
═══════════════════════════════════════════════════════════════ */

function SeccionPorQue({ moto }) {
  const { descripcion, porQueElegir = [] } = moto;
  return (
    <section className="py-20 lg:py-28 bg-yamaha-surface border-t border-yamaha-border">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <p className="section-label mb-5">El modelo</p>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-yamaha-white
                           uppercase leading-none mb-6">
              Rendimiento y estilo <span className="text-yamaha-red">en uno</span>
            </h2>
            <p className="text-yamaha-silver-light text-lg leading-relaxed mb-8">{descripcion}</p>
            <a href="https://wa.me/573152094701" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 font-display font-semibold
                          text-sm uppercase tracking-widest text-yamaha-red
                          hover:text-yamaha-white transition-colors duration-200
                          border-b border-yamaha-red/40 hover:border-yamaha-white pb-0.5">
              Conocer más detalles →
            </a>
          </div>
          <div>
            <p className="section-label mb-5">¿Por qué elegirla?</p>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-yamaha-white
                           uppercase leading-none mb-8">
              Diseñada para <span className="text-yamaha-red">ti</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {porQueElegir.map(({ icono, titulo, beneficio }) => (
                <div key={titulo}
                     className="flex flex-col gap-3 p-6 bg-yamaha-black border border-yamaha-border
                                hover:border-yamaha-red/30 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <span className="text-yamaha-red shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                           strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
                           className="w-6 h-6" aria-hidden="true">
                        {PQICONS[icono] ?? PQICONS.star}
                      </svg>
                    </span>
                    <p className="font-display font-bold text-base text-yamaha-white
                                  uppercase tracking-wide leading-tight">
                      {titulo}
                    </p>
                  </div>
                  <p className="font-sans text-base text-yamaha-silver leading-relaxed">
                    {beneficio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SeccionExperiencia({ moto }) {
  const { experiencia = [], nombre } = moto;
  if (!experiencia.length) return null;
  return (
    <section className="bg-yamaha-black border-t border-yamaha-border">
      <div className="container-site py-12 lg:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="section-label mb-4">La experiencia de conducir</p>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-yamaha-white
                           uppercase leading-none">
              Así se siente <span className="text-yamaha-red">la {nombre}</span>
            </h2>
          </div>
          <p className="text-yamaha-silver text-base max-w-xs">
            Más allá de los datos técnicos, esto es lo que vivirás cada vez que la enciendas.
          </p>
        </div>
      </div>
      <div className="border-t border-yamaha-border">
        <div className="container-site">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0
                          sm:divide-x divide-yamaha-border">
            {experiencia.map(({ titulo, descripcion }, i) => (
              <div key={titulo} className="flex flex-col gap-4 px-6 sm:px-10 py-12 lg:py-16">
                <span className="font-display font-bold text-6xl text-yamaha-red/15
                                 leading-none select-none" aria-hidden="true">0{i+1}</span>
                <h3 className="font-display font-bold text-3xl lg:text-4xl text-yamaha-white
                               uppercase leading-none">{titulo}</h3>
                <span className="accent-line" aria-hidden="true"/>
                <p className="font-sans text-base text-yamaha-silver leading-relaxed">{descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SeccionTecnologias({ moto }) {
  const { tecnologias = [], nombre } = moto;
  if (!tecnologias.length) return null;
  return (
    <section className="py-20 lg:py-28 bg-yamaha-surface border-t border-yamaha-border">
      <div className="container-site">
        <p className="section-label mb-5">Ingeniería Yamaha</p>
        <h2 className="font-display font-bold text-4xl lg:text-5xl text-yamaha-white
                       uppercase leading-none mb-4">
          Tecnología <span className="text-yamaha-red">incluida</span>
        </h2>
        <p className="text-yamaha-silver text-lg mb-12 max-w-2xl">
          Cada sistema de la {nombre} fue diseñado para mejorar tu experiencia.
          Esto es lo que obtienes sin costo adicional.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
          {tecnologias.map((slug) => {
            const def = TECMAP[slug];
            if (!def) return null;
            return (
              <div key={slug}
                   className="group flex gap-6 p-8 lg:p-10 bg-yamaha-black border
                              transition-colors duration-300"
                   style={{ borderColor:`${def.color}22` }}
                   onMouseEnter={(e) => e.currentTarget.style.borderColor=`${def.color}55`}
                   onMouseLeave={(e) => e.currentTarget.style.borderColor=`${def.color}22`}>
                <div className="flex items-center justify-center w-16 h-16 shrink-0 rounded-full"
                     style={{ backgroundColor:`${def.color}15`, border:`1px solid ${def.color}30` }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                       strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
                       className="w-8 h-8" style={{ color: def.color }} aria-hidden="true">
                    {def.path}
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-display font-bold text-xl uppercase tracking-wide"
                     style={{ color: def.color }}>{def.label}</p>
                  <p className="font-sans text-base text-yamaha-silver leading-relaxed">
                    {def.beneficio}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Lightbox simple — sin librerías externas ─────────────── */
function Lightbox({ images, startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx);
  const total = images.length;

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  /* Teclado: Esc cierra, flechas navegan */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  setIdx((i) => (i - 1 + total) % total);
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % total);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [total, onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center
                 bg-black/92 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Vista ampliada"
    >
      {/* Imagen */}
      <div
        className="relative max-w-[92vw] max-h-[88vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[idx]}
          alt={`Foto ${idx + 1} de ${total}`}
          className="max-w-full max-h-[80vh] object-contain shadow-2xl"
        />

        {/* Contador */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2
                        bg-black/60 text-white font-sans text-xs px-3 py-1 rounded-full">
          {idx + 1} / {total}
        </div>

        {/* Cerrar */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 sm:top-3 sm:right-3
                     w-9 h-9 bg-yamaha-red hover:bg-yamaha-red-dark
                     flex items-center justify-center rounded-full text-white
                     transition-colors duration-200"
          aria-label="Cerrar"
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"
               strokeWidth={2.5} strokeLinecap="round" className="w-4 h-4">
            <path d="M4 4l12 12M16 4L4 16"/>
          </svg>
        </button>

        {/* Anterior */}
        {total > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 sm:-left-14
                       w-10 h-10 bg-black/60 hover:bg-black/90
                       flex items-center justify-center text-white
                       rounded-full transition-colors duration-200"
            aria-label="Foto anterior"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor"
                 strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
              <path d="M10 4L6 8l4 4"/>
            </svg>
          </button>
        )}

        {/* Siguiente */}
        {total > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 sm:-right-14
                       w-10 h-10 bg-black/60 hover:bg-black/90
                       flex items-center justify-center text-white
                       rounded-full transition-colors duration-200"
            aria-label="Foto siguiente"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor"
                 strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
              <path d="M6 4l4 4-4 4"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

function SeccionGaleria({ moto }) {
  const { galeria = [], nombre } = moto;
  const [errors,    setErrors]  = useState({});
  const [lightbox,  setLightbox] = useState(null); // null | index
  const onErr = (i) => setErrors((p) => ({ ...p, [i]: true }));

  /* Solo las imágenes que cargan correctamente */
  const valid = galeria.filter((_, i) => !errors[i]);

  if (galeria.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-yamaha-black border-t border-yamaha-border">
      <div className="container-site">
        <p className="section-label mb-5">Conoce el modelo</p>
        <h2 className="font-display font-bold text-4xl lg:text-5xl text-yamaha-white
                       uppercase leading-none mb-10">
          Galería <span className="text-yamaha-red">fotográfica</span>
        </h2>

        {/* Grid — clic abre lightbox */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {galeria.map((src, i) =>
            !errors[i] && (
              <button
                key={i}
                className="aspect-[4/3] overflow-hidden block w-full
                           focus-visible:ring-2 focus-visible:ring-yamaha-red
                           focus-visible:ring-offset-2 focus-visible:ring-offset-yamaha-black"
                onClick={() => setLightbox(i)}
                aria-label={`Ampliar foto ${i + 1}`}
              >
                <img
                  src={src}
                  alt={`${nombre} — foto ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105
                             transition-transform duration-500 cursor-zoom-in"
                  loading="lazy"
                  onError={() => onErr(i)}
                />
              </button>
            )
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox
          images={valid}
          startIdx={valid.indexOf(galeria[lightbox]) >= 0
            ? valid.indexOf(galeria[lightbox]) : 0}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}

function SeccionEspecificaciones({ moto }) {
  const [expandida, setExpandida]     = useState(false);
  const [colorActivo, setColorActivo] = useState(0);
  const { especificaciones, colores = [], manual } = moto;
  const entries  = Object.entries(especificaciones);
  const visibles = expandida ? entries : entries.slice(0, 5);

  const BtnDoc = ({ href, children, disabled: dis }) => {
    const cls = `flex items-center justify-center gap-2 p-4 border font-sans text-sm
                 uppercase tracking-wider transition-colors duration-200
                 ${dis ? "border-yamaha-border bg-yamaha-black text-yamaha-silver/40 cursor-not-allowed"
                       : "border-yamaha-border bg-yamaha-black text-yamaha-silver hover:border-yamaha-red/40 hover:text-yamaha-white"}`;
    const Icon = () => (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2}
           strokeLinecap="round" className="w-4 h-4" aria-hidden="true">
        <path d="M4 4a2 2 0 012-2h5l5 5v9a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
        <path d="M12 2v5h5M8 13h4M8 10h4"/>
      </svg>
    );
    if (dis) return <button disabled className={cls}><Icon/>{children}</button>;
    return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}><Icon/>{children}</a>;
  };

  return (
    <section className="py-20 lg:py-28 bg-yamaha-surface border-t border-yamaha-border">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <p className="section-label mb-5">Datos técnicos</p>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-yamaha-white
                           uppercase leading-none mb-8">
              Ficha <span className="text-yamaha-red">técnica</span>
            </h2>
            <div className="border border-yamaha-border overflow-hidden">
              <dl className="divide-y divide-yamaha-border">
                {visibles.map(([key, value], i) => (
                  <div key={key}
                       className={`flex items-center justify-between gap-6 px-6 py-4
                                   ${i%2===0 ? "bg-yamaha-black" : "bg-yamaha-surface"}`}>
                    <dt className="font-sans text-base text-yamaha-silver shrink-0 min-w-[110px]">{key}</dt>
                    <dd className="font-sans text-base text-yamaha-white text-right font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
              {entries.length > 5 && (
                <button onClick={() => setExpandida(p=>!p)}
                        className="w-full py-4 text-center font-sans text-sm font-semibold
                                   uppercase tracking-widest text-yamaha-silver
                                   hover:text-yamaha-red bg-yamaha-surface border-t
                                   border-yamaha-border transition-colors duration-200">
                  {expandida ? "▲ Ver menos" : `▼ Ver ${entries.length-5} datos más`}
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-10">
            {colores.length > 0 && (
              <div>
                <p className="section-label mb-5">Colores disponibles</p>
                <h3 className="font-display font-bold text-3xl lg:text-4xl text-yamaha-white
                               uppercase leading-none mb-6">{colores[colorActivo].nombre}</h3>
                <div className="flex items-center gap-4 mb-3">
                  {colores.map((c,i) => (
                    <button key={c.hex} title={c.nombre} onClick={() => setColorActivo(i)}
                            aria-label={c.nombre} aria-pressed={i===colorActivo}
                            className={`w-12 h-12 rounded-full border-4 transition-all duration-200
                                        ${i===colorActivo
                                          ? "border-yamaha-red scale-110"
                                          : "border-yamaha-border hover:border-yamaha-silver"}`}
                            style={{ backgroundColor: c.hex }}/>
                  ))}
                </div>
                <p className="font-sans text-sm text-yamaha-silver/60">
                  Sujeto a disponibilidad · Consulta con nuestro asesor
                </p>
              </div>
            )}
            <div>
              <p className="section-label mb-5">Documentos del modelo</p>
              <h3 className="font-display font-bold text-3xl lg:text-4xl text-yamaha-white
                             uppercase leading-none mb-6">Recursos y descargas</h3>
              <div className="flex flex-col gap-2">
                <BtnDoc disabled>Ficha técnica completa (próximamente)</BtnDoc>
                {manual
                  ? <BtnDoc href={manual}>Manual del propietario — PDF</BtnDoc>
                  : <BtnDoc disabled>Manual del propietario (próximamente)</BtnDoc>}
                <BtnDoc href="https://www.incolmotos-yamaha.com.co">
                  Ver en página oficial Yamaha Colombia
                </BtnDoc>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SeccionCotizador({ moto }) {
  const [abierto, setAbierto] = useState(false);
  if (!moto.precio) return null;
  return (
    <section className="py-20 lg:py-28 bg-yamaha-black border-t border-yamaha-border">
      <div className="container-site">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-label mb-5">Financia tu moto</p>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-yamaha-white
                           uppercase leading-none mb-6">
              Simula tu <span className="text-yamaha-red">cuota mensual</span>
            </h2>
            <p className="text-yamaha-silver text-lg mb-8">
              Ajusta la cuota inicial y el plazo. Valores de referencia, sin compromiso.
            </p>
            <button onClick={() => setAbierto(p=>!p)} aria-expanded={abierto}
                    className={`inline-flex items-center gap-3 px-12 py-5 font-display
                                font-semibold text-base uppercase tracking-widest border
                                transition-all duration-300
                                ${abierto
                                  ? "bg-yamaha-red border-yamaha-red text-white"
                                  : "bg-transparent border-yamaha-red text-yamaha-red hover:bg-yamaha-red hover:text-white"}`}>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"
                   strokeWidth={2} strokeLinecap="round"
                   className={`w-5 h-5 transition-transform duration-300 ${abierto?"rotate-180":""}`}
                   aria-hidden="true">
                <path d="M5 8l5 5 5-5"/>
              </svg>
              {abierto ? "Cerrar simulador" : "Simular financiamiento"}
            </button>
          </div>
          <div className={`transition-all duration-500 overflow-hidden
                           ${abierto ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
               aria-hidden={!abierto}>
            <CotizadorSimulado precio={moto.precio}/>
          </div>
        </div>
      </div>
    </section>
  );
}

function SeccionCTAFinal({ moto }) {
  return (
    <section className="bg-yamaha-surface border-t border-yamaha-border">
      <div className="container-site py-20 lg:py-24">
        <div className="relative overflow-hidden border border-yamaha-border
                        bg-yamaha-black p-10 sm:p-14 lg:p-16">
          <div className="absolute top-0 left-0 bottom-0 w-1 bg-yamaha-red" aria-hidden="true"/>
          <div className="absolute right-0 top-0 bottom-0 flex items-center overflow-hidden
                          pointer-events-none select-none" aria-hidden="true">
            <span className="font-display font-bold text-[clamp(5rem,15vw,10rem)]
                             text-yamaha-white/[0.03] uppercase leading-none pr-8">YAMAHA</span>
          </div>
          <div className="absolute inset-0 dot-grid opacity-15" aria-hidden="true"/>
          <div className="relative z-10 flex flex-col lg:flex-row items-start
                          lg:items-center justify-between gap-10">
            <div>
              <p className="section-label mb-4">¿Convencido?</p>
              <h2 className="font-display font-bold uppercase leading-none mb-4">
                <span className="block text-[clamp(2rem,4.5vw,3.2rem)] text-yamaha-white">
                  ¿Listo para estrenar
                </span>
                <span className="block text-[clamp(2rem,4.5vw,3.2rem)] text-yamaha-red">
                  tu {moto.nombre}?
                </span>
              </h2>
              <p className="text-yamaha-silver text-base max-w-md leading-relaxed">
                Visítanos en Carrera 15 #6-30, Barrio Universitario, El Socorro.
                Lun–Vie 8 am–6 pm · Sáb 8 am–12 pm.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0 w-full sm:w-auto">
              <a href="https://wa.me/573152094701?text=Hola%2C%20quiero%20conocer%20más%20sobre%20la%20Yamaha"
                 target="_blank" rel="noopener noreferrer"
                 className="btn-primary justify-center py-5 px-12 text-base">
                Escribir por WhatsApp
              </a>
              <Link to="/contacto" className="btn-secondary justify-center py-5 px-12 text-base">
                Ver información de contacto
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ModelosRelacionados({ categoriaSlug, slugActual }) {
  const rel = getMotosByCategoria(categoriaSlug)
    .filter((m) => m.slug !== slugActual).slice(0, 3);
  if (!rel.length) return null;
  return (
    <section className="py-20 lg:py-24 bg-yamaha-black border-t border-yamaha-border">
      <div className="container-site">
        <p className="section-label mb-4">Sigue explorando</p>
        <h2 className="section-title mb-12">
          También te puede <span className="text-yamaha-red">interesar</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rel.map((m) => <MotoCard key={m.id} moto={m}/>)}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PÁGINA — nuevo orden en la parte superior
═══════════════════════════════════════════════════════════════ */
export default function MotoDetalle() {
  const { id: slug } = useParams();
  const moto = getMotoBySlug(slug);
  if (!moto) return <Navigate to="/catalogo" replace />;

  return (
    <div className="bg-yamaha-black min-h-screen">
      {/* ── NUEVO ORDEN SUPERIOR ─────────────────────────── */}
      <BannerPrincipal   moto={moto} />
      <FranjaTecnologias tecnologias={moto.tecnologias} />
      <BloquNombrePrecio moto={moto} />

      {/* ── RESTO DE LA PÁGINA — sin cambios ─────────────── */}
      <SeccionPorQue          moto={moto} />
      <SeccionExperiencia     moto={moto} />
      <SeccionTecnologias     moto={moto} />
      <SeccionGaleria         moto={moto} />
      <SeccionEspecificaciones moto={moto} />
      <SeccionCotizador       moto={moto} />
      <SeccionCTAFinal        moto={moto} />
      <ModelosRelacionados
        categoriaSlug={moto.categoria}
        slugActual={moto.slug}
      />
    </div>
  );
}
