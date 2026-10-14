import { linkInstagram, trabajosTextos } from "@/data/sitio";
import { espacios, obtenerGaleria } from "@/lib/galeria";
import GaleriaTrabajos from "./GaleriaTrabajos";
import { Etiqueta, IconoInstagram } from "./ui";

export default function Trabajos() {
  const items = obtenerGaleria();
  return (
    <section id="trabajos" tabIndex={-1} aria-labelledby="titulo-trabajos" className="tono-claro bg-hueso">
      <div className="contenedor seccion">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><Etiqueta>{trabajosTextos.etiqueta}</Etiqueta>
            <h2 id="titulo-trabajos" className="mt-4 font-display text-titulo font-semibold text-negro">{trabajosTextos.titulo}</h2>
          </div>
          <a href={linkInstagram} target="_blank" rel="noopener noreferrer" className="boton boton-borde"><IconoInstagram />{trabajosTextos.verMas}</a>
        </div>
        {items.length > 0 ? <>
          <p className="mt-5 text-cuerpo">{trabajosTextos.intro}</p>
          <GaleriaTrabajos items={items} espacios={espacios.map((e) => ({ ...e }))} />
        </> : <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-md border border-negro/15 p-5 sm:p-6">
          <p className="max-w-2xl text-base leading-relaxed text-carbon">Todavía no hay proyectos publicados en esta galería. Podés encontrarnos en Instagram o contarnos qué mueble necesitás.</p>
          <a href="#presupuesto" className="nav-link inline-flex items-center gap-2 font-semibold text-negro underline underline-offset-4">Pedir presupuesto</a>
        </div>}
      </div>
    </section>
  );
}
