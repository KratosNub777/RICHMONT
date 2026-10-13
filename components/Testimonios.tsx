import { testimonios, testimoniosTextos } from "@/data/sitio";
import { Revelar } from "./movimiento";
import { Etiqueta, Marcador } from "./ui";

export default function Testimonios() {
  const hayTestimonios = testimonios.length > 0;

  return (
    <section id="testimonios" aria-labelledby="titulo-testimonios" className="border-t border-negro bg-blanco">
      <div className="mx-auto max-w-[90rem] px-4 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Etiqueta codigo="R—06">{testimoniosTextos.etiqueta}</Etiqueta>
            <Revelar>
              <h2 id="titulo-testimonios" className="mt-6 max-w-2xl font-display text-titulo font-bold text-balance">
                {testimoniosTextos.titulo}
              </h2>
            </Revelar>
          </div>
          {!hayTestimonios && (
            <p className="text-salvia-oscuro">
              <Marcador>Sección pendiente: cargar opiniones reales en data/sitio.ts</Marcador>
            </p>
          )}
        </div>

        <ul className="mt-12 grid gap-3 md:mt-16 md:grid-cols-3">
          {hayTestimonios
            ? testimonios.map((t, i) => (
                <li key={t.nombre + i}>
                  <Revelar retraso={i * 0.08} tipo="cortina" className="h-full">
                    <figure className="flex h-full flex-col justify-between border border-negro bg-blanco p-7 lg:p-9">
                      <span className="tecnico text-salvia-oscuro">T—0{i + 1}</span>
                      <blockquote className="mt-6 font-display text-xl leading-snug">“{t.texto}”</blockquote>
                      <figcaption className="mt-8 border-t border-negro/15 pt-4">
                        <span className="block font-semibold">{t.nombre}</span>
                        {t.detalle && <span className="tecnico mt-1 block text-tinta">{t.detalle}</span>}
                      </figcaption>
                    </figure>
                  </Revelar>
                </li>
              ))
            : [1, 2, 3].map((n) => (
                <li key={n}>
                  <div className="flex h-full min-h-56 flex-col justify-between border border-dashed border-negro/40 p-7 lg:p-9">
                    <span className="tecnico text-salvia-oscuro">T—0{n}</span>
                    <p className="mt-6 text-cuerpo">
                      <strong className="font-semibold">Testimonio pendiente.</strong> Acá va la opinión real de un
                      cliente, con su permiso.
                    </p>
                    <p className="tecnico mt-8 border-t border-dashed border-negro/30 pt-4 text-tinta">
                      Nombre · trabajo realizado
                    </p>
                  </div>
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
}
