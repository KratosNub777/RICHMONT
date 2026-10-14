"use client";

import { useEffect, useRef, useState } from "react";
import { linkInstagram, linkWhatsapp, navegacion } from "@/data/sitio";
import { Logo, IconoInstagram, IconoWhatsapp } from "./ui";
import Modal from "./Modal";

export default function Header() {
  const [abierto, setAbierto] = useState(false);
  const botonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const cerrar = () => { if (mq.matches) setAbierto(false); };
    mq.addEventListener("change", cerrar);
    return () => mq.removeEventListener("change", cerrar);
  }, []);

  function navegar(href: string) {
    setAbierto(false);
    requestAnimationFrame(() => {
      const destino = document.querySelector<HTMLElement>(href);
      history.replaceState(null, "", href);
      destino?.focus({ preventScroll: true });
      destino?.scrollIntoView({ block: "start" });
    });
  }

  return (
    <>
      <header className="site-header">
        <div className="contenedor header-interior">
          <a href="#inicio" aria-label="Richmont Furniture, ir al inicio" className="logo-link"><Logo /></a>
          <nav aria-label="Principal" className="hidden xl:block">
            <ul className="flex items-center gap-5">
              {navegacion.filter((item) => item.href !== "#presupuesto").map((item) => (
                <li key={item.href}><a href={item.href} className="nav-link">{item.texto}</a></li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#presupuesto" className="boton boton-claro hidden sm:inline-flex">Pedir presupuesto</a>
            <button ref={botonRef} type="button" onClick={() => setAbierto(true)}
              aria-expanded={abierto} aria-controls="menu-movil" aria-label="Abrir menú"
              className="control xl:hidden"><span aria-hidden="true">☰</span></button>
          </div>
        </div>
      </header>
      {abierto && (
        <Modal alCerrar={() => setAbierto(false)} etiqueta="titulo-menu" className="menu-modal">
          <div id="menu-movil" className="p-5 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <h2 id="titulo-menu" className="font-display text-lg">Menú</h2>
              <button type="button" onClick={() => setAbierto(false)} aria-label="Cerrar menú" className="control">✕</button>
            </div>
            <nav aria-label="Menú móvil" className="my-6">
              <ul>{navegacion.map((item) => (
                <li key={item.href}><a href={item.href} onClick={(e) => { e.preventDefault(); navegar(item.href); }}
                  className="block border-b border-hueso/15 py-4 font-display text-xl">{item.texto}</a></li>
              ))}</ul>
            </nav>
            <a href={linkWhatsapp()} target="_blank" rel="noopener noreferrer" className="boton boton-claro w-full"><IconoWhatsapp />Consultar por WhatsApp</a>
            <a href={linkInstagram} target="_blank" rel="noopener noreferrer" className="nav-link mt-3 flex justify-center gap-2"><IconoInstagram />@richmontpy</a>
          </div>
        </Modal>
      )}
    </>
  );
}
