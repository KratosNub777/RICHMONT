"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { proceso } from "@/data/sitio";
import { easePreciso, easeSalida, Foco, Revelar } from "./movimiento";
import { Etiqueta } from "./ui";

const numero = (i: number) => String(i + 1).padStart(2, "0");

export default function Proceso() {
  const [activo, setActivo] = useState(0);
  const pasosRef = useRef<(HTMLLIElement | null)[]>([]);
  const total = proceso.pasos.length;

  // El paso que cruza la mitad de la pantalla es el activo
  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) setActivo(Number((e.target as HTMLElement).dataset.indice));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    pasosRef.current.forEach((el) => el && observador.observe(el));
    return () => observador.disconnect();
  }, []);

  return (
    <section
      id="proceso"
      aria-labelledby="titulo-proceso"
      className="oscuro cuadricula-oscura relative overflow-clip bg-negro text-blanco"
    >
      <Foco />
      <div className="relative mx-auto max-w-[90rem] px-4 pt-20 sm:px-8 md:pt-28 lg:px-12">
        <Etiqueta codigo="R—03" oscuro>
          {proceso.etiqueta}
        </Etiqueta>
        <Revelar>
          <h2 id="titulo-proceso" className="mt-6 max-w-3xl font-display text-titulo font-bold">
            {proceso.titulo}
          </h2>
        </Revelar>
      </div>

      <div className="relative mx-auto grid max-w-[90rem] px-4 pb-20 sm:px-8 md:pb-28 lg:grid-cols-12 lg:px-12">
        {/* Columna fija (computadora): número grande que cambia con el scroll */}
        <div aria-hidden="true" className="hidden lg:col-span-6 lg:block">
          <div className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col justify-center">
            <div className="relative h-[0.8em] overflow-hidden font-display text-numero font-bold">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.span
                  key={activo}
                  className="absolute left-0 top-0 block"
                  initial={{ y: "100%", clipPath: "inset(0% 0% 100% 0%)" }}
                  animate={{ y: "0%", clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ y: "-100%", clipPath: "inset(100% 0% 0% 0%)" }}
                  transition={{ duration: 0.6, ease: easePreciso }}
                >
                  {numero(activo)}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="mt-8 overflow-hidden">
              <AnimatePresence initial={false} mode="wait">
                <motion.p
                  key={activo}
                  className="font-display text-subtitulo font-semibold"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-60%", opacity: 0 }}
                  transition={{ duration: 0.35, ease: easeSalida }}
                >
                  {proceso.pasos[activo].titulo}
                </motion.p>
              </AnimatePresence>
            </div>
            {/* Avance: un segmento por paso */}
            <div className="mt-8 flex max-w-sm gap-1.5">
              {proceso.pasos.map((p, i) => (
                <span key={p.titulo} className="relative h-1 flex-1 overflow-hidden bg-blanco/15">
                  <motion.span
                    className="absolute inset-0 origin-left bg-ambar"
                    animate={{ scaleX: i <= activo ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: easePreciso }}
                  />
                </span>
              ))}
            </div>
            <p className="tecnico mt-4 text-humo">
              Paso {numero(activo)} / {numero(total - 1)}
            </p>
          </div>
        </div>

        {/* Pasos */}
        <ol className="lg:col-span-5 lg:col-start-8 lg:border-l lg:border-blanco/15">
          {proceso.pasos.map((paso, i) => (
            <li
              key={paso.titulo}
              ref={(el) => {
                pasosRef.current[i] = el;
              }}
              data-indice={i}
              className="relative flex flex-col justify-center border-t border-blanco/15 py-12 lg:min-h-[70svh] lg:py-0 lg:pl-8"
            >
              {/* Marca del paso activo */}
              <span
                aria-hidden="true"
                className={`absolute -left-px top-[30%] hidden h-[40%] w-0.5 origin-top bg-ambar shadow-[0_0_12px] shadow-ambar/60 transition-transform duration-500 ease-preciso lg:block ${
                  i === activo ? "scale-y-100" : "scale-y-0"
                }`}
              />
              <Revelar>
                <span aria-hidden="true" className="block font-display text-[clamp(4.5rem,20vw,7rem)] font-bold leading-[0.85] tracking-tighter lg:hidden">
                  {numero(i)}
                </span>
              </Revelar>
              <p className="tecnico mt-6 text-roble lg:mt-0">Paso {numero(i)}</p>
              <h3 className="mt-3 font-display text-subtitulo font-semibold">{paso.titulo}</h3>
              <p className="mt-4 max-w-md text-cuerpo text-humo">{paso.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
