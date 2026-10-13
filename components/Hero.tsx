import { espaciosHero, hero, linkWhatsapp } from "@/data/sitio";
import { primeraFotoPorEspacio } from "@/lib/galeria";
import SelectorEspacio, { type EspacioConFoto } from "./SelectorEspacio";
import { Etiqueta, IconoFlecha, IconoWhatsapp } from "./ui";

export default function Hero() {
  // Se lee al construir la web: primera foto de cada carpeta de public/trabajos/
  const fotos = primeraFotoPorEspacio();
  const espacios: EspacioConFoto[] = espaciosHero.map((e) => {
    const foto = e.foto ? { src: e.foto, alt: `${e.nombre} a medida de Richmont` } : fotos[e.carpeta];
    return { ...e, foto: foto ?? null };
  });

  return (
    <section
      id="inicio"
      aria-label="Inicio"
      className="grid pt-16 lg:grid-cols-2 lg:grid-rows-[minmax(34rem,calc(100svh-4rem-5.5rem))_auto]"
    >
      <div className="cuadricula flex flex-col justify-center px-4 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-16 xl:pl-[max(3rem,calc((100vw-90rem)/2+3rem))]">
        <div className="aparecer" style={{ "--retraso": "0.05s" } as React.CSSProperties}>
          <Etiqueta codigo="R—00">{hero.etiqueta}</Etiqueta>
        </div>
        <h1
          className="destapar mt-7 max-w-[13ch] font-display text-display font-bold text-balance"
          style={{ "--retraso": "0.1s" } as React.CSSProperties}
        >
          {hero.titulo}
        </h1>
        <p
          className="aparecer mt-7 max-w-[33rem] text-cuerpo text-tinta"
          style={{ "--retraso": "0.35s" } as React.CSSProperties}
        >
          {hero.subtitulo}
        </p>
        <div
          className="aparecer mt-9 flex flex-col gap-3 sm:flex-row"
          style={{ "--retraso": "0.45s" } as React.CSSProperties}
        >
          <a
            href={linkWhatsapp()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-negro px-6 py-4 font-semibold text-blanco transition-colors hover:bg-salvia-oscuro"
          >
            <IconoWhatsapp />
            {hero.botonPresupuesto}
            <span className="sr-only">(abre WhatsApp)</span>
          </a>
          <a
            href="#trabajos"
            className="group inline-flex items-center justify-center gap-2.5 border border-negro px-6 py-4 font-semibold transition-colors hover:border-roble hover:bg-roble"
          >
            {hero.botonTrabajos}
            <IconoFlecha className="size-4 rotate-90 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>

      <SelectorEspacio espacios={espacios} />
    </section>
  );
}
