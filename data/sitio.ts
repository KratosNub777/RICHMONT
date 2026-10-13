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

// ------------------------------------------------------------------
// MARCA Y CONTACTO
// ------------------------------------------------------------------
export const marca = {
  nombre: "Richmont",
  nombreCompleto: "Richmont Furniture",
  descripcion:
    "Muebles a medida en Paraguay. Diseñamos y fabricamos cocinas, placares, livings y muebles para hogares, departamentos y oficinas.",
  /**
   * LOGO: cuando tengas el archivo, copialo a /public/logo/ y completá:
   *   src: "/logo/nombre-del-archivo.png" (o .svg)
   *   ancho / alto: tamaño real del archivo en píxeles (para no deformarlo)
   * Mientras sea null se muestra el nombre en texto.
   */
  logo: {
    src: null as string | null,
    ancho: 0,
    alto: 0,
  },
};

export const contacto = {
  whatsappVisible: "0994 153 494",
  whatsappInternacional: "595994153494", // formato para wa.me, sin + ni espacios
  instagram: "richmontpy",
  email: PENDIENTE as string | null,
  facebook: PENDIENTE as string | null, // link completo de la página
  direccion: PENDIENTE as string | null,
  ciudad: PENDIENTE as string | null,
  horarios: PENDIENTE as string | null, // ej: "Lunes a viernes de 8:00 a 17:00"
};

export const mensajeWhatsappGeneral =
  "¡Hola Richmont! Vi su página web y quiero pedir un presupuesto.";

/** Arma el link de WhatsApp con un mensaje ya escrito. */
export function linkWhatsapp(mensaje: string = mensajeWhatsappGeneral) {
  return `https://wa.me/${contacto.whatsappInternacional}?text=${encodeURIComponent(mensaje)}`;
}

export const linkInstagram = `https://www.instagram.com/${contacto.instagram}/`;

// ------------------------------------------------------------------
// TEXTOS
// ------------------------------------------------------------------
export const navegacion = [
  { href: "#nosotros", texto: "Nosotros" },
  { href: "#trabajos", texto: "Trabajos" },
  { href: "#proceso", texto: "Cómo trabajamos" },
  { href: "#presupuesto", texto: "Presupuesto" },
  { href: "#contacto", texto: "Contacto" },
];

export const hero = {
  etiqueta: "Muebles a medida · Paraguay",
  titulo: "Diseño a medida que transforma tus espacios",
  /*
   * Variantes para probar (copiá una en `titulo`):
   *  - "Muebles que encajan con tu forma de vivir"
   *  - "Cada centímetro, pensado para vos"
   */
  subtitulo:
    "Diseñamos y fabricamos muebles a medida para hogares, departamentos y oficinas. Líneas limpias, materiales nobles y detalles bien resueltos.",
  botonTrabajos: "Ver trabajos",
  botonPresupuesto: "Pedir presupuesto",
  /** Foto de portada. Ej: "/trabajos/cocinas/cocina-01.jpg". null = sin foto todavía. */
  foto: null as string | null,
  fotoAlt: "",
};
