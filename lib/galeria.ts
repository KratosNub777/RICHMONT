import "server-only";
import fs from "node:fs";
import path from "node:path";
import {
  espacios,
  marcadoresPorEspacio,
  trabajos,
  type Carpeta,
  type Formato,
} from "@/data/trabajos";

export type ItemGaleria = {
  id: string;
  espacio: Carpeta;
  titulo: string;
  alt: string;
  formato: Formato;
  /** null = todavía no hay foto: se muestra un marcador "Foto pendiente". */
  src: string | null;
  medidas: string | null;
};

const EXTENSIONES = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const RITMO: Formato[] = ["vertical", "horizontal", "cuadrado", "cuadrado", "horizontal", "vertical"];

function tituloDesdeArchivo(archivo: string) {
  const base = path
    .parse(archivo)
    .name.replace(/[-_]+/g, " ")
    .replace(/\s+\d+$/, "")
    .trim();
  return base.charAt(0).toUpperCase() + base.slice(1);
}

function nombreEspacio(carpeta: Carpeta) {
  return espacios.find((e) => e.carpeta === carpeta)?.nombre ?? carpeta;
}

/** Lista las fotos de public/trabajos/<carpeta>/ (se ejecuta al construir la web). */
function fotosEnCarpeta(carpeta: Carpeta) {
  const dir = path.join(process.cwd(), "public", "trabajos", carpeta);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => EXTENSIONES.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "es", { numeric: true }))
    .map((f) => `/trabajos/${carpeta}/${f}`);
}

export function obtenerGaleria(): ItemGaleria[] {
  const items: ItemGaleria[] = [];
  const usadas = new Set<string>();

  // 1. Primero, las fotos descritas en data/trabajos.ts (en ese orden).
  for (const t of trabajos) {
    usadas.add(t.src);
    items.push({
      id: t.src,
      espacio: t.espacio,
      titulo: t.titulo,
      alt: t.alt ?? `${t.titulo} — mueble a medida de Richmont`,
      formato: t.formato ?? RITMO[items.length % RITMO.length],
      src: t.src,
      medidas: t.medidas ?? null,
    });
  }

  // 2. Después, las fotos que están en las carpetas pero no en el archivo.
  for (const { carpeta } of espacios) {
    for (const src of fotosEnCarpeta(carpeta)) {
      if (usadas.has(src)) continue;
      const titulo = tituloDesdeArchivo(src);
      items.push({
        id: src,
        espacio: carpeta,
        titulo,
        alt: `${titulo} — ${nombreEspacio(carpeta).toLowerCase()} a medida de Richmont`,
        formato: RITMO[items.length % RITMO.length],
        src,
        medidas: null,
      });
    }
  }

  // 3. Si un espacio no tiene ninguna foto, se muestran marcadores "Foto pendiente".
  //    Se intercalan por espacio para que el mosaico se vea variado.
  const sinFotos = espacios.filter(({ carpeta }) => !items.some((i) => i.espacio === carpeta));
  for (let n = 0; n < marcadoresPorEspacio; n++) {
    for (const { carpeta, nombre } of sinFotos) {
      items.push({
        id: `pendiente-${carpeta}-${n}`,
        espacio: carpeta,
        titulo: `${nombre}: foto pendiente`,
        alt: "",
        formato: RITMO[items.length % RITMO.length],
        src: null,
        medidas: null,
      });
    }
  }

  return items;
}

/** Primera foto de cada carpeta (para el selector del hero y el acordeón). */
export function primeraFotoPorEspacio(): Partial<Record<Carpeta, { src: string; alt: string }>> {
  const resultado: Partial<Record<Carpeta, { src: string; alt: string }>> = {};
  for (const item of obtenerGaleria()) {
    if (item.src && !resultado[item.espacio]) resultado[item.espacio] = { src: item.src, alt: item.alt };
  }
  return resultado;
}

export { espacios };
