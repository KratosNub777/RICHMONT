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
  {
    src: "/trabajos/living/rack-tv-nogal.jpg",
    espacio: "living",
    titulo: "Rack de TV en nogal",
    alt: "Rack de TV flotante en melamina color nogal, con nicho central y cajones",
    formato: "horizontal",
  },
  {
    src: "/trabajos/cocinas/cocina-blanca-granito-negro.jpg",
    espacio: "cocinas",
    titulo: "Cocina blanca con granito negro",
    alt: "Cocina blanca a medida con mesada de granito negro, bacha simple y alacenas hasta el techo",
    formato: "vertical",
  },
  {
    src: "/trabajos/placares/vestidor-estantes-blanco.jpg",
    espacio: "placares",
    titulo: "Vestidor con estantes",
    alt: "Vestidor blanco a medida con estantes, barral para colgar y cajones",
    formato: "vertical",
  },
  {
    src: "/trabajos/cocinas/cocina-madera-clara-ventanal.jpg",
    espacio: "cocinas",
    titulo: "Cocina en madera clara",
    alt: "Cocina compacta en melamina madera clara con mesada de granito negro y campana",
    formato: "horizontal",
  },
  {
    src: "/trabajos/cocinas/cocina-roble-claro-peninsula.jpg",
    espacio: "cocinas",
    titulo: "Cocina roble claro con península",
    alt: "Cocina en melamina roble claro con tiradores de aluminio, anafe y península de granito",
    formato: "vertical",
  },
  {
    src: "/trabajos/living/panel-tv-madera.jpg",
    espacio: "living",
    titulo: "Panel de TV en madera",
    alt: "Panel de TV en madera con mueble bajo flotante de tres puertas",
    formato: "vertical",
  },
  {
    src: "/trabajos/cocinas/cocina-blanca-luz-led-frente.jpg",
    espacio: "cocinas",
    titulo: "Cocina blanca con luz LED",
    alt: "Cocina blanca a medida con luz LED bajo las alacenas, mesada de granito negro y mueble abierto",
    formato: "horizontal",
  },
  {
    src: "/trabajos/placares/placard-tres-puertas.jpg",
    espacio: "placares",
    titulo: "Placard de tres puertas",
    alt: "Placard blanco de tres puertas con tiradores de aluminio, de piso a techo",
    formato: "vertical",
  },
];

/**
 * Cuántos espacios "Foto pendiente" se muestran por carpeta mientras no haya
 * fotos reales. Cuando una carpeta tiene al menos una foto, se dejan de mostrar.
 */
export const marcadoresPorEspacio = 2;
