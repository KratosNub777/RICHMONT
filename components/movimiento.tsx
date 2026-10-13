"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, type HTMLMotionProps } from "motion/react";

export const easeSalida = [0.16, 1, 0.3, 1] as const;
export const easePreciso = [0.65, 0, 0.35, 1] as const;

const mascaras = {
  // El contenido sube desde abajo, recortado por una máscara
  arriba: { oculto: "inset(100% 0% 0% 0%)", visible: "inset(0% 0% 0% 0%)", y: 24 },
  // Cortina horizontal, de izquierda a derecha (para fotos y bloques)
  cortina: { oculto: "inset(0% 100% 0% 0%)", visible: "inset(0% 0% 0% 0%)", y: 0 },
} as const;

/** Revela el contenido con una máscara (clip-path) al entrar en pantalla. */
export function Revelar({
  children,
  retraso = 0,
  tipo = "arriba",
  className,
  ...resto
}: HTMLMotionProps<"div"> & { retraso?: number; tipo?: keyof typeof mascaras }) {
  const reducir = useReducedMotion();
  const m = mascaras[tipo];
  return (
    <motion.div
      initial={reducir ? false : { clipPath: m.oculto, y: m.y }}
      whileInView={{ clipPath: m.visible, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: tipo === "cortina" ? 1.1 : 0.9, ease: tipo === "cortina" ? easePreciso : easeSalida, delay: retraso }}
      className={className}
      {...resto}
    >
      {children}
    </motion.div>
  );
}

/**
 * "Foco" de luz ámbar muy suave que sigue al cursor, como la luz LED de los muebles.
 * Va dentro de una sección oscura con `relative overflow-hidden`.
 * En celular (o con movimiento reducido) queda como un resplandor fijo.
 */
export function Foco({
  inicial = { x: 0.78, y: 0.22 },
  intensidad = 1,
}: {
  inicial?: { x: number; y: number };
  /** 1 = normal. Menos sobre fondos de color (salvia) para que no se ensucie. */
  intensidad?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducir = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 90, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 90, damping: 22, mass: 0.6 });

  useEffect(() => {
    const capa = ref.current;
    const seccion = capa?.parentElement;
    if (!capa || !seccion) return;

    const ubicarInicial = () => {
      const r = seccion.getBoundingClientRect();
      x.jump(r.width * inicial.x);
      y.jump(Math.min(r.height * inicial.y, 420));
    };
    ubicarInicial();

    const puntoFino = window.matchMedia("(pointer: fine)").matches;
    if (!puntoFino || reducir) {
      window.addEventListener("resize", ubicarInicial);
      return () => window.removeEventListener("resize", ubicarInicial);
    }

    const mover = (e: PointerEvent) => {
      const r = seccion.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    };
    seccion.addEventListener("pointermove", mover);
    seccion.addEventListener("pointerleave", ubicarInicial);
    return () => {
      seccion.removeEventListener("pointermove", mover);
      seccion.removeEventListener("pointerleave", ubicarInicial);
    };
  }, [inicial.x, inicial.y, reducir, x, y]);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        style={{
          x: sx,
          y: sy,
          background: `radial-gradient(closest-side, rgb(232 169 79 / ${0.16 * intensidad}), rgb(232 169 79 / ${0.05 * intensidad}) 55%, transparent)`,
        }}
        className="absolute -left-[22rem] -top-[22rem] size-[44rem] will-change-transform"
      />
    </div>
  );
}
