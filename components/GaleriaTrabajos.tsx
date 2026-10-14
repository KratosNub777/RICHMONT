"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { ItemGaleria } from "@/lib/galeria";
import { useConsulta } from "./ConsultaContext";
import Lightbox from "./Lightbox";

type Espacio = { carpeta: string; nombre: string };
const TANDA = 6;

export default function GaleriaTrabajos({ items, espacios }: { items: ItemGaleria[]; espacios: Espacio[] }) {
  const [filtro, setFiltro] = useState("todos");
  const [limite, setLimite] = useState(TANDA);
  const [abierta, setAbierta] = useState<number | null>(null);
  const botonesRef = useRef(new Map<string, HTMLButtonElement>());
  const { elegirProyecto } = useConsulta();
  const filtrados = useMemo(() => filtro === "todos" ? items : items.filter((item) => item.espacio === filtro), [items, filtro]);
  const visibles = filtrados.slice(0, limite);
  const fotos = filtrados.flatMap((proyecto) => proyecto.fotos.map((foto) => ({ proyecto, foto })));
  const categorias = espacios.filter((espacio) => items.some((item) => item.espacio === espacio.carpeta));
  const filtros = [{ carpeta: "todos", nombre: "Todos" }, ...categorias];
  const nombreDe = (carpeta: string) => espacios.find((espacio) => espacio.carpeta === carpeta)?.nombre ?? carpeta;
  const cantidad = (carpeta: string) => carpeta === "todos" ? items.length : items.filter((item) => item.espacio === carpeta).length;

  function consultar(proyecto: ItemGaleria) {
    elegirProyecto({ id: proyecto.id, titulo: proyecto.titulo, categoria: nombreDe(proyecto.espacio) });
    setAbierta(null);
    requestAnimationFrame(() => {
      const destino = document.querySelector<HTMLElement>("#presupuesto");
      history.replaceState(null, "", "#presupuesto");
      destino?.focus({ preventScroll: true });
      destino?.scrollIntoView({ block: "start" });
    });
  }

  return (
    <div className="mt-6">
      {items.length > 0 && <div role="group" aria-label="Filtrar trabajos por espacio" className="flex flex-wrap gap-2">
        {filtros.map((opcion) => <button key={opcion.carpeta} type="button" aria-pressed={filtro === opcion.carpeta}
          aria-controls="resultados-trabajos" onClick={() => { setFiltro(opcion.carpeta); setLimite(TANDA); }}
          className={`filtro ${filtro === opcion.carpeta ? "filtro-activo" : ""}`}>
          {opcion.nombre}{" "}<span className="ml-2 opacity-75">{cantidad(opcion.carpeta)}</span>
        </button>)}
      </div>}
      <p role="status" aria-live="polite" aria-atomic="true" className="my-5 text-sm text-carbon">
        {filtrados.length ? `${filtrados.length} ${filtrados.length === 1 ? "proyecto" : "proyectos"} · Mostrando ${visibles.length}` : "No hay proyectos publicados en esta categoría."}
      </p>
      <ul id="resultados-trabajos" className="galeria-grid" data-cantidad={Math.min(visibles.length, 3)}>
        {visibles.map((proyecto) => {
          const foto = proyecto.fotos[0];
          return <li key={proyecto.id} className="min-w-0">
            <button type="button" ref={(el) => { if (el) botonesRef.current.set(proyecto.id, el); else botonesRef.current.delete(proyecto.id); }}
              onClick={() => setAbierta(fotos.findIndex((item) => item.proyecto.id === proyecto.id))}
              aria-label={`Ver proyecto: ${proyecto.titulo}`} className="proyecto-card group">
              <span className="proyecto-imagen"><Image src={foto.src} alt={foto.alt} fill
                sizes={visibles.length === 1 ? "(min-width: 1024px) 800px, 100vw" : visibles.length === 2 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
                quality={70} className="object-contain" /></span>
              <span className="block p-4 sm:p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-roble-texto">{nombreDe(proyecto.espacio)}</span>
                <span className="mt-2 block font-display text-lg font-semibold">{proyecto.titulo}</span>
                {proyecto.descripcion && <span className="mt-2 block text-sm leading-relaxed text-carbon">{proyecto.descripcion}</span>}
                <span className="mt-3 block text-sm text-carbon">Ver proyecto{proyecto.fotos.length > 1 ? ` · ${proyecto.fotos.length} fotos` : ""} ↗</span>
              </span>
            </button>
          </li>;
        })}
      </ul>
      {filtrados.length === 0 && <a href="#presupuesto" className="boton boton-oscuro">Contanos tu idea</a>}
      {limite < filtrados.length && <div className="mt-7 text-center"><button type="button" className="boton boton-borde"
        onClick={() => {
          const siguiente = filtrados[limite];
          setLimite((actual) => actual + TANDA);
          requestAnimationFrame(() => botonesRef.current.get(siguiente.id)?.focus({ preventScroll: true }));
        }}>Mostrar más<span className="sr-only"> proyectos</span></button></div>}
      {abierta !== null && fotos[abierta] && <Lightbox fotos={fotos} indice={abierta} alCambiar={setAbierta}
        alCerrar={() => setAbierta(null)} nombreEspacio={nombreDe} alConsultar={consultar} />}
    </div>
  );
}
