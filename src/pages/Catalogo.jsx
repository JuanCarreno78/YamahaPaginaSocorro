import MotoCard from "../components/MotoCard";
import { motos, CATEGORIAS } from "../data/motos";

/* ═══════════════════════════════════════════════════════════════
   Catalogo.jsx — Grid completo del catálogo

   Fase 4: header de página mejorado con resumen de categorías,
   grid con mejor spacing y consistencia visual.
   Filtros: Fase siguiente.
═══════════════════════════════════════════════════════════════ */
export default function Catalogo() {
  return (
    <div className="bg-yamaha-black min-h-screen">

      {/* ── Header de página ────────────────────────────────── */}
      <div className="bg-yamaha-surface border-b border-yamaha-border">
        <div className="container-site py-12 lg:py-14">

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <p className="section-label mb-4">Lineup completo</p>
              <h1 className="section-title mb-4">
                Catálogo <span className="text-yamaha-red">Yamaha</span>
              </h1>
              <span className="accent-line" />
              <p className="text-yamaha-silver mt-5 max-w-lg leading-relaxed">
                Todos los modelos disponibles en Santander. Motos japonesas para cada
                estilo de vida y tipo de ruta.
              </p>
            </div>

            {/* Resumen de categorías */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIAS.map(({ slug, label }) => {
                const count = motos.filter((m) => m.categoria === slug).length;
                if (count === 0) return null;
                return (
                  <span
                    key={slug}
                    className="
                      flex items-center gap-2 px-3 py-1.5
                      border border-yamaha-border
                      font-sans text-xs text-yamaha-silver uppercase tracking-wider
                    "
                  >
                    <span className="w-1 h-1 rounded-full bg-yamaha-red" aria-hidden="true" />
                    {label}
                    <span className="text-yamaha-white font-semibold">{count}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Grid de motos ─────────────────────────────────────── */}
      <section className="container-site py-12 lg:py-16" aria-label="Listado de motos">

        <p className="text-yamaha-silver text-sm mb-8 flex items-center gap-2">
          Mostrando
          <span className="text-yamaha-white font-semibold">{motos.length}</span>
          modelos
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {motos.map((moto) => (
            <MotoCard key={moto.id} moto={moto} />
          ))}
        </div>
      </section>
    </div>
  );
}
