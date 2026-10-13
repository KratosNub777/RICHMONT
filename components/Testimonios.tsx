import { testimonios, testimoniosTextos } from "@/data/sitio";
import { Revelar, TituloRevelado } from "./movimiento";
import { Etiqueta, Marcador } from "./ui";

export default function Testimonios() {
  const hayTestimonios = testimonios.length > 0;

  return (
    <section id="testimonios" aria-labelledby="titulo-testimonios" className="tono-claro fondo-claro">
      <div className="mx-auto max-w-[90rem] px-5 py-20 sm:px-8 md:py-28 lg:px-12 lg:py-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Revelar>
              <Etiqueta>{testimoniosTextos.etiqueta}</Etiqueta>
            </Revelar>
            <TituloRevelado
              id="titulo-testimonios"
              texto={testimoniosTextos.titulo}
              className="mt-6 max-w-2xl font-display text-titulo font-semibold text-negro text-balance"
            />
          </div>
          {!hayTestimonios && (
            <Revelar className="text-roble-texto">
              <Marcador>Sección pendiente: cargar opiniones reales en data/sitio.ts</Marcador>
            </Revelar>
          )}
        </div>

        <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3 lg:gap-6">
          {hayTestimonios
            ? testimonios.map((t, i) => (
                <li key={t.nombre + i}>
                  <Revelar retraso={i * 0.1} className="h-full">
                    <figure className="flex h-full flex-col justify-between rounded-sm bg-hueso/70 p-7 ring-1 ring-negro/8 lg:p-9">
                      <span aria-hidden="true" className="font-display text-5xl leading-none text-roble">
                        “
                      </span>
                      <blockquote className="mt-4 text-cuerpo text-grafito">{t.texto}</blockquote>
                      <figcaption className="mt-8 border-t border-negro/10 pt-5">
                        <span className="block font-display font-semibold text-negro">{t.nombre}</span>
                        {t.detalle && <span className="mt-1 block text-sm text-salvia-texto">{t.detalle}</span>}
                      </figcaption>
                    </figure>
                  </Revelar>
                </li>
              ))
            : [1, 2, 3].map((n, i) => (
                <li key={n}>
                  <Revelar retraso={i * 0.1} className="h-full">
                    <div className="flex h-full min-h-60 flex-col justify-between rounded-sm border border-dashed border-negro/25 p-7 lg:p-9">
                      <span aria-hidden="true" className="font-display text-5xl leading-none text-greige">
                        “
                      </span>
                      <p className="mt-4 text-cuerpo text-grafito">
                        <strong className="font-semibold">Testimonio pendiente.</strong> Acá va la opinión real de un
                        cliente, con su permiso.
                      </p>
                      <p className="mt-8 border-t border-dashed border-negro/20 pt-5 text-sm text-carbon">
                        Nombre del cliente · trabajo realizado
                      </p>
                    </div>
                  </Revelar>
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
}
