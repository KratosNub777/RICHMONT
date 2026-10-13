"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { proceso } from "@/data/sitio";
import { Revelar, TituloRevelado } from "./movimiento";
import { Etiqueta } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Proceso() {
  const listaRef = useRef<HTMLOListElement>(null);
  // La línea se "enciende" a medida que avanzás por los pasos, como una tira LED.
  const { scrollYProgress } = useScroll({ target: listaRef, offset: ["start 75%", "end 55%"] });
  const progreso = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <section id="proceso" aria-labelledby="titulo-proceso" className="fondo-oscuro relative text-hueso">
      <div className="mx-auto grid max-w-[90rem] gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:py-36">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Revelar>
              <Etiqueta oscuro>{proceso.etiqueta}</Etiqueta>
            </Revelar>
            <TituloRevelado
              id="titulo-proceso"
              texto={proceso.titulo}
              className="mt-6 font-display text-titulo font-semibold text-balance"
            />
            <Revelar retraso={0.15}>
              <p className="mt-7 max-w-md text-cuerpo text-greige">{proceso.intro}</p>
            </Revelar>
          </div>
        </div>

        <ol ref={listaRef} className="relative lg:col-span-6 lg:col-start-7">
          {/* Riel y luz de la línea de tiempo */}
          <span aria-hidden="true" className="absolute bottom-3 left-[0.6875rem] top-3 w-px bg-hueso/12" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: progreso }}
            className="absolute bottom-3 left-[0.6875rem] top-3 w-px origin-top bg-ambar shadow-[0_0_14px_1px] shadow-ambar/60"
          />

          {proceso.pasos.map((paso, i) => (
            <li key={paso.titulo} className="relative pb-14 pl-14 last:pb-0 sm:pl-20">
              {/* Punto que se ilumina al llegar */}
              <span aria-hidden="true" className="absolute left-0 top-1 grid size-6 place-items-center">
                <span className="absolute inset-0 rounded-full border border-hueso/25 bg-negro" />
                <motion.span
                  className="relative size-2.5 rounded-full bg-ambar shadow-[0_0_16px_3px] shadow-ambar/70"
                  initial={{ opacity: 0, scale: 0.3 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -45% 0px" }}
                  transition={{ duration: 0.6, ease }}
                />
              </span>

              <Revelar y={20}>
                <p className="font-display text-sm font-medium tracking-wider text-roble">
                  Paso 0{i + 1}
                </p>
                <h3 className="mt-2 font-display text-subtitulo font-semibold">{paso.titulo}</h3>
                <p className="mt-3 max-w-md text-cuerpo text-greige">{paso.texto}</p>
              </Revelar>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
