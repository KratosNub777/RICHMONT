"use client";

import { motion } from "motion/react";

/** Línea fina que se "dibuja" de izquierda a derecha al entrar en pantalla. */
export default function LineaQueSeDibuja({ retraso = 0, oscuro = false }: { retraso?: number; oscuro?: boolean }) {
  return (
    <div aria-hidden="true" className={`relative h-px w-full ${oscuro ? "bg-hueso/15" : "bg-negro/12"}`}>
      <motion.span
        className={`absolute inset-0 origin-left ${oscuro ? "bg-ambar" : "bg-roble"}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: retraso + 0.2 }}
      />
    </div>
  );
}
