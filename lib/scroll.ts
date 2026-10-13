/** Frena o reactiva el scroll de la página (al abrir el menú o el lightbox). */
export function bloquearScroll(bloquear: boolean) {
  document.documentElement.style.overflow = bloquear ? "hidden" : "";
}
