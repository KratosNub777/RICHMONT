import { linkInstagram, trabajosTextos } from "@/data/sitio";
import { espacios, obtenerGaleria } from "@/lib/galeria";
import AcordeonEspacios from "./AcordeonEspacios";
import GaleriaHorizontal from "./GaleriaHorizontal";
import { Revelar } from "./movimiento";
import { Etiqueta, IconoInstagram } from "./ui";
import FiltroProvider from "./FiltroTrabajos";

export default function Trabajos() {
  // Se lee al construir la web: fotos de public/trabajos/ + data/trabajos.ts
  const items = obtenerGaleria();
  const listaEspacios = espacios.map((e) => {
    const deEste = items.filter((i) => i.espacio === e.carpeta);
    const foto = deEste.find((i) => i.src);
    return {
      carpeta: e.carpeta,
      nombre: e.nombre,
      cantidad: deEste.filter((i) => i.src).length,
      foto: foto?.src ? { src: foto.src, alt: foto.alt } : null,
    };
  });

  return (
    <FiltroProvider>
      <section id="trabajos" aria-labelledby="titulo-trabajos" className="pt-20 md:pt-28 lg:pt-32">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Etiqueta codigo="R—01">{trabajosTextos.etiqueta}</Etiqueta>
              <Revelar>
                <h2 id="titulo-trabajos" className="mt-6 font-display text-titulo font-bold text-balance">
                  {trabajosTextos.titulo}
                </h2>
              </Revelar>
            </div>
            <p className="max-w-md text-cuerpo text-tinta lg:col-span-4 lg:col-start-9">{trabajosTextos.intro}</p>
          </div>
        </div>

        <AcordeonEspacios espacios={listaEspacios} />
      </section>

      <GaleriaHorizontal items={items} espacios={espacios.map((e) => ({ ...e }))} />

      <div className="mx-auto flex max-w-[90rem] justify-start px-4 pb-20 pt-10 sm:px-8 md:pb-28 lg:px-12">
        <a
          href={linkInstagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 border border-negro px-5 py-3.5 font-semibold transition-colors hover:bg-negro hover:text-blanco"
        >
          <IconoInstagram />
          {trabajosTextos.verMas}
          <span className="sr-only">(abre Instagram)</span>
        </a>
      </div>
    </FiltroProvider>
  );
}
