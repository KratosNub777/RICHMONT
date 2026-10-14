"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { contacto, linkWhatsapp, presupuestoTextos } from "@/data/sitio";
import { Magnetico, Revelar, TituloRevelado } from "./movimiento";
import { Etiqueta, IconoWhatsapp } from "./ui";

type Errores = Partial<Record<"nombre" | "espacio", string>>;

function armarMensaje(datos: { nombre: string; espacio: string; medidas: string; mensaje: string }) {
  const lineas = [
    "¡Hola Richmont! Quiero pedir un presupuesto.",
    "",
    `• Nombre: ${datos.nombre}`,
    `• Espacio: ${datos.espacio}`,
  ];
  if (datos.medidas) lineas.push(`• Medidas aproximadas: ${datos.medidas}`);
  if (datos.mensaje) lineas.push("", datos.mensaje);
  return lineas.join("\n");
}

const campo =
  "mt-2 block w-full rounded-none border-0 border-b border-negro/25 bg-transparent px-0 py-3 text-base text-negro placeholder:text-carbon/80 transition-colors focus:border-negro focus:outline-none focus:ring-0 aria-[invalid=true]:border-[#9B2C1F]";
const etiqueta = "block text-sm font-semibold text-grafito";

export default function Presupuesto() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errores, setErrores] = useState<Errores>({});
  const [enlaceEnviado, setEnlaceEnviado] = useState<string | null>(null);

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const datos = {
      nombre: String(fd.get("nombre") ?? "").trim(),
      espacio: String(fd.get("espacio") ?? "").trim(),
      medidas: String(fd.get("medidas") ?? "").trim(),
      mensaje: String(fd.get("mensaje") ?? "").trim(),
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
    setEnlaceEnviado(enlace);
    // Con "noopener" window.open siempre devuelve null, así que se corta el vínculo a mano.
    const ventana = window.open(enlace, "_blank");
    if (ventana) ventana.opener = null;
    else window.location.href = enlace; // si el navegador bloqueó la pestaña nueva
  }

  return (
    <section
      id="presupuesto"
      aria-labelledby="titulo-presupuesto"
      className="tono-claro"
      style={{ background: "linear-gradient(180deg, var(--arena) 0%, var(--greige) 100%)" }}
    >
      <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:py-36">
        <div className="lg:col-span-5">
          <Revelar>
            <Etiqueta>{presupuestoTextos.etiqueta}</Etiqueta>
          </Revelar>
          <TituloRevelado
            id="titulo-presupuesto"
            texto={presupuestoTextos.titulo}
            className="mt-6 font-display text-titulo font-semibold text-negro text-balance"
          />
          <Revelar retraso={0.15}>
            <p className="mt-7 max-w-md text-cuerpo text-grafito">{presupuestoTextos.intro}</p>
            <p className="mt-8 text-sm text-grafito">
              ¿Preferís escribir directo?{" "}
              <a
                href={linkWhatsapp()}
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap font-semibold text-negro underline decoration-roble decoration-2 underline-offset-4 hover:decoration-negro"
              >
                WhatsApp {contacto.whatsappVisible}
                <span className="sr-only">(abre WhatsApp)</span>
              </a>
            </p>
          </Revelar>
        </div>

        <Revelar retraso={0.1} className="lg:col-span-6 lg:col-start-7">
          <form
            ref={formRef}
            onSubmit={enviar}
            noValidate
            className="rounded-sm bg-hueso p-6 shadow-[0_30px_80px_-40px] shadow-negro/40 sm:p-10"
          >
            <div className="grid gap-8 sm:grid-cols-2">
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
                  placeholder="Ej.: pared de 3,20 m de largo × 2,40 m de alto"
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
                  rows={4}
                  placeholder="Contanos qué te gustaría: estilo, colores, qué necesitás guardar…"
                  className={`${campo} resize-y`}
                />
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-carbon">* Campos obligatorios</p>
              <Magnetico>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-negro px-7 py-4 font-semibold text-hueso transition-colors hover:bg-salvia-texto sm:w-auto"
                >
                  <IconoWhatsapp />
                  {presupuestoTextos.boton}
                </button>
              </Magnetico>
            </div>

            <div aria-live="polite">
              <AnimatePresence>
                {enlaceEnviado && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 border-t border-negro/10 pt-5 text-sm text-grafito"
                  >
                    Listo: te abrimos WhatsApp con tu mensaje. ¿No se abrió?{" "}
                    <a
                      href={enlaceEnviado}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-negro underline decoration-roble underline-offset-4"
                    >
                      Tocá acá
                    </a>
                    .
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Revelar>
      </div>
    </section>
  );
}
