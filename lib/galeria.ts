import "server-only";
import fs from "node:fs";
import path from "node:path";
import { trabajos, type FotoTrabajo, type Trabajo } from "@/data/trabajos";

export type ItemGaleria = Trabajo;

/** Nunca publicar rutas inexistentes, externas o sin una descripción accesible. */
export function fotoDisponible(foto: FotoTrabajo) {
  const raiz = path.resolve(process.cwd(), "public");
  const archivo = path.resolve(raiz, `.${foto.src}`);
  return foto.src.startsWith("/trabajos/") && archivo.startsWith(`${raiz}${path.sep}`)
    && /\.(jpe?g|png|webp|avif)$/i.test(archivo)
    && !!foto.alt.trim() && foto.ancho > 0 && foto.alto > 0
    && fs.existsSync(archivo) && fs.statSync(archivo).isFile();
}

export function obtenerGaleria(): ItemGaleria[] {
  return trabajos.map((trabajo) => ({ ...trabajo, fotos: trabajo.fotos.filter(fotoDisponible) }))
    .filter((trabajo) => trabajo.id.trim() && trabajo.titulo.trim() && trabajo.fotos.length > 0);
}

export { espacios } from "@/data/trabajos";
