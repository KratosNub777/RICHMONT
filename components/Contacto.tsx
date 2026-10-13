import { contacto, contactoTextos, hero, linkInstagram, linkWhatsapp, marca, navegacion } from "@/data/sitio";
import { Foco, Revelar } from "./movimiento";
import { Etiqueta, IconoInstagram, IconoWhatsapp, Logo, Marcador } from "./ui";

type Dato = { titulo: string; valor: string | null; href?: string; externo?: boolean };

export default function Contacto() {
  const datos: Dato[] = [
    { titulo: "WhatsApp", valor: contacto.whatsappVisible, href: linkWhatsapp(), externo: true },
    { titulo: "Instagram", valor: `@${contacto.instagram}`, href: linkInstagram, externo: true },
    { titulo: "Email", valor: contacto.email, href: contacto.email ? `mailto:${contacto.email}` : undefined },
    {
      titulo: "Facebook",
      valor: contacto.facebook ? marca.nombreCompleto : null,
      href: contacto.facebook ?? undefined,
      externo: true,
    },
    { titulo: "Dirección", valor: [contacto.direccion, contacto.ciudad].filter(Boolean).join(", ") || null },
    { titulo: "Horarios", valor: contacto.horarios },
  ];

  return (
    <footer
      id="contacto"
      aria-labelledby="titulo-contacto"
      className="oscuro cuadricula-oscura relative overflow-clip bg-negro text-blanco"
    >
      <Foco inicial={{ x: 0.25, y: 0.25 }} />
      <div className="relative mx-auto max-w-[90rem] px-4 pb-28 pt-20 sm:px-8 md:pb-10 md:pt-28 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Etiqueta codigo="R—07" oscuro>
              {contactoTextos.etiqueta}
            </Etiqueta>
            <Revelar>
              <h2 id="titulo-contacto" className="mt-6 max-w-[14ch] font-display text-titulo font-bold text-balance">
                {contactoTextos.titulo}
              </h2>
            </Revelar>
            <p className="mt-6 max-w-md text-cuerpo text-humo">{contactoTextos.intro}</p>
            <a
              href={linkWhatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center gap-2.5 bg-blanco px-6 py-4 font-semibold text-negro transition-colors hover:bg-roble"
            >
              <IconoWhatsapp />
              {hero.botonPresupuesto}
              <span className="sr-only">(abre WhatsApp)</span>
            </a>
          </div>

          <ul className="grid border-l border-t border-blanco/15 sm:grid-cols-2 lg:col-span-6">
            {datos.map((d) => (
              <li key={d.titulo} className="border-b border-r border-blanco/15 p-5 lg:p-6">
                <p className="tecnico text-roble">{d.titulo}</p>
                <p className="mt-3 text-lg">
                  {d.valor === null ? (
                    <span className="text-humo">
                      <Marcador />
                    </span>
                  ) : d.href ? (
                    <a
                      href={d.href}
                      {...(d.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="underline decoration-blanco/30 underline-offset-4 transition-colors hover:text-ambar hover:decoration-ambar"
                    >
                      {d.valor}
                    </a>
                  ) : (
                    d.valor
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 flex flex-col gap-8 border-t border-blanco/15 pt-8 md:mt-28 md:flex-row md:items-center md:justify-between">
          <a href="#inicio" aria-label="Richmont Furniture, volver al inicio" className="flex h-9 w-fit items-center">
            <Logo />
          </a>
          <nav aria-label="Pie de página">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-humo">
              {navegacion.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="py-1 transition-colors hover:text-blanco">
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
            className="grid size-11 place-items-center border border-blanco/25 transition-colors hover:border-roble hover:bg-roble hover:text-negro"
          >
            <IconoInstagram />
          </a>
        </div>
        <p className="tecnico mt-8 text-humo">
          © {new Date().getFullYear()} {marca.nombreCompleto} · Muebles a medida en Paraguay
        </p>
      </div>
    </footer>
  );
}
