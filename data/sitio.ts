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
  cobertura: PENDIENTE as string | null,
  maps: PENDIENTE as string | null,
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
  titulo: "Muebles pensados para tu espacio",
  subtitulo: "Diseñamos y fabricamos muebles a medida para hogares, departamentos y oficinas en Paraguay.",
  botonTrabajos: "Ver trabajos",
  botonPresupuesto: "Pedir presupuesto",
  // Solo una foto real de un proyecto terminado. Dimensiones originales en píxeles.
  foto: null as import("./trabajos").FotoTrabajo | null,
};

export const nosotros = {
  etiqueta: "Nosotros",
  titulo: "Richmont Furniture",
  intro: "Somos una empresa de muebles a medida en Paraguay. Diseñamos y fabricamos mobiliario para adaptar cada proyecto al espacio y a las necesidades de quien lo usa.",
  espacios: ["Hogares", "Departamentos", "Oficinas"],
};

export const trabajosTextos = {
  etiqueta: "Trabajos",
  titulo: "Espacios que ya transformamos",
  intro: "Filtrá por tipo de espacio y tocá una foto para verla en grande.",
  verMas: "Ver más en Instagram",
};

// Revisá con el equipo que estos pasos describan bien cómo trabajan.
export const proceso = {
  etiqueta: "Cómo trabajamos",
  titulo: "De la idea al mueble instalado",
  intro: "Un proceso claro, con vos en cada decisión.",
  pasos: [
    {
      titulo: "Consulta",
      texto:
        "Nos escribís por WhatsApp, nos contás qué necesitás y empezamos a darle forma a la idea.",
    },
    {
      titulo: "Medidas",
      texto:
        "Definimos las medidas exactas del espacio para que cada pieza encaje con precisión.",
    },
    {
      titulo: "Diseño",
      texto:
        "Te proponemos el diseño: distribución, materiales, colores y herrajes, hasta que quede como lo imaginaste.",
    },
    {
      titulo: "Fabricación",
      texto:
        "Fabricamos cada mueble cuidando cada unión, cada canto y cada terminación.",
    },
    {
      titulo: "Instalación",
      texto:
        "Instalamos todo en tu espacio y lo dejamos listo para que empieces a disfrutarlo.",
    },
  ],
};

/**
 * TESTIMONIOS: agregá opiniones REALES de clientes (con su permiso).
 * Mientras la lista esté vacía, la web muestra marcadores "pendiente".
 * Ejemplo:
 *   { texto: "…", nombre: "Nombre A.", detalle: "Cocina a medida · Asunción" },
 */
export const testimonios: { texto: string; nombre: string; detalle?: string }[] = [];

export const testimoniosTextos = {
  etiqueta: "Testimonios",
  titulo: "Lo que dicen nuestros clientes",
};

export const presupuestoTextos = {
  etiqueta: "Presupuesto",
  titulo: "Contanos tu proyecto",
  intro:
    "Completá estos datos y te abrimos WhatsApp con el mensaje listo para enviar. Sin compromiso.",
  tiposDeEspacio: [
    "Cocina",
    "Living / comedor",
    "Placar / vestidor",
    "Dormitorio",
    "Baño",
    "Exterior / quincho",
    "Oficina",
    "Otro",
  ],
  boton: "Enviar por WhatsApp",
};

export const contactoTextos = {
  etiqueta: "Contacto",
  titulo: "Hablemos de tu próximo mueble",
  intro: "La forma más rápida de contactarnos es por WhatsApp.",
};
