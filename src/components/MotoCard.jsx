import { useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIAS, formatCOP } from "../data/motos";
import { BadgesCompactos } from "./TecnologiaBadge";

function getCategoriaLabel(slug) {
  return CATEGORIAS.find((c) => c.slug === slug)?.label ?? slug;
}

/* ─────────────────────────────────────────────────────────────
   Placeholder de marca — se muestra cuando no hay imagen local.
   Diseño intencional: no parece un error, parece una reserva.
───────────────────────────────────────────────────────────── */
function ImagePlaceholder({ nombre, categoria }) {
  const label = getCategoriaLabel(categoria);
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center
                    bg-gradient-to-br from-yamaha-gray to-yamaha-black overflow-hidden">
      {/* Textura */}
      <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
      {/* Nombre en tipografía grande de fondo */}
      <span className="absolute font-display font-bold text-[4rem] uppercase
                       text-yamaha-white/[0.06] tracking-widest select-none
                       text-center leading-none px-4"
            aria-hidden="true">
        {nombre}
      </span>
      {/* Contenido central */}
      <div className="relative z-10 flex flex-col items-center gap-3 text-center px-6">
        <svg viewBox="0 0 48 32" fill="none" stroke="currentColor"
             strokeWidth={1.2} strokeLinecap="round"
             className="w-16 h-10 text-yamaha-red/40" aria-hidden="true">
          {/* Silueta genérica de moto */}
          <ellipse cx="10" cy="24" rx="7" ry="7" />
          <ellipse cx="38" cy="24" rx="7" ry="7" />
          <path d="M17 24h14M17 24l4-10h8l5 6M21 14h-6l-3 4" />
          <path d="M31 20l3-10h4" />
        </svg>
        <p className="font-display font-bold text-sm uppercase tracking-widest
                      text-yamaha-white/40">
          {nombre}
        </p>
        <span className="font-sans text-[10px] text-yamaha-silver/40 uppercase tracking-wider">
          {label} · Foto próximamente
        </span>
      </div>
      {/* Línea roja inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-yamaha-red/20"
           aria-hidden="true" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MotoCard
───────────────────────────────────────────────────────────── */
export default function MotoCard({ moto }) {
  const [imgError, setImgError] = useState(false);
  const { slug, nombre, categoria, cilindrada, transmision,
          imagen, tecnologias = [], precio, colores = [] } = moto;
  const categoriaLabel = getCategoriaLabel(categoria);
  const precioTexto    = precio ? formatCOP(precio.valor) : null;

  return (
    <article className="
      group relative flex flex-col overflow-hidden
      bg-yamaha-surface border border-yamaha-border
      hover:border-yamaha-red/50 hover:-translate-y-0.5
      hover:shadow-[0_8px_32px_rgba(230,0,18,0.08)]
      transition-all duration-300
    ">
      {/* Línea top animada */}
      <div className="absolute top-0 left-0 right-0 h-px z-10 bg-yamaha-red
                      scale-x-0 group-hover:scale-x-100
                      transition-transform duration-300 origin-left"
           aria-hidden="true" />

      {/* ── Imagen / Placeholder ────────────────────────────── */}
      <div className="relative aspect-[3/2] overflow-hidden bg-yamaha-black shrink-0">

        {!imgError && (
          <img
            src={imagen}
            alt={`Yamaha ${nombre}`}
            className="w-full h-full object-contain p-3
                       transition-transform duration-700 ease-out
                       group-hover:scale-[1.04]"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}

        {imgError && (
          <ImagePlaceholder nombre={nombre} categoria={categoria} />
        )}

        {/* Badge categoría */}
        <div className="absolute top-0 left-0 z-10">
          <span className="block bg-yamaha-red text-white font-sans font-semibold
                           text-[10px] uppercase tracking-[0.15em] px-3 py-1.5">
            {categoriaLabel}
          </span>
        </div>

        {/* Swatches de color */}
        {colores.length > 0 && (
          <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1">
            {colores.slice(0, 4).map((c) => (
              <div key={c.hex} title={c.nombre}
                   className="w-3 h-3 rounded-full border border-white/30"
                   style={{ backgroundColor: c.hex }} />
            ))}
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-16 gradient-dark-bottom
                        pointer-events-none" aria-hidden="true" />
      </div>

      {/* ── Contenido ───────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-5 gap-3">

        <h3 className="font-display font-bold uppercase text-[1.6rem] leading-none
                       tracking-tight text-yamaha-white group-hover:text-yamaha-red/90
                       transition-colors duration-200">
          {nombre}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-yamaha-silver font-sans">
          <span className="w-1.5 h-1.5 rounded-full bg-yamaha-red shrink-0"
                aria-hidden="true" />
          {cilindrada} · {transmision}
        </div>

        <BadgesCompactos tecnologias={tecnologias} max={4} />

        {precioTexto && (
          <div className="flex items-baseline gap-1.5">
            <span className="font-sans text-[10px] text-yamaha-silver uppercase
                             tracking-wider">Desde</span>
            <span className="font-display font-bold text-base text-yamaha-white">
              {precioTexto}
            </span>
          </div>
        )}

        <div className="mt-auto pt-3.5 border-t border-yamaha-border">
          <Link
            to={`/catalogo/${slug}`}
            className="group/cta flex items-center justify-between
                       font-display font-semibold text-sm uppercase tracking-widest
                       text-yamaha-silver-light hover:text-yamaha-red
                       transition-colors duration-200"
            aria-label={`Ver ficha completa de ${nombre}`}
          >
            <span>Ver modelo</span>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"
                 strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                 className="w-4 h-4 shrink-0 group-hover/cta:translate-x-1
                            transition-transform duration-200"
                 aria-hidden="true">
              <path d="M4 10h12M12 5l5 5-5 5" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
