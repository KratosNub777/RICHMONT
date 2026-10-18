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
  {
    src: "/trabajos/cocinas/cocina-granito-claro-alacenas.jpg",
    espacio: "cocinas",
    titulo: "Cocina en L con granito claro",
    alt: "Cocina en L con alacenas blancas, muebles bajos en melamina y mesada de granito claro",
    formato: "vertical",
  },
  {
    src: "/trabajos/cocinas/cocina-blanca-cajones-abiertos.jpg",
    espacio: "cocinas",
    titulo: "Cajones con correderas",
    alt: "Mueble bajo blanco con cajones de corredera telescópica y mesada de granito negro",
    formato: "horizontal",
  },
  {
    src: "/trabajos/placares/placard-interior-cajonera.jpg",
    espacio: "placares",
    titulo: "Placard con interior a medida",
    alt: "Interior de placard con estantes, barrales y cajonera, organizado a medida",
    formato: "vertical",
  },
  {
    src: "/trabajos/cocinas/cocina-blanca-esquina-led.jpg",
    espacio: "cocinas",
    titulo: "Cocina blanca en esquina",
    alt: "Cocina blanca con alacenas escalonadas, luz LED y mueble auxiliar abierto",
    formato: "vertical",
  },
  {
    src: "/trabajos/cocinas/cocina-en-l-granito-claro.jpg",
    espacio: "cocinas",
    titulo: "Cocina en L amplia",
    alt: "Cocina en L con alacenas blancas, botellero, cajones y mesada de granito claro",
    formato: "horizontal",
  },
  {
    src: "/trabajos/placares/vestidor-cajones.jpg",
    espacio: "placares",
    titulo: "Vestidor con cajones",
    alt: "Vestidor blanco con cajones de corredera, estantes y barral central",
    formato: "vertical",
  },
  {
    src: "/trabajos/cocinas/cocina-madera-clara.jpg",
    espacio: "cocinas",
    titulo: "Cocina madera clara con campana",
    alt: "Cocina en madera clara con alacenas, campana y mueble bajo con tres cajones",
    formato: "vertical",
  },
  {
    src: "/trabajos/cocinas/cocina-roble-claro-lateral.jpg",
    espacio: "cocinas",
    titulo: "Cocina roble claro en L",
    alt: "Cocina en L en melamina roble claro con alacenas, estante abierto y mesada de granito",
    formato: "horizontal",
  },
  {
    src: "/trabajos/placares/vestidor-estantes-esquina.jpg",
    espacio: "placares",
    titulo: "Vestidor en esquina",
    alt: "Vestidor blanco en esquina con estantes de piso a techo y barral",
    formato: "vertical",
  },
  {
    src: "/trabajos/cocinas/cocina-blanca-cajones.jpg",
    espacio: "cocinas",
    titulo: "Cocina blanca minimalista",
    alt: "Cocina blanca de frentes lisos, bacha simple y cajonera, con mesada de granito negro",
    formato: "vertical",
  },
  {
    src: "/trabajos/cocinas/cocina-roble-claro-cubertero.jpg",
    espacio: "cocinas",
    titulo: "Cajón con cubertero",
    alt: "Cajón de cocina en roble claro con cubertero interno y anafe de vidrio",
    formato: "vertical",
  },
  {
    src: "/trabajos/placares/placard-blanco-vestidor.jpg",
    espacio: "placares",
    titulo: "Placard y vestidor",
    alt: "Placard blanco de frentes lisos junto a un vestidor con estantes y cajones",
    formato: "vertical",
  },
  {
    src: "/trabajos/cocinas/cocina-blanca-luz-led-ventanal.jpg",
    espacio: "cocinas",
    titulo: "Cocina blanca junto al ventanal",
    alt: "Cocina blanca con luz LED, mueble auxiliar abierto y gran ventanal de vidrio",
    formato: "horizontal",
  },
  {
    src: "/trabajos/cocinas/cocina-roble-claro-frente.jpg",
    espacio: "cocinas",
    titulo: "Cocina roble claro",
    alt: "Cocina en melamina roble claro con alacenas, estante abierto y mesada de granito negro",
    formato: "vertical",
  },
  {
    src: "/trabajos/placares/vestidor-estantes-cajones.jpg",
    espacio: "placares",
    titulo: "Vestidor con estantes y cajones",
    alt: "Vestidor blanco con estantes, cajones y barrales a distintas alturas",
    formato: "vertical",
  },
  {
    src: "/trabajos/cocinas/cocina-blanca-alacenas.jpg",
    espacio: "cocinas",
    titulo: "Cocina blanca con alacenas",
    alt: "Cocina blanca con alacenas altas, mesada de granito negro y bacha con grifería cromada",
    formato: "vertical",
  },
  {
    src: "/trabajos/cocinas/cocina-roble-claro-en-l.jpg",
    espacio: "cocinas",
    titulo: "Cocina roble claro con barra",
    alt: "Cocina en roble claro con mesada de granito negro que se extiende como barra",
    formato: "vertical",
  },
];

/**
 * Cuántos espacios "Foto pendiente" se muestran por carpeta mientras no haya
 * fotos reales. Cuando una carpeta tiene al menos una foto, se dejan de mostrar.
 */
export const marcadoresPorEspacio = 2;
