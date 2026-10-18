"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { ItemGaleria } from "@/lib/galeria";
import Lightbox from "./Lightbox";

type Espacio = { carpeta: string; nombre: string };

const ease = [0.22, 1, 0.36, 1] as const;

// Cuántas fotos se ven al inicio y cuántas se suman con "Mostrar más".
const PASO = 6;

const tamanos: Record<ItemGaleria["formato"], string> = {
  vertical: "row-span-2",
  horizontal: "col-span-2",
  cuadrado: "",
};

// Tamaño aproximado que ocupa cada foto en pantalla (para que next/image baje la justa).
const sizes: Record<ItemGaleria["formato"], string> = {
  vertical: "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw",
  cuadrado: "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw",
  horizontal: "(min-width: 1024px) 50vw, (min-width: 768px) 66vw, 100vw",
};

export default function GaleriaTrabajos({ items, espacios }: { items: ItemGaleria[]; espacios: Espacio[] }) {
  const [filtro, setFiltro] = useState<string>("todos");
  const [abierta, setAbierta] = useState<number | null>(null);
  const origenRef = useRef<HTMLElement | null>(null);

  const [cantidad, setCantidad] = useState(PASO);

  const filtradas = useMemo(
    () => (filtro === "todos" ? items : items.filter((i) => i.espacio === filtro)),
    [items, filtro],
  );
  const visibles = filtradas.slice(0, cantidad);
  const restantes = filtradas.length - visibles.length;

  const cuantas = (carpeta: string) =>
    carpeta === "todos" ? items.length : items.filter((i) => i.espacio === carpeta).length;

  const nombreDe = (carpeta: string) => espacios.find((e) => e.carpeta === carpeta)?.nombre ?? carpeta;

  const cerrar = useCallback(() => {
    setAbierta(null);
    origenRef.current?.focus();
  }, []);

  const filtros = [{ carpeta: "todos", nombre: "Todos" }, ...espacios];

  return (
    <div className="mt-12 md:mt-16">
      {/* Filtros por espacio (las carpetas de public/trabajos/) */}
      <div
        role="group"
        aria-label="Filtrar trabajos por espacio"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {filtros.map((f) => {
          const activo = filtro === f.carpeta;
          return (
            <button
              key={f.carpeta}
              type="button"
              aria-pressed={activo}
              onClick={() => {
                setFiltro(f.carpeta);
                setCantidad(PASO);
              }}
              className={`relative shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                activo ? "border-negro text-hueso" : "border-negro/20 text-grafito hover:border-negro/60"
              }`}
            >
              {activo && (
                <motion.span
                  layoutId="filtro-activo"
                  aria-hidden="true"
                  className="absolute inset-0 -z-0 rounded-full bg-negro"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
              <span className="relative">{f.nombre}</span>
              <span className="relative ml-2 text-xs tabular-nums opacity-60">{cuantas(f.carpeta)}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {`${filtro === "todos" ? "Todos los trabajos" : nombreDe(filtro)}: mostrando ${visibles.length} de ${filtradas.length}`}
      </p>

      {/* Mosaico */}
      <motion.ul
        layout
        className="mt-8 grid grid-flow-dense auto-rows-[clamp(9.5rem,24vw,17rem)] grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visibles.map((item, i) => (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.55, ease, delay: (i % PASO) * 0.05 }}
              className={`relative overflow-hidden rounded-sm ${tamanos[item.formato]}`}
            >
              <button
                type="button"
                onClick={(e) => {
                  origenRef.current = e.currentTarget;
                  setAbierta(filtradas.findIndex((f) => f.id === item.id));
                }}
                className="group absolute inset-0 block h-full w-full cursor-zoom-in text-left"
                aria-label={`Ver en grande: ${item.titulo}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={sizes[item.formato]}
                  quality={70}
                  className="bg-arena object-cover transition-transform duration-[1.2s] ease-mueble group-hover:scale-[1.05]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-negro/75 via-negro/10 to-transparent transition-opacity duration-500 pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100 pointer-fine:group-focus-visible:opacity-100"
                />
                <span className="absolute inset-x-0 bottom-0 p-3 text-hueso transition-all duration-500 ease-mueble sm:p-5 pointer-fine:translate-y-3 pointer-fine:opacity-0 pointer-fine:group-hover:translate-y-0 pointer-fine:group-hover:opacity-100 pointer-fine:group-focus-visible:translate-y-0 pointer-fine:group-focus-visible:opacity-100">
                  <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ambar">
                    {nombreDe(item.espacio)}
                  </span>
                  <span className="mt-1 block font-display text-sm font-semibold sm:text-lg">{item.titulo}</span>
                  <span
                    aria-hidden="true"
                    className="mt-3 hidden h-px w-10 origin-left scale-x-0 bg-ambar transition-transform delay-100 duration-700 ease-mueble group-hover:scale-x-100 sm:block"
                  />
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {restantes > 0 && (
        <div className="mt-10 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setCantidad((c) => c + PASO)}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-negro/25 px-7 text-sm font-semibold text-negro transition-colors hover:border-negro hover:bg-negro hover:text-hueso"
          >
            Mostrar más <span className="opacity-60">(+{Math.min(PASO, restantes)})</span>
          </button>
          <p aria-hidden="true" className="text-sm text-grafito tabular-nums">
            Mostrando {visibles.length} de {filtradas.length}
          </p>
        </div>
      )}

      <Lightbox
        fotos={filtradas}
        indice={abierta}
        alCambiar={setAbierta}
        alCerrar={cerrar}
        nombreEspacio={nombreDe}
      />
    </div>
  );
}
