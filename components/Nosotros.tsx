import { nosotros } from "@/data/sitio";
import { Etiqueta } from "./ui";

export default function Nosotros() {
  return (
    <section id="nosotros" tabIndex={-1} aria-labelledby="titulo-nosotros" className="tono-claro border-t border-negro/10 bg-arena/40">
      <div className="contenedor seccion grid gap-6 md:grid-cols-2 md:gap-12">
        <div><Etiqueta>{nosotros.etiqueta}</Etiqueta>
          <h2 id="titulo-nosotros" className="mt-4 font-display text-titulo font-semibold text-negro">{nosotros.titulo}</h2>
        </div>
        <div><p className="text-cuerpo">{nosotros.intro}</p>
          <p className="mt-5 text-sm font-semibold text-roble-texto">Muebles para</p>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm">{nosotros.espacios.map((espacio) => <li key={espacio}>{espacio}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
