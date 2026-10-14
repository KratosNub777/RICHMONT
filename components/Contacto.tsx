import { contacto, contactoTextos, linkInstagram, linkWhatsapp, marca, navegacion } from "@/data/sitio";
import { Etiqueta, IconoInstagram, IconoWhatsapp, IconoFlecha, Logo } from "./ui";

type Dato = { titulo: string; valor: string | null; href?: string; externo?: boolean };

export default function Contacto() {
  const datos: Dato[] = [
    { titulo: "WhatsApp", valor: contacto.whatsappVisible, href: linkWhatsapp(), externo: true },
    { titulo: "Instagram", valor: `@${contacto.instagram}`, href: linkInstagram, externo: true },
    { titulo: "Email", valor: contacto.email, href: contacto.email ? `mailto:${contacto.email}` : undefined },
    { titulo: "Facebook", valor: contacto.facebook ? marca.nombreCompleto : null, href: contacto.facebook ?? undefined, externo: true },
    { titulo: "Ubicación", valor: [contacto.direccion, contacto.ciudad].filter(Boolean).join(", ") || null, href: contacto.maps ?? undefined, externo: true },
    { titulo: "Zona de cobertura", valor: contacto.cobertura },
    { titulo: "Horarios", valor: contacto.horarios },
  ].filter((dato) => dato.valor);

  return (
    <footer id="contacto" tabIndex={-1} aria-labelledby="titulo-contacto" className="fondo-oscuro text-hueso">
      <div className="contenedor seccion">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div><Etiqueta oscuro>{contactoTextos.etiqueta}</Etiqueta>
            <h2 id="titulo-contacto" className="mt-4 max-w-[19ch] font-display text-titulo font-semibold text-balance">{contactoTextos.titulo}</h2>
            <p className="mt-5 text-cuerpo text-greige">{contactoTextos.intro}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={linkWhatsapp()} target="_blank" rel="noopener noreferrer" className="boton boton-claro"><IconoWhatsapp />Consultar por WhatsApp</a>
              <a href="#presupuesto" className="boton boton-borde-claro">Pedir presupuesto</a>
            </div>
          </div>
          <ul className="grid content-start gap-3 sm:grid-cols-2">
            {datos.map((dato) => <li key={dato.titulo} className="min-w-0">
              {dato.href ? <a href={dato.href} {...(dato.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="contacto-dato">
                <span className="text-xs font-semibold uppercase tracking-wider text-roble">{dato.titulo}</span><span className="mt-2 flex items-center justify-between gap-2 break-words text-lg"><span>{dato.valor}</span><IconoFlecha className="size-4 shrink-0 -rotate-45" /></span>
              </a> : <div className="contacto-dato"><p className="text-xs font-semibold uppercase tracking-wider text-roble">{dato.titulo}</p><p className="mt-2 text-base leading-relaxed">{dato.valor}</p></div>}
            </li>)}
          </ul>
        </div>
        <div className="mt-10 border-t border-hueso/15 pt-7">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <a href="#inicio" aria-label="Richmont Furniture, volver al inicio" className="logo-link"><Logo /></a>
            <nav aria-label="Pie de página"><ul className="flex flex-wrap gap-x-5 text-sm text-greige">
              {navegacion.map((item) => <li key={item.href}><a href={item.href} className="nav-link">{item.texto}</a></li>)}
            </ul></nav>
            <a href={linkInstagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Richmont (@richmontpy)" className="control"><IconoInstagram /></a>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-greige">© {new Date().getFullYear()} {marca.nombreCompleto}. Muebles a medida en Paraguay.</p>
        </div>
      </div>
    </footer>
  );
}
