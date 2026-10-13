"use client";

import { MotionConfig } from "motion/react";

/** Si la persona pidió menos movimiento en su sistema, Motion lo respeta. */
export default function MovimientoConfig({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
