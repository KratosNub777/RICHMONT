"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { hero, linkInstagram, linkWhatsapp, navegacion } from "@/data/sitio";
import { bloquearScroll, irA } from "@/lib/lenis";
import { IconoInstagram, IconoWhatsapp, Logo } from "./ui";
import { Magnetico } from "./movimiento";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Header() {
  const { scrollY } = useScroll();
  const [solido, setSolido] = useState(false);
  const [oculto, setOculto] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const botonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Se vuelve sólido al dejar el hero; se esconde al bajar y vuelve al subir
  // (así las fotos tienen toda la pantalla).
  useMotionValueEvent(scrollY, "change", (actual) => {
    const anterior = scrollY.getPrevious() ?? 0;
    setSolido(actual > 40);
    setOculto(actual > 480 && actual > anterior + 2);
    if (actual < anterior - 2) setOculto(false);
  });

  useEffect(() => {
    bloquearScroll(abierto);
    if (!abierto) return;

    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const boton = botonRef.current;

    function teclado(e: KeyboardEvent) {
      if (e.key === "Escape") setAbierto(false);
      // Mantener el foco dentro del menú abierto
      if (e.key === "Tab" && menuRef.current) {
        const enfocables = [botonRef.current, ...menuRef.current.querySelectorAll<HTMLElement>("a")].filter(
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
      boton?.focus();
    };
  }, [abierto]);

  // Si se agranda la pantalla con el menú abierto, se cierra.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const cerrar = () => mq.matches && setAbierto(false);
    mq.addEventListener("change", cerrar);
    return () => mq.removeEventListener("change", cerrar);
  }, []);

  const sobreClaro = solido && !abierto;

  return (
    <>
      <motion.header
        animate={{ y: oculto && !abierto ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease }}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/* Fondo translúcido: aparece con opacidad para no animar colores */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 border-b border-negro/10 bg-hueso/80 backdrop-blur-md transition-opacity duration-500 ${
            sobreClaro ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-gradient-to-b from-negro/55 to-transparent transition-opacity duration-500 ${
            sobreClaro || abierto ? "opacity-0" : "opacity-100"
          }`}
        />

        <div className="relative mx-auto flex h-[4.5rem] max-w-[90rem] items-center justify-between gap-6 px-5 sm:px-8 lg:h-20 lg:px-12">
          <a href="#inicio" aria-label="Richmont Furniture, ir al inicio" className="flex h-9 items-center lg:h-10">
            <Logo variante={sobreClaro ? "oscuro" : "claro"} prioritario />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navegacion.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`group relative py-2 text-[0.95rem] font-medium transition-colors duration-500 ${
                      sobreClaro ? "text-grafito" : "text-hueso"
                    }`}
                  >
                    {item.texto}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-ambar transition-transform duration-500 ease-mueble group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Magnetico className="hidden sm:inline-block">
              <a
                href={linkWhatsapp()}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-500 ${
                  sobreClaro
                    ? "bg-negro text-hueso hover:bg-grafito"
                    : "bg-hueso text-negro hover:bg-white"
                }`}
              >
                <IconoWhatsapp className="size-4" />
                {hero.botonPresupuesto}
                <span className="sr-only">(abre WhatsApp)</span>
              </a>
            </Magnetico>

            <button
              ref={botonRef}
              type="button"
              onClick={() => setAbierto((v) => !v)}
              aria-expanded={abierto}
              aria-controls="menu-movil"
              aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
              className={`relative grid size-11 place-items-center rounded-full transition-colors duration-500 lg:hidden ${
                sobreClaro ? "text-negro" : "text-hueso"
              }`}
            >
              <span className="relative block h-3 w-6">
                <motion.span
                  className="absolute left-0 top-0 h-[1.5px] w-full bg-current"
                  animate={abierto ? { y: 5.25, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.4, ease }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 h-[1.5px] w-full bg-current"
                  animate={abierto ? { y: -5.25, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.4, ease }}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {abierto && (
          <motion.div
            id="menu-movil"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.4 }}
            className="fondo-oscuro fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto px-6 pb-10 pt-28 text-hueso lg:hidden"
          >
            <nav aria-label="Menú móvil">
              <ul className="space-y-1">
                {navegacion.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setAbierto(false);
                        bloquearScroll(false);
                        irA(item.href);
                      }}
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.6, ease, delay: 0.08 + i * 0.06 }}
                      className="flex items-baseline gap-4 py-2 font-display text-[clamp(1.75rem,7.5vw,3rem)] font-medium tracking-tight"
                    >
                      <span aria-hidden="true" className="font-sans text-xs tracking-widest text-roble">
                        0{i + 1}
                      </span>
                      {item.texto}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.4 }}
              className="mt-12 space-y-6"
            >
              <span aria-hidden="true" className="luz-led block h-px w-full" />
              <a
                href={linkWhatsapp()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-hueso px-6 py-4 font-semibold text-negro"
              >
                <IconoWhatsapp />
                {hero.botonPresupuesto}
                <span className="sr-only">(abre WhatsApp)</span>
              </a>
              <a
                href={linkInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-sm text-greige"
              >
                <IconoInstagram className="size-4" /> @richmontpy
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
