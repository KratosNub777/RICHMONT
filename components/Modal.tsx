"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** El dialog nativo contiene el foco y vuelve inerte el resto de la página. */
export default function Modal({ children, alCerrar, etiqueta, descripcion, className = "" }: {
  children: ReactNode;
  alCerrar: () => void;
  etiqueta: string;
  descripcion?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const cerrarRef = useRef(alCerrar);
  useEffect(() => { cerrarRef.current = alCerrar; }, [alCerrar]);
  useEffect(() => {
    const dialogo = ref.current!;
    const origen = document.activeElement as HTMLElement | null;
    const overflow = document.documentElement.style.overflow;
    dialogo.showModal();
    dialogo.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
    document.documentElement.style.overflow = "hidden";
    return () => {
      dialogo.close();
      document.documentElement.style.overflow = overflow;
      if (origen?.isConnected) origen.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog ref={ref} aria-labelledby={etiqueta} aria-describedby={descripcion}
      className={`modal ${className}`}
      onCancel={(e) => { e.preventDefault(); cerrarRef.current(); }}
      onClick={(e) => { if (e.target === e.currentTarget) cerrarRef.current(); }}
      onKeyDown={(e) => {
        if (e.key !== "Tab") return;
        const elementos = [...e.currentTarget.querySelectorAll<HTMLElement>("a[href],button:not([disabled]),input,select,textarea,[tabindex='0']")]
          .filter((el) => el.getClientRects().length > 0);
        const primero = elementos[0];
        const ultimo = elementos.at(-1);
        if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo?.focus(); }
        else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero?.focus(); }
      }}>
      {children}
    </dialog>
  );
}
