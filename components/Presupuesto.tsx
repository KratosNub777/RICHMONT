"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { acabados, contacto, linkWhatsapp, presupuestoTextos as t } from "@/data/sitio";
import { useAcabado } from "@/lib/acabado";
import { easePreciso, easeSalida, Revelar } from "./movimiento";
import { Cota, Etiqueta, IconoFlecha, IconoWhatsapp } from "./ui";

type Datos = {
  espacio: string;
  ancho: string;
  alto: string;
  profundidad: string;
  acabado: string;
  estilo: string;
  nombre: string;
  mensaje: string;
};

const vacio: Datos = { espacio: "", ancho: "", alto: "", profundidad: "", acabado: "", estilo: "", nombre: "", mensaje: "" };

const ROJO = "#9B2C1F"; // errores (contraste AA sobre blanco)

function medidasTexto(d: Datos) {
  const partes = [
    d.ancho && `${d.ancho} m de ancho`,
    d.alto && `${d.alto} m de alto`,
    d.profundidad && `${d.profundidad} m de profundidad`,
  ].filter(Boolean);
  return partes.join(" × ");
}

function armarMensaje(d: Datos) {
  const lineas = ["¡Hola Richmont! Quiero pedir un presupuesto.", "", `• Nombre: ${d.nombre}`, `• Espacio: ${d.espacio}`];
  const medidas = medidasTexto(d);
  lineas.push(`• Medidas aproximadas: ${medidas || "todavía no las tengo"}`);
  if (d.acabado) lineas.push(`• Acabado: ${d.acabado}`);
  if (d.estilo) lineas.push(`• Estilo / referencias: ${d.estilo}`);
  if (d.mensaje) lineas.push("", d.mensaje);
  return lineas.join("\n");
}

const campo =
  "mt-2 block w-full border border-negro/30 bg-blanco px-3.5 py-3 text-base text-negro placeholder:text-tinta/80 transition-colors focus:border-negro focus:outline-none aria-[invalid=true]:border-[#9B2C1F]";
const etiqueta = "block text-sm font-semibold";

export default function Presupuesto() {
  const id = useId();
  const [paso, setPaso] = useState(0);
  const [datos, setDatos] = useState<Datos>(vacio);
  const [error, setError] = useState<string | null>(null);
  const [enlace, setEnlace] = useState<string | null>(null);
  // Al cambiar de paso, el foco va al título del paso nuevo (teclado y lectores de pantalla).
  const enfocarTitulo = useRef(false);
  const acabadoElegido = useAcabado();
  const total = t.pasos.length;

  // Si eligieron un acabado en "Elegí tu acabado", llega ya marcado (hasta que elijan otro acá).
  const acabadoActual = datos.acabado || acabados.find((x) => x.id === acabadoElegido)?.nombre || "";

  const set = (campo: keyof Datos) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setDatos((d) => ({ ...d, [campo]: e.target.value }));

  function validar(): string | null {
    if (paso === 0 && !datos.espacio) return "Elegí el tipo de espacio.";
    if (paso === 3 && !datos.nombre.trim()) return "Escribí tu nombre.";
    return null;
  }

  function avanzar(e: React.FormEvent) {
    e.preventDefault();
    const problema = validar();
    setError(problema);
    if (problema) return;

    if (paso < total - 1) {
      enfocarTitulo.current = true;
      setPaso(paso + 1);
      return;
    }
    const url = linkWhatsapp(armarMensaje({ ...datos, acabado: acabadoActual, nombre: datos.nombre.trim() }));
    setEnlace(url);
    // Con "noopener" window.open siempre devuelve null, así que se corta el vínculo a mano.
    const ventana = window.open(url, "_blank");
    if (ventana) ventana.opener = null;
    else window.location.href = url; // si el navegador bloqueó la pestaña nueva
  }

  function volver() {
    setError(null);
    enfocarTitulo.current = true;
    setPaso((p) => Math.max(0, p - 1));
  }

  const errorId = `${id}-error`;

  return (
    <section id="presupuesto" aria-labelledby="titulo-presupuesto" className="cuadricula border-t border-negro">
      <div className="mx-auto grid max-w-[90rem] gap-12 px-4 py-20 sm:px-8 md:py-28 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:py-32">
        <div className="lg:col-span-4">
          <Etiqueta codigo="R—05">{t.etiqueta}</Etiqueta>
          <Revelar>
            <h2 id="titulo-presupuesto" className="mt-6 font-display text-titulo font-bold text-balance">
              {t.titulo}
            </h2>
          </Revelar>
          <p className="mt-6 max-w-sm text-cuerpo text-tinta">{t.intro}</p>
          <p className="mt-8 text-sm text-tinta">
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
        </div>

        <form onSubmit={avanzar} noValidate className="border border-negro bg-blanco lg:col-span-7 lg:col-start-6">
          {/* Progreso */}
          <div className="border-b border-negro">
            <ol className="grid grid-cols-4">
              {t.pasos.map((nombre, i) => (
                <li
                  key={nombre}
                  aria-current={i === paso ? "step" : undefined}
                  className={`tecnico border-r border-negro/15 px-2 py-3 last:border-r-0 sm:px-4 ${
                    i === paso ? "text-negro" : i < paso ? "text-salvia-oscuro" : "text-tinta"
                  }`}
                >
                  <span className="block">0{i + 1}</span>
                  <span className="mt-0.5 block truncate normal-case tracking-normal">{nombre}</span>
                </li>
              ))}
            </ol>
            <div className="h-1 bg-superficie">
              <motion.div
                className="h-full origin-left bg-salvia-oscuro"
                animate={{ scaleX: (paso + 1) / total }}
                transition={{ duration: 0.5, ease: easePreciso }}
              />
            </div>
          </div>

          <div className="p-5 sm:p-8 lg:p-10">
            <p className="sr-only" aria-live="polite">
              Paso {paso + 1} de {total}: {t.pasos[paso]}
            </p>

            <AnimatePresence mode="wait" initial={false}>
              <motion.fieldset
                key={paso}
                initial={{ opacity: 0, clipPath: "inset(0% 0% 0% 8%)" }}
                animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: easeSalida }}
                className="min-h-[18rem]"
                aria-describedby={error ? errorId : undefined}
              >
                <legend className="sr-only">{t.pasos[paso]}</legend>
                <h3
                  ref={(el) => {
                    // El título se monta cuando termina de salir el paso anterior
                    if (el && enfocarTitulo.current) {
                      enfocarTitulo.current = false;
                      el.focus();
                    }
                  }}
                  tabIndex={-1} className="font-display text-subtitulo font-semibold focus:outline-none">
                  {paso === 0 && "¿Qué espacio querés amueblar?"}
                  {paso === 1 && "Medidas aproximadas"}
                  {paso === 2 && "¿Qué estilo o acabado te gusta?"}
                  {paso === 3 && "¿Cómo te llamás?"}
                </h3>

                {paso === 0 && (
                  <div role="radiogroup" aria-label="Tipo de espacio" aria-required="true" className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {t.tiposDeEspacio.map((tipo) => {
                      const marcado = datos.espacio === tipo;
                      return (
                        <label
                          key={tipo}
                          className={`relative flex min-h-16 cursor-pointer items-center border px-3 py-3 text-sm font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 ${
                            marcado ? "border-negro text-blanco" : "border-negro/25 hover:border-negro"
                          }`}
                        >
                          <input
                            type="radio"
                            name="espacio"
                            value={tipo}
                            checked={marcado}
                            onChange={() => setDatos((d) => ({ ...d, espacio: tipo }))}
                            className="sr-only"
                          />
                          {marcado && (
                            <motion.span
                              layoutId="espacio-presupuesto"
                              aria-hidden="true"
                              className="absolute inset-0 bg-negro"
                              transition={{ duration: 0.35, ease: easePreciso }}
                            />
                          )}
                          <span className="relative">{tipo}</span>
                        </label>
                      );
                    })}
                  </div>
                )}

                {paso === 1 && (
                  <>
                    <p className="mt-2 text-sm text-tinta">En metros. Si no las tenés, dejalo vacío: las vemos juntos.</p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                      {(
                        [
                          ["ancho", "Ancho"],
                          ["alto", "Alto"],
                          ["profundidad", "Profundidad"],
                        ] as const
                      ).map(([clave, nombre]) => (
                        <div key={clave}>
                          <label htmlFor={`${id}-${clave}`} className={etiqueta}>
                            {nombre} <span className="font-normal text-tinta">(m)</span>
                          </label>
                          <input
                            id={`${id}-${clave}`}
                            type="text"
                            inputMode="decimal"
                            placeholder="Ej.: 2.40"
                            value={datos[clave]}
                            onChange={set(clave)}
                            className={campo}
                          />
                        </div>
                      ))}
                    </div>
                    <Cota className="mt-8">{medidasTexto(datos) || "— × — m"}</Cota>
                  </>
                )}

                {paso === 2 && (
                  <>
                    <div role="radiogroup" aria-label="Acabado" className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-5">
                      {[...acabados.map((a) => ({ nombre: a.nombre, color: a.color as string | null })), { nombre: t.sinAcabado, color: null }].map(
                        (a) => {
                          const marcado = acabadoActual === a.nombre;
                          return (
                            <label
                              key={a.nombre}
                              className={`relative flex cursor-pointer flex-col gap-2 border p-2 text-sm font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 ${
                                marcado ? "border-negro ring-1 ring-negro" : "border-negro/25 hover:border-negro"
                              }`}
                            >
                              <input
                                type="radio"
                                name="acabado"
                                value={a.nombre}
                                checked={marcado}
                                onChange={() => setDatos((d) => ({ ...d, acabado: a.nombre }))}
                                className="sr-only"
                              />
                              <span
                                aria-hidden="true"
                                className="block h-12 w-full ring-1 ring-negro/15"
                                style={
                                  a.color
                                    ? { background: a.color }
                                    : { background: "repeating-linear-gradient(45deg, transparent 0 6px, rgb(23 23 26 / 0.15) 6px 7px)" }
                                }
                              />
                              {a.nombre}
                            </label>
                          );
                        },
                      )}
                    </div>
                    <label htmlFor={`${id}-estilo`} className={`${etiqueta} mt-6`}>
                      Estilo o referencias <span className="font-normal text-tinta">(opcional)</span>
                    </label>
                    <input
                      id={`${id}-estilo`}
                      type="text"
                      placeholder="Ej.: líneas rectas, tiradores negros, luz LED…"
                      value={datos.estilo}
                      onChange={set("estilo")}
                      className={campo}
                    />
                  </>
                )}

                {paso === 3 && (
                  <div className="mt-6 grid gap-5">
                    <div>
                      <label htmlFor={`${id}-nombre`} className={etiqueta}>
                        Nombre <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id={`${id}-nombre`}
                        type="text"
                        autoComplete="name"
                        required
                        aria-required="true"
                        aria-invalid={!!error}
                        aria-describedby={error ? errorId : undefined}
                        placeholder="Tu nombre"
                        value={datos.nombre}
                        onChange={set("nombre")}
                        className={campo}
                      />
                    </div>
                    <div>
                      <label htmlFor={`${id}-mensaje`} className={etiqueta}>
                        Mensaje <span className="font-normal text-tinta">(opcional)</span>
                      </label>
                      <textarea
                        id={`${id}-mensaje`}
                        rows={3}
                        placeholder="Contanos qué te gustaría: qué necesitás guardar, para cuándo…"
                        value={datos.mensaje}
                        onChange={set("mensaje")}
                        className={`${campo} resize-y`}
                      />
                    </div>
                  </div>
                )}

                {error && (
                  <p id={errorId} role="alert" className="mt-5 text-sm font-semibold" style={{ color: ROJO }}>
                    {error}
                  </p>
                )}
              </motion.fieldset>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between gap-3 border-t border-negro/15 pt-6">
              <button
                type="button"
                onClick={volver}
                disabled={paso === 0}
                className="inline-flex items-center gap-2 px-1 py-3 font-semibold transition-opacity disabled:invisible"
              >
                <IconoFlecha className="size-4 rotate-180" /> Volver
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2.5 bg-negro px-6 py-4 font-semibold text-blanco transition-colors hover:bg-salvia-oscuro"
              >
                {paso < total - 1 ? (
                  <>
                    Siguiente <IconoFlecha />
                  </>
                ) : (
                  <>
                    <IconoWhatsapp /> {t.boton}
                  </>
                )}
              </button>
            </div>

            <div aria-live="polite">
              {enlace && (
                <p className="mt-6 border-t border-negro/15 pt-5 text-sm text-tinta">
                  Listo: te abrimos WhatsApp con tu mensaje. ¿No se abrió?{" "}
                  <a
                    href={enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-negro underline decoration-roble underline-offset-4"
                  >
                    Tocá acá
                  </a>
                  .
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
