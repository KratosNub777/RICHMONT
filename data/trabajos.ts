/**
 * TRABAJOS (GALERÍA)
 * ------------------------------------------------------------------
 * Cómo agregar fotos:
 *   1. Copiá la foto a la carpeta del espacio, por ejemplo:
 *        public/trabajos/cocinas/cocina-blanca.jpg
 *   2. Listo: aparece sola en la galería, con un título armado a partir
 *      del nombre del archivo ("Cocina blanca").
 *   3. (Opcional) Para cambiar el título, el texto alternativo o el formato,
 *      agregala abajo en `trabajos` usando la misma ruta.
 *
 * Las fotos que agregues acá se muestran primero y en este orden.
 */

export type Formato = "vertical" | "horizontal" | "cuadrado";

/** Cada espacio corresponde a una carpeta de public/trabajos/. */
export const espacios = [
  { carpeta: "cocinas", nombre: "Cocinas" },
  { carpeta: "living", nombre: "Living" },
  { carpeta: "placares", nombre: "Placares" },
  { carpeta: "exterior", nombre: "Exterior" },
  { carpeta: "otros", nombre: "Otros" },
] as const;

export type Carpeta = (typeof espacios)[number]["carpeta"];

export type Trabajo = {
  /** Ruta de la foto desde /public. Ej: "/trabajos/cocinas/cocina-blanca.jpg" */
  src: string;
  espacio: Carpeta;
  titulo: string;
  /** Descripción de la foto para personas que usan lectores de pantalla. */
  alt?: string;
  /** Cómo se ve en el mosaico. Si no lo ponés, se elige uno automáticamente. */
  formato?: Formato;
};

export const trabajos: Trabajo[] = [
  // Ejemplo (borrá las barras // para usarlo):
  // {
  //   src: "/trabajos/cocinas/cocina-blanca.jpg",
  //   espacio: "cocinas",
  //   titulo: "Cocina blanca con isla",
  //   alt: "Cocina blanca a medida con isla central, tiradores negros y luz LED bajo las alacenas",
  //   formato: "horizontal",
  // },
];

/**
 * Cuántos espacios "Foto pendiente" se muestran por carpeta mientras no haya
 * fotos reales. Cuando una carpeta tiene al menos una foto, se dejan de mostrar.
 */
export const marcadoresPorEspacio = 2;
