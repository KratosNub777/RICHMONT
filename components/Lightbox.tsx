"use client";

import Image from "next/image";
import type { FotoTrabajo } from "@/data/trabajos";
import type { ItemGaleria } from "@/lib/galeria";
import { linkWhatsapp } from "@/data/sitio";
import Modal from "./Modal";
import { IconoFlecha, IconoWhatsapp } from "./ui";

export default function Lightbox({ fotos, indice, alCambiar, alCerrar, nombreEspacio, alConsultar }: {
  fotos: { proyecto: ItemGaleria; foto: FotoTrabajo }[];
  indice: number;
  alCambiar: (indice: number) => void;
  alCerrar: () => void;
  nombreEspacio: (carpeta: string) => string;
  alConsultar: (proyecto: ItemGaleria) => void;
}) {
  const { proyecto, foto } = fotos[indice];
  const total = fotos.length;
  const categoria = nombreEspacio(proyecto.espacio);
  const cambiar = (paso: number) => alCambiar((indice + paso + total) % total);
  return (
    <Modal alCerrar={alCerrar} etiqueta="visor-titulo" descripcion="visor-ayuda" className="visor-modal">
      <div className="visor-interior" onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); cambiar(e.key === "ArrowRight" ? 1 : -1); }
      }}>
        <div className="visor-barra flex items-center justify-between gap-3 p-3 sm:px-6">
          <p id="visor-ayuda" className="text-sm text-greige">Foto {indice + 1} de {total}{total > 1 && <span className="hidden sm:inline"> · Usá las flechas para navegar</span>}</p>
          <button type="button" className="control shrink-0" onClick={alCerrar} aria-label="Cerrar visor">✕</button>
        </div>
        <div className="visor-imagen"><Image key={foto.src} src={foto.src} alt={foto.alt} fill
          sizes="(min-width: 1280px) 1200px, 100vw" quality={80} loading="eager" className="object-contain" /></div>
        <div className="visor-detalles p-4 sm:px-6 sm:pb-6">
          {total > 1 && <div className="mb-4 flex items-center justify-between gap-3">
            <button type="button" className="boton boton-borde-claro" onClick={() => cambiar(-1)} aria-label="Foto anterior"><IconoFlecha className="size-4 rotate-180" />Anterior</button>
            <button type="button" className="boton boton-borde-claro" onClick={() => cambiar(1)} aria-label="Foto siguiente">Siguiente<IconoFlecha /></button>
          </div>}
          <div aria-live="polite" aria-atomic="true">
            <p className="text-xs font-semibold uppercase tracking-wider text-roble">{categoria}</p>
            <h2 id="visor-titulo" className="mt-2 font-display text-xl font-semibold">{proyecto.titulo}</h2>
            {proyecto.descripcion && <p className="mt-3 text-sm leading-relaxed text-greige">{proyecto.descripcion}</p>}
            {(proyecto.materiales || proyecto.terminaciones) && <dl className="mt-3 text-sm leading-relaxed text-greige">
              {proyecto.materiales && <div><dt className="inline font-semibold text-hueso">Materiales: </dt><dd className="inline">{proyecto.materiales}</dd></div>}
              {proyecto.terminaciones && <div><dt className="inline font-semibold text-hueso">Terminaciones: </dt><dd className="inline">{proyecto.terminaciones}</dd></div>}
            </dl>}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" className="boton boton-claro" onClick={() => alConsultar(proyecto)}>Quiero algo similar</button>
            <a href={linkWhatsapp(`¡Hola Richmont! Vi el proyecto «${proyecto.titulo}» (${categoria}) en su web y quiero consultar por algo similar.\nReferencia: ${window.location.origin}/#trabajos`)}
              target="_blank" rel="noopener noreferrer" className="boton boton-borde-claro"><IconoWhatsapp />Consultar por WhatsApp<span className="sr-only"> sobre {proyecto.titulo}</span></a>
          </div>
        </div>
      </div>
    </Modal>
  );
}
