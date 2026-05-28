import { useState, useMemo } from "react";
import { formatCOP } from "../data/motos";

/* ═══════════════════════════════════════════════════════════════
   CotizadorSimulado — Calculadora visual de cuotas.

   SOLO SIMULACIÓN VISUAL. Sin backend, sin tasas reales dinámicas.
   Los valores son referencias aproximadas para orientar al cliente.
   La tasa mensual base es 1.8% (referencia mercado colombiano motos).

   Props:
     precio  { valor: number, nota: string }  — de motos.js
═══════════════════════════════════════════════════════════════ */

const TASA_MENSUAL   = 0.018;   // 1.8% mensual referencial
const PLAZOS         = [12, 18, 24, 36];
const INICIAL_MIN    = 10;
const INICIAL_MAX    = 50;
const INICIAL_DEF    = 20;

/** Fórmula PMT (cuota fija): PV·i / (1 − (1+i)^−n) */
function calcularCuota(principal, meses, pctInicial) {
  const inicial = principal * (pctInicial / 100);
  const pv      = principal - inicial;
  if (pv <= 0 || meses <= 0) return 0;
  return pv * TASA_MENSUAL / (1 - Math.pow(1 + TASA_MENSUAL, -meses));
}

/* ─────────────────────────────────────────────────────────────
   Sub-componente: resultado destacado
───────────────────────────────────────────────────────────── */
function ResultadoItem({ label, valor, destacado = false }) {
  return (
    <div className={`flex flex-col items-center text-center p-4 border
                     ${destacado
                       ? "border-yamaha-red/40 bg-yamaha-red/5"
                       : "border-yamaha-border bg-yamaha-black"}`}>
      <p className="font-sans text-[10px] text-yamaha-silver uppercase
                    tracking-wider mb-1">
        {label}
      </p>
      <p className={`font-display font-bold leading-none
                     ${destacado ? "text-2xl text-yamaha-red" : "text-lg text-yamaha-white"}`}>
        {valor}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Cotizador principal
───────────────────────────────────────────────────────────── */
export default function CotizadorSimulado({ precio }) {
  const [plazo,    setPlazo]    = useState(24);
  const [pctInicial, setPctInicial] = useState(INICIAL_DEF);

  if (!precio?.valor) return null;

  const base      = precio.valor;
  const inicial   = base * (pctInicial / 100);
  const cuota     = useMemo(
    () => calcularCuota(base, plazo, pctInicial),
    [base, plazo, pctInicial]
  );
  const totalPago = inicial + cuota * plazo;

  return (
    <div className="border border-yamaha-border bg-yamaha-surface overflow-hidden">

      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-yamaha-border
                      bg-yamaha-black">
        <span className="accent-line" aria-hidden="true" />
        <div>
          <h3 className="font-display font-semibold text-sm text-yamaha-white
                         uppercase tracking-widest">
            Simulador de financiamiento
          </h3>
          <p className="font-sans text-[10px] text-yamaha-silver mt-0.5">
            Valores de referencia · No vinculante
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex flex-col gap-6">

        {/* Precio base */}
        <div className="flex items-baseline justify-between
                        pb-4 border-b border-yamaha-border">
          <span className="font-sans text-sm text-yamaha-silver">Precio base</span>
          <span className="font-display font-bold text-xl text-yamaha-white">
            {formatCOP(base)}
          </span>
        </div>

        {/* Control: Cuota inicial */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="font-sans text-sm text-yamaha-silver"
                   htmlFor="cuota-inicial">
              Cuota inicial
            </label>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-bold text-lg text-yamaha-white">
                {pctInicial}%
              </span>
              <span className="font-sans text-xs text-yamaha-silver">
                · {formatCOP(Math.round(inicial))}
              </span>
            </div>
          </div>

          <input
            id="cuota-inicial"
            type="range"
            min={INICIAL_MIN}
            max={INICIAL_MAX}
            step={5}
            value={pctInicial}
            onChange={(e) => setPctInicial(Number(e.target.value))}
            className="w-full h-1.5 bg-yamaha-border rounded-none appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-yamaha-red
                       [&::-webkit-slider-thumb]:border-2
                       [&::-webkit-slider-thumb]:border-yamaha-white
                       [&::-webkit-slider-thumb]:cursor-pointer"
            aria-label={`Cuota inicial: ${pctInicial}%`}
          />
          <div className="flex justify-between mt-1">
            <span className="font-sans text-[10px] text-yamaha-silver/50">{INICIAL_MIN}%</span>
            <span className="font-sans text-[10px] text-yamaha-silver/50">{INICIAL_MAX}%</span>
          </div>
        </div>

        {/* Control: Plazo */}
        <div>
          <p className="font-sans text-sm text-yamaha-silver mb-3">
            Plazo de financiamiento
          </p>
          <div className="grid grid-cols-4 gap-2" role="group"
               aria-label="Selecciona el plazo">
            {PLAZOS.map((p) => (
              <button
                key={p}
                onClick={() => setPlazo(p)}
                aria-pressed={p === plazo}
                className={`py-2.5 font-display font-semibold text-sm uppercase
                            tracking-widest border transition-all duration-200
                            ${p === plazo
                              ? "bg-yamaha-red border-yamaha-red text-white"
                              : "bg-yamaha-black border-yamaha-border text-yamaha-silver hover:border-yamaha-red/40 hover:text-yamaha-white"}`}
              >
                {p}m
              </button>
            ))}
          </div>
        </div>

        {/* Resultados */}
        <div className="grid grid-cols-3 gap-2">
          <ResultadoItem
            label={`Cuota / ${plazo} meses`}
            valor={formatCOP(Math.round(cuota))}
            destacado
          />
          <ResultadoItem
            label="Cuota inicial"
            valor={formatCOP(Math.round(inicial))}
          />
          <ResultadoItem
            label="Total aprox."
            valor={formatCOP(Math.round(totalPago))}
          />
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 pt-2 border-t border-yamaha-border">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"
               strokeWidth={1.5} strokeLinecap="round"
               className="w-4 h-4 shrink-0 text-yamaha-silver/50 mt-0.5"
               aria-hidden="true">
            <circle cx="10" cy="10" r="8"/>
            <path d="M10 6v4M10 14h.01"/>
          </svg>
          <p className="font-sans text-[11px] text-yamaha-silver/50 leading-relaxed">
            Simulación de referencia con tasa mensual del {(TASA_MENSUAL * 100).toFixed(1)}%.
            Los valores reales dependen de la entidad financiera, el historial crediticio
            y las condiciones vigentes al momento de la solicitud.
            Consulta con nuestro asesor para una cotización personalizada.
          </p>
        </div>

        {/* CTA */}
        <a
          href="https://wa.me/573152094701?text=Hola%2C%20quiero%20información%20sobre%20financiamiento%20para%20una%20moto%20Yamaha."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full justify-center"
        >
          Consultar financiamiento
        </a>
      </div>
    </div>
  );
}
