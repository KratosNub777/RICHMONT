"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Aparece suavemente al entrar en pantalla (solo opacidad y desplazamiento). */
export function Revelar({
  children,
  retraso = 0,
  y = 28,
  className,
  ...resto
}: HTMLMotionProps<"div"> & { retraso?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease, delay: retraso }}
      className={className}
      {...resto}
    >
      {children}
    </motion.div>
  );
}

/**
 * Título que aparece palabra por palabra, como deslizándose desde abajo.
 * Los lectores de pantalla leen el texto completo de una sola vez.
 * alCargar = true (hero): animación CSS inmediata, mejor para la velocidad de carga.
 */
export function TituloRevelado({
  texto,
  como: Etiqueta = "h2",
  className,
  retraso = 0,
  alCargar = false,
  id,
}: {
  id?: string;
  texto: string;
  como?: "h1" | "h2" | "h3";
  className?: string;
  retraso?: number;
  alCargar?: boolean;
}) {
  const palabras = texto.split(" ");
  const espacio = (i: number) => (i < palabras.length - 1 ? "\u00A0" : "");
  const mascara = "inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom";

  if (alCargar) {
    return (
      <Etiqueta id={id} className={className}>
        <span className="sr-only">{texto}</span>
        <span aria-hidden="true" className="block">
          {palabras.map((palabra, i) => (
            <span key={i} className={mascara}>
              <span
                className="entrar entrar-palabra inline-block"
                style={{ "--retraso": `${retraso + i * 0.06}s` } as React.CSSProperties}
              >
                {palabra}
                {espacio(i)}
              </span>
            </span>
          ))}
        </span>
      </Etiqueta>
    );
  }

  return (
    <Etiqueta id={id} className={className}>
      <span className="sr-only">{texto}</span>
      <motion.span
        aria-hidden="true"
        initial="oculto"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ staggerChildren: 0.06, delayChildren: retraso }}
        className="block"
      >
        {palabras.map((palabra, i) => (
          <span key={i} className={mascara}>
            <motion.span
              className="inline-block"
              variants={{
                oculto: { y: "105%", opacity: 0 },
                visible: { y: "0%", opacity: 1, transition: { duration: 0.9, ease } },
              }}
            >
              {palabra}
              {espacio(i)}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Etiqueta>
  );
}

/**
 * Efecto magnético sutil: el botón sigue un poco al puntero (solo con mouse).
 * className reemplaza al "inline-block" por defecto (para poder usar hidden, etc.).
 */
export function Magnetico({
  children,
  fuerza = 0.25,
  className,
}: {
  children: React.ReactNode;
  fuerza?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducir = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function mover(e: React.PointerEvent<HTMLDivElement>) {
    if (reducir || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * fuerza);
    y.set((e.clientY - (r.top + r.height / 2)) * fuerza);
  }

  function soltar() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={mover}
      onPointerLeave={soltar}
      style={{ x: sx, y: sy }}
      className={className ?? "inline-block"}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parallax suave: la imagen se mueve un poco más lento que el scroll.
 * La capa interna es más alta que el marco, así nunca se ven los bordes.
 */
export function Parallax({
  children,
  intensidad = 0.1,
  className,
}: {
  children: React.ReactNode;
  intensidad?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const desplazamiento = `${intensidad * 100}%`;
  // El % de translate se mide sobre la capa (más alta que el marco), por eso se ajusta.
  const recorrido = `${((intensidad / (1 + 2 * intensidad)) * 100).toFixed(2)}%`;
  const y = useTransform(scrollYProgress, [0, 1], [`-${recorrido}`, recorrido]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div
        style={{ y, top: `-${desplazamiento}`, bottom: `-${desplazamiento}` }}
        className="absolute inset-x-0 will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
