"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import type { ItemGaleria } from "@/lib/galeria";
import { bloquearScroll } from "@/lib/lenis";
import { IconoFlecha } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Lightbox({
  fotos,
  indice,
  alCambiar,
  alCerrar,
  nombreEspacio,
}: {
  fotos: ItemGaleria[];
  indice: number | null;
  alCambiar: (i: number) => void;
  alCerrar: () => void;
  nombreEspacio: (carpeta: string) => string;
}) {
  const abierto = indice !== null && indice >= 0 && indice < fotos.length;
  const dialogoRef = useRef<HTMLDivElement>(null);
  const cerrarRef = useRef<HTMLButtonElement>(null);
  const total = fotos.length;

  useEffect(() => {
    if (!abierto) return;
    bloquearScroll(true);
    cerrarRef.current?.focus();
    return () => bloquearScroll(false);
  }, [abierto]);

  useEffect(() => {
    if (!abierto || indice === null) return;
    function teclado(e: KeyboardEvent) {
      if (e.key === "Escape") alCerrar();
      if (e.key === "ArrowRight") alCambiar((indice! + 1) % total);
      if (e.key === "ArrowLeft") alCambiar((indice! - 1 + total) % total);
      if (e.key === "Tab" && dialogoRef.current) {
        const enfocables = [...dialogoRef.current.querySelectorAll<HTMLElement>("button")];
        const primero = enfocables[0];
        const ultimo = enfocables[enfocables.length - 1];
        if (e.shiftKey && document.activeElement === primero) {
          e.preventDefault();
          ultimo.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault();
          primero.focus();
        }
      }
    }
    window.addEventListener("keydown", teclado);
    return () => window.removeEventListener("keydown", teclado);
  }, [abierto, indice, total, alCambiar, alCerrar]);

  function deslizar(_: unknown, info: PanInfo) {
    if (indice === null) return;
    if (info.offset.x < -70) alCambiar((indice + 1) % total);
    else if (info.offset.x > 70) alCambiar((indice - 1 + total) % total);
  }

  const foto = abierto ? fotos[indice] : null;

  return (
    <AnimatePresence>
      {foto && (
        <motion.div
          ref={dialogoRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ${indice! + 1} de ${total}: ${foto.titulo}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[70] flex flex-col bg-negro/95 text-hueso backdrop-blur-sm"
          data-lenis-prevent
        >
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <p className="text-sm text-greige" aria-hidden="true">
              {String(indice! + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
            <button
              ref={cerrarRef}
              type="button"
              onClick={alCerrar}
              className="grid size-11 place-items-center rounded-full border border-hueso/25 transition-colors hover:border-ambar hover:text-ambar"
              aria-label="Cerrar"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="size-5">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Fondo: tocar afuera de la foto cierra */}
          <div className="relative flex-1" onClick={alCerrar}>
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={foto.id}
                className="absolute inset-0 mx-auto max-w-6xl px-3 sm:px-20"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease }}
                drag={total > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={deslizar}
              >
                <div className="relative h-full w-full" onClick={(e) => e.stopPropagation()}>
                  <Image
                    src={foto.src!}
                    alt={foto.alt}
                    fill
                    sizes="(min-width: 1152px) 1100px, 100vw"
                    quality={80}
                    className="pointer-events-none select-none object-contain"
                    draggable={false}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    alCambiar((indice! - 1 + total) % total);
                  }}
                  className="absolute left-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-hueso/25 bg-negro/40 transition-colors hover:border-ambar hover:text-ambar sm:grid"
                  aria-label="Foto anterior"
                >
                  <IconoFlecha className="size-5 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    alCambiar((indice! + 1) % total);
                  }}
                  className="absolute right-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-hueso/25 bg-negro/40 transition-colors hover:border-ambar hover:text-ambar sm:grid"
                  aria-label="Foto siguiente"
                >
                  <IconoFlecha className="size-5" />
                </button>
              </>
            )}
          </div>

          <div className="px-5 pb-6 pt-4 text-center sm:px-8" aria-live="polite">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ambar">
              {nombreEspacio(foto.espacio)}
            </p>
            <p className="mt-1 font-display text-lg font-semibold">{foto.titulo}</p>
            {total > 1 && <p className="mt-2 text-xs text-greige sm:hidden">Deslizá para ver más</p>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
