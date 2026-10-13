"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { acabados, acabadosTextos, colores, linkWhatsapp, type IdAcabado } from "@/data/sitio";
import { setAcabado, useAcabado } from "@/lib/acabado";
import { easePreciso, Revelar } from "./movimiento";
import { Etiqueta, IconoWhatsapp } from "./ui";

const VISTA = "0 0 480 320";

/** Frentes del mueble pintados en el acabado elegido (con tiradores y divisiones). */
function Frentes({ id }: { id: IdAcabado }) {
  const acabado = acabados.find((a) => a.id === id)!;
  const esNegro = id === "negro";
  const division = esNegro ? "#4A4B50" : "rgb(23 23 26 / 0.55)";
  const tirador = esNegro ? colores.roble : colores.negro;
  return (
    <svg viewBox={VISTA} aria-hidden="true" className="absolute inset-0 h-full w-full">
      <rect x="60" y="64" width="360" height="176" fill={acabado.color} />
      <rect x="52" y="52" width="376" height="12" fill={acabado.color} />
      <g stroke={division} strokeWidth="1.2">
        <path d="M180 64v176M300 64v176M300 122.7h120M300 181.3h120" />
      </g>
      <g stroke={tirador} strokeWidth="4" strokeLinecap="square">
        <path d="M168 132v40M192 132v40M346 94h28M346 152h28M346 211h28" />
      </g>
    </svg>
  );
}

export default function Acabados() {
  const elegido = useAcabado() ?? "roble";
  const [capa, setCapa] = useState(1);
  const radiosRef = useRef<(HTMLButtonElement | null)[]>([]);
  const actual = acabados.find((a) => a.id === elegido)!;

  function elegir(id: IdAcabado) {
    setAcabado(id); // también lo deja marcado en el presupuesto
    if (id !== elegido) setCapa((c) => c + 1);
  }

  function teclado(e: React.KeyboardEvent, i: number) {
    const total = acabados.length;
    let s = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") s = (i + 1) % total;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") s = (i - 1 + total) % total;
    else return;
    e.preventDefault();
    elegir(acabados[s].id);
    radiosRef.current[s]?.focus();
  }

  return (
    <section id="acabados" aria-labelledby="titulo-acabados" className="border-t border-negro">
      <div className="mx-auto grid max-w-[90rem] lg:grid-cols-12">
        {/* Ilustración */}
        <div className="cuadricula relative border-b border-negro/15 bg-superficie px-4 py-10 sm:px-8 lg:col-span-7 lg:border-b-0 lg:border-r lg:px-12 lg:py-16">
          <p className="tecnico flex justify-between text-salvia-oscuro">
            <span>Aparador · vista frontal</span>
            <span>Esc. 1:20</span>
          </p>
          <div className="relative mx-auto mt-6 aspect-[3/2] w-full max-w-2xl">
            {/* Capas de color: la nueva entra como una pasada de pintura sobre la anterior */}
            <AnimatePresence initial={false}>
              <motion.div
                key={elegido}
                className="absolute inset-0"
                style={{ zIndex: capa }}
                initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                exit={{ opacity: 1, transition: { duration: 0.7 } }}
                transition={{ duration: 0.7, ease: easePreciso }}
              >
                <Frentes id={elegido} />
              </motion.div>
            </AnimatePresence>

            {/* Dibujo lineal y cotas, siempre arriba */}
            <svg
              viewBox={VISTA}
              aria-hidden="true"
              className="absolute inset-0 z-[999] h-full w-full"
              fill="none"
              stroke={colores.negro}
              strokeWidth="1.4"
            >
              <rect x="60" y="64" width="360" height="176" />
              <rect x="52" y="52" width="376" height="12" />
              <path d="M80 240v34M400 240v34M76 274h8M396 274h8" />
              <g strokeWidth="0.9" opacity="0.7">
                <path d="M60 292v14M420 292v14M60 299h360" />
                <path d="M446 52h14M446 240h14M453 52v188" />
              </g>
              <g fill={colores.negro} stroke="none" style={{ font: "500 11px var(--font-mono), monospace", letterSpacing: "0.08em" }}>
                <text x="240" y="316" textAnchor="middle">1.80 m</text>
                <text x="470" y="150" textAnchor="middle" transform="rotate(90 470 150)">0.80 m</text>
              </g>
            </svg>
          </div>
          <p className="tecnico mt-6 text-tinta">Ilustración de referencia</p>
        </div>

        {/* Texto y muestras */}
        <div className="flex flex-col justify-center px-4 py-14 sm:px-8 lg:col-span-5 lg:px-12 lg:py-16">
          <Etiqueta codigo="R—02">{acabadosTextos.etiqueta}</Etiqueta>
          <Revelar>
            <h2 id="titulo-acabados" className="mt-6 font-display text-titulo font-bold">
              {acabadosTextos.titulo}
            </h2>
          </Revelar>
          <p className="mt-6 max-w-md text-cuerpo text-tinta">{acabadosTextos.texto}</p>

          <div role="radiogroup" aria-label="Acabados disponibles" className="mt-10 grid grid-cols-4 gap-2 sm:gap-3">
            {acabados.map((a, i) => {
              const activo = a.id === elegido;
              return (
                <button
                  key={a.id}
                  ref={(el) => {
                    radiosRef.current[i] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={activo}
                  tabIndex={activo ? 0 : -1}
                  onClick={() => elegir(a.id)}
                  onKeyDown={(e) => teclado(e, i)}
                  className="group relative p-1.5 text-left"
                >
                  {activo && (
                    <motion.span
                      layoutId="muestra-activa"
                      aria-hidden="true"
                      className="absolute inset-0 border-2 border-negro"
                      transition={{ duration: 0.4, ease: easePreciso }}
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className="block aspect-square w-full ring-1 ring-negro/15 transition-transform duration-300 group-hover:scale-[0.96]"
                    style={{ background: a.color }}
                  />
                  <span className="mt-2 block text-xs font-semibold leading-tight sm:text-sm">{a.nombre}</span>
                </button>
              );
            })}
          </div>

          <p className="tecnico mt-6 text-tinta" aria-live="polite">
            Elegido: <span className="text-negro">{actual.nombre}</span>
          </p>

          <a
            href={linkWhatsapp(acabadosTextos.mensaje(actual.nombre))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-full items-center justify-center gap-2.5 bg-negro px-6 py-4 font-semibold text-blanco transition-colors hover:bg-salvia-oscuro sm:w-fit"
          >
            <IconoWhatsapp />
            {acabadosTextos.boton}: {actual.nombre}
            <span className="sr-only">(abre WhatsApp)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
