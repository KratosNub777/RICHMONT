import { nosotros } from "@/data/sitio";
import { Revelar, TituloRevelado } from "./movimiento";
import { Etiqueta } from "./ui";
import LineaQueSeDibuja from "./LineaQueSeDibuja";

const iconos: Record<string, React.ReactNode> = {
  // Escuadra y lápiz
  diseno: (
    <>
      <path d="M4 20V4l16 16H4Z" />
      <path d="M8 16v-4l4 4H8Z" />
      <path d="m15 4 5 5" />
    </>
  ),
  // Placas apiladas, como tableros
  materiales: (
    <>
      <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" />
      <path d="m3 12 9 4.5 9-4.5" />
      <path d="m3 16.5 9 4.5 9-4.5" />
    </>
  ),
  // Bisagra
  durabilidad: (
    <>
      <rect x="4" y="3" width="6" height="18" rx="1" />
      <rect x="14" y="3" width="6" height="18" rx="1" />
      <path d="M10 7h4M10 12h4M10 17h4" />
    </>
  ),
  // Casa y edificio
  espacios: (
    <>
      <path d="M3 21V11l6-5 6 5v10" />
      <path d="M15 21V5h6v16" />
      <path d="M2 21h20M8 21v-5h2v5" />
    </>
  ),
};

export default function Nosotros() {
  return (
    <section id="nosotros" aria-labelledby="titulo-nosotros" className="tono-claro fondo-claro">
      <div className="mx-auto grid max-w-[90rem] gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:py-36">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Revelar>
              <Etiqueta>{nosotros.etiqueta}</Etiqueta>
            </Revelar>
            <TituloRevelado
              id="titulo-nosotros"
              texto={nosotros.titulo}
              className="mt-6 font-display text-titulo font-semibold text-negro text-balance"
            />
            <Revelar retraso={0.15}>
              <p className="mt-7 max-w-md text-cuerpo text-grafito">{nosotros.intro}</p>
            </Revelar>
          </div>
        </div>

        <ol className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:pt-4">
          {nosotros.pilares.map((pilar, i) => (
            <li key={pilar.titulo}>
              <Revelar retraso={(i % 2) * 0.12}>
                <LineaQueSeDibuja retraso={(i % 2) * 0.12} />
                <div className="mt-7 flex items-start justify-between gap-6">
                  <span className="font-display text-sm font-medium text-roble-texto">0{i + 1}</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="size-9 text-salvia"
                  >
                    {iconos[pilar.icono]}
                  </svg>
                </div>
                <h3 className="mt-8 font-display text-subtitulo font-semibold text-negro">{pilar.titulo}</h3>
                <p className="mt-4 text-cuerpo text-grafito">{pilar.texto}</p>
              </Revelar>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
