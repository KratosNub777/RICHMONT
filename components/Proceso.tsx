import { proceso } from "@/data/sitio";
import { Etiqueta } from "./ui";

export default function Proceso() {
  return (
    <section id="proceso" tabIndex={-1} aria-labelledby="titulo-proceso" className="fondo-oscuro text-hueso">
      <div className="contenedor seccion">
        <Etiqueta oscuro>{proceso.etiqueta}</Etiqueta>
        <h2 id="titulo-proceso" className="mt-4 font-display text-titulo font-semibold">{proceso.titulo}</h2>
        <ol className="mt-7 grid gap-5 md:grid-cols-3 md:gap-8">
          {proceso.pasos.map((paso, i) => <li key={paso.titulo} className="flex gap-4 border-t border-hueso/20 pt-5">
            <span className="pt-1 text-sm text-roble" aria-hidden="true">0{i + 1}</span>
            <div><h3 className="font-display text-lg font-semibold">{paso.titulo}</h3><p className="mt-2 text-base leading-relaxed text-greige">{paso.texto}</p></div>
          </li>)}
        </ol>
      </div>
    </section>
  );
}
