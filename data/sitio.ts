/**
 * CONFIGURACIÓN CENTRAL DE LA WEB
 * ------------------------------------------------------------------
 * Colores, tipografías, textos y datos de contacto, todo en un solo lugar.
 * Cambiá lo que necesites y guardá: la web se actualiza sola.
 *
 * Todo lo que dice PENDIENTE se muestra en la web con un marcador visible
 * hasta que lo completes. Nunca se inventa información.
 */
import { DM_Sans, IBM_Plex_Mono, Outfit } from "next/font/google";

/** Valor que todavía falta completar. Se muestra como marcador en la web. */
export const PENDIENTE = null;

// ------------------------------------------------------------------
// COLORES (contraste AA verificado)
// ------------------------------------------------------------------
export const colores = {
  blanco: "#F6F4EF", // base de la página
  superficie: "#E7E3DA", // greige muy claro: tarjetas y paneles sobre blanco
  greige: "#BDB3A6", // solo superficies y bordes
  salvia: "#6E7A64", // bloques, ilustraciones y textos grandes (no texto chico sobre blanco)
  salviaOscuro: "#3F4A3A", // bloques y fondos con texto blanco
  negro: "#17171A", // negro mate: header, secciones oscuras y texto
  tinta: "#4F5052", // texto secundario sobre fondos claros
  humo: "#C9C4BA", // texto secundario sobre salvia oscuro y negro
  roble: "#B98B5E", // detalles, líneas y hover (como texto, solo sobre negro)
  ambar: "#E8A94F", // solo luz y brillos pequeños
} as const;

export type NombreColor = keyof typeof colores;

// ------------------------------------------------------------------
// TIPOGRAFÍAS
// ------------------------------------------------------------------
/** Títulos: geométrica, pesos fuertes. */
export const fuenteTitulos = Outfit({ variable: "--font-titulos", subsets: ["latin"], display: "swap" });
/** Texto corrido. */
export const fuenteTexto = DM_Sans({ variable: "--font-texto", subsets: ["latin"], display: "swap" });
/** Medidas y etiquetas técnicas. */
export const fuenteMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// ------------------------------------------------------------------
// MARCA Y CONTACTO
// ------------------------------------------------------------------
export const marca = {
  nombre: "Richmont",
  nombreCompleto: "Richmont Furniture",
  descripcion:
    "Muebles a medida en Paraguay. Diseñamos y fabricamos cocinas, placares, livings y muebles para hogares, departamentos y oficinas.",
  /**
   * LOGO (blanco): se usa solo sobre fondos oscuros (negro mate o salvia oscuro).
   * Cuando tengas el archivo, copialo a /public/logo/ y completá:
   *   src: "/logo/nombre-del-archivo.svg" (o .png)
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
  { href: "#trabajos", texto: "Trabajos" },
  { href: "#acabados", texto: "Acabados" },
  { href: "#proceso", texto: "Proceso" },
  { href: "#nosotros", texto: "Nosotros" },
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
    "Diseñamos y fabricamos muebles a medida para hogares, departamentos y oficinas. Precisos, funcionales y pensados para durar.",
  botonTrabajos: "Ver trabajos",
  botonPresupuesto: "Pedir presupuesto",
  selectorTitulo: "Elegí tu espacio",
};

/**
 * Espacios del selector del hero. La foto se toma sola de la carpeta indicada
 * (la primera en orden alfabético), o de `foto` si la completás.
 * `medida` es solo un detalle gráfico del plano: cambiala si querés.
 * Revisá con el equipo que los textos describan bien lo que hacen.
 */
export const espaciosHero = [
  {
    id: "cocina",
    nombre: "Cocina",
    carpeta: "cocinas",
    foto: null as string | null,
    titulo: "Cocinas que trabajan a tu ritmo",
    dato: "Bajo mesadas, alacenas e islas a medida.",
    medida: "3.20 m × 0.60 m",
  },
  {
    id: "living",
    nombre: "Living",
    carpeta: "living",
    foto: null as string | null,
    titulo: "Livings con orden y calidez",
    dato: "Racks, bibliotecas y paneles a medida.",
    medida: "2.40 m × 0.45 m",
  },
  {
    id: "placard",
    nombre: "Placard",
    carpeta: "placares",
    foto: null as string | null,
    titulo: "Placares que aprovechan cada centímetro",
    dato: "Interiores con cajones, barrales y estantes.",
    medida: "2.60 m × 0.60 m",
  },
  {
    id: "exterior",
    nombre: "Exterior",
    carpeta: "exterior",
    foto: null as string | null,
    titulo: "Muebles para disfrutar afuera",
    dato: "Muebles para quincho y galería.",
    medida: "1.80 m × 0.90 m",
  },
] as const;

export type IdEspacioHero = (typeof espaciosHero)[number]["id"];

/** Franja con movimiento: materiales y acabados. Confirmá la lista con el equipo. */
export const materiales = [
  "Acabado roble",
  "Verde salvia",
  "Greige",
  "Negro mate",
  "Maderas naturales",
  "Tiradores negros",
  "Luz LED indirecta",
];

export const trabajosTextos = {
  etiqueta: "Trabajos",
  titulo: "Espacios que ya transformamos",
  intro: "Elegí un espacio para ver sus trabajos. Tocá una foto para verla en grande.",
  galeriaTitulo: "Galería de trabajos",
  verMas: "Ver más en Instagram",
};

/** Muestras de "Elegí tu acabado" (también se usan en el presupuesto). */
export const acabados = [
  { id: "greige", nombre: "Greige", color: colores.greige },
  { id: "salvia", nombre: "Verde salvia", color: colores.salvia },
  { id: "roble", nombre: "Roble", color: colores.roble },
  { id: "negro", nombre: "Negro mate", color: colores.negro },
] as const;

export type IdAcabado = (typeof acabados)[number]["id"];

export const acabadosTextos = {
  etiqueta: "Acabados",
  titulo: "Elegí tu acabado",
  texto:
    "Cada mueble se fabrica en el acabado que elijas. Los tonos pueden variar, consultá disponibilidad.",
  boton: "Consultar este acabado",
  mensaje: (nombre: string) =>
    `¡Hola Richmont! Me interesa un mueble a medida en acabado ${nombre}. ¿Me pasan más información?`,
};

// Revisá con el equipo que estos pasos describan bien cómo trabajan.
export const proceso = {
  etiqueta: "Cómo trabajamos",
  titulo: "De la idea al mueble instalado",
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

export const nosotros = {
  etiqueta: "Quiénes somos",
  titulo: "Muebles hechos para tu espacio, no al revés",
  intro:
    "Cada proyecto empieza por escucharte: cómo usás el espacio, qué necesitás guardar y cómo te gusta vivirlo. A partir de ahí diseñamos y fabricamos piezas únicas.",
  pilares: [
    {
      titulo: "Diseño personalizado",
      texto:
        "Cada mueble se diseña desde cero según tus medidas, tus gustos y la forma en que usás tu espacio.",
    },
    {
      titulo: "Materiales de alta calidad",
      texto:
        "Elegimos materiales, herrajes y terminaciones que se ven bien hoy y siguen firmes con el uso diario.",
    },
    {
      titulo: "Funcionalidad y durabilidad",
      texto:
        "Pensamos cada cajón, puerta y estante para que sea cómodo, práctico y dure muchos años.",
    },
    {
      titulo: "Hogares, departamentos y oficinas",
      texto:
        "Proyectos a medida para cada tipo de espacio: desde una cocina completa hasta el mobiliario de tu oficina.",
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
  titulo: "Armá tu pedido en 4 pasos",
  intro: "Al final te abrimos WhatsApp con el mensaje listo para enviar. Sin compromiso.",
  pasos: ["Espacio", "Medidas", "Acabado", "Contacto"],
  tiposDeEspacio: [
    "Cocina",
    "Living / comedor",
    "Placard / vestidor",
    "Dormitorio",
    "Baño",
    "Exterior / quincho",
    "Oficina",
    "Otro",
  ],
  sinAcabado: "Todavía no sé",
  boton: "Enviar por WhatsApp",
};

export const contactoTextos = {
  etiqueta: "Contacto",
  titulo: "Hablemos de tu próximo mueble",
  intro: "La forma más rápida de contactarnos es por WhatsApp.",
};
