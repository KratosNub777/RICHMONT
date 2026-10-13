"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ItemGaleria } from "@/lib/galeria";
import { trabajosTextos } from "@/data/sitio";
import { useFiltro } from "./FiltroTrabajos";
import Lightbox from "./Lightbox";
import Plano from "./Plano";
import { easePreciso } from "./movimiento";
import { Cota } from "./ui";

type Espacio = { carpeta: string; nombre: string };

// Ancho de cada tarjeta según la proporción de la foto (en computadora)
const anchos: Record<ItemGaleria["formato"], string> = {
  vertical: "lg:w-[clamp(16rem,22vw,22rem)]",
  cuadrado: "lg:w-[clamp(20rem,28vw,28rem)]",
  horizontal: "lg:w-[clamp(28rem,42vw,42rem)]",
};
const sizes: Record<ItemGaleria["formato"], string> = {
  vertical: "(min-width: 1024px) 22vw, 80vw",
  cuadrado: "(min-width: 1024px) 28vw, 80vw",
  horizontal: "(min-width: 1024px) 42vw, 80vw",
};

/**
 * Galería de trabajos.
 * - Computadora: la sección queda fija y las fotos se desplazan en horizontal con el scroll.
 * - Celular (o con movimiento reducido): carrusel que se desliza con el dedo.
 */
export default function GaleriaHorizontal({ items, espacios }: { items: ItemGaleria[]; espacios: Espacio[] }) {
  const { filtro, setFiltro } = useFiltro();
  const [abierta, setAbierta] = useState<number | null>(null);
  const origenRef = useRef<HTMLElement | null>(null);
  const reducir = useReducedMotion();
  const [escritorio, setEscritorio] = useState(false);
  const fijado = escritorio && !reducir;

  const contenedorRef = useRef<HTMLElement>(null);
  const pistaRef = useRef<HTMLUListElement>(null);
  const [recorrido, setRecorrido] = useState(0);

  const visibles = useMemo(
    () => (filtro === "todos" ? items : items.filter((i) => i.espacio === filtro)),
    [items, filtro],
  );
  const fotos = useMemo(() => visibles.filter((i) => i.src), [visibles]);
  const nombreDe = (carpeta: string) => espacios.find((e) => e.carpeta === carpeta)?.nombre ?? carpeta;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const actualizar = () => setEscritorio(mq.matches);
    actualizar();
    mq.addEventListener("change", actualizar);
    return () => mq.removeEventListener("change", actualizar);
  }, []);

  // Cuánto tiene que desplazarse la fila para mostrar todas las fotos
  useEffect(() => {
    const pista = pistaRef.current;
    if (!pista || !fijado) return;
    const medir = () => setRecorrido(Math.max(0, pista.scrollWidth - window.innerWidth));
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(pista);
    window.addEventListener("resize", medir);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", medir);
    };
  }, [fijado, visibles]);

  const { scrollYProgress } = useScroll({ target: contenedorRef, offset: ["start 64px", "end end"] });
  const x = useTransform(scrollYProgress, (v) => -v * recorrido);

  const cerrar = useCallback(() => {
    setAbierta(null);
    origenRef.current?.focus();
  }, []);

  const filtros = [{ carpeta: "todos", nombre: "Todos" }, ...espacios];

  return (
    <section
      id="galeria"
      ref={contenedorRef}
      aria-labelledby="titulo-galeria"
      className="relative mt-16 md:mt-24"
      style={fijado ? { height: `calc(100svh - 4rem + ${recorrido}px)` } : undefined}
    >
      <div className={fijado ? "sticky top-16 flex h-[calc(100svh-4rem)] flex-col overflow-hidden" : ""}>
        <div className="mx-auto w-full max-w-[90rem] px-4 pt-6 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-5 border-t border-negro pt-5 lg:flex-row lg:items-center lg:justify-between">
            <h3 id="titulo-galeria" className="flex items-baseline gap-4 font-display text-subtitulo font-semibold">
              {trabajosTextos.galeriaTitulo}
              <span className="tecnico text-tinta">{String(visibles.length).padStart(2, "0")} piezas</span>
            </h3>

            <div
              role="group"
              aria-label="Filtrar trabajos por espacio"
              className="-mx-4 flex gap-1.5 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0"
            >
              {filtros.map((f) => {
                const activo = filtro === f.carpeta;
                return (
                  <button
                    key={f.carpeta}
                    type="button"
                    aria-pressed={activo}
                    onClick={() => setFiltro(f.carpeta)}
                    className={`relative shrink-0 border px-4 py-2.5 text-sm font-semibold transition-colors ${
                      activo ? "border-negro text-blanco" : "border-negro/25 hover:border-negro"
                    }`}
                  >
                    {activo && (
                      <motion.span
                        layoutId="filtro-activo"
                        aria-hidden="true"
                        className="absolute inset-0 bg-negro"
                        transition={{ duration: 0.4, ease: easePreciso }}
                      />
                    )}
                    <span className="relative">{f.nombre}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <p className="sr-only" aria-live="polite">
            {filtro === "todos" ? "Mostrando todos los trabajos" : `Mostrando ${nombreDe(filtro)}`}
          </p>
        </div>

        <motion.ul
          ref={pistaRef}
          style={fijado ? { x } : undefined}
          className={
            fijado
              ? "flex min-h-0 w-max flex-1 gap-4 px-12 py-8 will-change-transform"
              : "mt-6 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:scroll-px-8 sm:px-8"
          }
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visibles.map((item) => {
              const numero = String(items.indexOf(item) + 1).padStart(2, "0");
              return (
                <motion.li
                  key={item.id}
                  layout
                  initial={{ opacity: 0, clipPath: "inset(0% 0% 0% 100%)" }}
                  animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: easePreciso }}
                  className={`flex w-[80vw] max-w-[24rem] shrink-0 snap-start flex-col lg:max-w-none ${anchos[item.formato]}`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-superficie lg:aspect-auto lg:min-h-0 lg:flex-1">
                    {item.src ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          origenRef.current = e.currentTarget;
                          setAbierta(fotos.findIndex((f) => f.id === item.id));
                        }}
                        className="group absolute inset-0 cursor-zoom-in"
                        aria-label={`Ver en grande: ${item.titulo}`}
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes={sizes[item.formato]}
                          quality={70}
                          className="object-cover transition-transform duration-700 ease-salida group-hover:scale-[1.03]"
                        />
                      </button>
                    ) : (
                      <Plano tipo={item.espacio} />
                    )}
                  </div>
                  <div className="border-b border-negro/15 pb-3 pt-3">
                    <p className="tecnico flex justify-between gap-3 text-salvia-oscuro">
                      <span>N.º {numero}</span>
                      <span>{nombreDe(item.espacio)}</span>
                    </p>
                    <p className="mt-1.5 truncate font-display text-lg font-semibold">{item.titulo}</p>
                    <Cota className="mt-2">{item.medidas ?? "— × — m"}</Cota>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </div>

      <Lightbox fotos={fotos} indice={abierta} alCambiar={setAbierta} alCerrar={cerrar} nombreEspacio={nombreDe} />
    </section>
  );
}
