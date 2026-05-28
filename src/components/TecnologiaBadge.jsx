/* ═══════════════════════════════════════════════════════════════
   TecnologiaBadge.jsx — Badges visuales de tecnologías Yamaha

   Todos los íconos son SVG inline. Sin imágenes externas.
   Uso compact (MotoCard): solo ícono + tooltip
   Uso full (MotoDetalle): ícono + etiqueta completa
═══════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────────
   Definición de tecnologías
   Cada entrada: label, descripción breve, ícono SVG
───────────────────────────────────────────────────────────── */
const TECNOLOGIAS = {
  "blue-core": {
    label: "Blue Core",
    desc:  "Motor de alto aprovechamiento energético",
    color: "#3B9EDB",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
           className="w-full h-full" aria-hidden="true">
        {/* Hoja + motor: eficiencia energética */}
        <path d="M12 22V12" />
        <path d="M5 12C5 8.13 8.13 5 12 5s7 3.13 7 7c0 2.5-1.5 5-4 6.5" />
        <path d="M9 9c0 0 1 3 3 3s3-3 3-3" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  "fi": {
    label: "Fuel Injection",
    desc:  "Inyección electrónica de combustible",
    color: "#E6A817",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
           className="w-full h-full" aria-hidden="true">
        {/* Gota de combustible + circuito */}
        <path d="M12 2C12 2 6 9 6 14a6 6 0 0012 0c0-5-6-12-6-12z" />
        <path d="M9 17h6" />
        <path d="M12 14v3" />
      </svg>
    ),
  },
  "abs": {
    label: "ABS",
    desc:  "Sistema antibloqueo de frenos",
    color: "#E60012",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
           className="w-full h-full" aria-hidden="true">
        {/* Rueda con disco */}
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </svg>
    ),
  },
  "vva": {
    label: "VVA",
    desc:  "Variable Valve Actuation — más potencia y torque",
    color: "#9B59B6",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
           className="w-full h-full" aria-hidden="true">
        {/* Flechas dobles — variación de válvulas */}
        <path d="M7 16V8M7 8l-3 3M7 8l3 3" />
        <path d="M17 8v8M17 16l-3-3M17 16l3-3" />
        <path d="M11 12h2" />
      </svg>
    ),
  },
  "full-led": {
    label: "Full LED",
    desc:  "Iluminación LED completa",
    color: "#F0C30F",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
           className="w-full h-full" aria-hidden="true">
        {/* Bombillo LED */}
        <path d="M9 21h6M12 3a6 6 0 014.9 9.4L15 15H9l-1.9-2.6A6 6 0 0112 3z" />
        <path d="M10 15v2a2 2 0 004 0v-2" />
      </svg>
    ),
  },
  "y-connect": {
    label: "Y-Connect",
    desc:  "Conectividad Bluetooth con smartphone",
    color: "#1DB9C3",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
           className="w-full h-full" aria-hidden="true">
        {/* Bluetooth */}
        <path d="M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11" />
      </svg>
    ),
  },
  "smart-key": {
    label: "Smart Key",
    desc:  "Llave inteligente de proximidad",
    color: "#27AE60",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
           className="w-full h-full" aria-hidden="true">
        {/* Llave + señal */}
        <circle cx="7.5" cy="15.5" r="3.5" />
        <path d="M11 12l8-8M15 4l2 2M17 8l2-2" />
        <path d="M19 5l1-1" />
      </svg>
    ),
  },
};

/* ─────────────────────────────────────────────────────────────
   Variante compact — solo ícono con tooltip (para MotoCard)
   Muestra máximo 4 badges en una fila compacta
───────────────────────────────────────────────────────────── */
function BadgeCompact({ slug }) {
  const tec = TECNOLOGIAS[slug];
  if (!tec) return null;

  return (
    <div
      title={`${tec.label} — ${tec.desc}`}
      className="relative group/badge"
    >
      <div
        className="w-7 h-7 p-1.5 border border-yamaha-border
                   bg-yamaha-black hover:border-current
                   transition-colors duration-200 cursor-default"
        style={{ color: tec.color }}
      >
        {tec.icon}
      </div>
      {/* Tooltip */}
      <div className="
        absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20
        bg-yamaha-surface border border-yamaha-border
        text-yamaha-white text-[10px] font-sans whitespace-nowrap px-2 py-1
        opacity-0 group-hover/badge:opacity-100
        pointer-events-none transition-opacity duration-150
      ">
        {tec.label}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Variante full — ícono + label + descripción (para MotoDetalle)
───────────────────────────────────────────────────────────── */
function BadgeFull({ slug }) {
  const tec = TECNOLOGIAS[slug];
  if (!tec) return null;

  return (
    <div className="flex items-center gap-3 p-3 bg-yamaha-black border border-yamaha-border
                    hover:border-opacity-60 transition-colors duration-200"
         style={{ borderColor: `${tec.color}33` }}>
      <div
        className="w-8 h-8 p-1.5 shrink-0"
        style={{ color: tec.color }}
      >
        {tec.icon}
      </div>
      <div>
        <p className="font-display font-bold text-xs uppercase tracking-widest"
           style={{ color: tec.color }}>
          {tec.label}
        </p>
        <p className="font-sans text-[11px] text-yamaha-silver leading-tight">
          {tec.desc}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Exports
───────────────────────────────────────────────────────────── */
export function BadgesCompactos({ tecnologias = [], max = 4 }) {
  if (!tecnologias.length) return null;
  const visible = tecnologias.slice(0, max);
  const resto   = tecnologias.length - max;

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {visible.map((slug) => <BadgeCompact key={slug} slug={slug} />)}
      {resto > 0 && (
        <span className="text-[10px] text-yamaha-silver font-sans">
          +{resto}
        </span>
      )}
    </div>
  );
}

export function BadgesCompletos({ tecnologias = [] }) {
  if (!tecnologias.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {tecnologias.map((slug) => <BadgeFull key={slug} slug={slug} />)}
    </div>
  );
}
