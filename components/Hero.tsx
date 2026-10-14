"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { hero, linkWhatsapp } from "@/data/sitio";
import { Magnetico, Parallax, TituloRevelado } from "./movimiento";
import { Etiqueta, IconoFlecha, IconoWhatsapp, Marcador } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Al bajar, el texto se despide suave: sube un poco y se desvanece.
  const opacidad = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  return (
    <section
      ref={ref}
      id="inicio"
      aria-label="Inicio"
      className="fondo-oscuro relative isolate flex min-h-svh items-end overflow-hidden text-hueso"
    >
      {/* Fondo: foto de portada con parallax, o composición de luz mientras no haya foto */}
      <div className="absolute inset-0 -z-10">
        {hero.foto ? (
          <>
            <Parallax intensidad={0.08} className="h-full w-full">
              <Image
                src={hero.foto}
                alt={hero.fotoAlt}
                fill
                preload
                quality={80}
                sizes="100vw"
                className="object-cover"
              />
            </Parallax>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-negro via-negro/45 to-negro/20" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-negro/60 to-transparent" />
          </>
        ) : (
          <>
            {/* Línea de luz LED que se enciende al cargar, como la de sus muebles */}
            <motion.div
              aria-hidden="true"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease, delay: 0.2 }}
              className="luz-led absolute inset-x-[6%] top-[17%] h-px origin-center"
            />
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.4, delay: 0.8 }}
              className="absolute inset-x-0 top-[17%] h-[55%]"
              style={{
                background:
                  "radial-gradient(55% 60% at 50% 0%, color-mix(in srgb, var(--ambar) 14%, transparent), transparent 70%)",
              }}
            />
            <div className="absolute right-5 top-24 text-greige sm:right-8 lg:right-12 lg:top-28">
              <Marcador>Foto de portada pendiente</Marcador>
            </div>
          </>
        )}
      </div>

      <motion.div
        style={{ opacity: opacidad, y }}
        className="mx-auto w-full max-w-[90rem] px-5 pb-20 pt-36 sm:px-8 sm:pb-24 lg:px-12 lg:pb-28"
      >
        <div className="entrar" style={{ "--retraso": "0.1s" } as React.CSSProperties}>
          <Etiqueta oscuro>{hero.etiqueta}</Etiqueta>
        </div>

        <TituloRevelado
          como="h1"
          alCargar
          retraso={0.2}
          texto={hero.titulo}
          className="mt-6 max-w-[14ch] font-display text-display font-semibold text-balance"
        />

        <p
          className="entrar mt-7 max-w-[34rem] text-cuerpo text-hueso/85"
          style={{ "--retraso": "0.65s" } as React.CSSProperties}
        >
          {hero.subtitulo}
        </p>

        <div
          className="entrar mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          style={{ "--retraso": "0.8s" } as React.CSSProperties}
        >
          <Magnetico>
            <a
              href={linkWhatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-hueso px-7 py-4 font-semibold text-negro shadow-[0_10px_40px_-12px] shadow-ambar/50 transition-colors hover:bg-white sm:w-auto"
            >
              <IconoWhatsapp />
              {hero.botonPresupuesto}
              <span className="sr-only">(abre WhatsApp)</span>
            </a>
          </Magnetico>
          <a
            href="#trabajos"
            className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-hueso/35 px-7 py-4 font-semibold text-hueso transition-colors hover:border-ambar hover:text-ambar"
          >
            {hero.botonTrabajos}
            <IconoFlecha className="size-4 rotate-90 transition-transform duration-500 ease-mueble group-hover:translate-y-0.5" />
          </a>
        </div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 right-5 hidden items-center gap-3 text-xs uppercase tracking-[0.25em] text-greige sm:right-8 md:flex lg:right-12"
      >
        Deslizá
        <span className="relative block h-12 w-px overflow-hidden bg-hueso/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-ambar"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
