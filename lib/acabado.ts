"use client";

import { useSyncExternalStore } from "react";
import type { IdAcabado } from "@/data/sitio";

/**
 * Acabado elegido, compartido entre "Elegí tu acabado" y el asistente de presupuesto:
 * si alguien elige un acabado arriba, el presupuesto ya lo trae marcado.
 */
let actual: IdAcabado | null = null;
const oyentes = new Set<() => void>();

function suscribir(fn: () => void) {
  oyentes.add(fn);
  return () => oyentes.delete(fn);
}

export function setAcabado(id: IdAcabado | null) {
  actual = id;
  oyentes.forEach((fn) => fn());
}

export function useAcabado() {
  return useSyncExternalStore(
    suscribir,
    () => actual,
    () => null,
  );
}
