import Image from "next/image";
import { marca } from "@/data/sitio";

/** Pequeño título sobre cada sección, con una línea de madera. */
export function Etiqueta({ children, oscuro = false }: { children: React.ReactNode; oscuro?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 font-sans text-etiqueta font-semibold uppercase ${
        oscuro ? "text-roble" : "text-roble-texto"
      }`}
    >
      <span aria-hidden="true" className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}

/** Marcador visible para datos que todavía no se cargaron (no se inventa nada). */
export function Marcador({ children = "Pendiente" }: { children?: React.ReactNode }) {
  return <span className="marcador inline-block max-w-full">{children}</span>;
}

/**
 * Logo de Richmont.
 * - "claro": para fondos oscuros (el logo original, blanco).
 * - "oscuro": para fondos claros. Se oscurece con un filtro CSS, sin tocar el archivo
 *   ni deformarlo (mantiene su proporción real).
 * Mientras no esté cargado el archivo (data/sitio.ts → marca.logo), se muestra el nombre.
 */
export function Logo({
  variante = "claro",
  className = "",
  prioritario = false,
}: {
  variante?: "claro" | "oscuro";
  className?: string;
  /** true solo en el header: se carga antes que el resto. */
  prioritario?: boolean;
}) {
  const { src, ancho, alto } = marca.logo;

  if (src && ancho && alto) {
    return (
      <Image
        src={src}
        alt={marca.nombreCompleto}
        width={ancho}
        height={alto}
        preload={prioritario}
        className={`h-full w-auto transition-[filter] duration-500 ${
          variante === "oscuro" ? "[filter:brightness(0)_opacity(0.82)]" : ""
        } ${className}`}
      />
    );
  }

  return (
    <span
      className={`flex flex-col leading-none transition-colors duration-500 ${
        variante === "oscuro" ? "text-negro" : "text-hueso"
      } ${className}`}
    >
      <span className="font-display text-[1.35rem] font-semibold tracking-[0.2em]">RICHMONT</span>
      <span className="mt-1 font-sans text-[0.58rem] font-medium tracking-[0.5em] opacity-80">FURNITURE</span>
    </span>
  );
}

export function IconoWhatsapp({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01Zm-7.01 15.24h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

export function IconoInstagram({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconoFlecha({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
