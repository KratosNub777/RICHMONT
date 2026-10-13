/**
 * ARCHIVO CENTRAL DE LA MARCA
 * ------------------------------------------------------------------
 * Acá están los colores, los textos principales y los datos de contacto.
 * Cambiá lo que necesites y guardá: la web se actualiza sola.
 *
 * Todo lo que dice PENDIENTE se muestra en la web con un marcador visible
 * hasta que lo completes. Nunca se inventa información.
 */

/** Valor que todavía falta completar. Se muestra como marcador en la web. */
export const PENDIENTE = null;

// ------------------------------------------------------------------
// COLORES
// ------------------------------------------------------------------
// Contraste verificado (WCAG AA). Los "texto" son versiones más oscuras
// pensadas para letras chicas sobre fondos claros.
export const colores = {
  hueso: "#F4F1EC", // fondo claro principal, texto sobre oscuro
  arena: "#E4DDD2", // greige claro: final de los degradados claros
  greige: "#BDB3A6", // base cálida de la marca
  salvia: "#6E7A64", // secundario: detalles y textos grandes
  salviaTexto: "#56614E", // salvia para texto chico sobre claro (AA)
  roble: "#B98B5E", // madera: detalles, líneas, texto sobre oscuro
  robleTexto: "#7E5A39", // roble para texto chico sobre claro (AA)
  ambar: "#E8A94F", // acento mínimo: hover, líneas, brillos
  carbon: "#55565A", // gris del logo
  grafito: "#2A2A2E", // texto sobre claro e inicio de secciones oscuras
  negro: "#17171A", // negro mate
} as const;

export type NombreColor = keyof typeof colores;
