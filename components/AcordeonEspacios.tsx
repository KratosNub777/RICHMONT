"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Plano from "./Plano";
import { useFiltro } from "./FiltroTrabajos";
import { easePreciso } from "./movimiento";
import { IconoFlecha, Marcador } from "./ui";

type Espacio = {
  carpeta: string;
  nombre: string;
  cantidad: number;
  foto: { src: string; alt: string } | null;
};

function irAGaleria() {
  document.getElementById("galeria")?.scrollIntoView({ block: "start" });
}

function Fondo({ espacio, sizes }: { espacio: Espacio; sizes: string }) {
  if (espacio.foto) {
    return <Image src={espacio.foto.src} alt={espacio.foto.alt} fill sizes={sizes} quality={70} className="object-cover" />;
  }
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <Plano tipo={espacio.carpeta} oscuro compacto className="pb-24 pt-10" />
    </div>
  );
}

function detalle(e: Espacio) {
  return e.cantidad > 0 ? `${e.cantidad} ${e.cantidad === 1 ? "foto" : "fotos"}` : null;
}

/**
 * Paneles verticales por espacio que se expanden al pasar el mouse (acordeón de imágenes).
 * Al tocar uno, la galería de abajo se filtra por ese espacio.
 * En celular se convierte en un carrusel deslizable.
 */
export default function AcordeonEspacios({ espacios }: { espacios: Espacio[] }) {
  const [activo, setActivo] = useState(0);
  const { setFiltro } = useFiltro();

  function elegir(carpeta: string) {
    setFiltro(carpeta);
    irAGaleria();
  }

  return (
    <div className="mt-12 md:mt-16">
      {/* Computadora: acordeón */}
      <ul className="mx-auto hidden h-[min(36rem,68vh)] max-w-[90rem] gap-2 px-12 lg:flex">
        {espacios.map((e, i) => {
          const abierto = i === activo;
          return (
            <motion.li
              key={e.carpeta}
              layout
              transition={{ layout: { duration: 0.6, ease: easePreciso } }}
              style={{ flex: abierto ? "5 1 0%" : "1 1 0%" }}
              className="oscuro relative min-w-0 overflow-hidden bg-negro text-blanco"
              onMouseEnter={() => setActivo(i)}
            >
              <button
                type="button"
                onFocus={() => setActivo(i)}
                onClick={() => elegir(e.carpeta)}
                aria-label={`Ver trabajos de ${e.nombre}`}
                className="group absolute inset-0 text-left"
              >
                <Fondo espacio={e} sizes="(min-width: 1024px) 60vw, 1px" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-negro/80 via-negro/10 to-transparent" />

                {/* Cerrado: nombre en vertical */}
                <motion.span
                  layout="position"
                  aria-hidden="true"
                  animate={{ opacity: abierto ? 0 : 1 }}
                  transition={{ duration: 0.25 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 font-display text-2xl font-semibold [writing-mode:vertical-rl] rotate-180"
                >
                  {e.nombre}
                </motion.span>

                {/* Abierto: ficha */}
                <motion.span
                  layout="position"
                  animate={{ opacity: abierto ? 1 : 0, y: abierto ? 0 : 16 }}
                  transition={{ duration: 0.4, delay: abierto ? 0.25 : 0 }}
                  className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7"
                >
                  <span>
                    <span className="tecnico block text-humo">
                      0{i + 1} · {detalle(e) ?? <Marcador>Fotos pendientes</Marcador>}
                    </span>
                    <span className="mt-2 block whitespace-nowrap font-display text-5xl font-bold tracking-tight">
                      {e.nombre}
                    </span>
                  </span>
                  <span className="tecnico flex shrink-0 items-center gap-2 border border-blanco/40 px-3 py-2 transition-colors group-hover:border-roble group-hover:bg-roble group-hover:text-negro">
                    Ver trabajos <IconoFlecha />
                  </span>
                </motion.span>
              </button>
            </motion.li>
          );
        })}
      </ul>

      {/* Celular y tablet: carrusel deslizable */}
      <ul className="flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:scroll-px-8 sm:px-8 lg:hidden">
        {espacios.map((e, i) => (
          <li key={e.carpeta} className="w-[72vw] max-w-80 shrink-0 snap-start">
            <button
              type="button"
              onClick={() => elegir(e.carpeta)}
              className="oscuro relative block aspect-[3/4] w-full overflow-hidden bg-negro text-left text-blanco"
              aria-label={`Ver trabajos de ${e.nombre}`}
            >
              <Fondo espacio={e} sizes="80vw" />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-negro/85 via-transparent to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-5">
                <span className="tecnico block text-humo">
                  0{i + 1} · {detalle(e) ?? <Marcador>Fotos pendientes</Marcador>}
                </span>
                <span className="mt-2 block font-display text-3xl font-bold">{e.nombre}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
