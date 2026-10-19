import { contacto, contactoTextos, hero, linkInstagram, linkWhatsapp, marca, navegacion } from "@/data/sitio";
import { Magnetico, Revelar, TituloRevelado } from "./movimiento";
import LineaQueSeDibuja from "./LineaQueSeDibuja";
import { Etiqueta, IconoInstagram, IconoWhatsapp, Logo } from "./ui";

type Dato = { titulo: string; valor: string | null; href?: string; externo?: boolean };

export default function Contacto() {
  const datos: Dato[] = [
    { titulo: "WhatsApp", valor: contacto.whatsappVisible, href: linkWhatsapp(), externo: true },
    { titulo: "Instagram", valor: `@${contacto.instagram}`, href: linkInstagram, externo: true },
    { titulo: "Email", valor: contacto.email, href: contacto.email ? `mailto:${contacto.email}` : undefined },
    { titulo: "Facebook", valor: contacto.facebook ? "Richmont Furniture" : null, href: contacto.facebook ?? undefined, externo: true },
    { titulo: "Dirección", valor: [contacto.direccion, contacto.ciudad].filter(Boolean).join(", ") || null, href: contacto.mapa, externo: true },
    { titulo: "Horarios", valor: contacto.horarios },
  ];
  const datosDisponibles = datos.filter((dato) => dato.valor?.trim());

  return (
    <footer id="contacto" aria-labelledby="titulo-contacto" className="fondo-oscuro relative text-hueso">
      <div className="mx-auto max-w-[90rem] px-5 pb-28 pt-20 sm:px-8 md:pb-12 md:pt-28 lg:px-12 lg:pt-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Revelar>
              <Etiqueta oscuro>{contactoTextos.etiqueta}</Etiqueta>
            </Revelar>
            <TituloRevelado
              id="titulo-contacto"
              texto={contactoTextos.titulo}
              className="mt-6 max-w-[16ch] font-display text-titulo font-semibold text-balance"
            />
            <Revelar retraso={0.15}>
              <p className="mt-7 max-w-md text-cuerpo text-greige">{contactoTextos.intro}</p>
              <Magnetico className="mt-10 inline-block">
                <a
                  href={linkWhatsapp()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-hueso px-7 py-4 font-semibold text-negro shadow-[0_10px_40px_-12px] shadow-ambar/50 transition-colors hover:bg-white"
                >
                  <IconoWhatsapp />
                  {hero.botonPresupuesto}
                  <span className="sr-only">(abre WhatsApp)</span>
                </a>
              </Magnetico>
            </Revelar>
          </div>

          <ul className="grid content-start gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-6">
            {datosDisponibles.map((d, i) => (
              <li key={d.titulo}>
              <Revelar retraso={(i % 2) * 0.08}>
                <LineaQueSeDibuja oscuro retraso={(i % 2) * 0.08} />
                <p className="mt-5 text-etiqueta font-semibold uppercase text-roble">{d.titulo}</p>
                <p className="mt-2 text-lg">
                  {d.href ? (
                    <a
                      href={d.href}
                      {...(d.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="underline decoration-hueso/25 underline-offset-4 transition-colors hover:text-ambar hover:decoration-ambar"
                    >
                      {d.valor}
                    </a>
                  ) : (
                    d.valor
                  )}
                </p>
              </Revelar>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-24 border-t border-hueso/12 pt-10 md:mt-32">
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <a href="#inicio" aria-label="Richmont Furniture, volver al inicio" className="flex h-10 w-fit items-center">
              <Logo variante="claro" />
            </a>
            <nav aria-label="Pie de página">
              <ul className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-greige">
                {navegacion.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="transition-colors hover:text-ambar">
                      {item.texto}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <a
              href={linkInstagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Richmont (@richmontpy)"
              className="grid size-11 place-items-center rounded-full border border-hueso/20 text-hueso transition-colors hover:border-ambar hover:text-ambar"
            >
              <IconoInstagram />
            </a>
          </div>
          <p className="mt-10 text-sm text-greige">
            © {new Date().getFullYear()} {marca.nombreCompleto}. Muebles a medida en Paraguay.
          </p>
        </div>
      </div>
    </footer>
  );
}
