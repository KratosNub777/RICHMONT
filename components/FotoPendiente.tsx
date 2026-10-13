/**
 * Espacio reservado para una foto real que todavía no se cargó.
 * Se muestra a propósito como "pendiente": no se usan imágenes inventadas.
 */
export default function FotoPendiente({
  texto = "Foto pendiente",
  detalle,
  oscuro = false,
  className = "",
}: {
  texto?: string;
  detalle?: string;
  oscuro?: boolean;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={detalle ? `${texto}: ${detalle}` : texto}
      className={`relative isolate flex h-full w-full items-center justify-center overflow-hidden ${
        oscuro ? "text-greige" : "text-carbon"
      } ${className}`}
      style={{
        background: oscuro
          ? "linear-gradient(160deg, var(--grafito), var(--negro))"
          : "linear-gradient(160deg, var(--arena), color-mix(in srgb, var(--greige) 70%, var(--hueso)))",
      }}
    >
      {/* Listones finos, como un panel de madera */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          opacity: oscuro ? 0.12 : 0.18,
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 22px, color-mix(in srgb, var(--roble) 60%, transparent) 22px 23px)",
        }}
      />
      <div className="flex flex-col items-center gap-3 px-4 text-center">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" className="size-7 opacity-70">
          <rect x="3" y="5" width="18" height="14" rx="1.5" />
          <path d="m3 16 5-5 4 4 3-3 6 6" strokeLinejoin="round" />
          <circle cx="16" cy="9.5" r="1.4" />
        </svg>
        <span className="marcador text-[0.7rem] font-semibold uppercase tracking-[0.16em]">{texto}</span>
        {detalle && <span className="text-xs opacity-80">{detalle}</span>}
      </div>
    </div>
  );
}
