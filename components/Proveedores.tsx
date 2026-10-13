"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { MotionConfig } from "motion/react";
import { setLenis } from "@/lib/lenis";

/**
 * - Scroll suave con Lenis (se desactiva si la persona prefiere menos movimiento).
 * - reducedMotion="user": Motion también respeta esa preferencia.
 */
export default function Proveedores({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (menosMovimiento.matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.11,
      wheelMultiplier: 0.95,
    });
    setLenis(lenis);

    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
