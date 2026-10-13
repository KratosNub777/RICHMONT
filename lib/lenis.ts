import type Lenis from "lenis";

let instancia: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instancia = lenis;
}

/** Frena o reactiva el scroll (por ejemplo, al abrir el menú o el lightbox). */
export function bloquearScroll(bloquear: boolean) {
  if (bloquear) {
    instancia?.stop();
    document.documentElement.style.overflow = "hidden";
  } else {
    instancia?.start();
    document.documentElement.style.overflow = "";
  }
}

/** Desplaza hasta una sección (ej: "#trabajos"), con scroll suave si está activo. */
export function irA(destino: string) {
  const el = document.querySelector<HTMLElement>(destino);
  if (!el) return;
  if (instancia) instancia.scrollTo(el, { force: true });
  else el.scrollIntoView({ behavior: "auto", block: "start" });
  history.replaceState(null, "", destino);
}
