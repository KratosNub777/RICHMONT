import type { NombreColor } from "@/data/sitio";

// Paradas con curva "ease-in-out": el cambio arranca y termina suave,
// sin la franja gris pareja de un degradado lineal.
const paradas = [
  [0, 0],
  [12, 3],
  [25, 11],
  [38, 25],
  [50, 50],
  [62, 75],
  [75, 89],
  [88, 97],
  [100, 100],
];

function degradadoSuave(de: NombreColor, a: NombreColor) {
  const colores = paradas.map(
    ([pos, mezcla]) => `color-mix(in oklab, var(--${a}) ${mezcla}%, var(--${de})) ${pos}%`,
  );
  return `linear-gradient(180deg, ${colores.join(", ")})`;
}

/**
 * Puente de color entre una sección y la siguiente: un degradado alto
 * para que el paso de claro a oscuro (o al revés) nunca sea un corte.
 */
export default function Transicion({ de, a }: { de: NombreColor; a: NombreColor }) {
  return (
    <div
      aria-hidden="true"
      className="h-[clamp(5rem,12vw,11rem)] w-full"
      style={{ background: degradadoSuave(de, a) }}
    />
  );
}
