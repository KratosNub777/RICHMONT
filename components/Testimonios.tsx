import { testimonios, testimoniosTextos } from "@/data/sitio";
import { Etiqueta } from "./ui";

export default function Testimonios() {
  if (!testimonios.length) return null;
  return (
    <section id="testimonios" aria-labelledby="titulo-testimonios" className="tono-claro">
      <div className="contenedor seccion">
        <Etiqueta>{testimoniosTextos.etiqueta}</Etiqueta>
        <h2 id="titulo-testimonios" className="mt-4 font-display text-titulo font-semibold">{testimoniosTextos.titulo}</h2>
        <ul className="mt-7 grid items-start gap-5 md:grid-cols-3">
          {testimonios.map((testimonio, i) => <li key={testimonio.nombre + i}><figure className="rounded-md border border-negro/15 p-5">
            <blockquote className="leading-relaxed">“{testimonio.texto}”</blockquote>
            <figcaption className="mt-4 border-t border-negro/10 pt-4 text-sm"><span className="block font-semibold">{testimonio.nombre}</span>
              {testimonio.detalle && <span className="mt-1 block text-carbon">{testimonio.detalle}</span>}</figcaption>
          </figure></li>)}
        </ul>
      </div>
    </section>
  );
}
