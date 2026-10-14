"use client";

import { useId, useRef, useState } from "react";
import { contacto, linkWhatsapp, presupuestoTextos } from "@/data/sitio";
import { useConsulta } from "./ConsultaContext";
import { Etiqueta, IconoWhatsapp } from "./ui";

type Errores = Partial<Record<"nombre" | "espacio", string>>;

function armarMensaje(datos: { nombre: string; espacio: string; medidas: string; mensaje: string; proyecto?: string }) {
  const lineas = [
    "¡Hola Richmont! Quiero pedir un presupuesto.",
    "",
    `• Nombre: ${datos.nombre}`,
    `• Espacio: ${datos.espacio}`,
  ];
  if (datos.proyecto) lineas.push(`• Proyecto de referencia: ${datos.proyecto}`);
  if (datos.medidas) lineas.push(`• Medidas aproximadas: ${datos.medidas}`);
  if (datos.mensaje) lineas.push("", datos.mensaje);
  return lineas.join("\n");
}

const campo = "campo";
const etiqueta = "block text-sm font-semibold text-grafito";

export default function Presupuesto() {
  const id = useId();
  const { proyecto, elegirProyecto } = useConsulta();
  const formRef = useRef<HTMLFormElement>(null);
  const [errores, setErrores] = useState<Errores>({});
  const [enlacePreparado, setEnlacePreparado] = useState<{ href: string; proyectoId: string | null } | null>(null);

  const enlaceActual = enlacePreparado && enlacePreparado.proyectoId === (proyecto?.id ?? null) ? enlacePreparado.href : null;

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const datos = {
      nombre: String(fd.get("nombre") ?? "").trim(),
      espacio: String(fd.get("espacio") ?? "").trim(),
      medidas: String(fd.get("medidas") ?? "").trim(),
      mensaje: String(fd.get("mensaje") ?? "").trim(),
      proyecto: proyecto ? `${proyecto.titulo} (${proyecto.categoria})` : undefined,
    };

    const nuevos: Errores = {};
    if (!datos.nombre) nuevos.nombre = "Escribí tu nombre.";
    if (!datos.espacio) nuevos.espacio = "Elegí el tipo de espacio.";
    setErrores(nuevos);

    const primero = Object.keys(nuevos)[0];
    if (primero) {
      formRef.current?.querySelector<HTMLElement>(`[name="${primero}"]`)?.focus();
      return;
    }

    const enlace = linkWhatsapp(armarMensaje(datos));
    setEnlacePreparado({ href: enlace, proyectoId: proyecto?.id ?? null });
    window.open(enlace, "_blank", "noopener,noreferrer");
  }

  return (
    <section
      id="presupuesto"
      tabIndex={-1}
      aria-labelledby="titulo-presupuesto"
      className="tono-claro bg-arena/60"
    >
      <div className="contenedor seccion grid gap-7 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div>
            <Etiqueta>{presupuestoTextos.etiqueta}</Etiqueta>
          </div>
          <h2 id="titulo-presupuesto" className="mt-4 font-display text-titulo font-semibold text-negro">{presupuestoTextos.titulo}</h2>
          <div>
            <p className="mt-5 max-w-md text-cuerpo text-grafito">{presupuestoTextos.intro}</p>
            <p className="mt-4 text-sm text-grafito">
              ¿Preferís escribir directo?{" "}
              <a
                href={linkWhatsapp()}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link inline-flex items-center font-semibold text-negro underline decoration-roble underline-offset-4"
              >
                WhatsApp {contacto.whatsappVisible}
                <span className="sr-only">(abre WhatsApp)</span>
              </a>
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form
            ref={formRef}
            onSubmit={enviar}
            noValidate
            onChange={() => setEnlacePreparado(null)}
            className="min-w-0 rounded-md border border-negro/15 bg-hueso p-5 sm:p-7"
          >
            {proyecto && <div className="mb-6 rounded-md border border-roble/40 bg-arena/50 p-4" role="status">
              <p className="text-xs font-semibold uppercase tracking-wider text-roble-texto">Proyecto de referencia</p>
              <p className="mt-2 font-semibold">{proyecto.titulo}</p>
              <p className="mt-1 text-sm text-carbon">{proyecto.categoria}</p>
              <button type="button" className="nav-link mt-1 text-sm underline underline-offset-4" onClick={() => { elegirProyecto(null); setEnlacePreparado(null); }}>Quitar referencia</button>
            </div>}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${id}-nombre`} className={etiqueta}>
                  Nombre <span aria-hidden="true">*</span>
                </label>
                <input
                  id={`${id}-nombre`}
                  name="nombre"
                  type="text"
                  autoComplete="name"
                  required
                  aria-required="true"
                  aria-invalid={!!errores.nombre}
                  aria-describedby={errores.nombre ? `${id}-nombre-error` : undefined}
                  placeholder="Tu nombre"
                  className={campo}
                />
                {errores.nombre && (
                  <p id={`${id}-nombre-error`} className="mt-2 text-sm font-medium text-[#9B2C1F]">
                    {errores.nombre}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor={`${id}-espacio`} className={etiqueta}>
                  Tipo de espacio <span aria-hidden="true">*</span>
                </label>
                <select
                  id={`${id}-espacio`}
                  name="espacio"
                  required
                  aria-required="true"
                  defaultValue=""
                  aria-invalid={!!errores.espacio}
                  aria-describedby={errores.espacio ? `${id}-espacio-error` : undefined}
                  className={`${campo} cursor-pointer appearance-none bg-[length:1rem] bg-[right_0.25rem_center] bg-no-repeat pr-8`}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2317171A' stroke-width='1.8'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                  }}
                >
                  <option value="" disabled>
                    Elegí una opción
                  </option>
                  {presupuestoTextos.tiposDeEspacio.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errores.espacio && (
                  <p id={`${id}-espacio-error`} className="mt-2 text-sm font-medium text-[#9B2C1F]">
                    {errores.espacio}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={`${id}-medidas`} className={etiqueta}>
                  Medidas aproximadas <span className="font-normal text-carbon">(opcional)</span>
                </label>
                <input
                  id={`${id}-medidas`}
                  name="medidas"
                  type="text"
                  placeholder="Ej.: 3 × 2 m"
                  className={campo}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={`${id}-mensaje`} className={etiqueta}>
                  Mensaje <span className="font-normal text-carbon">(opcional)</span>
                </label>
                <textarea
                  id={`${id}-mensaje`}
                  name="mensaje"
                  rows={3}
                  placeholder="Tu idea o lo que necesitás resolver"
                  className={`${campo} resize-y`}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-carbon">* Campos obligatorios</p>
              <div>
                <button
                  type="submit"
                  className="boton boton-oscuro w-full sm:w-auto"
                >
                  <IconoWhatsapp />
                  {presupuestoTextos.boton}
                </button>
              </div>
            </div>

            <div aria-live="polite">
              {enlaceActual && <p className="mt-5 border-t border-negro/10 pt-4 text-sm leading-relaxed">
                Mensaje preparado. Revisalo y terminá de enviarlo en WhatsApp. Si no se abrió, <a href={enlaceActual} target="_blank" rel="noopener noreferrer" className="nav-link inline-flex font-semibold underline underline-offset-4">abrir el mensaje en WhatsApp</a>.
              </p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
