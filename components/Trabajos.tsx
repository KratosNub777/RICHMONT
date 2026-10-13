import { linkInstagram, trabajosTextos } from "@/data/sitio";
import { espacios, obtenerGaleria } from "@/lib/galeria";
import GaleriaTrabajos from "./GaleriaTrabajos";
import { Revelar, TituloRevelado } from "./movimiento";
import { Etiqueta, IconoInstagram } from "./ui";

export default function Trabajos() {
  // Se lee al construir la web: fotos de public/trabajos/ + data/trabajos.ts
  const items = obtenerGaleria();

  return (
    <section id="trabajos" aria-labelledby="titulo-trabajos" className="tono-claro fondo-claro-inverso">
      <div className="mx-auto max-w-[90rem] px-5 pb-24 pt-10 sm:px-8 md:pb-32 lg:px-12 lg:pb-40">
        <div className="max-w-3xl">
          <Revelar>
            <Etiqueta>{trabajosTextos.etiqueta}</Etiqueta>
          </Revelar>
          <TituloRevelado
            id="titulo-trabajos"
            texto={trabajosTextos.titulo}
            className="mt-6 font-display text-titulo font-semibold text-negro text-balance"
          />
          <Revelar retraso={0.15}>
            <p className="mt-6 text-cuerpo text-grafito">{trabajosTextos.intro}</p>
          </Revelar>
        </div>

        <GaleriaTrabajos items={items} espacios={espacios.map((e) => ({ ...e }))} />

        <Revelar className="mt-14 flex justify-center">
          <a
            href={linkInstagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-negro/20 px-6 py-3.5 font-semibold text-negro transition-colors hover:border-negro hover:bg-negro hover:text-hueso"
          >
            <IconoInstagram />
            {trabajosTextos.verMas}
            <span className="sr-only">(abre Instagram)</span>
          </a>
        </Revelar>
      </div>
    </section>
  );
}
