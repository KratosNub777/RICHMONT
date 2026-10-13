"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { hero } from "@/data/sitio";
import Plano from "./Plano";
import { easePreciso, easeSalida } from "./movimiento";
import { Cota } from "./ui";

export type EspacioConFoto = {
  id: string;
  nombre: string;
  carpeta: string;
  titulo: string;
  dato: string;
  medida: string;
  foto: { src: string; alt: string } | null;
};

/**
 * Panel de foto del hero + selector "Elegí tu espacio" (pestañas accesibles).
 * Al cambiar de espacio, la foto nueva entra como una cortina sobre la anterior.
 */
export default function SelectorEspacio({ espacios }: { espacios: EspacioConFoto[] }) {
  const [indice, setIndiceInterno] = useState(0);
  // Cada cambio suma una capa: la foto nueva siempre queda encima de la anterior.
  const [capa, setCapa] = useState(1);
  const setIndice = (i: number) => {
    if (i === indice) return;
    setIndiceInterno(i);
    setCapa((c) => c + 1);
  };
  const pestanasRef = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();
  const actual = espacios[indice];
  const total = espacios.length;

  function teclado(e: React.KeyboardEvent, i: number) {
    let siguiente = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") siguiente = (i + 1) % total;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") siguiente = (i - 1 + total) % total;
    else if (e.key === "Home") siguiente = 0;
    else if (e.key === "End") siguiente = total - 1;
    else return;
    e.preventDefault();
    setIndice(siguiente);
    pestanasRef.current[siguiente]?.focus();
  }

  return (
    <>
      {/* Panel con la foto del espacio elegido */}
      <div
        id={`${base}-panel`}
        role="tabpanel"
        aria-labelledby={`${base}-tab-${indice}`}
        className="relative aspect-[4/5] overflow-hidden bg-superficie sm:aspect-[4/3] lg:aspect-auto"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={actual.id}
            className="absolute inset-0"
            style={{ zIndex: capa }}
            initial={{ clipPath: "inset(0% 0% 0% 100%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            // La anterior se queda quieta mientras la nueva la cubre
            exit={{ opacity: 1, transition: { duration: 0.8 } }}
            transition={{ duration: 0.8, ease: easePreciso }}
          >
            {actual.foto ? (
              <Image
                src={actual.foto.src}
                alt={actual.foto.alt}
                fill
                preload={indice === 0}
                quality={80}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <Plano tipo={actual.carpeta} medida={actual.medida} className="pb-36 sm:pb-40 lg:pb-48" />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Ficha del espacio */}
        <div className="absolute inset-x-3 bottom-3 z-[999] bg-blanco p-4 sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[22rem] sm:p-5" aria-live="polite">
          <p className="tecnico text-salvia-oscuro">
            Espacio {String(indice + 1).padStart(2, "0")}/{String(total).padStart(2, "0")} · {actual.nombre}
          </p>
          <div className="relative mt-2 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={actual.id}
                initial={{ clipPath: "inset(0% 0% 100% 0%)", y: 12 }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)", y: 0 }}
                exit={{ clipPath: "inset(100% 0% 0% 0%)", y: -8 }}
                transition={{ duration: 0.45, ease: easeSalida }}
              >
                <p className="font-display text-xl font-semibold leading-tight">{actual.titulo}</p>
                <p className="mt-1.5 text-sm text-tinta">{actual.dato}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <Cota className="mt-4">{actual.medida}</Cota>
        </div>
      </div>

      {/* Selector */}
      <div className="border-y border-negro bg-blanco lg:col-span-2">
        <div className="mx-auto flex max-w-[90rem] flex-col lg:flex-row lg:items-stretch">
          <p className="tecnico flex items-center px-4 pb-2 pt-5 text-salvia-oscuro sm:px-8 lg:w-56 lg:shrink-0 lg:border-r lg:border-negro/15 lg:px-12 lg:py-0">
            {hero.selectorTitulo}
          </p>
          <div role="tablist" aria-label={hero.selectorTitulo} className="grid flex-1 grid-cols-2 lg:grid-cols-4">
            {espacios.map((e, i) => {
              const activo = i === indice;
              return (
                <button
                  key={e.id}
                  ref={(el) => {
                    pestanasRef.current[i] = el;
                  }}
                  id={`${base}-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={activo}
                  aria-controls={`${base}-panel`}
                  tabIndex={activo ? 0 : -1}
                  onClick={() => setIndice(i)}
                  onKeyDown={(ev) => teclado(ev, i)}
                  className={`relative flex h-[4.5rem] items-center justify-between gap-3 border-negro/15 px-4 text-left transition-colors sm:px-6 lg:h-[5.5rem] ${
                    i % 2 === 0 ? "border-r" : "lg:border-r"
                  } ${i < 2 ? "border-b lg:border-b-0" : ""} ${activo ? "text-blanco" : "hover:bg-superficie"}`}
                >
                  {activo && (
                    <motion.span
                      layoutId="espacio-activo"
                      aria-hidden="true"
                      className="absolute inset-0 bg-salvia-oscuro"
                      transition={{ duration: 0.5, ease: easePreciso }}
                    />
                  )}
                  <span className="relative font-display text-lg font-semibold sm:text-xl">{e.nombre}</span>
                  <span aria-hidden="true" className={`tecnico relative ${activo ? "text-humo" : "text-tinta"}`}>
                    0{i + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
