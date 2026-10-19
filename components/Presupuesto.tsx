"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { contacto, linkWhatsapp, presupuestoTextos } from "@/data/sitio";
import { Magnetico } from "./movimiento";
import { Etiqueta, IconoFlecha, IconoWhatsapp } from "./ui";

type Errores = Partial<Record<"nombre" | "espacio" | "medidas", string>>;

function armarMensaje(datos: { nombre: string; espacio: string; medidas: string[]; mensaje: string }) {
  const lineas = [
    "¡Hola Richmont! Quiero pedir un presupuesto.",
    "",
    `• Nombre: ${datos.nombre}`,
    `• Espacio: ${datos.espacio}`,
  ];
  if (datos.medidas.length) lineas.push(`• Medidas aproximadas: ${datos.medidas.join(" × ")}`);
  if (datos.mensaje) lineas.push("", datos.mensaje);
  return lineas.join("\n");
}

// Medidas en centímetros: nombre del campo, etiqueta y cómo se escribe en el mensaje.
const medidas = [
  { name: "largo", etiqueta: "Largo", frase: "de largo", ejemplo: "320" },
  { name: "alto", etiqueta: "Alto", frase: "de alto", ejemplo: "240" },
  { name: "fondo", etiqueta: "Fondo", frase: "de fondo", ejemplo: "60" },
] as const;

const campo =
  "mt-2.5 block min-h-13 w-full rounded-xl border border-negro/15 bg-white px-4 py-3.5 text-base text-negro placeholder:text-carbon transition-[border-color,box-shadow] hover:border-roble focus:border-roble-texto focus:outline-none focus:ring-3 focus:ring-roble/15 aria-[invalid=true]:border-[#9B2C1F] aria-[invalid=true]:focus:ring-[#9B2C1F]/15";
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
      medidas: medidas.map((m) => ({ ...m, valor: String(fd.get(m.name) ?? "").trim() })),
      mensaje: String(fd.get("mensaje") ?? "").trim(),
    };

    const nuevos: Errores = {};
    if (!datos.nombre) nuevos.nombre = "Escribí tu nombre.";
    if (!datos.espacio) nuevos.espacio = "Elegí el tipo de espacio.";
    const medidaInvalida = datos.medidas.find((m) => m.valor && !/^[1-9]\d{0,3}$/.test(m.valor));
    if (medidaInvalida) {
      nuevos.medidas = "Escribí solo números enteros, en centímetros (por ejemplo 320).";
    }
    setErrores(nuevos);

    const primero = Object.keys(nuevos)[0];
    if (primero) {
      const campoConError = primero === "medidas" ? medidaInvalida?.name : primero;
      formRef.current?.querySelector<HTMLElement>(`[name="${campoConError}"]`)?.focus();
      return;
    }

    const enlace = linkWhatsapp(
      armarMensaje({
        ...datos,
        medidas: datos.medidas.filter((m) => m.valor).map((m) => `${m.valor} cm ${m.frase}`),
      }),
    );
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
      className="tono-claro relative"
      style={{ background: "linear-gradient(180deg, var(--arena) 0%, var(--greige) 100%)" }}
    >
      <div className="mx-auto max-w-[90rem] px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="grid overflow-hidden rounded-[1.75rem] border border-negro/10 bg-hueso shadow-[0_28px_80px_-40px_rgba(23,23,26,0.35)] lg:grid-cols-12">
          <div className="fondo-oscuro relative flex flex-col px-7 py-10 text-hueso sm:px-10 sm:py-12 lg:col-span-5 lg:p-12">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-roble via-ambar to-roble/20" />
            <div>
              <Etiqueta oscuro>{presupuestoTextos.etiqueta}</Etiqueta>
            </div>
            <h2
              id="titulo-presupuesto"
              className="mt-7 max-w-[10ch] font-display text-titulo font-semibold text-hueso text-balance"
            >
              {presupuestoTextos.titulo}
            </h2>
            <div>
              <p className="mt-6 max-w-sm text-cuerpo text-greige">{presupuestoTextos.intro}</p>
            </div>
            <div className="mt-9">
              <div className="inline-flex items-center gap-2 rounded-full border border-roble/35 bg-roble/10 px-4 py-2 text-sm text-hueso">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-ambar" />
                A tu medida · Sin compromiso
              </div>
            </div>

            <div aria-hidden="true" className="my-10 hidden flex-1 items-center justify-center lg:flex">
              <svg viewBox="0 0 340 180" fill="none" className="w-full max-w-80 text-roble">
                <path d="M28 148h284M48 148V45h242v103M48 88h242M130 45v103M210 45v103M48 45l22-20h242v103l-22 20M290 45l22-20M290 88l22-20" stroke="currentColor" strokeWidth="1.2" />
                <path d="M117 62v12M197 62v12M277 62v12M117 105v18M197 105v18M277 105v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M48 164h242M48 159v10M290 159v10M27 45v103M22 45h10M22 148h10" stroke="currentColor" strokeOpacity=".4" />
                <path d="M70 25v-9M312 25v-9" stroke="currentColor" strokeOpacity=".4" />
                <path d="M139 164h60" stroke="var(--grafito)" strokeWidth="4" />
                <text x="169" y="168" textAnchor="middle" fill="currentColor" stroke="none" fontSize="10" letterSpacing="3">A MEDIDA</text>
              </svg>
            </div>

            <div className="mt-10 border-t border-hueso/15 pt-7 lg:mt-auto">
              <p className="text-sm text-greige">¿Preferís conversar directamente?</p>
              <a
                href={linkWhatsapp()}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-3 inline-flex items-center gap-3 text-base font-semibold text-hueso transition-colors hover:text-ambar"
              >
                <IconoWhatsapp />
                {contacto.whatsappVisible}
                <IconoFlecha className="size-4 transition-transform group-hover:translate-x-1" />
                <span className="sr-only">(abre WhatsApp)</span>
              </a>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <form
              ref={formRef}
              onSubmit={enviar}
              noValidate
              className="p-6 sm:p-10 lg:p-12"
            >
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="sm:col-span-2">
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

                <fieldset
                  role="radiogroup"
                  className="sm:col-span-2"
                  aria-required="true"
                  aria-describedby={errores.espacio ? `${id}-espacio-error` : undefined}
                >
                  <legend className={etiqueta}>
                    Tipo de espacio <span aria-hidden="true">*</span>
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {presupuestoTextos.tiposDeEspacio.map((t) => (
                      <label key={t} className="cursor-pointer">
                        <input
                          type="radio"
                          name="espacio"
                          value={t}
                          onChange={() => setErrores((e) => ({ ...e, espacio: undefined }))}
                          className="peer sr-only"
                        />
                        <span className={`block rounded-full border px-4 py-2.5 text-sm font-semibold text-grafito transition-colors duration-300 hover:border-negro/60 peer-checked:border-negro peer-checked:bg-negro peer-checked:text-hueso peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-negro ${
                            errores.espacio ? "border-[#9B2C1F]" : "border-negro/20"
                          }`}>
                          {t}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errores.espacio && (
                    <p id={`${id}-espacio-error`} className="mt-3 text-sm font-medium text-[#9B2C1F]">
                      {errores.espacio}
                    </p>
                  )}
                </fieldset>

                <fieldset className="sm:col-span-2" aria-describedby={`${id}-medidas-ayuda`}>
                  <legend className={etiqueta}>
                    Medidas aproximadas <span className="font-normal text-carbon">(opcional)</span>
                  </legend>
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {medidas.map((m) => (
                      <div key={m.name}>
                        <label htmlFor={`${id}-${m.name}`} className="block text-xs font-semibold uppercase tracking-[0.12em] text-carbon">
                          {m.etiqueta}
                        </label>
                        <div
                          className={`mt-2 flex items-center rounded-sm border bg-arena/40 px-3 transition-colors focus-within:border-negro focus-within:bg-hueso ${
                            errores.medidas ? "border-[#9B2C1F]" : "border-negro/20"
                          }`}
                        >
                          <input
                            id={`${id}-${m.name}`}
                            name={m.name}
                            type="text"
                            inputMode="numeric"
                            autoComplete="off"
                            maxLength={4}
                            placeholder={m.ejemplo}
                            onChange={() => errores.medidas && setErrores((e) => ({ ...e, medidas: undefined }))}
                            aria-invalid={!!errores.medidas}
                            aria-describedby={errores.medidas ? `${id}-medidas-error` : undefined}
                            className="min-w-0 flex-1 border-0 bg-transparent py-3 text-base tabular-nums text-negro placeholder:text-carbon/60 focus:outline-none focus:ring-0"
                          />
                          <span aria-hidden="true" className="pl-2 text-sm font-semibold text-carbon">
                            cm
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p id={`${id}-medidas-ayuda`} className="mt-3 text-xs text-carbon">
                    Todo en centímetros. Si no las sabés, dejalas vacías y te ayudamos a medir.
                  </p>
                  {errores.medidas && (
                    <p id={`${id}-medidas-error`} className="mt-2 text-sm font-medium text-[#9B2C1F]">
                      {errores.medidas}
                    </p>
                  )}
                </fieldset>

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
          </div>
        </div>
      </div>
    </section>
  );
}
