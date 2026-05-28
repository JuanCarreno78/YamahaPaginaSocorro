import { useState, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   CaracteristicasSlider — Slider horizontal CSS puro.
   Sin librerías externas. Usa scroll-snap nativo del navegador.

   Props:
     caracteristicas  Array de { badge, titulo, subtitulo, descripcion }
     nombreMoto       string — para accesibilidad
═══════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────────
   Íconos SVG por badge — mismos que TecnologiaBadge, inline
───────────────────────────────────────────────────────────── */
const ICONS = {
  "blue-core": { color: "#3B9EDB",
    path: <><path d="M12 22V12"/><path d="M5 12C5 8.13 8.13 5 12 5s7 3.13 7 7c0 2.5-1.5 5-4 6.5"/><path d="M9 9c0 0 1 3 3 3s3-3 3-3"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></> },
  "fi":        { color: "#E6A817",
    path: <><path d="M12 2C12 2 6 9 6 14a6 6 0 0012 0c0-5-6-12-6-12z"/><path d="M9 17h6"/><path d="M12 14v3"/></> },
  "abs":       { color: "#E60012",
    path: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/></> },
  "vva":       { color: "#9B59B6",
    path: <><path d="M7 16V8M7 8l-3 3M7 8l3 3"/><path d="M17 8v8M17 16l-3-3M17 16l3-3"/><path d="M11 12h2"/></> },
  "full-led":  { color: "#F0C30F",
    path: <><path d="M9 21h6M12 3a6 6 0 014.9 9.4L15 15H9l-1.9-2.6A6 6 0 0112 3z"/><path d="M10 15v2a2 2 0 004 0v-2"/></> },
  "y-connect": { color: "#1DB9C3",
    path: <><path d="M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11"/></> },
  "smart-key": { color: "#27AE60",
    path: <><circle cx="7.5" cy="15.5" r="3.5"/><path d="M11 12l8-8M15 4l2 2M17 8l2-2M19 5l1-1"/></> },
};

function FeatureIcon({ badge, size = 48 }) {
  const def = ICONS[badge] ?? ICONS["fi"];
  return (
    <div className="flex items-center justify-center rounded-full shrink-0"
         style={{ width: size, height: size, backgroundColor: `${def.color}15`,
                  border: `1px solid ${def.color}30` }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
           style={{ width: size * 0.5, height: size * 0.5, color: def.color }}
           aria-hidden="true">
        {def.path}
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Slide individual
───────────────────────────────────────────────────────────── */
function Slide({ caracteristica, index, total }) {
  const { badge, titulo, subtitulo, descripcion } = caracteristica;
  const def = ICONS[badge] ?? ICONS["fi"];

  return (
    <div className="snap-start shrink-0 w-full h-full
                    flex flex-col sm:flex-row items-start sm:items-center
                    gap-6 p-6 sm:p-8"
         role="group"
         aria-label={`Característica ${index + 1} de ${total}: ${titulo}`}>

      {/* Icono grande */}
      <div className="shrink-0">
        <FeatureIcon badge={badge} size={72} />
      </div>

      {/* Texto */}
      <div className="flex flex-col gap-2">
        {/* Número de slide */}
        <p className="font-sans text-[10px] uppercase tracking-[0.2em]
                      text-yamaha-silver/50">
          {String(index + 1).padStart(2,"0")} / {String(total).padStart(2,"0")}
        </p>

        <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase
                       leading-tight"
            style={{ color: def.color }}>
          {titulo}
        </h3>

        <p className="font-display font-semibold text-sm text-yamaha-white/70
                      uppercase tracking-wide">
          {subtitulo}
        </p>

        <p className="font-sans text-sm text-yamaha-silver leading-relaxed
                      max-w-prose mt-1">
          {descripcion}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Slider principal
───────────────────────────────────────────────────────────── */
export default function CaracteristicasSlider({ caracteristicas = [], nombreMoto = "" }) {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);
  const total = caracteristicas.length;

  if (total === 0) return null;

  const goTo = (index) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.offsetWidth, behavior: "smooth" });
    setCurrent(index);
  };

  const prev = () => goTo(Math.max(0, current - 1));
  const next = () => goTo(Math.min(total - 1, current + 1));

  return (
    <div aria-label={`Características destacadas de ${nombreMoto}`}>

      {/* Encabezado */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="section-label mb-1">Lo que la hace diferente</p>
          <h2 className="font-display font-bold text-xl text-yamaha-white uppercase
                         tracking-tight">
            Características <span className="text-yamaha-red">clave</span>
          </h2>
        </div>

        {/* Controles */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            disabled={current === 0}
            className="flex items-center justify-center w-9 h-9
                       border border-yamaha-border bg-yamaha-black
                       text-yamaha-silver hover:text-yamaha-white
                       hover:border-yamaha-red/40
                       disabled:opacity-30 disabled:cursor-not-allowed
                       transition-all duration-200"
            aria-label="Característica anterior"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor"
                 strokeWidth={2} strokeLinecap="round" className="w-4 h-4"
                 aria-hidden="true">
              <path d="M10 4L6 8l4 4" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1.5" role="tablist"
               aria-label="Slides de características">
            {caracteristicas.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === current}
                aria-label={`Ir a característica ${i + 1}`}
                className={`transition-all duration-200 rounded-full
                            ${i === current
                              ? "w-4 h-1.5 bg-yamaha-red"
                              : "w-1.5 h-1.5 bg-yamaha-border hover:bg-yamaha-silver"}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={current === total - 1}
            className="flex items-center justify-center w-9 h-9
                       border border-yamaha-border bg-yamaha-black
                       text-yamaha-silver hover:text-yamaha-white
                       hover:border-yamaha-red/40
                       disabled:opacity-30 disabled:cursor-not-allowed
                       transition-all duration-200"
            aria-label="Siguiente característica"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor"
                 strokeWidth={2} strokeLinecap="round" className="w-4 h-4"
                 aria-hidden="true">
              <path d="M6 4l4 4-4 4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Track con scroll-snap */}
      <div
        ref={trackRef}
        className="flex overflow-x-auto scrollbar-hide scroll-smooth
                   snap-x snap-mandatory
                   border border-yamaha-border bg-yamaha-surface"
        style={{ scrollSnapType: "x mandatory" }}
        aria-live="polite"
      >
        {caracteristicas.map((c, i) => (
          <Slide key={i} caracteristica={c} index={i} total={total} />
        ))}
      </div>
    </div>
  );
}
