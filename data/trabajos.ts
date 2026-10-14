/** Solo se publican proyectos revisados, con fotografías reales y datos confirmados. */
export const espacios = [
  { carpeta: "cocinas", nombre: "Cocinas" },
  { carpeta: "living", nombre: "Living" },
  { carpeta: "placares", nombre: "Placares" },
  { carpeta: "exterior", nombre: "Exterior" },
  { carpeta: "otros", nombre: "Otros" },
] as const;

export type Carpeta = (typeof espacios)[number]["carpeta"];
export type FotoTrabajo = { src: string; alt: string; ancho: number; alto: number };
export type Trabajo = {
  id: string;
  espacio: Carpeta;
  titulo: string;
  fotos: FotoTrabajo[];
  descripcion?: string;
  materiales?: string;
  terminaciones?: string;
};

// No hay fotografías de proyectos en el repositorio actual.
export const trabajos: Trabajo[] = [];
