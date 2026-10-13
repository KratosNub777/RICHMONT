import { nosotros } from "@/data/sitio";
import { Foco, Revelar } from "./movimiento";
import { Etiqueta, Logo } from "./ui";

export default function Nosotros() {
  return (
    <section
      id="nosotros"
      aria-labelledby="titulo-nosotros"
      className="oscuro relative overflow-clip bg-salvia-oscuro text-blanco"
    >
      <Foco inicial={{ x: 0.2, y: 0.3 }} intensidad={0.45} />
      <div className="relative mx-auto max-w-[90rem] px-4 py-20 sm:px-8 md:py-28 lg:px-12 lg:py-32">
        <div className="flex items-start justify-between gap-6">
          <Etiqueta codigo="R—04" oscuro>
            {nosotros.etiqueta}
          </Etiqueta>
          <div className="hidden h-7 sm:block">
            <Logo />
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <Revelar className="lg:col-span-7">
            <h2 id="titulo-nosotros" className="font-display text-titulo font-bold text-balance">
              {nosotros.titulo}
            </h2>
          </Revelar>
          <p className="max-w-md text-cuerpo text-humo lg:col-span-4 lg:col-start-9 lg:self-end">{nosotros.intro}</p>
        </div>

        <ol className="mt-16 grid border-l border-t border-blanco/20 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {nosotros.pilares.map((pilar, i) => (
            <li key={pilar.titulo} className="border-b border-r border-blanco/20">
              <Revelar retraso={i * 0.08} tipo="cortina" className="flex h-full flex-col p-6 lg:p-8">
                <span className="tecnico text-humo">P—0{i + 1}</span>
                <h3 className="mt-10 font-display text-xl font-semibold leading-tight lg:mt-16 lg:text-2xl">
                  {pilar.titulo}
                </h3>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-humo">{pilar.texto}</p>
              </Revelar>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
