"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { contacto, hero, linkInstagram, linkWhatsapp, navegacion } from "@/data/sitio";
import { bloquearScroll } from "@/lib/scroll";
import { easePreciso, easeSalida } from "./movimiento";
import { IconoInstagram, IconoWhatsapp, Logo } from "./ui";

export default function Header() {
  const [abierto, setAbierto] = useState(false);
  const botonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bloquearScroll(abierto);
    if (!abierto) return;

    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const boton = botonRef.current;

    function teclado(e: KeyboardEvent) {
      if (e.key === "Escape") setAbierto(false);
      // Mantener el foco dentro del panel abierto
      if (e.key === "Tab" && panelRef.current) {
        const enfocables = [boton, ...panelRef.current.querySelectorAll<HTMLElement>("a")].filter(
          Boolean,
        ) as HTMLElement[];
        const primero = enfocables[0];
        const ultimo = enfocables[enfocables.length - 1];
        if (e.shiftKey && document.activeElement === primero) {
          e.preventDefault();
          ultimo.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault();
          primero.focus();
        }
      }
    }
    window.addEventListener("keydown", teclado);
    return () => {
      window.removeEventListener("keydown", teclado);
      bloquearScroll(false);
    };
  }, [abierto]);

  // Si se agranda la pantalla con el panel abierto, se cierra.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const cerrar = () => mq.matches && setAbierto(false);
    mq.addEventListener("change", cerrar);
    return () => mq.removeEventListener("change", cerrar);
  }, []);

  function cerrarYVolverFoco() {
    setAbierto(false);
    botonRef.current?.focus();
  }

  return (
    <header className="oscuro fixed inset-x-0 top-0 z-50 bg-negro text-blanco">
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-6 px-4 sm:px-8 lg:px-12">
        <a href="#inicio" aria-label="Richmont Furniture, ir al inicio" className="relative z-10 flex h-8 items-center">
          <Logo prioritario />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navegacion.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="group relative py-2 text-[0.95rem] text-humo transition-colors hover:text-blanco">
                  {item.texto}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-roble transition-transform duration-300 ease-preciso group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-10 flex items-center gap-2">
          <a
            href={linkWhatsapp()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 bg-blanco px-4 py-2.5 text-sm font-semibold text-negro transition-colors hover:bg-roble sm:inline-flex"
          >
            <IconoWhatsapp className="size-4" />
            {hero.botonPresupuesto}
            <span className="sr-only">(abre WhatsApp)</span>
          </a>

          <button
            ref={botonRef}
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="panel-menu"
            className="tecnico flex h-11 items-center gap-3 border border-blanco/25 px-3.5 text-blanco lg:hidden"
          >
            {abierto ? "Cerrar" : "Menú"}
            <span aria-hidden="true" className="relative block h-2.5 w-4">
              <motion.span
                className="absolute left-0 top-0 h-px w-full bg-current"
                animate={abierto ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.3, ease: easePreciso }}
              />
              <motion.span
                className="absolute bottom-0 left-0 h-px w-full bg-current"
                animate={abierto ? { y: -4, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.3, ease: easePreciso }}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {abierto && (
          <motion.div
            id="panel-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: easePreciso }}
            className="cuadricula-oscura fixed inset-0 top-16 z-0 flex flex-col justify-between overflow-y-auto bg-salvia-oscuro px-4 pb-8 pt-8 sm:px-8 lg:hidden"
          >
            <nav aria-label="Menú móvil">
              <ul className="border-t border-blanco/15">
                {navegacion.map((item, i) => (
                  <li key={item.href} className="border-b border-blanco/15">
                    <motion.a
                      href={item.href}
                      onClick={() => {
                        // Se libera el scroll antes de que el navegador salte a la sección
                        bloquearScroll(false);
                        setAbierto(false);
                      }}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, ease: easeSalida, delay: 0.15 + i * 0.05 }}
                      className="flex items-center justify-between py-5 font-display text-[clamp(1.75rem,7vw,2.75rem)] font-semibold tracking-tight"
                    >
                      {item.texto}
                      <span aria-hidden="true" className="tecnico text-humo">
                        0{i + 1}
                      </span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 space-y-5"
            >
              <a
                href={linkWhatsapp()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={cerrarYVolverFoco}
                className="flex w-full items-center justify-center gap-2 bg-blanco px-6 py-4 font-semibold text-negro"
              >
                <IconoWhatsapp />
                {hero.botonPresupuesto}
                <span className="sr-only">(abre WhatsApp)</span>
              </a>
              <div className="tecnico flex items-center justify-between text-humo">
                <a href={linkInstagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-2">
                  <IconoInstagram className="size-4" /> @{contacto.instagram}
                </a>
                <span>WhatsApp {contacto.whatsappVisible}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
